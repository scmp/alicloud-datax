var dateFormat = require('dateformat');
var async = require('async');
const mongoose   = require('mongoose');
mongoose.Promise = Promise;

var retentionPeriod = process.env.retentionPeriod||"7";
var lastBackup = process.env.lastBackup||"1";
var dbhost = process.env.dbhost;
var database = process.env.database;
var collectionName=process.env.collectionName;
var mongo_user = process.env.username;
var mongo_password = process.env.password;

mongoose.connect(`mongodb://${mongo_user}:${mongo_password}@${dbhost}:3717/${database}`, { useUnifiedTopology: true, useNewUrlParser: true, }, (err) => {
  if (!err) { console.log('MongoDb connection succeeded.') }
  else { console.log('Error in DB connection : ' + err)
         process.exit(1) }

  let db = mongoose.connection.db;
  var lastBackupDate = new Date(Date.now() - lastBackup * 24 * 60 * 60 * 1000).toISOString().substr(0,10);
  var retentionPeriodDate = new Date(Date.now() - retentionPeriod * 24 * 60 * 60 * 1000).toISOString().substr(0,10);

  db.listCollections({ "name": { "$lt": retentionPeriodDate } })
      .toArray(function(err,items) {
        if (err) throw err;
        var names = items.map(function(item) {
          console.log(item.name);
          return item.name;
        })
        if (names.length == 0)   
            console.log('No collections older than', retentionPeriod, 'days exists'); 
        else 
          async.eachLimit(names,10,function(name,callback) {
              db.dropCollection(name,callback); // dropping old collections
            },function(err) {
              if (err) throw err;
              console.log('collections dropped');
            }
          );
  
      });

  // Rename collection
  return db.collection(collectionName).rename(lastBackupDate);
}).then(() => {
  console.log('rename successful');
}).catch(e => {
  console.log('rename failed:', e.message);
}).then(() => {
  console.log('disconnecting');
  mongoose.disconnect();
});

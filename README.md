# Alicloud-Datax

## DataX serves as a data synchronization framework between different data sources. Refer doc [here](https://github.com/alibaba/DataX)

This repository serves purpose of data backup and restore from Alicloud Table store (OTS) to MongoDB instance and vice-versa.

Datax supports reader/writer plugins which can be provided as configuration to run the backup/restore task.

Additionally, there is custom program that performs following tasks before backup job is initialized.

1. Delete the backup older than the retention period.
2. Rename the last backup to previous day date, in order to keep single point of restore.

[Custom Program](https://github.com/scmp/alicloud-datax/blob/master/app/db.js) expects following inputs:

1. `retentionPeriod` - Retention period in Days, default set to `7`
2. `lastBackup` - Frequency of backup, default set to `1` (eg for daily backup `lastBackup = 1`)
3. `dbhost` - Mongo DB Host
4. `database` - Mongo DB name
5. `mongo_user` - Mongo DB user
6. `mongo_password` - Mongo DB password
7. `collectionName` - Name of the collection to backup

Refer sample setup for more details [here](https://github.com/scmp/alicloud-datax/blob/master/sample)

## Dockerfile

```sh
$ docker pull southchinamorningpost/alicloud-datax:1.0
```

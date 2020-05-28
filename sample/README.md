# Set up Backup and Restore

Here, we have included required sample K8s manifest, which can be used for setting up Backup and restore tasks.

# Backup

* Backup will run as k8s cronjob and schedule can be modfied in the manifest file [here](https://github.com/scmp/alicloud-datax/blob/master/sample/sample/k8s/k8s.prod-2/deploy/cronjob-backup.yaml)
* In this sample, we assume Mongo credentials are updated under cronjob manifest and use as environment variables.
* Update the configmap, for additional details [here](https://github.com/scmp/alicloud-datax/blob/master/sample/k8s/k8s.prod-2/deploy/cm-backup-retention.yaml)
* Refer [sample-backup.json](https://github.com/scmp/alicloud-datax/blob/master/sample/sample-backup.json) and create backup config, with updated details. 
* Backup config will be uploaded as K8s secret, since it holds Accesskey and secrets [here](https://github.com/scmp/alicloud-datax/blob/master/sample/k8s/k8s.prod-2/secret-backup.yaml)


# Restore

* Restore job will run K8s job [here](https://github.com/scmp/alicloud-datax/blob/master/sample/k8s/k8s.prod-2/deploy/job-restore.yaml)
* Refer [sample-restore.json](https://github.com/scmp/alicloud-datax/blob/master/sample/sample-restore.json) and create backup config, with updated details. 
* Similar to backup, Restore config will also be stored as k8s secret [here](https://github.com/scmp/alicloud-datax/blob/master/sample/k8s/k8s.prod-2/secret-restore.yaml)
* Restore job can be set as a CI job which would be triggered as manual action i.e, only at the time of need.


Once all manifests and configurations are updated with actuall values, CI job can be setup.
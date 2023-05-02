# Database Disaster Recovery

CiviForm's production database is backed up daily, with snapshot names prefixed with the value set by `POSTGRES_RESTORE_SNAPSHOT_IDENTIFIER`. By default they are retained for 7 days, which can be configured by`POSTGRES_BACKUP_RETENTION_DAYS`.

## (AWS) Restoring the database to a previous snapshot

In the event of catastrophic data loss or corruption, the production database can be restored to a previous
snapshot. To do this

1. Identify the name of the DB snapshot to restore to in the AWS console


2. Remove deletion protection from the  

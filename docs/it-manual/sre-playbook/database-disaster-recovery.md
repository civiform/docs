# Database Disaster Recovery

CiviForm's production database is backed up daily, with snapshot names prefixed with the value set by `POSTGRES_RESTORE_SNAPSHOT_IDENTIFIER`. By default they are retained for 7 days, which can be configured by`POSTGRES_BACKUP_RETENTION_DAYS`.

## (AWS) Restoring the database to a previous snapshot

In the event of catastrophic data loss or corruption, the production database can be restored to a previous
snapshot. To do this:

1. Identify the DB snapshot to restore to in the AWS console by navigating to RDS > Snapshots.
1. Copy the snapshot identifier (not the name, the identifier begins with `rds:`)
1. In your civiform_config.sh file, set `POSTGRES_RESTORE_SNAPSHOT_IDENTIFIER` to the identifier.
1. Remove deletion protection from the databae by navigating to RDS > Databases, selecting your production database and removing deletion protection.
1. Run `bin/deploy`. You should see in the terraform plan that the RDS database will be replaced.

Note that once the database is restored, the `POSTGRES_RESTORE_SNAPSHOT_IDENTIFIER` should continue to reference
the same snapshot identifier. Changing the value of it will trigger another database replacement which may result
in data loss.

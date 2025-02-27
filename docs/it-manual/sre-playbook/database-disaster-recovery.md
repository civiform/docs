# Database Disaster Recovery

CiviForm's production database is backed up daily, with snapshot names prefixed with the value set by `POSTGRES_RESTORE_SNAPSHOT_IDENTIFIER`. By default they are retained for 7 days, which can be configured by`POSTGRES_BACKUP_RETENTION_DAYS`.

## Making a full backup and restore of the database

As part of your backup strategy, you may want to dump the contents of the database outside of AWS in case something happens to your AWS account. There are a couple ways to do this.

{% hint style="danger" %}
The backup procedures listed here will create a dump of the entire database, including personally identifiable information. Ensure you take the utmost care in handling this data and store it in a secure location. Additionally, the restore procedures will overwrite the entire database with the contents of the dump file, including all applicant data. Ensure this is really what you want to do before proceeding.
{% endhint %}

### Option 1: Use the pgadmin UI

#### Backup

1. Follow the instructions to [access the database via pgadmin](https://docs.civiform.us/it-manual/sre-playbook/production-database-access#access-the-database-for-emergency-repair).
2. Right click the `postgres` database and choose `Backup`.

![pgadmin-backup](../assets/pgadmin-backup.png)

3. Pick any file name. All of the options can be left as default. If you'd like to only download some of the data, you can select which tables to download in the `Objects` tab. Note that this saves the file locally inside the pgadmin container.

![pgadmin-backup-filename](../assets/pgadmin-backup-filename.png)

4. When complete, in the top menu bar, click `Tools -> Storage Manager`.

![pgadmin-tools-storagemanager](../assets/pgadmin-tools-storagemanager.png)

5. Choose the file you just created, then click the download button.

![pgadmin-download-file](../assets/pgadmin-download-file.png)

6. Save this file in a secure location.

#### Restore

1. If your backup file is larger than 50MB, go to `File -> Preferences -> Storage -> Options` and change the maximum file upload size appropriately.

![pgadmin-filesize](../assets/pgadmin-filesize.png)

2. In the top menu bar, click `Tools -> Storage Manager`.

![pgadmin-tools-storagemanager](../assets/pgadmin-tools-storagemanager.png)

3. Click the `Options` button and choose `Upload`, then upload your backup file.

![pgadmin-upload-file](../assets/pgadmin-upload-file.png)

4. Right click the `postgres` database and choose `Restore`.

![pgadmin-restore](../assets/pgadmin-restore.png)

5. Under Filename, choose the file you just uploaded. In the Query Options tab, select `Clean before restore`. Then click `Restore`.

![pgadmin-clean-before-restore](../assets/pgadmin-clean-before-restore.png)

6. Inspect the tables under `postgres -> Schemas -> Tables` to verify the data was restored properly.

### Option 2: Use the `dumpdb` and `restoredb` commands

This option utilizes the CiviForm Terraform-based deployment system. It will create a temporary EC2 host with access to the database, install the PostgreSQL client, run pg_dump or pg_restore, and then clean up the resources. These commands require the `ssh`, `ssh-keygen`, and `scp` binaries to be available on your system.

#### Backup
1. From your clone of the `civiform-deploy` repo, run `bin/run`.
2. Enter the `dumpdb` command and follow the prompts.

#### Restore
1. From your clone of the `civiform-deploy` repo, run `bin/run`.
2. Enter the `restoredb` command and follow the prompts.

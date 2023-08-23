Note: Our support for deploying with Azure is currently on pause. This page contains information related to supporting Azure that we want to keep around for when we resume support.


From `terraform-deploy-system.md`:

#### Azure

1. `cd checkout`
2. `cloud/azure/bin/db-connection -g sgdev -d civiform-artistic-halibut -v sgdev-civiform-kv`

### Restore data to the database from a dump file (only Azure)

1. If on WSL, figure out what the location of the dump file is (possibly `/mnt/c/..`)
2. `cd checkout`
3. `cloud/azure/bin/pg-restore -g sgdev -d civiform-artistic-halibut -v sgdev-civiform-kv -f /mnt/c/pg\_dump.dump -b testData.dump`

### Clear data from the database (only Azure)
1. `cd checkout `
2. From checkout directory run `cloud/azure/bin/db-connection -d <database_name> -g <resource_group> -v <keyvault>`
Note that the database_name does not include the .postgres.database 
3. Wait for the application to say you can run sql (try running `\dt` to make sure you can see the data) 
4. Run the following commands (has to be in order)
```
DELETE FROM applications;
DELETE FROM applicants;
DELETE FROM accounts;
DELETE FROM programs;
DELETE FROM questions;
DELETE FROM ti_organizations;
DELETE FROM versions;
DELETE FROM versions_programs;
DELETE FROM versions_questions;
```
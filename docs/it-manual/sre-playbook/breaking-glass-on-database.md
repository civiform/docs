# Breaking Glass on Database

Breaking glass on the production or staging database is a way to save production or staging outages if something extreme happens that cannot be patched with software patches. Staging is the wild-west, so we can just `curl -X POST http://staging.seattle.civiform.com/dev/seed/clear` if we need to truncate all of the tables in staging.

## Getting to the Database on an AWS Instance

To break glass,

1. Sign into the AWS management console and open up cloudshell ![Windows task manager virtualization check](https://drive.google.com/uc?id=1I7pWoud4cm-oB7KBZGsuxtcMTv\_dkWLe)
2. In cloudshell, clone civiform: `git clone https://github.com/seattle-uat/civiform.git`
3. In cloudshell, run civiform's `bin/breakglass-db-access prod` script to break glass into prod. Or just `bin/breakglass-db-access` to break glass into staging. The `breakglass-db-access` script puts you directly in psql shell connected to the production or staging environment.
4. Make sure to exit out of the postgresql shell by running `\q` or pressing `ctrl + d` to terminate the ec2 instance and delete the emergency DB security group, or you may need to manually clean things up afterwards.
5. To manually clean up any instances, go to EC2 console and terminate any remaining instances and delete any keys. ![AWS EC2 console page](https://drive.google.com/uc?id=1-ds\_7olRTfrHRxSDsl1XjNNxoKawcbK9)

## Getting to the Database on an Azure Instance

TODO

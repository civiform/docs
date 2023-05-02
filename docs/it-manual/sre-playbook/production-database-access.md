# Production database access

The CiviForm deployment system provides a mechanism for temporary and secure direct access to the production database via the [pgadmin tool](https://www.pgadmin.org/). This can be useful when investigating and/or remediating production incidents.

**When accessing the database in this way, it is strongly recommended to do so on a trusted device and network
or a cloud CLI tool such as [AWS CloudShell](https://aws.amazon.com/cloudshell/).
Furthemore, do not interrupt the script while it is running (ctrl-c) as this may prevent it from revoking the temporary security settings allowing connections from the public internet.**

To provide access to the production database, the access script creates a temporory node running pgadmin a random username and password in the CiviForm VPC with temporary network security settings allowing it to connect to the production database. It also adds network security settings allowing connections from an IP-allowlist from the public internet. With the access script running, a user must make requests from an allow-listed IP and enter
the username and password to access the database.

Once you are done accessing the database, continue execution of the script to allow it to remove the temporary security settings that allowed you access to the database.

## Running the access script

From your CiviForm deployment repo:

1. Run `./bin/run`
1. When prompted for a command to run, enter `pgadmin`
1. The script will attempt to detect your IP address and suggest an IP-allowlist containing it. If the web browser you will use to access pgadmin is on a different machine than the one running the script (e.g. because you are using cloudshell), add the CIDR mask for the IP address of local network instead. (Follow on-screen instructions for this).
1. Wait for the pgadmin instance to become available
1. Once it is available, visit the URL printed by the script and login with the credentials provided by the script.
1. After you are finished accessing the database, press enter to allow the script to clean up pgadmin.

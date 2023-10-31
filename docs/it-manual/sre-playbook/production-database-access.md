# Production database access

We support on-demand deployment of the [pgadmin](https://www.pgadmin.org/) web UI to temporarily access the CiviForm database. We require explicit IP allow-listing via a list of CIDR blocks. Only these IPs will be able to access pgadmin. The public IP of the host running the web browser used to access the pgadmin web UI (like your work laptop/desktop) must be covered by a block in the list. This can be useful when investigating and/or remediating production incidents.

**When accessing the database in this way, it is strongly recommended to do so on a trusted network and device.
Furthermore, do not interrupt the script while it is running (ctrl-c) as this may prevent it from revoking the temporary security settings allowing connections from the public internet.**

## How it works

To provide access to the production database, the access script creates a temporary node running pgadmin along with a random username and password in the CiviForm VPC and temporary network security settings allowing it to connect to the production database. It also adds network security settings allowing connections from an IP-allowlist from the public internet. With the access script running, you must make requests from an allow-listed IP and enter
the username and password to access the database.

### Access the database for emergency repair

#### AWS

To detect the public IP of a host running a web browser, visit https://checkip.amazonaws.com.

1. Run `./bin/run`
1. When prompted for a command to run, enter `pgadmin`
1. The deploy tool will auto-detect the public IP of the host it is running on and ask if you would like to add the IP to the allow-list. If you want the deploy tool to wait until pgadmin is available to print out connection information, enter 'y'.
1. Enter in a CIDR block that covers the IP of the host that will access the pgadmin web UI. If the host's IP is '127.0.0.1', enter in '127.0.0.1/32' to allow-list just that IP.
1. Either accept or reject the allow-list. If you previously chose to add the deploy tool's IP to the allow-list, and then reject the list, the deploy tool's IP will not be automatically added to the list again.
1. After accepting a list, Terraform will run to bring up the pgadmin resources. When it asks "Do you want to perform these actions?", enter "yes".
1. The deploy tool will attempt to connect to pgadmin every 10 seconds. When a connection is successful, the pgadmin URL and authentication information will be printed. Press Ctrl-c to shortcut this wait.
1. Open the pgadmin URL. Log in using the 'login email' and 'login password' printed by the deploy tool.
1. Expand the 'CiviForm (1)' item in the left navigation pane. You should be prompted to enter in the password to the database. Enter in the 'database password' printed by the deploy tool.
1. Expand the 'Databases (2)' item under the 'CiviForm (1)' item.
1. The 'postgres' item under the 'Databases (2)' item is the CiviForm database. Right click on the 'postgres' item and select 'Query Tool' to send commands to the database.
1. After you are finished accessing the database, press enter to allow the script to clean up pgadmin.

### Saving files within pgadmin

WARNING: The pgadmin tool has the ability to save queries. Do NOT save files within the tool. When pgadmin is shutdown it will permanently remove the files. If you need to save a query, copy and paste it into a file on your computer.

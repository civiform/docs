# How to become a CiviForm Admin

CiviForm Admins are controlled by an external ADFS group. When a person logs in as admin using ADFS flow - CiviForm checks if the user belongs to the ADFS admin group. If they do - the user gets CiviForm Admin access. 

CiviForm admins can assign programs to Program Admins. More about that in [How to become a Program Admin](../program-admin-guide/how-to-become-a-program-admin.md).

ADFS group used for CiviForm admin membership check is specified using `ADFS_GLOBAL_ADMIN_GROUP` variable. More about admin authentication setup in [Authentication Providers guide](../../contributor-guide/developer-guide/authentication-providers.md).
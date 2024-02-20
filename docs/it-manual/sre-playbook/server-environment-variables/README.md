# CiviForm server environment variables

The CiviForm server is configurable through environment variables. All
availabile variables are documented in a
[env-var-docs.json](https://github.com/civiform/civiform/blob/main/server/conf/env-var-docs.json)
file in the civiform/civiform repository.

When a CiviForm server version is released, the env-var-docs.json file
corresponding to the release is used to generate markdown documentation of the
variables. The generated markdown files are added to this directoy. Use the
left sidebar to see the available configuration variables for the CiviForm
version you are deploying.

Variables can have four different modes which determine where they are set and displayed:
1. Admin writeable variables should be set in the admin settings panel which is accessible in CiviForm when logged in as an admin. These variables should NOT be set in your deployment config and setting them there will have no affect on the app.
2. Admin readable variables should be set in your deployment config file. The values for these variables can be seen in the admin settings panel, but not changed there.
3. Server setting variables should be set in your deployment config file and are not visible in the admin settings panel.
4. Managed secret variables should be set in your cloud provider's secrets manager. These are not visible in the admin settings panel.

A variable's mode is listed in between the variable name and its description in the generated documentation in this directory.

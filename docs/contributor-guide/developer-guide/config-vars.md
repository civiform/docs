# Server configuration variables

Many aspects of CiviForm are controlled by *configuration variables*. Examples include the domain name of the CiviForm server, the software version to deploy, settings for authentication, and locations of resources such as logos.

This document describes how these varaiables are managed in various locations in the system.

## application.conf

For a configuration variable to be available to the server, it must be included in [`application.conf`](https://github.com/civiform/civiform/blob/main/server/conf/application.conf) (or one of its included files). The variables names are in snake case; variables may be grouped together by prefixing related variables with a group name. Arbitrary nesting of group names is supported. Example:

```
## AWS
aws.region=us-west-2
aws.s3.bucket=civiform-local-s3
aws.s3.filelimitmb=100
```

The examples above demonstrate hard-coded variables. Often, the files contain a hard-coded *default* value, followed by an optional override, if the specified environment variable is set:

```
aws.region=us-west-2
aws.region=${?AWS_REGION}
```

The file format is [HOCON](https://www.playframework.com/documentation/2.8.x/ConfigFile).

## Accessing config varaiables

Enviroment variable overrides for config variables should be registered in [`env-var-docs.json`](https://github.com/civiform/civiform/blob/main/server/conf/env-var-docs.json). The registered name (in [screaming snake case](https://en.wiktionary.org/wiki/screaming_snake_case)) should be the environment variable used in the `conf` file. When new variables are added, we programatically update the generated [SettingsManifest](https://github.com/civiform/civiform/blob/main/server/app/services/settings/SettingsManifest.java) class that provides accessor methods. Developers should consume all config variables through this class. Some existing code may interact directly with the `com.typesafe.config.Config` class, but the `SettingsManifest` should be used for new code.

The variables in `env-var-docs.json` are also used to generate Markdown documentation and to populate the administrator Settings panel in the CiviForm UI.

Note that the server reads the values from `application.conf`, while the `SettingsManifest` is derived from the configured environment variables that are dereferenced in that file. This implies a tight (but unenforced) linkage between `application.conf` and `env-var-docs.json`. It is theoretically possible to add a config var to `env-var-docs.json` without *using* the value in `application.conf`, which would result in confusion. Furthermore, if a variable in `application.conf` does not have an overriding environment variable, then no accessor will be available from `SettingsManifest` and direct access to the `Config` object is required to retrieve the value (see [example](https://github.com/civiform/civiform/blob/b4d2a0c3e2b5f3d1244611afdf5ed81bd670a609/server/app/modules/EsriModule.java#L33) of fetching from `Config`).

{% note %}

**Note:** The `SettingsManifest` is generated/updated by either of the following steps:
* Executing `bin/generate-settings-manifest`.
* Executing `bin/fmt`, which invokes the command above.

The related Markdown documentation is updated through the GitHub action [Env Variable Docs - Generate](https://github.com/civiform/civiform/actions/workflows/generate_env_var_docs_markdown_for_release.yaml), which is invoked by the [Create Release Workflow](https://github.com/civiform/civiform/actions/workflows/release.yaml).

{% endnote %}

## Setting values for deployments

Deployments may override default values in their `civiform_config.sh` file. An example file is available [here](https://github.com/civiform/civiform-deploy/blob/main/civiform_config.example.sh).

## Settings affecting deployment

TODO. (The general idea is that variables must be provisioned in Terraform files in the `cloud-deploy-infra` repo.)

## docker-compose.yml

Since servers run locally do not have an associated `civiform_config.sh` file, values for config variables may be specified in `environment` section of the `civiform-dev` image in [`docker-compose.yml`](https://github.com/civiform/civiform/blob/fa7166b05ba146bccf41b107b457d277df283530/docker-compose.yml#L63) or [`docker-compose.dev.yml`](https://github.com/civiform/civiform/blob/main/docker-compose.dev.yml). The values from the latter override those from the former when executing `bin/run-dev`.

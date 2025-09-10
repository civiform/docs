# Upgrading to a New Release

The CiviForm core team [distributes new versions of the system](https://github.com/civiform/civiform/releases) every other week on Tuesdays or Wednesdays. We strongly recommend deployments stay up to date with the latest version to benefit from security patches, bug fixes, and new features.

Each release is published using [GitHub releases](https://github.com/civiform/civiform/releases) with a corresponding server Docker image uploaded to [civiform/civiform on Docker Hub](https://hub.docker.com/repository/docker/civiform/civiform) and tagged with the release number.

**Be sure to review the release notes on GitHub for each new release before deploying it.**

Release notes include:

- Description of fixed bugs and security vulnerabilities
- Description of new features
- Database schema changes
- Other stateful changes (such as stored file key name schema)
- API version changes and deprecation notices
- New configuration values
- Infrastructure changes
- Dependency changes (for the server only) including new, removed, and version updates

New releases are also announced on [civiform-announce@googlegroups.com](https://groups.google.com/g/civiform-announce)

## Version numbers

Version numbers take the form `v<major>.<minor>.<patch>`. Generally, we will always increment the minor version with each release and set the patch version to 0. If we do an unscheduled release in order to fix a bug, we'll increment the patch version. The major version will only increment if the release includes changes that require great care when deploying or includes signficant changes to the way CiviForm works.

### Major version

A new major version indicates major feature or functionality changes that could be disruptive to users or administrators of the system without preparation (i.e. a chance for staff to read documentation or get an overview of new UI).

A new major version must be created if there are any changes that cannot be deployed by simply updating the server image, but also require manual technical staff effort from downstream deployments to incorporate. Examples of this kind of effort include altering deployment infrastructure, moving to a new major PostgreSQL version, etc. In general, the CiviForm core team seeks to minimize effort needed by downstream maintainers to perform version upgrades. A new major version may also be created when there are signficant changes to CiviForm functionality or appearance.

Admins should ensure they have database backups before applying a new major change.

### Minor version

A new minor version indicates feature or functionality changes that enable new capabilities in the system or fix existing ones, but are unlikely to be disruptive and do not require signficant preparation. Examples of such changes include new features, new APIs or API versions, new configuration parameters, and new resources in the system.

A new minor version may also indicate changes in the database schema, file key naming schema, or other stateful parts of the application. New minor versions should be deployable by simply updating the server image (the Play Framework evolutions system should update the database schema automatically).

Admins should ensure they have database backups before applying a new minor change.

### Patch version

A new patch version indicates a bug fix to the previous release that was serious enough to require an unscheduled release. Patch versions should generally be taken up as soon as possible, but if the bug fixed does not apply to your environment, waiting until the next release may be viable.

Feature flags are a mechanism to customize or hide behavior until enabled
explicitly.

The FeatureFlag system is built on the environment `Config` system and adds
features such as

1.  Cleaner, less error-prone code.
1.  Manual overrides in non prod environments.
1.  Ability to write browser tests.

Currently we only have boolean flags, but others could be added as
necessary.

The generated
[`SettingsManifest`](https://sourcegraph.com/github.com/civiform/civiform/-/blob/server/app/services/settings/SettingsManifest.java)
class provides readable accessors for environment variables. When a `Request`
object is provided it allows for manual overrides.

## Uses

Feature flags can be used to control features that will always be configuration-controlled, such as if Global Admins are also Program Admins. The code, tests, and configuration will always be present in CiviForm.

Feature flags can also be used as launch gating controls for features that can't be done in a single PR, or features that require additional testing before being enabled by default.  This allows you to safely do incremental development while your code is being shipped weekly in releases, and then to "launch" it when the code is complete and validated.

## Releasing a Feature Behind a Feature Flag

The following process should be used to implement a feature flag, release it in a build, and then remove it once the feature has been used in production.

1. Create a Github issue using the Feature Flag template that covers the creation and deletion of the feature flag that will guard your feature. Ensure it is tied to the appropriate epic so that the issue must be completed before the epic is considered complete.
2. Create the feature flag in code (see "Adding a new flag" below) and update the issue to mention that the feature flag now exists. Enable the feature flag in [dev](https://github.com/civiform/civiform/blob/main/server/conf/application.dev.conf). Disable the flag for [browser tests](https://github.com/civiform/civiform/blob/main/server/conf/application.dev-browser-tests.conf), since the browser tests will turn the flag on and off inside the tests themselves.  For the PR that adds the flag, ensure the release notes section describes what this flag is for.
3. Write your feature and guard it with the flag.
4. Pass the flag through the deployment system to allow enabling it in staging ([example](https://github.com/civiform/cloud-deploy-infra/commit/9d17356ff1fa1f3a16c97608cc00cbd4c7c11ffe)). Soon, this will not be necessary as we will be automatically passing flags through the deployment system.
5. When the next release is created, ensure information about the release flag is in the email sent for the release.
6. Enable the flag in AWS staging and Azure staging and ask Seattle engineers to enable the flag in their staging environment.
7. Optional (depending on the complexity of your feature): Organize a bug bash where team members try to break your feature
8. Send a message to Matthew Sprenke in the #release-discussion channel on CiviForm Slack to check if Seattle wants to do some manual QA.
9. Set the default value of the flag to `true` to make it default enabled (e.g. [changing this to true](https://sourcegraph.com/github.com/civiform/civiform/-/blob/server/conf/helper/feature-flags.conf?L27)). In the PR, include release notes, which mention that the specific feature flag's default value was changed and what feature it enables. Update the feature flag Github issue to note when the default was changed. Assign the issue to yourself or someone who will be around in the future.
10. Ensure that the feature is enabled in an actual production build, because each deployment can choose to enable or disable the flags of their choosing (often the easiest deployment to use will be in Seattle) and note the date when it was enabled in the Github issue.
11. Leave the flag in the codebase for at least another month after it went live in production (e.g. Seattle).
12. Remove the flag, remove the guards in the code looking for the flag, note in the PR release notes that the flag is being removed, then close the Github issue. Ensure the email sent for the next release includes a note about the removal of the feature flag.


### Adding a new flag

1.  Add the flag to the `"Feature Flags"` section of [server/conf/env-var-docs.json](https://sourcegraph.com/github.com/civiform/civiform/-/blob/server/conf/env-var-docs.json). 
1.  Run `bin/fmt` to regenerated `SettingsManifest.java`
1.  Inject `SettingsManifest` where you want to consume the flag
1.  Call the generated method on `SettingsManifest` that matches the name of your flag. For example, a flag named `MAGIC_SHOE_ENABLED` will have generated getter methods named `getMagicShoeEnabled`. Unless infeasible, use the version of the method that takes a `play.mvc.Http.Request` argument so that the flag can be overridden in non-prod environments.
2.  If you add browser tests related to your feature, add the feature flag to our [AWS Staging config](https://github.com/civiform/civiform-staging-deploy/blob/150009d20aad95d607db67413a9589d42d7f8dfc/aws_staging_civiform_config.sh#L215) to prevent tests from failing when the staging prober tests run.
1.  If you'd like for your flag to be able to be overriden via environment variables for a deployment, pass the flag through the deployment system. See [this pull request](https://github.com/civiform/cloud-deploy-infra/pull/145) as an example.

## Manual overrides

Overrides are meant for evaluation and development purposes and not production usage.

They and are done through the browser and apply to the current user session only.

### Enable


To enable the ability to override all the following must be true:

1.  Enable `feature_flag_overrides_enabled` in the environment configuration.
2.  Use a dev or staging server.
3.  Are a Global or Program admin.

### Access

Boolean flags can be enabled or disabled via url and persist for the browser
session.

*   `/dev/feature/feature_flag_name/enable`
*   `/dev/feature/feature_flag_name/disable`

For example: `/dev/feature/application_status_tracking_enabled/enable` enables
the status tracking feature for the current user.

The current state of Overrides can be viewed at `/dev/feature`

## Testing

### Junit

There are two ways to test Feature Flag conditioned code.

#### Change the Config value

Create an instance of `SettingsManifest` and pass it a `Config` object with
the hocon name (i.e. lower `snake_case`) of the feature flag set to "true".

Note this will require manually injecting all its other dependencies via
instanceOf().

#### Request config

Use the override functionality of FeatureFlags and set the session data of your
fake requests.

`Helpers.fakeRequest().session("APPLICATION_STATUS_TRACKING_ENABLED", "false")`

### Browser

Browser tests use the url override mechanism, which means the feature
implementation must also use the http `Request` for any paths that you test.

This can be done by using the `enableFeatureFlag(page, flagName)` method in
[`index.ts`](https://sourcegraph.com/github.com/civiform/civiform/-/blob/browser-test/src/support/index.ts?L396:20&subtree=true)
in your tests.

## Probers

Browser tests are overloaded in their usage and are also used as deployment
"probers" in various environments including CiviForm ran Staging servers as well
Civic Entity ones, this means the default state of feature flags and flagged
code in browser tests can not be assumed and must be explicitly set and managed.

For instance CiviForm staging might enable the feature while Seattle Staging
does not. When you add the flagged java code you may then get different results
in the existing tests until you also update them.

## Best Practices

1. Always guard DB write code, even if a path can't be reached unless upstream guarded code was enabled. 
2. Consider what will happen if your flag is enabled for some time then disabled. Should data views still be accessible? etc.
3. Always test code with your feature off and on, or other variations.  Our dev environments make it easy to only see the bleeding-edge of features, but real users will be seeing the stable released version of your code.



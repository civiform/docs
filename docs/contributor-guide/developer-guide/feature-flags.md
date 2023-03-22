Feature flags are a mechanism to customize or hide behavior until enabled
explicitly.

The FeatureFlag system is built on the environment `Config` system and adds
features such as

1.  Cleaner less error-prone code.
1.  Manual overrides in non prod environments.
1.  Ability to write browser tests.

Currently we only have boolean flags/support but others could be added as
necessary.

## Uses

Feature flags can be used to control features that will always be configuration controled such as if Global Admins are also Program Admins. The code, tests and configuration will always be present in CiviForm.

Feature flags can also be used as launch gating controls for features that can't be done in a single PR.  This allows you to safely do incremental development while your code is being shipped weekly in releases.  And then to "launch" it when all is done.


## Using

The
[`FeatureFlags`](https://sourcegraph.com/github.com/civiform/civiform/-/blob/server/app/featureflags/FeatureFlags.java?subtree=true)
class provides readable accessors for environment variables and when a `Request`
object is provided it allows for manual overrides.

To add a new flag:

1.  Add a new enum to [`FeatureFlag.java`](https://github.com/civiform/civiform/blob/main/server/app/featureflags/FeatureFlag.java).
1.  Add the Config value to [`feature-flags.conf`](https://github.com/civiform/civiform/blob/main/server/conf/helper/feature-flags.conf).
1.  Inject `FeatureFlags` into client classes.
1.  Call `FeatureFlags::getFlagEnabled`](https://github.com/civiform/civiform/blob/183a4d634fa53e7c07975ce3f915f1b8f6a4660a/server/app/featureflags/FeatureFlags.java#L51) to determine whether a flag is enabled.

[Here](https://github.com/civiform/civiform/pull/4435/files) is a simple example of doing all of these.

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

#### Mock

Create a Mock of `FeatureFlags` and create a new instance of the class under
test passing your mock to it. You can then mock the accessor return values as
needed. They're boolean=false by default.

Note this will require manually injecting all its other dependencies via
instanceOf().

Creating providers (for DateTime things) is different and looks like
`Providers.of(LocalDateTime.now(ZoneId.systemDefault())`

#### Request config

Use the override functionality of FeatureFlags and set the session data of your
fake requests.

`Helpers.fakeRequest().session(FeatureFlags.APPLICATION_STATUS_TRACKING_ENABLED,
"false")`

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

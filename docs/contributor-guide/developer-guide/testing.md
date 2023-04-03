# Testing

This guide offers best practices for writing unit and browser tests for
CiviForm, as well as debugging tips and practices.

## What to test

In general, all execution paths in the system should be covered by
[java unit tests](#java-unit-tests)
or [typescript unit tests](#typescript-unit-tests). If you submit code that is
infeasible or impractical to get full test coverage for, consider refactoring.
If you would like to make an exception, include a clear explanation for why in
your PR description.

In contrast, [browser tests](#functional-browser-tests) should cover all major
user-facing features to make sure the system generally works from a user's point
of view, rather than exhaustively test all execution paths.

## Java unit tests

For Java, classes generally have their own unit tests. The unit test file should
mirror the implementation file. For example, `/app/package/path/MyClass.java`
should have a unit test `/test/package/path/MyClassTest.java`.

Tests that require a Play application should either
use `extends play.test.WithApplication`,
or `extends repository.WithPostgresContainer` if a database is required. By
default, using `extends play.test.WithApplication` will produce an application
with a binding to an in-memory postgres database that is incompatible with
everything and is pretty much useless.

To run the unit tests (includes all tests under
[`test/`](https://github.com/civiform/civiform/tree/main/server/test)), run the
following:

```
bin/run-test
```

If you'd like to run a specific test or set of tests, and/or save sbt startup
time each time you run the test(s), use these steps:

1.  Bring up an sbt shell inside the Docker container by running:
    ```
    bin/sbt-test
    ```
1.  Run any sbt commands! For example:
    ```
    testOnly services.question.QuestionDefinitionTest
    ```

### Attaching a debugger to unit tests

When running an individual unit test via `bin/sbt-test`, a debugger can be
attached. In order to support this, JVM forking must be disabled since the
debugger needs a well-known port to attach to. Within `build.sbt`, uncomment the
following line:

```
Test / fork := false,
```

Then, use your debugger of choice to attach to port `8459` (VSCode workspace
configuration already has a configuration for this).

When attaching, a deadlock can occur if trying to attach too early. Consider
waiting until the log line indicating connection to the database succeeded
before attaching a debugger.

### Controller tests

Controller tests should test the integration of business logic behind each HTTP
endpoint. Most controller tests should likely extend `WithPostgresContainer`
which provides a real database. Controllers should contain very little if any
conditional logic and delegate business logic and network interactions
(database, auth service, file services, etc.) to service classes.

*  Assertions should be on the method's `Result` rather than the rendered HTML.
*  Assertions may also be on the database state after the controller method has
   completed.
*  Controller tests should not rely heavily on mocking.

See
[AdminProgramControllerTest.java ](https://github.com/civiform/civiform/pull/167/files#diff-643f94cff692c6554cd33c8e4c542b9f2bc65b4756bf027a623ce8f203d28677)
for a good example of a controller test. See the
[Play documentation](https://www.playframework.com/documentation/2.8.x/JavaTest#Unit-testing-controllers)
for information on framework-provided testing tools.

### View tests

[`BaseHtmlView`](https://github.com/civiform/civiform/blob/main/server/app/views/BaseHtmlView.java)
provides a number of HTML tag-producing methods, for example
[`Tag submitButton(String textContents)`](https://github.com/civiform/civiform/blob/main/server/app/views/BaseHtmlView.java#L53). 
These methods tend to be fairly simple, with unit tests that are brittle to
small, inconsequential changes. Whether or not to test these types of methods is
at the discretion of the implementer and code reviewer(s).

View classes that render a complete page should not be unit tested, but instead
should have corresponding [browser test(s)](#functional-browser-tests) that
assert the key interactions for a user on that page.

Question type rendering and client-side logic deserves a special mention since
they can have complex interaction logic. These should be unit tested in
isolation, in browser test(s).

## TypeScript unit tests

For TypeScript code in `server` directory each file should generally have
corresponding unit test file. The unit test file should be placed in the same
directory as implementation file use pattern `<impl>.test.ts`.

Unit tests use [Jest](https://jestjs.io/docs/api) test runner.

Unit tests are run using Node.js. By default, Node.js doesn't provide browser
APIs such as DOM (document, querySelector, etc). At the same time client-side
typescript code being tested assumes that it is executed in browser environment
and assumes standard browser APIs are available. To workaround this issue we
use [jsdom environment](https://jestjs.io/docs/configuration#testenvironment-string)
in Jest. It adds a fake implementation of main browser APIs. Developers should
keep that in mind as fake implementations will differ from actual browser API
implementations in certain cases and don't support all browser APIs.

To run the unit tests (includes tests under [app/assets/javascripts](https://github.com/civiform/civiform/tree/main/server/app/assets/javascripts)), run the following:

```
bin/run-ts-tests
```

If you'd like to run a specific test or set of tests, run the following:

```
bin/run-ts-tests file1.test.ts file2.test.ts
```

## Functional browser tests

Functional browser tests use the [Playwright](https://playwright.dev) browser
automation TypeScript library with the [Jest](https://jestjs.io/) test runner.
The code for those tests lives in the
[browser-test/](https://github.com/civiform/civiform/tree/main/browser-test)
subdirectory.

Browser tests run against an application stack that is very similar to the local
development stack. The test stack has its own application server, postgres
database, and fake IDCS server that all run in Docker, separate from the test
code. The test stack is intended to stay up between test runs to reduce the
iteration time for running the tests while developing.

To run the tests:

1.  Build the Docker image for running the playwright tests. This only needs to
    be done once:
    ```
    bin/build-browser-tests
    ```
1.  Bring up the local test environment with the AWS emulator. This step can be
    done in a separate terminal window while the Docker image is still building.

    Leave this running while you are working for faster browser test runs:
    ```
    bin/run-browser-test-env
    ```
    
    **TIP**: the server is accessible manually at http://localhost:9999.
    
    To run browser tests with the Azure browser test environment, using Azurite
    (the Azure emnulator) instead of the AWS emulator, run:
    ```
    bin/run-browser-test-env -–azure
    ```
    This runs the tests using Azurite, the Azure emulator. Because the Azure
    deployment of Civiform requires SES, the AWS email sending service, we also
    have to start Localstack, the AWS emulator, when running the Azure browser
    tests.

1.  Once you see "Server started" in the terminal from the above step, in a
    separate terminal run the Playwright tests in a docker container:
    ```
    bin/run-browser-tests
    ```
    Or, to run a test in a specific file, pass the file path relative to the
    `browser-test/src` directory. For example:
    ```
    bin/run-browser-tests landing_page.test.ts
    ```
    Use the `--debug` flag to print debug logs as the test runs.
    
    
<b>TIP:</b> To speed up the running of tests beyond selecting a specific test file,
you can focus the run to only execute a single it test or describe suite per file 
by prefixing it with f (fit and fdescribe). 
For example, open the test file and find the line that begins with "it". 
```
it("", async => {})   replace with    fit("", async => {})
```


### Guidelines for functional browser tests

In contrast to unit tests, browser tests should not attempt to exhaustively test
all code paths and states possible for the system under test. Browser tests
should:

-  be fewer and larger, covering major features of the application
-  only create state in the database by interacting with the UI (e.g. when
   testing the applicant experience for answering of a certain type, first
   login as an admin, create a question and a program with that question)
-  encapsulate UI interaction details into
   [page object classes](https://playwright.dev/docs/pom/)
-  as much as is practical navigate using the UI and not by directly referencing
   URL paths

Screenshot diff tests should cover every question type, and should cover every
page of the admin and applicant flow. See the
[screenshot diffing section](#screenshot-diffing) for more details.

Accessibility (a11y) testing also needs to happen at the browser test level,
since it checks the final generated HTML for a11y violations. All applicant
facing features should be covered by an a11y test check. See the
[accessibility test section](#axe-accessibility-tests) for more details.


#### Browser test reliability

Browser tests can be flaky if they trigger actions on the page and don't wait
for Civiform javascript event handlers to complete before triggering subsequent
actions or validating page contents. Some examples of where this can happen:

-  **Page initialization**: Civiform typically attaches javascript event handlers
   after pages load. Tests must therefore wait for pages to be ready after
   initial page load or any page navigation (whether triggered by anchor link
   clicks, form submissions, or js event handlers). To accomplish this, main.ts
   and modal.ts set data attributes on the html <body> tag when they are done
   running, and the browser test function `waitForPageJsLoad` can be used to wait
   for these attributes to be set. In general, stay very aware of when page
   navigations are happening to maintain correctness.
-  **DOM modification**: Civiform sometimes uses javascript to show/hide DOM
   elements like modal dialogs, or makes copies of hidden templates (e.g., to
   populate radio/checkbox option lists). Browser tests can use element selectors
   to block on these manipulations finishing, but selectors must be specific
   enough to differentiate (e.g., waiting for a specific matching element index
   to appear, instead of targeting the last match). For typical civiform modal
   dialogs, `clickAndWaitForModal` may be helpful.
-  **Input validation**: Civiform javascript input validators sometimes modify
   the DOM (e.g., making sure text has been changed before enabling a submit
   button). Browser tests can use specific selectors to have playwright wait for
   input validation to complete (e.g., specifying an *enabled* button to click
   instead of just specifying the button).

#### Screenshot diffing

Screenshot tests are implemented with
[jest-image-snapshot](https://github.com/americanexpress/jest-image-snapshot).
To add a screenshot test, simply
call: `await validateScreenshot(page, 'name-of-image')`

New screenshots are saved automatically to a subdirectory in
.../image_snapshots/ with the test file name. If a screenshot diff is found, an
image showing the diff will be saved to .../diff_output/. To accept the diff as
expected and update the screenshot, re-run the test with the `-u` flag (e.g.
`bin/run-browser-tests -u some_file.test.ts`).

Note that we've disabled screenshot tests when run locally (e.g. with
`bin/run-browser-tests-local`) to minimize variability. They are enabled when
running with the usual command via docker (`bin/run-browser-tests`).

When run as a GitHub action, screenshot diff images will be uploaded on test
failure. These are available in the Artifacts section of the Summary tab on the
GitHub action run.

#### De-randomizing

Timestamp/Dates and applicant IDs will change each time a test is run, to
automatically normalize these, UI elements that contain them need to have the
[`ReferenceClasses`](https://sourcegraph.com/github.com/civiform/civiform/-/blob/server/app/views/style/ReferenceClasses.java?L133&subtree=true)
`BT_DATE`, `BT_APPLICATION_ID` and a few others classes added respectively.
Check the [normalizeElements](https://sourcegraph.com/search?q=context:global+repo:%5Egithub%5C.com/civiform/civiform%24+normalizeElements&patternType=standard&sm=1)
function for an up-to-date list of elements and update if necessary.

#### Axe accessibility tests

Accessibility tests are run at the browser test level on the final generated
HTML page, using [axe](https://github.com/dequelabs/axe-core). You can run an
accessibility test on a page simply by
calling: `await validateAccessibility(page)`

If the accessibility test fails, the error message will output the
AxeResults.violations array. See
[API docs](https://www.deque.com/axe/core-documentation/api-documentation/#results-object)
for more info. The violation will include a `helpUrl` with a link of suggestions
to fix the accessibility problem, and will include a snippet of the problematic
`html`. Running the tests locally with [debug mode](#debug-mode) is particularly
helpful here since you can manually inspect the html.

#### Debugging browser tests

Please see the [Playwright debug docs](https://playwright.dev/docs/debug) for a
lot more info on this topic.

Set the env var `RECORD_VIDEO=1` to tell playwright to record a video of the test run. 
Videos are available in `browser-tests/tmp/videos` after the test run completes.

#### Local debug mode

You can step through a test run line-by-line with a visible browser window by
running the tests locally (i.e. not in Docker) with debug mode turned on.

Note: These instructions [need some work](https://github.com/civiform/civiform/issues/3058)

You will need to start the browser test environment by running:
```
bin/run-browser-test-env --local
```
Because this exposes port 3390 for the oidc-provider container, this can not be run concurrently with `bin/run-dev`.

To run them in debug mode with the open browser add the `PWDEBUG` environment
variable:

```
PWDEBUG=1 bin/run-browser-tests-local
```

You can find more documentation on debugging Playwright in this [BrowserStack guide](https://www.browserstack.com/guide/playwright-debugging).

#### Debugging failed GitHub actions

On failure, a test video of the browser test will be uploaded to the Artifacts
section of the Summary tab on the GitHub action run.

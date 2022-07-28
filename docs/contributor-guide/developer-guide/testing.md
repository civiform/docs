# Testing
This guide offers best practices for writing unit and browser tests for CiviForm, as well as debugging tips and practices.

## What to test

In general, all execution paths in the system should be covered by [unit tests](#unit-tests). If you submit code that is infeasible or impractical to get full test coverage for, consider refactoring. If you would like to make an exception, include a clear explanation for why in your PR description.

In contrast, [browser tests](#functional-browser-tests) should cover all major user-facing features to make sure the system generally works from a user's point of view, rather than exhaustively test all execution paths.

## Unit tests

For Java, classes generally have their own unit tests. The unit test file should mirror the implementation file. For example, `/app/package/path/MyClass.java` should have a unit test `/test/package/path/MyClassTest.java`.

Tests that require a Play application should either use `extends play.test.WithApplication`, or `extends repository.WithPostgresContainer` if a database is required. By default, using `extends play.test.WithApplication` will produce an application with a binding to an in-memory postgres database that is incompatible with everything and is pretty much useless.

To run the unit tests (includes all tests under [`test/`](https://github.com/civiform/civiform/tree/main/server/test)), run the following:

```
bin/run-test
```

If you'd like to run a specific test or set of tests, and/or save sbt startup time each time you run the test(s), use these steps:

1. Bring up an sbt shell inside the Docker container by running:

       bin/sbt-test

1. Run any sbt commands! For example:

       testOnly services.question.QuestionDefinitionTest

### Controller tests

Controller tests should test the integration of business logic behind each HTTP endpoint. Most controller tests should likely extend `WithPostgresContainer` which provides a real database. Controllers should contain very little if any conditional logic and delegate business logic and network interactions (database, auth service, file services, etc.) to service classes.

* Assertions should be on the method's `Result` rather than the rendered HTML.
* Assertions may also be on the database state after the controller method has completed.
* Controller tests should not rely heavily on mocking.

See [AdminProgramControllerTest.java ](https://github.com/civiform/civiform/pull/167/files#diff-643f94cff692c6554cd33c8e4c542b9f2bc65b4756bf027a623ce8f203d28677) for a good example of a controller test. See the [Play documentation](https://www.playframework.com/documentation/2.8.x/JavaTest#Unit-testing-controllers) for information on framework-provided testing tools.

### View tests

[`BaseHtmlView`](https://github.com/civiform/civiform/blob/main/server/app/views/BaseHtmlView.java) provides a number of HTML tag-producing methods, for example [`Tag submitButton(String textContents)`](https://github.com/civiform/civiform/blob/main/server/app/views/BaseHtmlView.java#L53). These methods tend to be fairly simple, with unit tests that are brittle to small, inconsequential changes. Whether or not to test these types of methods is at the discretion of the implementer and code reviewer(s).

View classes that render a complete page should not be unit tested, but instead should have corresponding [browser test(s)](#functional-browser-tests) that assert the key interactions for a user on that page.

Question type rendering and client-side logic deserves a special mention since they can have complex interaction logic. These should be unit tested in isolation, in browser test(s).

## Functional browser tests

Functional browser tests use the [Playwright](https://playwright.dev) browser automation TypeScript library with the [Jest](https://jestjs.io/) test runner. The code for those tests lives in the [browser-test/](https://github.com/civiform/civiform/tree/main/browser-test) subdirectory.

Browser tests run against an application stack that is very similar to the local development stack. The test stack has its own application server, postgres database, and fake IDCS server that all run in Docker, separate from the test code. The test stack is intended to stay up between test runs to reduce the iteration time for running the tests while developing.

To run the tests:

1. Build the Docker image for running the playwright tests. This only needs to be done once:

       bin/build-browser-tests

1. Bring up the local test environment with the AWS emulator. This step can be done in a separate terminal window while the
   Docker image is still building.

   Leave this running while you are working for faster browser test runs:

       bin/run-browser-test-env
   
   To run browser tests with the Azure browser test environment, using Azurite (the Azure emnulator) instead of the AWS emulator, run:

       bin/run-browser-test-env -–azure

   This runs the tests using Azurite, the Azure emulator. Because the Azure deployment of Civiform requires SES, the AWS email sending service, we also have to start Localstack, the AWS emulator, when running the Azure browser tests. 

 

1. Once you see "Server started" in the terminal from the above step, in a separate terminal run the
   Playwright tests in a docker container:

       bin/run-browser-tests

   Or, to run a test in a specific file, pass the file path relative to the `browser-test/src` directory. For example:

       bin/run-browser-tests landing_page.test.ts

   Use the `--debug` flag to print debug logs as the test runs.

### Guidelines for functional browser tests

In contrast to unit tests, browser tests should not attempt to exhaustively test all code paths and states possible for the system under test. Browser tests should:

- be fewer and larger, covering major features of the application
- only create state in the database by interacting with the UI (e.g. when testing the applicant experience for answering of a certain type, first login as an admin, create a question and a program with that question)
- encapsulate UI interaction details into [page object classes](https://playwright.dev/docs/pom/)
- as much as is practical navigate using the UI and not by directly referencing URL paths

Accessibility (a11y) testing also needs to happen at the browser test level, since it checks the final generated HTML for a11y violations. All applicant facing features should be covered by an a11y test check. See the [accessibility test section](#axe-accessibility-tests) for more details.


#### Browser test reliability

Browser tests can be flaky if they trigger actions on the page and don't wait for Civiform javascript event handlers to complete
before triggering subsequent actions or validating page contents. Some examples of where this can happen:

- **Page initialization**: Civiform typically attaches javascript event handlers after pages load. Tests must therefore wait for pages to be ready after initial page load or any page navigation (whether triggered by anchor link clicks, form submissions, or js event handlers). To accomplish this, main.ts and modal.ts set data attributes on the html <body> tag when they are done running, and the browser test function `waitForPageJsLoad` can be used to wait for these attributes to be set. In general, stay very aware of when page navigations are happening to maintain correctness.
- **DOM modification**: Civiform sometimes uses javascript to show/hide DOM elements like modal dialogs, or makes copies of hidden templates (e.g., to populate radio/checkbox option lists). Browser tests can use element selectors to block on these manipulations finishing, but selectors must be specific enough to differentiate (e.g., waiting for a specific matching element index to appear, instead of targeting the last match). For typical civiform modal dialogs, `clickAndWaitForModal` may be helpful.
- **Input validation**: Civiform javascript input validators sometimes modify the DOM (e.g., making sure text has been changed before enabling a submit button). Browser tests can use specific selectors to have playwright wait for input validation to complete (e.g., specifying an _enabled_ button to click instead of just specifying the button).


#### Formatting browser tests code

We have an auto-formatter for our browser test code. Please run the following command.

```
browser-test/bin/fmt
```

### Debugging browser tests

Please see the [Playwright debug docs](https://playwright.dev/docs/debug) for a lot more info on this topic.

#### Debug mode

You can step through a test run line-by-line with the browser by running the tests locally (i.e. not in Docker) with debug mode turned on.

Before you can run the browser tests locally, you need to do the following:
1. Install node.js.
1. Install [yarn](https://yarnpkg.com/). In most cases, `npm -g install yarn` will do it.
1. Run `yarn install` in the [`browser-test/`](https://github.com/civiform/civiform/tree/main/browser-test) directory.

To run the tests locally, use:

    bin/run-browser-tests-local

To run them in debug mode with the open browser add the `PWDEBUG` environment variable:

    PWDEBUG=1 bin/run-browser-tests-local

#### Screenshots

With both `bin/run-browser-tests` and `bin/run-browser-tests-local` you can take screenshots of the browser during test runs and save them to `browser-test/tmp`. (that directory [is mounted as a volume](https://github.com/civiform/civiform/blob/main/bin/run-browser-tests) in the Docker test container). For example, to take a full-page screenshot and save it in a file called `screenshot.png`:

```typescript
await page.screenshot({ path: 'tmp/screenshot.png', fullPage: true })
```

**Note**: You must prefix the filename with `tmp/`. [More info on taking screenshots with Playwright here](https://playwright.dev/docs/screenshots).

### Axe accessibility tests
       
Accessibility tests are run at the browser test level on the final generated HTML page, using [axe](https://github.com/dequelabs/axe-core). You can run an accessibility test on a page simply by calling:
```typescript
await validateAccessibility(page)
```

If the accessibility test fails, the error message will output the AxeResults.violations array. See [API docs](https://www.deque.com/axe/core-documentation/api-documentation/#results-object) for more info. The violation will include a `helpUrl` with a link of suggestions to fix the accessibility problem, and will include a snippet of the problematic `html`. Running the tests locally with [debug mode](#debug-mode) is particularly helpful here since you can manually inspect the html.

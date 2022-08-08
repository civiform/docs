# Development standards

* [Client-server concerns](development-standards.md#client-server-concerns)
* [Java code](development-standards.md#java-code)
* [Bash scripts](development-standards.md#bash-scripts)
* [Routing and controller methods](development-standards.md#routing-and-controller-methods)

## Client-server concerns

The client should be as simple as is practical to implement the desired user experience.

* Pages should only include the JavaScript needed to implement their own behavior.
* Client-side JavaScript should have no need to manage browser history or derive state from the URL.
* Client-side JavaScript should avoid API-driven interactions, and instead access JSON embedded in the initial page load and submit data using HTML forms.

For example, enable/disable logic in forms can be specified server-side with HTML [data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use\_data\_attributes) then implemented with generic client-side JS that responds to DOM events relevant to the attribute-specified elements. [Here's a simple example](https://jsfiddle.net/c8g6y0ru/1/).

## Server code organization

In lieu of a microservice architecture, this project necessitates special care in ensuring [separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns). **It is strongly recommended that all contributors read the [Play Java documentation](https://www.playframework.com/documentation/2.8.x/Home) prior to attempting major work on the CiviForm server.** While Play provides [some structure](https://www.playframework.com/documentation/2.8.x/Anatomy) for code organization, the CiviForm project has some additional conventions:

Most business logic should be implemented in **service classses** (e.g. [ApplicantService](https://github.com/civiform/civiform/blob/main/server/app/services/applicant/ApplicantService.java)). Service classes should present public methods that are sematically meaningful with regard to CiviForm's domain logic, rather than technically meaningful with regard to their implementation details. Service classes should avoid directly performing database queries or handling HTTP concerns such as response codes and view rendering.

**Play controllers** should be limited to brokering interaction between the server's business logic systems (i.e. service classes) and HTTP. Code in controllers should never directly implement business logic concerns and should instead delegate to classes specific to those purposes. One way to help think about this when writing controller code: if you're writing an HTTP handler that responds with HTML, factor out business logic classes so that implementing another handler that performs the same logic but responds with JSON benefits from high code re-use.

**EBean models** should be limited to brokering interaction between the server's business logic and the database. Code in models should never directly implement business logic concerns.

**Repositories**, such as [QuestionRepository](https://github.com/civiform/civiform/blob/main/server/app/repository/QuestionRepository.java), are the appropriate place for database queries and complex database interactions. This is in contrast to EBean models which are meant to provide a convenient wrapper over an instance of a database-backed resource.

## Scripts and development tasks

Shell scripts should conform to the [Google Shell style guide](https://google.github.io/styleguide/shellguide.html).

Development tasks that are meant to run a local development computer should run inside Docker and be runnable using a script in the `bin/` directory.

## Java code

Java code should conform to the [Google Java style guide](https://google.github.io/styleguide/javaguide.html). The project makes use of a linter and auto-formatter for Java to help with this, just run `bin/fmt` and your code should be automatically formatted.

### Code best practices

#### Prefer using immutable collection types

provided by [Guava](https://github.com/google/guava) ([API docs](https://guava.dev/releases/snapshot/api/docs/)) over the Java standard library's mutable collections unless impractical. Include a comment justifying the use of a mutable collection if you use one.

#### Prefer Optional instead of null

null should only be used when necessary. Examples include working directly with database objects and checking if a field is set.

If a 3rd party library returns nulls they likely should be quickly wrapped using `Optional.ofNullable()`

### Async request handling

**Summary: Controllers handling requests from applicants or trusted intermediaries should be implemented asynchronously. All other controllers should be implemented synchronously.**

[Async IO](https://en.wikipedia.org/wiki/Asynchronous\_I/O) is helpful for reducing per-request resource consumption and sometimes per-request latency. Play allows controllers to implement request handling methods either synchronously, by returning `Result`, or asynchronously by returning `CompletionStage<Result>`. The tradeoff is that writing asynchronous code tends to result in more complex production and test code and a slower development velocity.

We anticipate relatively low [QPS](https://en.wikipedia.org/wiki/Queries\_per\_second) for deployments of CiviForm. However, if a large jurisdiction uses CiviForm, QPS from applicants could get high enough to present scaling concerns. To balance the needs of development velocity and future scalability, we opt to optimize the applicant and intermediary code paths for scale while leaving the code paths that are unlikely to ever see significantly high QPS implemented synchronously.

Exception handling in asynchronous execution deserves a special mention as `CompletionException` is unchecked and can be easily missed. We should always explicitly catch `CompletionException` when joining a future in a synchronous context. When returning `CompletionStage<Result>` to users, we should provide exception handling through `CompletableFuture#exceptionally` API.

## Bash scripts

Bash scripts should conform to the [Google Bash style guide](https://google.github.io/styleguide/shellguide.html). The guide references a nice utility to help find issue and fix them at https://www.shellcheck.net/.

## Routing and controller methods

APIs should follow [REST](https://en.wikipedia.org/wiki/Representational\_state\_transfer) when possible with the appropriate HTTP verb. Routing should be [resource-oriented](https://www.oreilly.com/library/view/restful-web-services/9780596529260/ch04.html) ([relevant AIP](https://google.aip.dev/121)). Path names should be [kebab-case](https://en.wikipedia.org/wiki/Letter\_case#Special\_case\_styles).

### HTML routing convention

For a resource called "programs" that implements the standard actions via HTML requests the routes would be:

| HTTP verb | URL path             | Controller#method          | Use                                                                                                                                                       |
| --------- | -------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET       | /programs            | ProgramsController#index   | Get a list of all programs                                                                                                                                |
| GET       | /programs/new        | ProgramsController#newOne  | Get an HTML form for creating a new program (Note: the associated controller method is named `newOne` since `new` is disallowed as a method name in Java) |
| POST      | /programs            | ProgramsController#create  | Create a new program, probably redirect to the #show method to view it                                                                                    |
| GET       | /programs/:id        | ProgramsController#show    | Get the details of a specific program                                                                                                                     |
| GET       | /programs/:id/edit   | ProgramsController#edit    | Get an HTML form for editing an existing program                                                                                                          |
| POST      | /programs/:id        | ProgramsController#update  | Update an existing program                                                                                                                                |
| POST      | /programs/:id/delete | ProgramsController#destroy | Delete an existing program, probably redirect to the #index method                                                                                        |

### API routing convention

For the same resource accessed via JSON API the routes should be under the "/api" namespace and naturally do not require form-serving endpoints:

| HTTP verb | URL path          | Controller#method             | Use                                   |
| --------- | ----------------- | ----------------------------- | ------------------------------------- |
| GET       | /api/programs     | ProgramsApiController#index   | Get a list of all programs            |
| POST      | /api/programs     | ProgramsApiController#create  | Create a new program                  |
| GET       | /api/programs/:id | ProgramsApiController#show    | Get the details of a specific program |
| PATCH/PUT | /api/programs/:id | ProgramsApiController#update  | Update an existing program            |
| DELETE    | /api/programs/:id | ProgramsApiController#destroy | Delete an existing program            |

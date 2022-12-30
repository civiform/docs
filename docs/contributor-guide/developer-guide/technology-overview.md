# Technology overview

## Software Stack

### Overview

CiviForm is built on the [Play Framework](https://www.playframework.com) in Java, and backed by a [PostgreSQL](https://www.postgresql.org) database. We use Guice to do dependency injection and follow the [Strategy Pattern](https://www.tutorialspoint.com/design\_pattern/strategy\_pattern.htm). The front end uses [J2Html](https://j2html.com) Java library to render HTML (server-side). For client-side interactions we use TypeScript without using any frameworks (see [Frontend development](frontend-development.md) for more info). For applicant authentication we support a few different OIDC/SAML identity providers. For infrastructure we use terraform.

### Views

Instead of the default templating language for Play (Twirl), CiviForm uses the [J2Html](https://j2html.com) Java library to render HTML (server-side).

All view classes should extend [`BaseHtmlView`](https://github.com/civiform/civiform/blob/main/server/app/views/BaseHtmlView.java), which has some helpful common tag helper methods. Its `makeCsrfTokenInputTag` must be added to all CiviForm forms.

[`ViewUtils`](https://github.com/civiform/civiform/blob/main/server/app/views/ViewUtils.java) is a utility class for accessing stateful view dependencies.

The `View` classes are generally organized by which role(s) they are viewable by (e.g., [app/view/admin/](https://github.com/civiform/civiform/tree/main/server/app/views/admin) for pages viewable by Admins, [app/views/applicant/](https://github.com/civiform/civiform/tree/main/server/app/views/applicant) for pages viewable by Applicants). Each of these roles also has its own [`Layout` class](https://github.com/civiform/civiform/blob/main/server/app/views/admin/AdminLayout.java) that extends `BaseHtmlLayout` for rendering page content in the context of that role.

## AWS Infra for Seattle Instance

* Archimate [Files](https://drive.google.com/drive/folders/1dtYkqGzPgjmzLmB7Yu0uULH-vhrmSygd?usp=sharing)
* Archimate Output [Diagram](https://drive.google.com/file/d/1qWBlDo8g5ZPydpt9NbC8lqfT3BwfhELo/view?usp=sharing)

## Azure Infra

### Azure App Service

For the Azure deployment of Civiform, we have opted to use [Azure App Service](https://azure.microsoft.com/en-us/services/app-service/#overview). We decided that App Service would be the best choice because it has a lot of out-of-the-box functionality for maintaining and scaling apps that makes it easier to use. Azure App Service handles a lot of the work of managing the production environment for developers behind the scenes and lets developers focus on building their application. An example of this is that Azure App Services has a built-in load balancer. The downside is that this approach offers less flexibility. It’s much less customizable than other services, but that doesn’t feel as important for this use case.

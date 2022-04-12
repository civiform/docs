# Technology overview

## Software Stack

### Overview

CiviForm is built on the [Play Framework](https://www.playframework.com) in Java, and backed by a [PostgreSQL](https://www.postgresql.org) database. We use Guice to do dependency injection and follow the [Strategy Pattern](https://www.tutorialspoint.com/design\_pattern/strategy\_pattern.htm). The front end uses [J2Html](https://j2html.com) Java library to render HTML (server-side). For applicant authentication we support a few different OIDC/SAML identity providers. For infrastructure we use terraform.

### Views

Instead of the default templating language for Play (Twirl), CiviForm uses the [J2Html](https://j2html.com) Java library to render HTML (server-side).

All view classes should extend [`BaseHtmlView`](https://github.com/seattle-uat/civiform/blob/main/universal-application-tool-0.0.1/app/views/BaseHtmlView.java), which has some helpful common tag helper methods. Its `makeCsrfTokenInputTag` must be added to all CiviForm forms.

[`ViewUtils`](https://github.com/seattle-uat/civiform/blob/main/universal-application-tool-0.0.1/app/views/ViewUtils.java) is a utility class for accessing stateful view dependencies.

The `View` classes are generally organized by which role(s) they are viewable by (e.g., [app/view/admin/](https://github.com/seattle-uat/civiform/tree/main/universal-application-tool-0.0.1/app/views/admin) for pages viewable by Admins, [app/views/applicant/](https://github.com/seattle-uat/civiform/tree/main/universal-application-tool-0.0.1/app/views/applicant) for pages viewable by Applicants). Each of these roles also has its own [`Layout` class](https://github.com/seattle-uat/civiform/blob/main/universal-application-tool-0.0.1/app/views/admin/AdminLayout.java) that extends `BaseHtmlLayout` for rendering page content in the context of that role.

## How to add WebJar dependencies

### What is a WebJar?

[WebJars](https://www.baeldung.com/maven-webjars) are client side dependencies packaged into JAR (Java Archive) files. JAR files are just compressed Java files (along with associated metadata and resources) used for distributing software.

### How to add WebJars to Civiform

[More information about how assets work in the Play framework](https://www.playframework.com/documentation/2.8.x/AssetsOverview)

First, we need to make sure the required dependency has an associated WebJar. WebJars can be found in the Maven repository as part of the “org.webjars” group. We are currently using a WebJar for the [Azure Blob Storage JavaScript SDK](https://mvnrepository.com/artifact/org.webjars.npm/azure\_\_storage-blob). Using WebJars is far preferable to using a CDN, which can be a security risk. More importantly, some civic entities don’t allow CDNs in their codebase.

To add this WebJar to the code, we first have to add it to the build.sbt file. To add the Azure blob storage WebJar, we added this:

```
libraryDependencies ++= Seq(
	“Org.webjars.npm” % “azure__storage-blob” % “10.5.0”,
)
```

This follows the pattern of group % artifact % version.

Once the WebJar has been added to the build.sbt, it is automatically extracted into a `lib` folder relative to the `public` folder storing your assets. If you are interested in the location of these files, you can build the project with the new dependencies, then go into public -> lib -> \[artifact name] and see the dependencies for yourself.

In order to use the associated dependencies, you need to find the JavaScript file storing these dependencies. The example given in the attached play WebJars documentation is useful, but I found that that locating this dependency was slightly more complicated. For Azure Blob Storage, the dependency was found at `lib/azure__storage-blob/browser/azure-storage-blob.min.js`. I determined this by manually going through the unpacked files added after building the project with the new WebJars dependency. In order to add this to your script, you can call the [`ViewUtils`](https://github.com/seattle-uat/civiform/blob/main/universal-application-tool-0.0.1/app/views/ViewUtils.java) `makeWebJarsTag` function and pass in this file path. That function uses the assetsFinder to find and load the necessary dependencies into the script.

## AWS Infra for Seattle Instance

* Archimate [Files](https://drive.google.com/drive/folders/1dtYkqGzPgjmzLmB7Yu0uULH-vhrmSygd?usp=sharing)
* Archimate Output [Diagram](https://drive.google.com/file/d/1qWBlDo8g5ZPydpt9NbC8lqfT3BwfhELo/view?usp=sharing)

## Azure Infra

### Azure App Service

For the Azure deployment of Civiform, we have opted to use [Azure App Service](https://azure.microsoft.com/en-us/services/app-service/#overview). We decided that App Service would be the best choice because it has a lot of out-of-the-box functionality for maintaining and scaling apps that makes it easier to use. Azure App Service handles a lot of the work of managing the production environment for developers behind the scenes and lets developers focus on building their application. An example of this is that Azure App Services has a built-in load balancer. The downside is that this approach offers less flexibility. It’s much less customizable than other services, but that doesn’t feel as important for this use case.

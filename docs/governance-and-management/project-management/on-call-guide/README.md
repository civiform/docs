---
description: On-call responsibilities and process for CiviForm.
---

# On Call Guide

### Onboarding

Do these things when you initially onboard to the CiviForm on-call rotation.

#### Join the GitHub repo

Join the CiviForm GitHub repo (https://github.com/civiform/civiform). Ask someone who already has access to add you as an admin.

Also join the CiviForm GitHub org (https://github.com/civiform).

NOTE: the mainline project repo existing under the `seattle-uat` GitHub org is temporary. Once Seattle no longer depends on deployment automation from the mainline repo you will only need to be an admin of https://github.com/civiform.

#### Ensure you have visibility into comms

* Join the CiviForm public Slack org (https://civiform.slack.com), [join link](https://join.slack.com/t/civiform/shared\_invite/zt-niap7ys1-RAICICUpDJfjpizjyjBr7Q)
* Subscribe to email alerts for new bugs filed in the [issue tracker](https://github.com/civiform/civiform/issues). Click on "Watch/Unwatch" button on the top.
* Ensure that you are receiving emails to civiform-technical@googlegroups.com and are not catching them in email filters.
* Subscribe to the [Play Framework security announcement group](https://groups.google.com/g/play-framework-security)
* Subscribe to the [OpenJDK security announcement mailing list](https://mail.openjdk.java.net/mailman/listinfo/vuln-announce)
* Subscribe to the [pac4j security announcement mailing list](https://groups.google.com/g/pac4j-security)

### Preparing for your shift

Things to do before each on-call shift starts.

#### Setup dev environment

Ensure your CiviForm development environment is set up and working. Pull in the latest changes to the `main` branch if yours is out of date. Follow instructions for [getting started](../../../contributor-guide/developer-guide/getting-started.md) with a dev environment.

#### Review current bug triage list

We use GitHub issues for tracking work on CiviForm. [Issues tagged with the 'bug' label](https://github.com/civiform/civiform/issues?q=is%3Aissue+is%3Aopen+label%3Abug) track known bugs.

Check if there are any current urgent bugs. If there are, make sure you know what the state of response is (check in with the previous on-caller).

### On-call responsibilities

1. Respond to downstream production incidents (daily)
   * Check GitHub [issue tracker](https://github.com/civiform/civiform/issues)
   * Check [civiform-technical@googlegroups.com](https://groups.google.com/g/civiform-technical)
2. Check security mailing lists for new vulnerability reports (daily)
   * [Play Framework security announcement group](https://groups.google.com/g/play-framework-security)
   * [OpenJDK security announcement mailing list](https://mail.openjdk.java.net/mailman/listinfo/vuln-announce)
   * [pac4j security announcement mailing list](https://groups.google.com/g/pac4j-security)
3. Check [dependency updates](https://github.com/civiform/civiform/labels/dependencies) (once per shift)
4. Check security updates at : https://about.codecov.io/security-update/

#### Downstream production incident support

The top priority for the on-caller is addressing urgent needs from downstream deployments of CiviForm. An urgent need is an outage, privacy, or security incident caused by bugs in the CiviForm application or deployment code. When an incident occurs it may not be clear what the root cause is and whether or not it is ultimately the responsibility of the upstream project to resolve it. Assume it is though until proven otherwise.

Incidents may be reported in a variety of ways. Since they're coming from civic entities and not Google internal staff or tooling we have limited control over this. At a minimum you should monitor:

* Bugs filed in the GitHub issues tracker
* Emails to civiform-technical@googlegroups.com
* The CiviForm Slack channel, particularly #engineering and #general

Whatever the mechanism of reporting the incident, ensure there is an issue tagged `bug` for it in GitHub issues. **Throughout your investigation into the issue, ensure public visibility in the resolution by updating the issue with your progress.**

Tip: Your primary responsibility with respect to incident response is to triage and ensure resolution as is appropriate. That does **NOT** mean you are solely responsible for implementing fixes. Delegate fixes to whoever is most able to help as necessary.

#### Security vulnerability fixes

In open source software development, it's common for library maintainers to release updates when a new security vulnerability is discovered. Subscribe to the security mailing lists mentioned in the Preparation section. If you receive an advisory during your on-call shift, respond to it by creating an issue in GitHub and triaging it appropriately.

The most common response will be to update the appropriate dependency to the latest patch version that includes a fix.

#### Dependency updates

CiviForm relies on versioned dependencies managed by an open source dependency management system. These dependencies include [the web framework itself](http://playframework.com) along with a variety of other libraries that provide functionality such as view rendering, database interaction, cryptographic tools, data serialization, and more.

CiviForm's dependencies are mostly listed in the [`build.sbt` file](https://github.com/civiform/civiform/blob/main/server/build.sbt). Dependencies in here are retrieved by [sbt](https://www.scala-sbt.org) (CiviForm's build tool) from the [Maven Central Repository](https://search.maven.org), which is where you can check to see if new versions are availabe. Additionally, there are some dependencies managed as [sbt plugins here](https://github.com/civiform/civiform/blob/main/server/project/plugins.sbt). These dependencies must be checked at their individual project pages for updates.

CiviForm relies on [renovate bot](https://github.com/renovatebot/renovate) to automatically detect new versions of dependencies and create pull requests to update them. It is the on-call engineer's responsibility to review and merge these pull requests as they come in. **Do not simply approve and merge every pull request renovate bot creates.** While in most cases passing CI checks indicates the change is acceptable, that not always the case and more diligence is required ([here's an example](https://github.com/civiform/civiform/pull/2130#discussion\_r834714183)). Be sure you understand what is being updated before approving. If need be, get in touch with the broader engineering team to help evaluate a given PR.

**Do not merge terraform-related dependency updates without first manually exercising the code, we do not have automated tests for terraform/deployment configuration.** Feel free to close related PRs and file issues for performing the upgrade.

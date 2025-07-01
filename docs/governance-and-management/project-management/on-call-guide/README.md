---
description: On-call responsibilities and process for CiviForm.
---

# On Call Guide

### Onboarding
Exygy engineers are responsible for on-call shifts, and Google.org and Civic Entity engineers can opt-in to the rotation. To get added to the rotation, contact Nick Burgan on Slack.

Do these things when you initially onboard to the CiviForm on-call rotation.

#### Join the GitHub repo

Join the CiviForm GitHub repo ([https://github.com/civiform/civiform](https://github.com/civiform/civiform)). Ask someone who already has access to add you as an admin.

Also join the CiviForm GitHub org ([https://github.com/civiform](https://github.com/civiform)).

Add the CiviForm Shared Google Calendar. Contact Nick Burgan or Rocky Fine on Slack to get added to the permissions list.

#### Ensure you have visibility into comms

* Join the CiviForm public Slack org (https://civiform.slack.com), [join link](https://join.slack.com/t/civiform/shared\_invite/zt-niap7ys1-RAICICUpDJfjpizjyjBr7Q)
* Subscribe to email alerts for new bugs filed in the [issue tracker](https://github.com/civiform/civiform/issues). Click on "Watch/Unwatch" button at the top of the [civiform repo page](https://github.com/civiform/civiform), select "Custom" and select "Issues".
* Ensure that you are receiving emails to civiform-technical@googlegroups.com and are not catching them in email filters.
* Subscribe to the [Play Framework security announcement group](https://groups.google.com/g/play-framework-security)
* Subscribe to the [OpenJDK security announcement mailing list](https://mail.openjdk.java.net/mailman/listinfo/vuln-announce)
* Subscribe to the [pac4j security announcement mailing list](https://groups.google.com/g/pac4j-security)

### Preparing for your shift

Things to do before each on-call shift starts.

#### Setup dev environment

Ensure your CiviForm development environment is set up and working. Pull in the latest changes to the `main` branch if yours is out of date. Follow instructions for [getting started](https://github.com/civiform/civiform/wiki/Getting-started) with a dev environment.

#### Review current bug triage list

We use GitHub issues for tracking work on CiviForm. [Issues tagged with the 'bug' label](https://github.com/civiform/civiform/issues?q=is%3Aissue+is%3Aopen+label%3Abug) track known bugs.

Check if there are any current urgent bugs. If there are, make sure you know what the state of response is (check in with the previous on-caller).

### On-call responsibilities

1. [Generate a release](https://github.com/civiform/civiform/wiki/Releasing) on Tuesday by 12pm Pacific Time
2. Upgrade the version in the demo sites config files by running [this action](https://github.com/civiform/civiform-staging-deploy/actions/workflows/update_demo_versions.yaml) then merging the generated PR
3. Check security lists daily
   * [Play Framework security announcement group](https://groups.google.com/g/play-framework-security)
   * [Codecov](https://about.codecov.io/security-update)
   * [pac4j security announcement mailing list](https://groups.google.com/g/pac4j-security)
4. Check the [needs triage bugs](https://github.com/civiform/civiform/issues?q=is%3Aopen+is%3Aissue+label%3Aneeds-triage) that are created to make sure there aren't any P0s (daily)
   * If there is something that looks critical, post in #eng-prod-incidents or post in #eng-general if you aren't sure.
5. Monitor staging deployments in the [#ci](https://app.slack.com/client/T01Q6PJQAES/C03UXPUEXU4) Slack channel. Investigate failed deployments and re-run if appropriate. (Note: our browser tests can be flakey and case deployments to fail. If this is the case, re-running the deployment will often fix the issue.)
6. Check for dependency updates (once per shift)
   Do your best to resolve any problematic dependency updates that break tests during your shift. If you start work on a dependency but are unable to fully resolve it during your oncall shift, hand it off to the next person. For any broken updates that require very, very large changes, please create a new GitHub issue and add the "needs-triage" label so that Exygy can prioritize fixing these issues. Also, mark the Renovate PR as "draft" and add a comment on the PR with the link to the new issue.
   * Renovate PRs for [civiform/civiform](https://github.com/civiform/civiform/pulls/app%2Frenovate)
   * Renovate PRs for [civiform/civiform-staging-deploy](https://github.com/civiform/civiform-staging-deploy/pulls/app%2Frenovate)
   * Renovate PRs for [civiform/cloud-deploy-infra](https://github.com/civiform/cloud-deploy-infra/pulls/app%2Frenovate)
7. Create an oncall issue for the next rotation using the [Oncall Issue Template](https://github.com/civiform/civiform/blob/main/.github/ISSUE_TEMPLATE/oncall-rotation.md) and close the oncall issue assigned to you.

#### Downstream production incident support

The top priority for the on-caller is addressing urgent needs from downstream deployments of CiviForm. An urgent need is an outage, privacy, or security incident caused by bugs in the CiviForm application or deployment code. When an incident occurs it may not be clear what the root cause is and whether or not it is ultimately the responsibility of the upstream project to resolve it. Assume it is though until proven otherwise.

Incidents may be reported in a variety of ways. Since they're coming from civic entities and not Google or Exygy internal staff or tooling we have limited control over this. At a minimum you should monitor:

* Bugs filed in the GitHub issues tracker
* Emails to civiform-technical@googlegroups.com
* The CiviForm Slack channel, particularly #engineering and #general

Whatever the mechanism of reporting the incident, ensure there is an issue tagged `bug` for it in GitHub issues. **Throughout your investigation into the issue, ensure public visibility in the resolution by updating the issue with your progress.**

Tip: Your primary responsibility with respect to incident response is to triage and ensure resolution as is appropriate. That does **NOT** mean you are solely responsible for implementing fixes. Delegate fixes to whoever is most able to help as necessary.

#### Security vulnerability fixes

In open source software development, it's common for library maintainers to release updates when a new security vulnerability is discovered. Subscribe to the security mailing lists mentioned in the [Preparation section](#ensure-you-have-visibility-into-comms). If you receive an advisory during your on-call shift, including OpenJDK advisories, the most common response will be to update the appropriate dependency to the latest patch version that includes a fix.  Once the update is available, Renovate will automatically create a PR with the update.  If the vulnerability is being actively exploited and an update with a fix isn't available yet, create an issue in GitHub and triage it appropriately so that it receives immediate attention.

#### Dependency updates

CiviForm relies on versioned dependencies managed by an open source dependency management system. These dependencies include [the web framework itself](http://playframework.com) along with a variety of other libraries that provide functionality such as view rendering, database interaction, cryptographic tools, data serialization, and more.

CiviForm's dependencies are mostly listed in the [`build.sbt` file](https://github.com/civiform/civiform/blob/main/server/build.sbt). Dependencies in here are retrieved by [sbt](https://www.scala-sbt.org) (CiviForm's build tool) from the [Maven Central Repository](https://search.maven.org), which is where you can check to see if new versions are availabe. Additionally, there are some dependencies managed as [sbt plugins here](https://github.com/civiform/civiform/blob/main/server/project/plugins.sbt). These dependencies must be checked at their individual project pages for updates.

CiviForm relies on [renovate bot](https://github.com/renovatebot/renovate) to automatically detect new versions of dependencies and create pull requests to update them. It is the on-call engineer's responsibility to review and merge these pull requests.

##### Best practices for dependency updates
- **Do not simply approve and merge every pull request renovate bot creates.** While in most cases passing CI checks indicates the change is acceptable, that not always the case and more diligence is required ([here's an example](https://github.com/civiform/civiform/pull/2130#discussion\_r834714183)).
- Be sure you understand what is being updated before approving. Scan the release notes and pay close attention to deprecated things or breaking changes. If need be, get in touch with the broader engineering team to help evaluate a given PR.
- Merge dependencies in chunks of 3-5 to avoid flooding the github actions and blocking humans merging their changes.
- Try not to approve multiple things that are editing the same config (e.g. server/package.json) as it is likely to become not mergeable when other changes go in and will need renovate to refresh it.
- Broken dependency updates:
  - Failures often happen because the docker/package manager limits are hit so try re-running the failed jobs first.
  - If dependency updates are still failing, pick at least one to look into during your oncall shift (feel free to look at more than one if you have time/interest).
  - Look at the logs for the job and/or run `bin/dev-show-trace-file` on the branch to see what is up.
  - If it's a small fix (will take you <1 day) or Playwright update where images changed for no actual reason, push a fix to the branch, and ask for an additional approval.
  - For larger fixes, create a new GitHub issue for the dependency update and document your findings. Ping Nick so the issue gets added to our roadmap, mark the Renovate PR as "draft", and add a comment on the PR with the link to the new issue.

> [!NOTE]
> **Do not merge terraform-related dependency updates without first manually exercising the code, we do not have automated tests for terraform/deployment configuration.** Feel free to close related PRs and file issues for performing the upgrade.

#### Upgrading demo sites

We have all of our demo sites managed in [this repository](https://github.com/civiform/civiform-staging-deploy). In order to upgrade the demo sites' version number in the config files, we can run the [update demo versions action](https://github.com/civiform/civiform-staging-deploy/actions/workflows/update_demo_versions.yaml). This will create a pull request that you can approve and merge. By default, this new version will get picked up the next time the site is automatically deployed. In order to do a one-off deployment of the demo sites, the [deploy action](https://github.com/civiform/civiform-staging-deploy/actions/workflows/aws_deploy_all_demos.yaml) can be used. Please make sure nobody is actively using the demo site if you are planning to run the deploy action to ensure no issues.

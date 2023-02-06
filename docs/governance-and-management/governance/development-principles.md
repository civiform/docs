# Development Principles

## Shared Codebase
CiviForm’s code is designed to be shared across organizations as off-the-shelf open source software. There is one canonical codebase, hosted on [GitHub](https://github.com/civiform/civiform), that is the core feature-complete application. Each Member Organization will need to specify their own configuration settings to deploy the application in their own environment. For more information, see the [CiviForm Technical Deployment Guide](../../it-manual/sre-playbook). Member Organizations should aim not to fork the code, and should instead contribute features to the shared core codebase through the collective planning and decision-making process described above. Any Member Organization that forks the codebase to implement features separately from the canonical codebase will have effectively created a separate application and codebase, and is solely responsible for that separate application.  When needs arise for custom behavior, it's the intention of the project to support that behavior through generic integration techniques such as HTTP APIs and/or plugin systems rather than including deployment-specific code in the CiviForm system.

## Technical Standards
* Once features are prioritized and PRDs have been finalized, **features are developed following the following technical standards**:
    * [Technical Contribution Guidelines](../../contributor-guide/developer-guide/technical-contribution-guide.md)
    * [Testing practices & guidelines](../../contributor-guide/developer-guide/testing.md)
* Code quality is critical to the long-term viability of the CiviForm project. All code contributions must be reviewed by at least one Maintainer who has familiarity of the Guidelines, with additional reviewers strongly recommended for major contributions.
When questions of code quality or best practice arise that are not resolved by the Technical Contribution Guide, a member of the Technical Design Comittee may make a decision on the spot, or bring the issue to the committee for a vote if necessary.
* Features are announced via [Release Notes in GitHub](https://github.com/civiform/civiform/releases) and sent to civiform-technical@ and civiform-announce@. Read more about [release practices](../../it-manual/sre-playbook/upgrading-to-a-new-release.md).

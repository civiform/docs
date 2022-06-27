# Technical contribution guide

This is a guide for making technical contributions to CiviForm. ****&#x20;

If you haven't already, please **read our** [**code of conduct**](https://github.com/seattle-uat/civiform/blob/main/code\_of\_conduct.md)**.**

{% hint style="info" %}
Join the conversation in the [Civiform Slack workspace](https://app.slack.com/client/T01Q6PJQAES/C01R3BWAL1E).
{% endhint %}

### Getting started

To set up your environment and learn how to run a local CiviForm server and tests, see [Getting started.](getting-started.md)

### Issue tracking

Development tasks are managed in the [GitHub issues](https://github.com/seattle-uat/civiform/issues) for this repository. When you begin working on an issue, please self-assign or comment on it indicating you're beginning work to avoid duplicate effort.

If you're just getting started, check out issues labeled with [Good First Issue](https://github.com/seattle-uat/civiform/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22). Also check out issues in the [next milestone](https://github.com/seattle-uat/civiform/milestones?direction=asc\&sort=due\_date\&state=open) so you can work on the highest-priority tasks.

### Pull requests

When you're ready to submit your code, open a pull request with "Closes #X" to link the relevant issue.

It's easy for the intention of code review comments to be unclear or get misinterpreted. To help with communication, reviewers are encouraged to use [conventional comments](https://conventionalcomments.org) and explicitly indicate that comments are `(blocking)`, where the discussion must be resolved for PR to be merged, or `(non-blocking)` where resolving the discussion is optional for the implementer.

#### Approval and merging

Reviewers should grant approval if they do not feel additional review is necessary before merging. This does not necessarily mean no more changes are required before merging, but that any further changes are expected to be minor enough to not require review.

If the pull request does not require additional changes, the reviewer should merge it immediately after approving. Otherwise, once they have addressed all comments marked `(blocking)` or `nit`, the pull request author should either merge if able or re-request review and merging from a maintainer if not. Authors are encouraged to at least reply to `(non-blocking)` and `(if-minor)` comments if they do not address them with code changes.

If you want a round robin review, our repo supports that (it will cycle through people within the a team, more details on [how to add roundrobin reviews link](https://docs.github.com/en/organizations/organizing-members-into-teams/managing-code-review-settings-for-your-team) Once that is done you can add the name of the team (civiform-developers) in the reviewer box and it will auto assign someone. 

### Getting up to speed

Want to get up to speed on this project? Awesome! Please see the following:

* Read the [code of conduct](https://github.com/seattle-uat/civiform/blob/main/code\_of\_conduct.md).
* Join our [Slack workgroup](https://join.slack.com/t/civiform/shared\_invite/zt-niap7ys1-RAICICUpDJfjpizjyjBr7Q).
* Check out the [Google Drive](https://drive.google.com/drive/folders/1\_uVkq1uOD14p19DvQzbXs2s0XhSOQjgF?usp=sharing) containing our design docs.
* Read through our Developer guide docs in the right nav. Here are some good docs to get you started:

{% content-ref url="getting-started.md" %}
[getting-started.md](getting-started.md)
{% endcontent-ref %}

{% content-ref url="technology-overview.md" %}
[technology-overview.md](technology-overview.md)
{% endcontent-ref %}

{% content-ref url="development-standards.md" %}
[development-standards.md](development-standards.md)
{% endcontent-ref %}

* Work on at least one issue tagged with [`good first issue`](https://github.com/seattle-uat/civiform/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) before moving to others. Feel free to ask for task recommendations in Slack.
* Pair program with one of the project's main engineers. Reach out on Slack - we're happy to help!

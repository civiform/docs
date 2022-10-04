# Technical contribution guide

This is a guide for making technical contributions to CiviForm. ****&#x20;

If you haven't already, please **read our** [**code of conduct**](https://github.com/civiform/civiform/blob/main/code\_of\_conduct.md)**.**

{% hint style="info" %}
Join the conversation in the [Civiform Slack workspace](https://app.slack.com/client/T01Q6PJQAES/C01R3BWAL1E).
{% endhint %}

### Getting started

To set up your environment and learn how to run a local CiviForm server and tests, see [Getting started.](getting-started.md)

### Issue tracking

Development tasks are managed in the [GitHub issues](https://github.com/civiform/civiform/issues) for this repository. When you begin working on an issue, please self-assign or comment on it indicating you're beginning work to avoid duplicate effort.

If you're just getting started, check out issues labeled with [Good First Issue](https://github.com/civiform/civiform/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22). Also check out issues in the [next milestone](https://github.com/civiform/civiform/milestones?direction=asc\&sort=due\_date\&state=open) so you can work on the highest-priority tasks.

### Git workflow

To start working on a change, first get the latest state from the github repository then create a new local development branch:

```sh
# Downloads any commits from the github repository that your local repository does not have.
git fetch origin

# Creates a new local branch `your_username/dev-branch-description`.
# The repository file contents are set to the same as the github repository's main branch.
git checkout -b your_username/dev-branch-description origin/main
```

Then start making your changes. In general, smaller commits that make "one" logical change are easier to manage and change as development progresses. The 'Commit Guidelines' section in [this guide](https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project) has more discussion on commit best practices. The repository is configured such that all commits in a pull request are squashed into one commit when the pull request is merged so having many commits poses no issues.

When you make a change the change initially is 'unstaged'. To package a change into a commit you need to instruct git to 'stage' the change. See [this guide](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository) for details on staged vs unstaged changes.

```sh
# Shows what branch you are on and what files you have modified. All changes will start as unstaged.
git status

# Stage changes for a commit.
#
# The add command supports many ways to specify what changes to stage. To stage only certain changes, use:
git add -- path/to/file/1 path/to/file/2

# To interactively choose what changes to stage, use:
git add --patch

# To stage all changes:
git add .
```

Once some changes are staged, you can create a commit the packages them together with a description:

```
# Double-check only the desired changes are staged.
git status

# Create a new commit packaging the staged changes with the description `My change`.
git commit --message 'My change'
```

When you are ready to have your commits reviewed, create a branch on the github repository that corresponds to your local branch:

```sh
git push --set-upstream origin your_username/dev-branch-description
```

If you need to make any changes before merging into origin/main, first get any new commits from the github repository and merge them into your local branch:

```sh
git pull
```

Make the desired changes.  Then stage and package them into another commit:

```sh
git status
git add .
git commit --message 'My updates'
```

Re-push your local branch to the github repository:

```sh
git push
```

### Creating a pull request

When you're ready to have your code reviewed, open a pull request. After pushing a new branch there should be a "Compare & pull request" button on the github repository. Alternatively, go to the [new pull request](https://github.com/civiform/civiform/compare) page in github.

Include "Closes #X" in the description to link the relevant issue.

### Getting reviews on a pull request

It's easy for the intention of code review comments to be unclear or get misinterpreted. To help with communication, reviewers are encouraged to use [conventional comments](https://conventionalcomments.org) and explicitly indicate that comments are `(blocking)`, where the discussion must be resolved for PR to be merged, or `(non-blocking)` where resolving the discussion is optional for the implementer.

#### Adding Reviewers

You can select the reviewer you feel most has context on your PR. If you want a round robin review, our repo supports that (it will cycle through people within the team 'civiform/developers', more details on [how to add roundrobin reviews here](https://docs.github.com/en/organizations/organizing-members-into-teams/managing-code-review-settings-for-your-team). Once that is done you can add the name of the team (civiform/developers) in the reviewer box and it will auto assign someone.

#### Approval and merging

Reviewers should grant approval if they do not feel additional review is necessary before merging. This does not necessarily mean no more changes are required before merging, but that any further changes are expected to be minor enough to not require review.

If the pull request does not require additional changes, the reviewer should merge it immediately after approving. Otherwise, once they have addressed all comments marked `(blocking)` or `nit`, the pull request author should either merge if able or re-request review and merging from a maintainer if not. Authors are encouraged to at least reply to `(non-blocking)` and `(if-minor)` comments if they do not address them with code changes.

### Getting up to speed

Want to get up to speed on this project? Awesome! Please see the following:

* Read the [code of conduct](https://github.com/civiform/civiform/blob/main/code\_of\_conduct.md).
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

* Work on at least one issue tagged with [`good first issue`](https://github.com/civiform/civiform/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) before moving to others. Feel free to ask for task recommendations in Slack.
* Pair program with one of the project's main engineers. Reach out on Slack - we're happy to help!

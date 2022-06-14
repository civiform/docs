# CiviForm documentation
Welcome to the documentation for Civiform.
# How to make changes to the docs
## Updating a page
* Updates should be made directly in the markdown files in ‘docs’ directory of the GitHub repository. 
* Anyone can click ‘Edit on GitHub’ for any page within the docs site, which will take you directly to the markdown file for that page on GitHub. 
* For example, if you want to update the [Getting Started](https://docs.civiform.us/contributor-guide/developer-guide/getting-started) page of the Developer Guide, you should make edits to [this markdown file](https://github.com/civiform/docs/blob/main/docs/contributor-guide/developer-guide/getting-started.md) on GitHub.
* Updates must be made via pull request.

## Creating a new page
* To create a new page, find the appropriate section in GitHub to which you’d like to add the new page
* Select 'Add File' > 'Create New File.' 
* Write your file in Markdown and submit via pull request.

## Organizing the table of contents
* Updates to the sidebar and table of contents can be made in the [SUMMARY.md](https://github.com/civiform/docs/blob/main/docs/SUMMARY.md) file

## Adding markdown
* Reference [this guide on writing simple syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) and follow Gitbook specific syntax below:
* Drop-downs (as seen on on [How does CiviForm work?](https://docs.civiform.us/overview/how-does-civiform-work)):``` <details><summary>TITLE OF DROPDOWN</summary>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</details>```

* Info box (as seen on [CiviForm Admin Guide](https://docs.civiform.us/user-manual/civiform-admin-guide)):``` {% hint style="success" %} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. {% endhint %}```

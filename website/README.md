# Civiform.us website

This directory contains the files necessary to build and deploy the CiviForm website.
## Making changes

### 0. Install dependencies
You need `node` and `npm`. You can install them both [here](https://nodejs.org/en/download/prebuilt-installer) (installing `node` will install `npm` alongside it).

### 1. Clone the [`civiform/docs`](https://github.com/civiform/docs) repo and create a branch or fork
```
git clone git@github.com:civiform/docs.git
cd docs
git checkout -b my-website-update
```
### 2. Run the webstie locally
Install website libraries if they haven't been installed already:
```
cd website
npm install
```
Run the website
```
npm start
```
You should be able to visit the website at [localhost:8080](http://localhost:8080).

### 3. Make desired changes to markdown files in `docs/website/src` directory.
Edit the markdown files in `src/` as needed. 
**Do NOT edit the files in `docs/website/public`**, these files are automatically generated from the source files. 
The live preview at [localhost:8080](http://localhost:8080) will update automatically as you make and save changes to the files in `docs/website/src`.
If you make a change that breaks the site (for example, removing a necessary HTML tag), you will see associated errors in your terminal. Otherwise, if you see your changes rendered, the build was successful.

### 4. Commit changes and push to GitHub.
Once you are happy with your changes, it is time to commit them to the repository and push them back to GitHub:
```
git add .
git commit -m 'Added details on how to get started.'
git push origin my-website-update
```
This should produce a link directing you to create a new pull request on GitHub.

### 5. Create and merge pull request and view live site.
To create a pull request, visit the [civiform/docs](https://github.com/civiform/docs) repository on GitHub and click the dialog to create a new pull request with your recent change.
Request a review if you want it, otherwise click "**Squash and merge**" to merge the pull request. The changes should be live on [civiform.us](https://civiform.us) within a minute.


## Updating the News section
CiviForm's [News page](https://civiform.us/news) shows a list of recent news stories, including a featured section with images, headlines, and descriptions. 

To update the stories or add a new story, edit the JSON file at [website/src/_data/news.json](https://github.com/civiform/docs/blob/main/website/src/_data/news.json).
Note:
* At minimum, each entry should contain:
    * `"URL"`: The story URL that this entry should link to.
    * `"Government"`: The government associated with this story. Can be "Seattle", "Bloomington", "Arkansas", "General", or a new string for a new government. For new governments, be consistent in usage across entries.
    * `"Title"`: The title to display for each entry (usually just the story title itself, but you can adjust it if needed).
    * `"Publisher"`: The news source or event that published this story.
    * `"Date"`: Date of publication formatted as `YYYY-MM-DD`. Stories are sorted by most recent date (the order in the JSON doesn't matter, but it is still nice to organize them in chronological order to make editing easier).
* To feature a story at the top of the page, include `"Featured": true` in the entry.
* All featured story entries must contain:
    * `"Featured": true`: marks the story to be featured in the top section.
    * `"Image"`: the filename of the featured image. The image file itself should be in [website/src/assets/img](https://github.com/civiform/docs/tree/main/website/src/assets/img).
    * `"ImageDescription"`: a description of the image for accessibility.
    * `"Description"`: a simple description of the story to appear alongside the featured image.

As with any changes, the website must be rebuilt and redeployed following the steps above to be reflected live on [civiform.us](https://civiform.us).

## Updating redirects
The website supports redirects (e.g. [civiform.us/drive](https://civiform.us/drive) redirects to our project Drive.)
Redirects are configured in [website/src/redirects.md](https://github.com/civiform/docs/blob/main/website/src/redirects.md). 
To add a redirect, add an entry to the `redirects` section of the file.
```
redirects:
  - {
      "title": "CiviForm Project Public Drive",
      "from": "drive",
      "to": "https://drive.google.com/drive/folders/1LT7ZivhjXb5iSxwisuF11CjUMKPYjpi0",
    }
  - {
      "title": Very Helpful Link",
      "from": "helpful-link",
      "to": "https://example.com",
    }
```
As with any changes, the website must be rebuilt and redeployed following the steps above to be reflected live on [civiform.us](https://civiform.us).

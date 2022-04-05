# Updating caniuse-lite

[caniuse-lite](https://github.com/browserslist/caniuse-lite) keeps an eye on our in-browser JS dependencies and let's us know when polyfills are no longer needed as browsers implement new features, among other helpful things.

The process for updating caniuse is:

1. run `docker run -it --rm -v /var/run/docker.sock:/var/run/docker.sock -v $(pwd)/universal-application-tool-0.0.1:/usr/src/universal-application-tool-0.0.1 --entrypoint /bin/bash civiform-dev`
1. from inside the container run `npx browserslist@latest --update-db`
1. commit the updated package-lock.json file

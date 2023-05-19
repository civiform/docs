# Deploy system developer guide

This page contains information for deploy system developers, which go beyond the initial one-off setup. 
You should have worked through the [Prerequisites & dev setup](contributor-guide/developer-guide/deploy-system/prerequisites.md) already
and know the difference between the repositories (`civiform-deploy`, `cloud-deploy-infra` and `civiform`) from the overview section.

The "Setup" section will take you through setup which you may have to revisit for each new change.
The "Most common developer flows" section contains all essential information to be able to do a first change. 
We recommend coming back soon to "Optimizing your flow" and skim reading the tips and tricks section so you know 
what information is provided when you need it.

## Setup
See the [Setup Repositories](prerequisites.md#setup-repositories) section in [Prerequisites and developer setup](prerequisites.md) for instructions on setting up your respositories for the first time.

## Most Common developer flows

### Running locally

The most common flow for developers is to run the deployment script on your local machine to test your changes to 
the `cloud-deploy-infra` repository. To do this, create a configuration file for your deployment and then run 
the setup script which pulls in the configuration values and applies them via Terraform to the deployment on your 
chosen cloud provider (AWS/Azure).

You have two options here: 

1. The first flow is similar to what a civic entity would do. From within the `civiform-deploy` repository, run
[bin/setup](https://github.com/civiform/civiform-deploy/blob/main/bin/setup), which then calls 
[run.py](https://github.com/civiform/cloud-deploy-infra/blob/main/cloud/shared/bin/run.py). 
Because `run.py` is in a different repository, this requires development across different git repositories.
2. For the second flow, make changes in the `cloud-deploy-infra` repository and execute `run.py` from there.

#### Create CiviForm config (shared for both flows)

First you need a config file, which contains key value pairs to configure the deployment
(e.g. choice of cloud provider and infra, timezone settings, authentication provider etc). 
Inside your `civiform-deploy` git repository and the branch you are working on, do the following:

1. Create a file named `civiform_config.sh` by copying [civiform_config.example.sh](https://github.com/civiform/civiform-deploy/blob/main/civiform_config.example.sh) 
2. Modify `APP_PREFIX` to be unique, which is used as a prefix for all resources created. For example, you might use your username.

You can use the [AWS](https://github.com/civiform/civiform-staging-deploy/blob/main/aws_staging_civiform_config.sh) and 
[Azure](https://github.com/civiform/civiform-staging-deploy/blob/main/azure_staging_civiform_config.sh)
config files as additional examples.

TODO(#4324) complete the list of values that need to be changed as a minimal set for deployment to work (step 2).

### Flow 1: Running locally from within civiform-deploy (like operations at a civic entity would)

Once you have adapted the configuration file, you can run the deployment script. 
Run the [bin/setup](https://github.com/civiform/civiform-deploy/blob/main/bin/setup) script from your `civiform-deploy` repository's root directory:

Setup will ask you to confirm multiple times and to provide secret values. You can enter random values and enter yes as needed.
At the end, the script should print the URL to your dev server!

Remember that if you have any changes in your `cloud-deploy-infra` repository which you would like to be visible in your deployment, 
you must have gone through the git setup steps in the setup section above to ensure that the newest version is copied
from your `cloud-deploy-infra` repository to your `civiform-deploy` repository. Also, make to sure commit the changes to the relevant 
branch in git before running the script.

### Flow 2 Running the deploy script from within civiform-deploy-infra
Running the deploy scripts from `civiform-deploy` as described above has the downside that you are developing across multiple git 
repositories and need to keep them in sync. In most cases, you can avoid the extra abstraction layer by running the scripts
that [setup](https://github.com/civiform/civiform-deploy/blob/main/bin/setup) is calling directly in `cloud-deploy-infra`. 
You can use the copy of `civiform_config.sh` that you have already created in `civiform-deploy` and pass it as a parameter to the run script:

TODO([#4324](https://github.com/civiform/civiform/issues/4324)) These steps are currently failing and need to be updated 
¸
Use [run.py](https://github.com/civiform/cloud-deploy-infra/blob/main/cloud/shared/bin/run.py) with necessary parameters.

* To setup (run once): `cloud/shared/bin/run.py --command=setup --tag=latest --config=<path_to_config>`
* To deploy: `cloud/shared/bin/run.py --command=deploy --tag=latest --config=<path_to_config>`
* You can pass any Terraform command into the `--command` flag. For example: `cloud/shared/bin/run.py --command="terraform init" --tag=latest --config=<path_to_config>`

As before, setup will ask you to confirm multiple times and to provide secret values. You can enter random values and enter yes as needed.
At the end, the script should print the URL to your dev server!

#### Tear down

After you're done with your instance, please tear it down.

```
cloud/shared/bin/run.py --command=destroy
```

### Viewing local server changes in your deployment

Please note that at the time of writing, this was only supported for Linux machines.

In some cases you will want to see changes you made to your local server in your local deployment, such as testing that a configuration value that is supposed to change the UI is effective. The deployment scripts download the `civiform` image from DockerHub. Because the image will be run on AWS, it needs to be publically pullable
and you can not use your local version directly.

#### Creating a DockerHub account
Instead, you have to build an image locally, publish it on DockerHub, then tell the deployment to use that image.
If you don't have a DockerHub acount yet, you can register [here](https://hub.docker.com/).
* Navigate to your DockerHub account at `https://hub.docker.com/u/<your_dockerhub_name>`, 
* Click on "Repositories" at the top
* Click on "Create Repository"
* Follow the steps. In the following steps, we'll assume that you've named your repository `civiform` so that it will be available at `<your_dockerhub_name>/civiform`

#### Building your docker image locally

In your `civiform` repository, 
* Edit `bin/build-prod`.
* Change `civiform/` to `<your_dockerhub_name>` wherever you find it.
* Run `bin/build-prod`.

Push the image to your repository
* Check the image is present with `docker images`.
* Push it to DockerHub with `docker push <your_cockerhub_name>/civiform:latest`. If you get an access denied error, you may need to log into your docker account with `docker login`.
* Go to your DockerHub account at `https://hub.docker.com/u/<your_dockerhub_name>` to check that the image has been updated.

#### Pointing your deployment at your docker image
* Open [app.tf](https://github.com/civiform/cloud-deploy-infra/blob/66cc7db5d166b4069bc63dd1dea7cfa23ffce2a7/cloud/aws/templates/aws_oidc/app.tf#L37)
* Change the container image to `container_image              = “<your_dockerhub_username>/civiform:latest” `

### A typical full development cycle across 3 branches

This section describes a flow for implementing changes across all three repositories (`civiform-deploy`, `cloud-deploy-infra` and `civiform`).
You can skip some sections if you are not making changes to all three repositories.

#### Server changes
Make your Server changes (e.g. UI changes that depend on a config value reaching the server)
* Make your change in the `civiform` repository
* From the root of your `civiform` repository, build a Docker image with `docker build -t <your_dockerhub_name>/civiform:latest .`
* Push the image to DockerHub with `docker push <your_dockerhub_name>/civiform:latest`
* Check on DockerHub that the image is visible and has the correct timestamp

Make your deployment use the `civiform` image you created locally to view server changes
* In [app.tf](https://github.com/civiform/cloud-deploy-infra/blob/66cc7db5d166b4069bc63dd1dea7cfa23ffce2a7/cloud/aws/templates/aws_oidc/app.tf#L37) in the 
the `cloud-deploy-infra` repository, change the image you use with `container_image              = "<your_dockerhub_username>/civiform:latest" `
* `git add` and `git commit` your changes 

#### Deployment system changes

Make your changes
* Navigate to the `cloud-deploy-infra` repository and implement your code changes

Double check that the setup script sees the changes
* Navigate to the `civiform-deploy` repository
* Ensure that your `checkout.sh` copies your changes from the correct git branch in `cloud-deploy-infra` (see [Prerequisites](https://docs.civiform.us/contributor-guide/developer-guide/deploy-system/prerequisites#setup-repositories))

#### Run the deployment script
Run the script from the `civiform-deploy` repository
 * If you need to make any further changes to `civiform_config.sh`, do so.
 * run `yes yes | bin/set`

### Running the Python formatter
Before you push your change to git and ask for a review, format the code with the following command:
```
yapf --verbose --style='{based_on_style: google, SPLIT_BEFORE_FIRST_ARGUMENT:true}' -ir .
```
This formats all python files under the current directory and requires the installation of `yapf` as described
in the prerequisites section.

## Optimizing your flow


### Running individual Python files

While you make changes to the deploy system, you may want to test your changes without having to run the whole deployment script.
This can optimize your workflow in some cases, but may not always be necessary (e.g. if the deploy scripts run your code very early).
The recommended way to try to run individual bits of our python code is to run the file via its tests. The second option is to run it directly. 

In both cases you have to ensure that the file you are running is visible to Python.
The error you will get when Python can't find the files is usually something along the lines of `ModuleNotFoundError: No module named <someModule>`.
In this case, you have to add the current folder and its sub-folders to the existing `PYTHONPATH` by running the following from the command line:

```export PYTHONPATH=./cloud:$PYTHONPATH```

#### Running python code via tests:

This has a few advantages. You are not adding any code in the source and therefore don't have to remove it before running the whole deploy system. The code you write to run the file can often very easily serve as additional test coverage! Existing tests also often already contain code that executes the relevant lines (less work for you understanding and writing the code).

* If the file does not have tests yet, add a test file. Tests for other files can serve as an example. Our python tests are usually located in the same folder as the source code.
* Check if there is a test case that executes your code. The easiest way is to add a `print()` statement and see if gets printed. If no test case for the relevant lines exists, you can add a new one.
* Call the test with `python3 path/to/your/testfile`

Once you are done with your testing and experimenting, consider turning your temporary test into a real one to increase coverage (Woohoo! Extra tests with little extra effort!)

#### Running python code directly from the file

There are a couple of disadvantages to this approach. You have to remember to remove the code you are adding before running the full deploy script. You also have to write all the calls that run relevant bits yourself whereas tests often already do that for you.

* In the source code, create the objects and call the methods that you would like to be executed. In the example below, run the `load_config` method and the `tf_config_vars` method of the class `ConfigLoader` and print out the result. Add the following code to the end of the file that you will run afterwards.
```
     config_loader = ConfigLoader()
     validation_errors = config_loader.load_config("/Users/jhummel/Civiform/civiform-deploy/civiform_config.sh")
     print(validation_errors)
     tf_config_vars = config_loader.get_terraform_variables()
     print(tf_config_vars)
```
* Run the code by calling `python3 path/to/your/file`

### Automating your manual flow via ~/.bashrc

TODO([#4324](https://github.com/civiform/civiform/issues/4324))

### Avoid having to enter values manually when running deploy scripts

TODO([#4324](https://github.com/civiform/civiform/issues/4324))

### Running individual Python files

TODO([#4324](https://github.com/civiform/civiform/issues/4324))

## Additional Tips and tricks

### Running more Terraform commands

If you need to run a Terraform command that's not exported in a script:
1. Run the `run.py` script to create tfvars from your config (otherwise you will need to populate them all by hand)
2. Use `chdir` to run commands directly

For example:

```
terraform -chdir=cloud/aws/templates/aws_oidc plan
```



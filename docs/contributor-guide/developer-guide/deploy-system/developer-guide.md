# Deploy system developer guide

This page contains information for deploy system developers, which go beyond the initial setup. 
You should have worked through the [Prerequisits & dev setup](contributor-guide/developer-guide/deploy-system/prerequisits.md) already
and know the difference between the repositories (civiform-deploy, civiform-deploy-infra and civiform) from the overview section.

The "Most common developer flows" section contains all essential information to be able to do a first change. 
We recommend coming back soon to "Optimizing your flow" and skim reading the tips and tricks section so you know 
what information is provided when you need it.

## Running locally

The most common flow for developers is to run the deployment script on your local machine to test your changes to 
the civiform-deploy-infra repository. To do this,you create a configuration file for your deployment and then run 
the setup script which pulls in the configuration values and applies them via terraform to the deployment on your 
chosen cloud provider (AWS/Azure).

You have two options here: 

1. The first flow is similar to what a civic entity would do. From within the civiform-deploy repository you run
[bin/setup](https://github.com/civiform/civiform-deploy/blob/main/bin/setup), which then calls 
run.py(https://github.com/civiform/cloud-deploy-infra/blob/main/cloud/shared/bin/run.py). 
Because run.py is in a different repository, it requires development across different git repositories.
2. For the second flow you develope in the civiform-deploy-infra repository and run run.py from there.

#### Create civiform config (shared for both flows)

First you need a config file, which contains key value pairs to configure the deployment
(e.g. choice of cloud provider and infra, timezone settings, authentication provider etc). 
Inside your cloud-deploy git repository and the branch you are working on do the following:

1. Create a file "civiform_config.sh" by copying [civiform_config.example.sh](https://github.com/civiform/civiform-deploy/blob/main/civiform_config.example.sh) 
2. Modify APP_PREFIX to be unique - it is used as a prefix for all resources created. For example, use your username

You can use the [AWS](https://github.com/civiform/civiform-staging-deploy/blob/main/aws_staging_civiform_config.sh) and 
[Azure](https://github.com/civiform/civiform-staging-deploy/blob/main/azure_staging_civiform_config.sh)
config files as additional examples.

TODO(#4324) complete the list of values that need to be changed as a minimal set for deployment to work (step 2).

### Flow 1: Running locally from within civiform-deploy (like operations at a civic entity would)

Once you have adapted the configuration file you can run the deployment script. 
Run the script from your civiform-deploy repository's root directory:
```
[bin/setup](https://github.com/civiform/civiform-deploy/blob/main/bin/setup)
```
Setup will ask you to confirm multiple times and to provide secret values. You can enter random values and click yes as needed.
At the end the script should print url to your dev server!

Remember that if you have any changes in your civiform-deploy-infra repository which you would like to be visible in your deployment, 
you have to have gone through the git setup steps in the prerequisits previously to ensure that the newest version is copied
from your civiform-deploy-infra to your civiform-deploy repository. Also make sure commit the changes to the relevant 
branch in git before running the script.

### Flow 2 Running the deploy script from within civiform-deploy-infra
Running the deploy scripts from civiform-deploy as described above has the downside that you are developing across multiple git 
repositories and need to keep them in sync. In most cases you can avoid the extra abstraction layer by running the scripts,
which [setup](https://github.com/civiform/civiform-deploy/blob/main/bin/setup) is calling, directly in civiform-deploy-infra. 
You can use the copy of civiform_config.sh that you have already created in civiform-deploy and pass it as a parameter to the run script:

TODO([#4324](https://github.com/civiform/civiform/issues/4324)) These steps are currently failing and need to be updated 
¸
Use [run.py](https://github.com/civiform/cloud-deploy-infra/blob/main/cloud/shared/bin/run.py) with necessary parameters.

* To setup (run once): `cloud/shared/bin/run.py --command=setup --tag=latest --config=<path_to_config>`
* To deploy: `cloud/shared/bin/run.py --command=deploy --tag=latest --config=<path_to_config>`
* You can pass any terraform command into --command flag for example `cloud/shared/bin/run.py --command="terraform init" --tag=latest --config=<path_to_config>`

As before, setup will ask you to confirm multiple times and to provide secret values. You can enter random values and click yes as needed.
At the end the script should print url to your dev server!

#### Tear down

After you're done with your instance - please tear down. You can run

```
cloud/shared/bin/run.py --command=destroy
```

### Viewing local server changes in your deployment

Please note that at the time of writing this is only supported for linux machines due to this issue.

In some cases you will want to see changes you made to your local server in your local deployment, for example if you want to 
test that a configuration value that is supposed to change the UI is effective. 
The deployment scripts download the civiform image from dockerhub. Because the image will be run on AWS, it needs to be publically pullable
and you can not use your local version directly.

#### Creating a Dockerhub account
Instead, you have to build an image locally, publish it on dockerhub and tell the deployment to use that image.
If you don't have a dockerhub acount yet, you can register [here] {https://hub.docker.com/}.
* Then see your dockerhub at https://hub.docker.com/u/<your_dockerhub_name>, 
* Click on Repositories at the top
* Click on "Create Repository"
* Follow the steps, in the following we'll presume that you named your repository "civiform" so that it will be available at <your_dockerhub_name>/civiform

#### Building your docker image locally

In your civiform repository, 
* open bin/build-prod
* change "civiform/" to "<your_dockerhub_name> wherever you find it
* run bin/build-prod

Push the image to your repository
* check the image is present with '''docker images'''
* push it to docker with '''docker push <your_cockerhub_name>/civiform:latest'''. (If you get an access denied error, you may need to log into your docker account with '''docker login''')
* go to your dockerhub at https://hub.docker.com/u/<your_dockerhub_name> to check the image has been updated

#### Pointing your deployment at your docker image
* Open app.tf (https://github.com/civiform/cloud-deploy-infra/blob/main/cloud/aws/templates/aws_oidc/app.tf#L37) 
* Change the container image to '''container_image              = “jessbumblebee/civiform:latest” '''

###  A typical full development cycle across 3 branches

The below describes a flow for seeing changes across all three branches (civiform-deploy, civiform-deploy-infra and civiform).

#### Server changes
Make your Server changes (e.g. UI changes that depend on a config value reaching the server)
* Make your change in the civiform repository
* from the root of your civiform repository build a docker image '''docker build -t <your_dockerhub_name>/civiform:latest .'''
* push the image to dockerhub '''docker push <your_dockerhub_name>/civiform:latest'''
* Check on dockerhub that the image is visible and has the correct timestamp

Make your deployment use the civiform image you created locally(to see server changes)
* In [app.tf](https://github.com/civiform/cloud-deploy-infra/blob/main/cloud/aws/templates/aws_oidc/app.tf#L37) in the 
the deploy-infra repository, change the image you use      '''container_image              = "jessbumblebee/civiform:latest" '''
* git add and git commit your changes 

#### Deployment system changes

Make your changes
* Change to the civiform-deploy-infra repository and do your code changes

Double check that setup script sees the changes
* Change to the civiform-deploy repository
* Ensure that your checkout.sh copies your changes from the correct git branch in civiform-deploy-infra (see Prerequisits)

#### Run the deployment script
Run the script from the civiform-deploy repository
 * If you need to make any further changes to civiform_config.sh, do so
 * run '''yes yes | bin/set''' 

## Optimizing your flow


### Running individual Python files

While you make changes to the deploy system, you may want to test your changes without having to run the whole deployment script.
This can optimize your workflow in some cases, but may not always be necessary (e.g. if the deploy scripts run your code very early)
The recommended way to try/run individual bits of our python code, is to run the file via its tests. The second option is to run it directly. 

In both cases you have to ensure that the file you are running is visible to Python.
The error you will get when Python can't find the files is usually something along the lines of
'ModuleNotFoundError: No module named <someModule>'
In this case you have to add the current folder and its sub-folders to the existing PYTHONPATH by calling the following from command line:

'''export PYTHONPATH=./cloud:$PYTHONPATH'''

#### Running python code via tests:

This has a few advantages: You are not adding any code in the source and therefore don't have to remove it before running the whole deploy system. The code you write to run the file can often very easily serve as additional test coverage! Existing tests also often already contain code that executes the relevant lines (less work for you understanding and writing the code).

* If the file does not have tests yet, add a test file. Tests for other files can server as an example. Our python tests are usually located in the same folder as the source code.
* Check if there is a test case that executes your code. The easiest way is to add a print() statement and see if gets printed. If no test case for the relevant lines exists, you can add a new one.
* Call the test with 'python3 path/to/your/testfile'

Once you are done with your testing and experimenting consider turning your temporary test into a real one to increase coverage (Wohoo! Extra tests with little etra effort!)

#### Running python code directly from the file

There are a couple of disadvantages to this approach: You have to remember to remove the code you are adding before running the full deploy script. You also have to write all the calls that run relevant bits yourself whereelse tests often already do that for you.

* In the source code(e.g. path/to/your/file) create the objects and call the methods that you would like to be executed. In the example below you want to run the load_config method and the tf_config_vars method of the class ConfigLoader and print out the result. You add the following code to the end of the file that you will run afterwards
''' 
     config_loader = ConfigLoader()
     validation_errors = config_loader.load_config("/Users/jhummel/Civiform/civiform-deploy/civiform_config.sh")
     print(validation_errors)
     tf_config_vars = config_loader.get_terraform_variables()
     print(tf_config_vars)
'''
* Run the code by calling 'python3 path/to/your/file'

### Automating your manual flow via ~/.bashrc

TODO([#4324](https://github.com/civiform/civiform/issues/4324))

### Avoid having to enter values manually when running deploy scripts

TODO([#4324](https://github.com/civiform/civiform/issues/4324))

## Additional Tips and tricks

### Running more terraform commands

If you need to run a terraform command that's not exported in a script:
1. Run `run.py` script to create tfvars from your config (otherwise you will need to populate them all by hand)
2. Use chdir to run commands directly

For example:

```
terraform -chdir=cloud/aws/templates/aws_oidc plan
```

### Running individual Python files

TODO([#4324](https://github.com/civiform/civiform/issues/4324))


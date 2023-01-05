# Deploy system testing overview

## Code

Deployment related code can be found in
https://github.com/civiform/cloud-deploy-infra.

Scripts that a user would run are in
https://github.com/civiform/civiform-deploy.

## Unit tests

Current unit test coverage is unknown but likely low. Select python files have
associated \_test.py tests. These tests are run on every pull request using the
[run_pytest](https://github.com/civiform/cloud-deploy-infra/blob/main/.github/workflows/run_pytest.yaml)
github action.

## End to end (e2e) tests

We have one end to end test that runs the deploy tool in a fresh AWS account.

### AWS e2e tests accounts

There is currently one AWS account used for e2e tests. It is created under the
root CiviForm dev organization and named 'cloud-deploy-infra-tests-0'.

To create a new e2e test account: 

1. Log in to the CiviForm dev AWS account and navigate to the ['AWS
   Organizations'
   page](https://us-east-1.console.aws.amazon.com/organizations/v2/home/root).
1. Determine the next test account number by logging into the CiviForm dev AWS
   account.

	For example, if there was only one e2e test account
	'cloud-deploy-infra-tests-0', the next test account number would be 1. If
	there were two e2e test accounts 'cloud-deploy-infra-tests-0' and
	'cloud-deploy-infra-tests-1', the next test account number would be 2.
1. Click the 'Add an AWS account' button.

	![Add AWS account from AWS Organizations
	page](../../../.gitbook/assets/add-account.png)

1. Input the new account details:

   - 'AWS account name' field: input 'cloud-deploy-infra-tests-N' where N is
	 the next test account number.  For example, if the next test account
	 number was 2, input 'cloud-deploy-infra-tests-2'.
   - 'Email address of the account's owner' field: input
	 'cloud-deploy-infra-tests+N@civiform.dev' where N is the next test account
	 number. For example, if the next test account number was 2, input
	 'cloud-deploy-infra-tests+2@civiform.dev'.
   - 'IAM role name" field: leave the default of
	 'OrganizationAccountAccessRole'.
	
	![Add AWS account
	details](../../../.gitbook/assets/add-account-details.png)

1. Click the 'Create AWS account' button. The account creation will take a
minute or two. Once it is created you will see it in the 'Organizational
structure' list on the ['AWS Organizations'
page](https://us-east-1.console.aws.amazon.com/organizations/v2/home/root)
page. **Copy the account number listed for the newly created account. You will
need it in the next step.**

	![Newly created AWS account in Organizational structure
	list](../../../.gitbook/assets/new-account-in-list.png)

To log in the newly created e2e test account:

1. Click on the top-rightmost dropdown then click the 'Switch role' button.

	![Switch role dropdown](../../../.gitbook/assets/switch-role.png)

1. Input the following details:

  - 'Account' field: input the account number copied from the above step.
  - 'Role' field: input 'OrganizationAccountAccessRole'.
  - 'Display Name' field: input the account name, 'cloud-deploy-infra-tests-2'
	for example.

	![Switch role details](../../../.gitbook/assets/switch-role-details.png)

1. Click the 'Switch Role' button.  You should now be viewing the newly created
account. To verify, navigate to the ['IAM
dashboard'](https://us-east-1.console.aws.amazon.com/iamv2/home?region=us-east-1#/home).
On the right sidebar, the 'Account ID' should match the account number of the
newly created account.

To configure the newly created e2e test account so that e2e tests can run in
it:

1. Navigate to the ['IAM > Identity providers'
page](https://us-east-1.console.aws.amazon.com/iamv2/home?region=us-east-1#/identity_providers).
1. Click the 'Add provider' button.

	![Add provider from AWS IAM > Identity providers
	page](../../../.gitbook/assets/add-identity-provider.png)
1. Input the new provider details:

	- 'Provider type' selection: choose 'OpenID Connect'.
	- 'Provider URL' field: input
	  'https://token.actions.githubusercontent.com'. Click the 'Get thumbprint'
	  button.
	- 'Audience' field: input 'sts.amazonaws.com'.

	![Add provider
	details](../../../.gitbook/assets/add-identity-provider-details.png).
1. Click the 'Add provider' button.
1. Navigate to the ['IAM > Roles'
page](https://us-east-1.console.aws.amazon.com/iamv2/home?region=us-east-1#/roles).
1. Click the 'Create role' button.

	![Create role from AWS IAM > Roles
	page](../../../.gitbook/assets/add-role.png).
1. Input the new role identity provider details:

	- 'Trusted entity type' selection: choose 'Web identity'.
	- 'Identity provider' dropdown: choose
	  'token.actions.githubusercontent.com'.
	- 'Audience' dropdown: choose 'sts.amazonaws.com'.

	![New role identity provider
	details](../../../.gitbook/assets/add-role-details-provider.png)
1. Click the 'Next' button. In the 'Permissions policies' screen, search for
'SystemAdministrator'. Select the 'SystemAdministrator' policy. Click the
'Next' button.

	![Searching for and selecting the SystemAdministrator
	policy](../../../.gitbook/assets/add-role-details-policies.png)
1. Input the  new role details:

	- 'Role name' field: input 'e2e-test-runner'.
	- 'Description' field: input 'Role used by GitHub actions to run end-to-end
	  tests'.
1. Click the 'Create role' button. The created role should now be visible in
the ['IAM > Roles'
page](https://us-east-1.console.aws.amazon.com/iamv2/home?region=us-east-1#/roles).
Click on the 'e2e-test-runner' role name.

	![e2e-test-runner shown in the Roles
	list](../../../.gitbook/assets/role-in-list.png)
1. In the 'e2e-test-runner' role details screen, click on the 'Trust
relationships' tab then on the 'Edit trust policy' button.

	![Edit trust policy button in e2e-test-runner role detail
	page](../../../.gitbook/assets/edit-trust-policy.png)
1. Add `"token.actions.githubusercontent.com:sub":
"repo:civiform/cloud-deploy-infra:ref:refs/heads/main"` to the
`Statement.Condition.StringEquals` object.

	![Add new field to Statement.Condition.StringEquals
	object](../../../.gitbook/assets/edit-trust-policy-details.png)
1. Click the 'Update policy' button.

The new account is ready to be used for e2e tests!  To recap, you:

1. Created a new e2e test account in the CiviForm dev AWS organization.
1. Logged into the new account by switching roles into the default
OrganizationAccountAccessRole role created in the new account.
1. Added the GitHub OpenID Connect (OIDC) identity provider to the new AWS
account.
1. Added an e2e-test-runner role that can be assumed by entities provided by
the GitHub OIDC provider (GitHub action runners).
1. Edited the e2e-test-runner role trust policy so that only GitHub action
runners scoped to the civiform/cloud-deploy-infra main branch are allowed to
assume the e2e-test-runner role.

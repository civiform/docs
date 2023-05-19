# Deploy System Troubleshooting

For Azure specific steps, also see [Dev Azure](dev-azure.md) page.

## I can't see my changes in the deployment

Possible reasons when you are running the setup script from the `civiform-deploy` repository and your changes are in the `cloud-deploy-infra` repository:
* Your changes are not copied into your `civiform-deploy` repository from the correct branch in `cloud-deploy-infra`. Solution: check the steps in the [prerequisites](https://docs.civiform.us/contributor-guide/developer-guide/prerequisites) for working across git repositories.
* The changes in your `cloud-deploy-infra` repository are not committed in git. Solution: commit and run the scripts again.

Possible reasons for not seeing your Server changes in your deployment
* You are not using your custom image. Solution: follow the instructions for "Viewing local server changes in your deployment" in the [developer guide](https://docs.civiform.us/contributor-guide/developer-guide/developer-guide).
* You have built your image on a Mac (this is currently broken)

## Error acquiring the state lock

```
│ Error: Error acquiring the state lock
│ 
│ Error message: ConditionalCheckFailedException: The conditional request
│ failed
│ Lock Info:
│   ID:        XXXXXXX
```

This could happen if you cancel a deployment manually either on local or in the github action.

To unlock, run:
 
```
 terraform -chdir=cloud/aws/templates/aws_oidc init
 terraform -chdir=cloud/aws/templates/aws_oidc force-unlock LOCK_ID

```
# Deploy system Troubleshooting

For Azure specific steps also see [Dev Azure](dev-azure.md) page.

## I can't see my changes in the deployment

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

To unlock run:
 
```
 terraform -chdir=cloud/aws/templates/aws_oidc init
 terraform -chdir=cloud/aws/templates/aws_oidc force-unlock LOCK_ID

```
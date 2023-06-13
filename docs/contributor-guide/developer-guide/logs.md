# How to check AWS logs (staging)

First, make sure your AWS account is set up with the *OrganizationAccountAccessRole*.  See [prerequisites document](https://github.com/civiform/docs/blob/main/docs/contributor-guide/developer-guide/deploy-system/prerequisites.md).

Follow this [link](https://us-east-1.console.aws.amazon.com/ecs/v2/clusters/exygy-civiform/services/exygy-civiform-service/logs?region=us-east-1) or manually navigate with the steps below.

1. From the AWS Organizations Dashboard, enter ECS into the Search bar at the top of the page.
2. Click on “Elastic Container Service” from the list of results.
3. Click on “Clusters” in the left menu.
4. If the “exygy-civiform” cluster doesn’t appear in the list, select “N. Virginia” from the region dropdown menu at the top right.
5. Click on the “exygy-civiform” cluster.
6. Click on “exygy-civiform-service”.
7. Select the “Logs” tab.
8. Search for the desired logs by using the filter.
9. If you want more detailed logs, including stack traces, click on “View in CloudWatch”.
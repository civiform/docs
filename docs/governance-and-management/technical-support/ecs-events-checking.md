# Checking AWS ECS Events

## Background

When applicants report 500 errors or you notice them in ECS logs, the root cause may be ECS (Elastic Container Service) containers being marked unhealthy and restarted. This causes brief windows where the database connection pool (HikariPool) is exhausted, resulting in errors like:

```
SQLTransientConnectionException: HikariPool-default - Connection is not available, request timed out after 30000ms.
```

This guide walks through how to check whether that's happening. For how to find and filter application logs in ECS, see [Finding and Filtering ECS Logs](finding-and-filtering-ecs-logs.md).

## How to Check ECS Events

1. Sign in to the [AWS Console](https://console.aws.amazon.com/) and select the correct account and region from the top-right dropdown.
2. Go to **Amazon Elastic Container Service** → **Clusters**.
3. Click your CiviForm cluster (e.g., `prod-civiform`).
4. Under the **Services** tab, click your service (e.g., `prod-civiform-service`).
5. Select the **Events** tab.
6. Filter the date range to cover the time window when errors were reported.

If you've landed in the right place, you should see the **Events** tab for your service with a filterable list of events, like this:

![ECS Events tab for your CiviForm service](../../.gitbook/assets/ecs-events-tab-date-filter.png)

## What to Look For

Look for a line like `Amazon ECS replaced 1 tasks due to an unhealthy status`. That means ECS swapped out a container that was failing health checks, which can cause brief 500 errors or HikariPool timeouts around that time. This is expected behavior and not a cause for concern if it happens occasionally.

If you see that unhealthy message **multiple times in a short window**, or deregistered → stopped → started → registered cycling over and over without a `deployment completed` line, it may indicate an underlying issue. Contact the CiviForm support team at civiform-government-support@exygy.com or in the #gov-support Slack channel (tag @support in your message).

During a planned deployment, you will see tasks start and stop, targets deregister, connections drain, etc, which is normal behavior.

This is an example of what the events will look like during a normal deployment. Note there is no `replaced ... due to an unhealthy status` line. If yours looks like this or similar, no escalation is needed:

![ECS Events during a normal deployment — deployment completed and steady state, with no unhealthy replacement message](../../.gitbook/assets/ecs-events-normal-deregister.png)

## What to Do

| Situation | Action |
| --- | --- |
| Containers restart due to unhealthy status **infrequently** | Monitor and keep an eye on it. AWS restarts the task automatically, so user impact should be brief. |
| Containers restart **repeatedly or frequently** | Flag it to the CiviForm support team and share a screenshot of the ECS Events tab showing the pattern, plus any log lines containing `HikariPool-default - Connection is not available`. |

AWS restarting the task automatically means errors should be short-lived, but repeated restarts may point to an underlying bug worth investigating. To notify the CiviForm team, follow the steps in [Notifying the CiviForm team](finding-and-filtering-ecs-logs.md#notifying-the-civiform-team).
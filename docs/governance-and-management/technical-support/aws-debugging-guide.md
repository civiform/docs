# AWS Debugging Guide

This is a quick-reference guide for governments troubleshooting a CiviForm deployment on AWS. It covers how to find logs, filter them for relevant events, and notify the CiviForm government support team.

## Finding Logs

CiviForm runs as a containerized service on Amazon ECS (Elastic Container Service). All container output is streamed to CloudWatch Logs and is also accessible directly from the ECS console.

### Navigating to the Logs Tab

1. Sign in to the [AWS Console](https://console.aws.amazon.com/) and select the correct account and region (e.g., **US East (N. Virginia)**) from the top-right dropdown.
2. Go to **Amazon Elastic Container Service** → **Clusters**.
3. Click your CiviForm cluster (e.g., `prod-civiform`).
4. Under the **Services** tab, click `prod-civiform-service`.
5. Select the **Logs** tab.

You will see a paginated log stream from all running containers. The columns are:

- **Timestamp** — when the log line was emitted (shown in UTC-5:00 by default)
- **Message** — the raw log output
- **Task** — the ECS task ID that generated the log
- **Container** — which container within the task (e.g., `prod-metrics-scraper`, `civiform`)

{% hint style="info" %}
If you see the banner "Response size limits prevent displaying some newer logs," reduce your time range or toggle **Continue fetching** on.
{% endhint %}

## Filtering Logs in the ECS Console

Use the filter controls at the top of the Logs tab to narrow down what you see.

**Filter by keyword**

Type a word or phrase into the **Filter logs** search bar and press Enter. Useful patterns:

| Goal               | Search term            |
| ------------------ | ---------------------- |
| Application errors | `ERROR`                |
| Warnings           | `WARN`                 |
| Database issues    | `SQLException` or `db` |
| Auth failures      | `401` or `403`         |
| Server errors      | `500`                  |

**Filter by container**

Use the **Filter container** dropdown to isolate logs from a specific container. For most debugging, select `civiform` (the main app container).

**Filter by time range**

Click **Filter by a date and time range** to scope logs to a specific incident window. This is especially useful when triaging a bug if you know when it occurred.

## Notifying the CiviForm team

To get support from the CiviForm team, notify the government support team by tagging @support in the #gov-support channel on the CiviForm Slack or emailing civiform-government-support@exygy.com.

Include in your message:

1. A screenshot or video of the error happening on CiviForm
2. The log from AWS that you think is associated with the error
3. Detailed instructions for how to re-create the error

## Example: Emails not sending from CiviForm on status updates

A program admin is reporting that they are not receiving email updates from CiviForm. They try logging in at 4pm on March 12th, 2026. You can search the logs during this time period, filter to "ERROR", and find the following logs:

```
[1;31mERROR[0;39m s.e.a.SimpleEmail - software.amazon.awssdk.services.ses.model.MessageRejectedException: Email address is not verified. The following identities failed the check in region US-EAST-1: email@website.com (Service: Ses, Status Code: 400, Request ID: d2541cde-c320-41cf-9931-73c450e10224) (SDK Attempt Count: 1)
```

```
software.amazon.awssdk.services.ses.model.MessageRejectedException: Email address is not verified. The following identities failed the check in region US-EAST-1: email@website.com (Service: Ses, Status Code: 400, Request ID: d2541cde-c320-41cf-9931-73c450e10224) (SDK Attempt Count: 1)   at software.amazon.awssdk.services.ses.model.MessageRejectedException$BuilderImpl.build(MessageRejectedException.java:151)   at software.amazon.awssdk.services.ses.model.MessageRejectedException$BuilderImpl.build(MessageRejectedException.java:99)   at software.amazon.awssdk.core.internal.http.pipeline.stages.utils.RetryableStageHelper.retryPolicyDisallowedRetryException(RetryableStageHelper.java:168)   at software.amazon.awssdk.core.internal.http.pipeline.stages.RetryableStage.execute(RetryableStage.java:73)   at software.amazon.awssdk.core.internal.http.pipeline.stages.RetryableStage.execute(RetryableStage.java:36)   at software.amazon.awssdk.core.internal.http.pipeline.RequestPipelineBuilder$ComposingRequestPipelineStage.execute(RequestPipelineBuilder.java:206)   at software.amazon.awssdk.core.internal.http.StreamManagingStage.execute(StreamManagingStage.java:53)   at software.amazon.awssdk.core.internal.http.StreamManagingStage.execute(StreamManagingStage.java:35)   at software.amazon.awssdk.core.internal.http.pipeline.stages.ApiCallTimeoutTrackingStage.executeWithTimer(ApiCallTimeoutTrackingStage.java:82)   at software.amazon.awssdk.core.internal.http.pipeline.stages.ApiCallTimeoutTrackingStage.execute(ApiCallTimeoutTrackingStage.java:62)   at software.amazon.awssdk.core.internal.http.pipeline.stages.ApiCallTimeoutTrackingStage.execute(ApiCallTimeoutTrackingStage.java:43)   at software.amazon.awssdk.core.internal.http.pipeline.stages.ApiCallMetricCollectionStage.execute(ApiCallMetricCollectionStage.java:50)   at software.amazon.awssdk.core.internal.http.pipeline.stages.ApiCallMetricCollectionStage.execute(ApiCallMetricCollectionStage.java:32)   at software.amazon.awssdk.core.internal.http.pipeline.RequestPipelineBuilder$ComposingRequestPipelineStage.execute(RequestPipelineBuilder.java:206)   at software.amazon.awssdk.core.internal.http.pipeline.RequestPipelineBuilder$ComposingRequestPipelineStage.execute(RequestPipelineBuilder.java:206)   at software.amazon.awssdk.core.internal.http.pipeline.stages.ExecutionFailureExceptionReportingStage.execute(ExecutionFailureExceptionReportingStage.java:37)   at software.amazon.awssdk.core.internal.http.pipeline.stages.ExecutionFailureExceptionReportingStage.execute(ExecutionFailureExceptionReportingStage.java:26)   at software.amazon.awssdk.core.internal.http.AmazonSyncHttpClient$RequestExecutionBuilderImpl.execute(AmazonSyncHttpClient.java:210)   at software.amazon.awssdk.core.internal.handler.BaseSyncClientHandler.invoke(BaseSyncClientHandler.java:103)   at software.amazon.awssdk.core.internal.handler.BaseSyncClientHandler.doExecute(BaseSyncClientHandler.java:173)   at software.amazon.awssdk.core.internal.handler.BaseSyncClientHandler.lambda$execute$1(BaseSyncClientHandler.java:80)   at software.amazon.awssdk.core.internal.handler.BaseSyncClientHandler.measureApiCallSuccess(BaseSyncClientHandler.java:182)   at software.amazon.awssdk.core.internal.handler.BaseSyncClientHandler.execute(BaseSyncClientHandler.java:74)   at software.amazon.awssdk.core.client.handler.SdkSyncClientHandler.execute(SdkSyncClientHandler.java:45)   at software.amazon.awssdk.awscore.client.handler.AwsSyncClientHandler.execute(AwsSyncClientHandler.java:53)   at software.amazon.awssdk.services.ses.DefaultSesClient.sendEmail(DefaultSesClient.java:3519)   at services.email.aws.SimpleEmail.send(SimpleEmail.java:110)   at services.email.aws.SimpleEmail.send(SimpleEmail.java:71)   at services.applications.ProgramAdminApplicationService.sendApplicantEmail(ProgramAdminApplicationService.java:168)   at services.applications.ProgramAdminApplicationService.lambda$sendEmail$5(ProgramAdminApplicationService.java:382)   at java.base/java.lang.Iterable.forEach(Unknown Source)   at services.applications.ProgramAdminApplicationService.sendEmail(ProgramAdminApplicationService.java:381)   at services.applications.ProgramAdminApplicationService.setStatus(ProgramAdminApplicationService.java:145)   at controllers.admin.AdminApplicationController.updateStatus(AdminApplicationController.java:387)   at router.Routes$$anonfun$routes$1.$anonfun$applyOrElse$250(Routes.scala:4962)   at play.core.routing.HandlerInvokerFactory$$anon$8.resultCall(HandlerInvoker.scala:161)   at play.core.routing.HandlerInvokerFactory$JavaActionInvokerFactory$$anon$3$$anon$4$$anon$5.invocation(HandlerInvoker.scala:125)   at play.core.j.JavaAction$$anon$1.$anonfun$call$1(JavaAction.scala:128)   at play.api.mvc.BodyParser$.$anonfun$parseBody$4(Action.scala:241)   at scala.Option.getOrElse(Option.scala:201)   at play.api.mvc.BodyParser$.parseBody(Action.scala:239)   at play.core.j.JavaAction$$anon$1.call(JavaAction.scala:136)   at play.http.DefaultActionCreator$1.call(DefaultActionCreator.java:31)   at org.pac4j.play.java.SecureAction.lambda$internalCall$1(SecureAction.java:99)   at org.pac4j.core.engine.DefaultSecurityLogic.perform(DefaultSecurityLogic.java:151)   at org.pac4j.play.java.SecureAction.internalCall(SecureAction.java:93)   at org.pac4j.play.java.SecureAction.call(SecureAction.java:65)   at play.core.j.JavaAction.$anonfun$apply$8(JavaAction.scala:195)   at scala.concurrent.Future$.$anonfun$apply$1(Future.scala:687)   at scala.concurrent.impl.Promise$Transformation.run(Promise.scala:467)   at play.core.j.ClassLoaderExecutionContext.$anonfun$execute$1(ClassLoaderExecutionContext.scala:64)   at play.api.libs.streams.Execution$trampoline$.execute(Execution.scala:65)   at play.core.j.ClassLoaderExecutionContext.execute(ClassLoaderExecutionContext.scala:59)   at scala.concurrent.impl.Promise$Transformation.submitWithValue(Promise.scala:429)   at scala.concurrent.impl.Promise$DefaultPromise.submitWithValue(Promise.scala:338)   at scala.concurrent.impl.Promise$DefaultPromise.dispatchOrAddCallbacks(Promise.scala:312)   at scala.concurrent.impl.Promise$DefaultPromise.map(Promise.scala:182)   at scala.concurrent.Future$.apply(Future.scala:687)   at play.core.j.JavaAction.apply(JavaAction.scala:196)   at play.api.mvc.Action.$anonfun$apply$6(Action.scala:83)   at play.api.mvc.BodyParser$.$anonfun$runParserThenInvokeAction$1(Action.scala:260)   at scala.concurrent.impl.Promise$Transformation.run(Promise.scala:470)   at org.apache.pekko.dispatch.BatchingExecutor$AbstractBatch.processBatch(BatchingExecutor.scala:73)   at org.apache.pekko.dispatch.BatchingExecutor$BlockableBatch.$anonfun$run$1(BatchingExecutor.scala:110)   at scala.runtime.java8.JFunction0$mcV$sp.apply(JFunction0$mcV$sp.scala:18)   at scala.concurrent.BlockContext$.withBlockContext(BlockContext.scala:94)   at org.apache.pekko.dispatch.BatchingExecutor$BlockableBatch.run(BatchingExecutor.scala:110)   at org.apache.pekko.dispatch.TaskInvocation.run(AbstractDispatcher.scala:59)   at org.apache.pekko.dispatch.ForkJoinExecutorConfigurator$PekkoForkJoinTask.exec(ForkJoinExecutorConfigurator.scala:57)   at java.base/java.util.concurrent.ForkJoinTask.doExec(Unknown Source)   at java.base/java.util.concurrent.ForkJoinPool$WorkQueue.topLevelExec(Unknown Source)   at java.base/java.util.concurrent.ForkJoinPool.scan(Unknown Source)   at java.base/java.util.concurrent.ForkJoinPool.runWorker(Unknown Source)   at java.base/java.util.concurrent.ForkJoinWorkerThread.run(Unknown Source)
```

You report this issue to the CiviForm support team and send along the logs and instructions for what they were doing that they expected to send an email (in this case, updating a status).

The CiviForm team responds that this is likely due to a configuration error where the domain is not yet verified in SES. You need to follow the steps described in [Email Configuration](../../it-manual/sre-playbook/email-configuration.md)

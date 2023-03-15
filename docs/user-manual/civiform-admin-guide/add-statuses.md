# Create & Edit Custom Status Options for Programs

As a CiviForm Admin, you have the ability to set custom statuses (e.g. Approved, Waitlisted) and email content for each program. Once you create and publish statuses for a given program, the Program Admin will be able to set statuses for each application submitted to their program.

For statuses with associated email content, a status change will trigger an email to applicants that used a CiviForm account to submit their application. The applicant will also see the status of their submitted application(s) when they log into their CiviForm account.

Additionally, you can choose one of the statuses to be a default status. All new applications will automatically be set to this status, and the associated email for that status will be sent to the applicant.

Note: in order to use status tracking, your IT Admin must have enabled the feature. To enable the feature, have your IT Admin set the CIVIFORM_APPLICATION_STATUS_TRACKING_ENABLED environment variable to true.


## To Create a Status 
1. Sign in to CiviForm as a CiviForm Admin.
2. Click Programs on the navigation bar and select the program for which you would like to add statuses. 
3. Click the three dots on the right side of a draft program. 
4. Click Manage Statuses.
5. Click Create a New Status.
6. Enter your status name and (optional) any email text you would like the applicant to receive upon the status change.
7. Repeat steps 5-6 for all statuses you would like to create.
8. For any status you wish to set as default, check the "Set as default status" checkbox when creating or editing the status.

**Note**: you must Publish All Drafts in order for your statuses to go live. See [How to Publish Programs](publish-a-program.md) for instructions on publishing. 

**Tip**: Don’t see Manage Statuses as an option when you click the three dot icon? This is because you must add statuses to a Draft program, not an Active program. **To create a Draft version of your program**:
1. Sign in to CiviForm as a CiviForm Admin.
2. Click Programs on the navigation bar and find the program you are interested in. 
3. Click Edit on the right side of the program.
4. Click Programs on the navigation bar to return to the programs page, where you will now see a Draft version of your program. 

## To edit or delete a status: 
1. Sign in to CiviForm as a CiviForm Admin.
2. Click Programs on the navigation bar and select the program for which you would like to modify a status. 
3. Click the three dots on the right side of the program. 
4. Click Manage Statuses.
5. Click Edit or Delete.



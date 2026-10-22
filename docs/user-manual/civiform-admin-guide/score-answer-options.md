# Score answer options

CiviForm can add up a score for each application. A CiviForm Admin gives each answer option a number, turns on scoring for a program, and CiviForm adds up the scores of the options an applicant chose when they submit. Program Admins and Trusted Intermediaries see the score on the application. Applicants never see scores.

**Note**: Scoring is controlled by the `ANSWER_OPTION_SCORING_ENABLED` setting. If you don't see the **Score** fields or the **Enable application scoring** checkbox described below, ask the person who manages your CiviForm settings to turn it on.

## Add scores to answer options

Scores can be added to radio button, dropdown, and checkbox questions. Yes/No questions do not support scores.

1. Sign in to CiviForm as a CiviForm Admin.
2. Click **Questions** on the navigation bar.
3. Create a new radio button, dropdown, or checkbox question, or select an existing question and click **Edit draft**.
4. Under **Question settings**, enter a number in the **Score** field for each answer option.
5. Click **Create** or **Update**.

Things to know about scores:

* A score can be a whole number, a decimal, or a negative number, for example 5, 0.5, or -3.
* Either every option has a score or none of them do. If some options are blank, CiviForm shows an error when you save.
* A score can have at most 15 digits.
* An option with no score adds nothing to the total.

## Turn on scoring for a program

Scores only count in programs that opt in.

1. Sign in to CiviForm as a CiviForm Admin.
2. Click **Programs** on the navigation bar.
3. Create a new program, or select a program and click **Edit** > **Edit program details**.
4. Under **Application scoring**, check **Enable application scoring**.
5. Click **Save**.
6. Publish your changes.

**Note**: Scoring is not available for external programs.

## How scores are calculated

CiviForm calculates the score when the applicant submits their application:

* For a radio button or dropdown question, the score of the selected option is used.
* For a checkbox question, the scores of all the selected options are added together.
* Questions that the applicant did not see, because a screen was hidden by a visibility condition, are not counted.
* In a repeated set of questions (for example, one set of questions per household member), each repeated question is scored on its own and added to the total.
* The total can be zero or negative.

The score is saved with the application. If you change an option's score later, applications that were already submitted keep the score they had.

## Where scores appear

Program Admins and Trusted Intermediaries can see scores in:

* **The application PDF.** The total score appears at the top, each question shows its score, and checkbox questions also show the score next to each selected option. Trusted Intermediaries see this in the PDF they download after submitting an application for a client.
* **The CSV export.** Each scored question has a score column, and **Total Score** is the last column.
* **The JSON export and the API.** Each question has a `score` (or `scores` for checkbox questions), and each application has a `total_score`. The API documentation and schemas for the program include these fields.

Applicants do not see scores on their application, the confirmation page, or the PDF they download.

## Turning scoring off

* **Turning off scoring for a program.** Applications that were already scored keep their scores in the PDF, CSV, JSON, and API. Applications submitted while scoring is off do not get a score, even if you turn scoring on again later.
* **Turning off the `ANSWER_OPTION_SCORING_ENABLED` setting.** The score fields, the program checkbox, and all scores in exports are hidden. Nothing is deleted, and scores reappear when the setting is turned back on.

**Tip**: Avoid editing a scored question while the setting is turned off. If you add an answer option, it will not have a score, and CiviForm will ask you to add one the next time you save the question after the setting is turned back on.

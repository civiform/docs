# Manage program eligibility

There are programs that may have strict criteria for eligibility. For example, if an Applicant’s date of birth is earlier than the qualifying year, they shouldn't be able to submit an application.

Using eligibility conditions, CiviForm Admins can screen applicants who don't meet the minimum requirements for a program early in the application process, as well as show applicants cases when there is a program they may qualify for, based on their previous answers.

### Add an eligibility condition

1. Sign in to CiviForm as a CiviForm Admin.
1. Click **Programs** on the navigation bar.
1. Click **Edit** for the program you would like to add a condition for.
1. Select a screen you wish to add an eligibility condition for and click **Edit eligibility condition**.
1. On the Eligibility Condition page, under **New eligibility condition**, select the question(s) you would like to use for your condition and then click **Add condition**.
1. For each question in your condition:
    1. Set the **Field** data type.
    1. Set the **Operator** value.
    1. Enter the **Value**.
    1. Click **Save condition**.
1. The eligibility condition is displayed on both the Eligibility Condition page and the screen. For example, “Screen 3 is eligible if _household size question name_ Number is less than 2."

Multiple allowable values can be specified for a given set of questions in a condition. For example, if a condition uses two questions, household size (number) and household income (currency), multiple combinations of household size and income pairings can be specified that meet the condition. To add additional value groups, click **+Add values** on the Configure Eligibility Conditions page and fill in the additional values.

### Edit an eligibility condition

1. Sign in to CiviForm as a CiviForm Admin.
1. Click **Programs** on the navigation bar.
1. Click **Edit** for the program you would like to edit a condition for.
1. Select a screen you wish to edit an eligibility condition for and click **Edit eligibility condition**.
1. Click **Edit existing eligibility condition**.
1. Follow steps in "Add an eligibility condition" for configuring the condition.

### Remove an eligibility condition

1. Sign in to CiviForm as a CiviForm Admin.
2. Click **Programs** on the navigation bar and select a program.
3. Select a screen with an eligibility condition and click **Edit eligibility condition**.
4. Click **Remove existing eligibility condition**.
5. Click **Return to edit screen #**.
6. The eligibility condition is removed from both the Eligibility Condition page and to the screen.

### Rules for eligibility conditions

The following rules apply when trying to understand eligibility conditions:

* There can only be one eligibility condition per screen (but can be across multiple questions).
* When using a text field, the value should not be in quotes.
* When using the operators "is one of" or "is not one of" on text values, the text should be in a comma-separated list. For example, blue,green,purple. The eligibility condition fires if the answer to the question is blue or green or purple.

# Show or hide questions based on inputs

When creating programs, some application questions might not need to be displayed when based on the answers to previous questions. For example, if an Applicant’s date of birth is earlier than the qualifying year, a screen displaying a discount code for older adults is unnecessary.

Using a visibility condition, CiviForm Admins can easily show or hide a screen based on the answer to any question within the program.

**Important**: If you create a visibility condition based on a question that’s potentially hidden behind a different visibility condition, unexpected behaviors might occur.

### Add a visibility condition

1. Sign in to CiviForm as a CiviForm Admin.
2. Click **Programs** on the navigation bar and select a program.
3. Click **Edit** > **Manage questions**.
4. Select a screen you wish to show or hide and click **Edit visibility condition**.
5. On the Visibility Condition page, select a program question to filter on.
6. In the visibility condition modal dialog:
   1. Select if the screen should be either **hidden if** or **shown if**.
   2. Set the **Field** data type.
   3. Set the **Operator** value.
   4. Enter the **Value**.
   5. Click **Submit**.
7. Click **Return to edit screen #**.
8. The visibility condition is displayed on both the Visibility Condition page and to the screen. For example, “Screen 3 is hidden if _address question name_ City is equal to New York."

### Remove a visibility condition

1. Sign in to CiviForm as a CiviForm Admin.
2. Click **Programs** on the navigation bar and select a program.
3. Select a screen with a visibility condition and click **Edit visibility condition**.
4. Click **Remove condition**.
5. Click **Return to edit screen #**.
6. The visibility condition is removed from both the Visibility Condition page and to the screen. The default statement “This screen is always shown" is displayed on the page.

### Rules for visibility conditions

The following rules apply when trying to understand visibility conditions:

* There can only be one visibility condition per screen.
* Creating a visibility condition replaces any existing visibility condition.
* You can only add a visibility condition for questions used in previous screens. For example, adding a date question to Screen 2 means it’s available for selection in Screen 3. Questions in Screen 3 are not available for selection.
* When using a text field, the value should not be in quotes.
* When using the operators "is one of" or "is not one of" on text values, the text should be in a comma-separated list. For example, blue,green,purple. The visibility condition fires if the answer to the question is blue or green or purple.

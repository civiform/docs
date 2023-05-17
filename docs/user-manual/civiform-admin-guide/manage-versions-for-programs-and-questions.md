# Manage versions for programs & questions

Questions can be shared between programs. If the wording for a question changes, it does so for all programs that use it. However, programs can be set up to show or hide specific questions based on previously answered questions. These dependencies can be different for the same questions across different applications.

To account for this use case, CiviForm allows versioning of programs and questions when making changes instead of overwriting the existing version. This means when Applicants begin an application, they remain on that version even if the program or questions are updated.

When you publish all drafts, all changes to programs and questions are published together. The versioning and change publishing system bundles the entire set of configuration objects together in a versioned configuration set using a version number. A given version includes its own question set and program definition set including the program application and data export configuration. This means a version can only reference questions in the same versioned configuration set.

Read more about the [data versioning model](../../contributor-guide/developer-guide/system-design/data-versioning-model.md).

### Update program version

1. Sign in to CiviForm as a CiviForm Admin.
2. Click **Programs** on the navigation bar.
3. Locate the program you'd like to update.
4. Click on the three dots to open the dropdown menu for that program.
5. Click **Edit** to create a draft version of the program.
6. Modify the program information fields, edit questions, etc.\
   **Note**: You can’t edit the internal Program Name field.

### Update question version

1. Sign in to CiviForm as a CiviForm Admin.
2. Click **Questions** on the navigation bar and select a question.
3. Click **Edit** to create a draft version of the question.
4. Modify the question information fields.
5. Click **Update**.

### Rules for versioning

The following rules apply when trying to understand versioning:

* Individual configuration objects (for example, programs) cannot be versioned independently of the complete version set.
* There can only be one unpublished version in the system at a time.
* Once a version is published, it’s locked and cannot be modified.
* New versions are initialized with a complete copy of the current published version.
* Applicants are pinned to the version they began their first program application with. They remain on that program version until it’s been submitted.
* When a CiviForm Admin modifies a question, CiviForm displays a list of programs using the question.
* A new draft is created when an existing draft is published.

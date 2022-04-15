# Manage versions for programs & questions

Once published, questions can be shared between programs. If the wording for a question changes, it does so for all programs that use it. However, program applications can be set up to show or hide specific questions based on previously answered questions. These dependencies can be different for the same questions across different applications.

To account for this use case, CiviForm allows versioning of programs and questions when making changes instead of overwriting the existing version. This means when Applicants begin an application, they remain on that version even if the program or questions are updated.

When you publish all drafts, all changes to programs and questions are published together. The versioning and change publishing system bundles the entire set of configuration objects together in a versioned configuration set using a version number. A given version includes its own question set and program definition set including the program application and data export configuration. This means a version can only reference questions in the same versioned configuration set.

Read more about the [data versioning model](../../contributor-guide/developer-guide/system-design/data-versioning-model.md).

### Update program version

1. Sign in to CiviForm as a CiviForm Admin.
2. Click **Programs** on the navigation bar and select a program.
3. Click **New version** to create a draft version of the program.
4. Modify the program information fields, edit questions, etc.\
   **Note**: You can’t edit the internal Program Name field.
5. Click **Save**.

### Update question version

1. Sign in to CiviForm as a CiviForm Admin.
2. Click **Questions** on the navigation bar and select a question.
3. Click **New version** to create a draft version of the question.
4. Modify the question information fields.
5. Click **Update**.

### View or revert to earlier versions

You can easily view or restore earlier published versions.

1. Sign in to CiviForm as a CiviForm Admin.
2. Click **Versions**.
3. Locate a previous version using the version ID or the Publish Time columns.\
   You can also view the number of programs and questions added or edited since the last time it was published.
4. (Optional) To revert to this version, click **Set live**.

### Rules for versioning

The following rules apply when trying to understand versioning:

* Individual configuration objects (for example, programs) cannot be versioned independently of the complete version set.
* There can only be one unpublished version in the system at a time.
* Once a version is published, it’s locked and cannot be modified.
* New versions are initialized with a complete copy of the current published version.
* A CiviForm Admin can revert to previously published versions using the “Set live” button.
* Applicants are pinned to the version they began their first program application with. They remain on that program version until it’s been submitted.
* When a CiviForm Admin modifies a question, CiviForm displays a list of programs using the question.
* A new draft is created when an existing draft is published.

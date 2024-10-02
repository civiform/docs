# Migrating programs between environments

## Overview

Program migration is a feature to allow programs and their associated questions to be moved between CiviForm environments.

## Feature Flags

There are two feature flags to be aware of for Program Migration:

1. PROGRAM_MIGRATION_ENABLED
   - You must enable this feature flag to use either version of program migration
   - Use this flag when you want to import a program into an environment that already has existing programs. Programs imported using this flag will not affect any programs in the import environment.
   - Using this flag will create duplicate questions if there are questions in the import environment that match questions being imported (match is determined by the question admin name). We suggest you replace the duplicate questions with existing ones after importing your program, so your applicants benefit from CiviForm’s shared question model.
   - You can find questions that were duplicated, since their admin names will have -1 or another number attached to it. Once you replace duplicate questions in new imported programs, you can archive the duplicate questions that were created.

2. NO_DUPLICATE_QUESTIONS_FOR_MIGRATION_ENABLED
   - The PROGRAM_MIGRATION_ENABLED feature flag must also be enabled for this to work.
   - Use this flag when you want to import many programs with overlapping questions into a fresh environment.
   - If there are existing programs or questions in the import environment, they must be published before importing a new program.
   - Importing a program with this flag enabled will put all programs into draft mode.
   - Importing a program with this flag enabled will update any questions that already exist in the import environment, which means updating any programs that contain those questions. This is why we do not recommend using this flag if there are already programs in the import environment, especially if you are importing into a production environment.
  
## Exporting a Program

1. Once the PROGRAM_MIGRATION_ENABLED flag is enabled, you will see a new menu item for each program on the program dashboard page that says “Export program”.
   <img width="496" alt="Export program image" src="https://github.com/user-attachments/assets/9a415c91-8ceb-4395-ad0a-6e69100e0e1d">
2. Click this to be taken to the program export page for that program.
3. From there you will have the option to download or copy a json representation of the program.
4. Program export works for programs that are in draft or active mode. Either way they will be imported as drafts into the new environment.

## Importing a program

1. Once the PROGRAM_MIGRATION_ENABLED flag is enabled, you will see a new link on the program dashboard page that says “Import existing program”.
   <img width="498" alt="Import program image" src="https://github.com/user-attachments/assets/9554f809-cc4a-4743-a545-83727ad126c7">
2. Click this link to be taken to the program import page and follow the instructions there to import a program.

## Program Settings That Are Not Migrated

There are a few program and question settings that are not yet being migrated over. You will have to manually set these in your import environment after importing a new program:

- Program images
- Program statuses (and their associated translations)
- Any categories assigned to the program
- TI groups associated with the program
- Primary Applicant Info settings applied to questions

## Potential Errors

Situations in which you might get an error include:

- Attempting to import a program that is larger than 256,000 characters.
  - We do not currently support importing programs that are larger than 256,000 characters. If you need to import a program that is larger than this limit, contact the engineering team and we can look into raising the size limit.
- Attempting to import a program with an admin name that matches the admin name of an existing program.
  - You can resolve this by editing the program admin name in the json, but please be careful when doing so and only use lowercase letters with dashes between words. Using invalid characters in a program admin name will result in another error.
- Exporting a program from an environment that is on a different CiviForm version than the import environment.
  - Please try to make sure environments are on the same CiviForm version before migrating programs between them. If they are on different versions, you might see an error about an expected field missing.
- Attempting to import a program with program visibility set to “Visible to selected trusted intermediaries only” (shows up as “SELECT_TI” in the program json)
  - Since we don’t migrate ti groups with the program, you must select a different visibility for the program before migrating.
- Programs are in draft mode.
  - With the NO_DUPLICATE_QUESTIONS_FOR_MIGRATION_ENABLED flag enabled, you must make sure all programs and questions are published before attempting to import a new program.

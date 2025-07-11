# Migrating and importing programs

## Overview

Program import is a feature to allow programs and their associated questions to be imported into a CiviForm environment. Imported programs may be migrated from one CiviForm environment to another or imported from another source.

## Handling question collisions

If a program you are importing shares questions with an existing program in your import environment, you can decide whether you want to create a new duplicate question, use the existing question, or overwrite the existing defintion in your question bank. "Shared questions" are determined by the question admin name. Here are our recommendations for when to choose which option:

1. Reuse the existing question (Default)
   - Use this option when you want to import a program into an environment that already has existing programs and you want to reuse the questions in the import environment.
   - Use this option when you want to import many programs with overlapping questions into a fresh environment.
   - The newly imported program will benefit from CiviForm's shared question model.
   - If there are existing programs or questions in the import environment, they must be published before importing with this option.

2. Create a duplicate question
   - Use this when you are confident the imported question should not be the same as the existing question. Questions imported using this option will not affect any questions in the import environment.
   - You can find questions that were duplicated, since their admin names will have `-_- a` or another letter attached to it.

3. Overwrite the existing question
   - Use this option when you want to update an existing question in the import environment with the definition of the question from the program you are importing.
   - Importing a question with this option will update the question that already exists in the import environment, which means updating any programs that contain that question. We do not recommend using this option in a production environment.
   - If there are existing programs or questions in the import environment, they must be published before importing with this option.
  
## Exporting a Program

1. Each program on the program dashboard page has a menu item that says “Export program”.
   <img width="496" alt="Export program image" src="https://github.com/user-attachments/assets/9a415c91-8ceb-4395-ad0a-6e69100e0e1d">
2. Click this to be taken to the program export page for that program.
3. From there you will have the option to download or copy a json representation of the program.
4. Program export works for programs that are in draft or active mode. Either way they will be imported as drafts into the new environment.

## Importing a program

1. Look for the “Import existing program” link on the program dashboard page.
   <img width="498" alt="Import program image" src="https://github.com/user-attachments/assets/9554f809-cc4a-4743-a545-83727ad126c7">
2. Click this link to be taken to the program import page and follow the instructions there to import a program.

## Program Settings That Are Not Migrated

There are a few program and question settings that are not yet being migrated over. You will have to manually set these in your import environment after importing a new program:

- Program images
- Program statuses (and their associated translations)
- Any categories assigned to the program
- TI groups associated with the program
- Primary Applicant Info settings applied to questions
- "pre-screener" setting on a program

## Potential Errors

Situations in which you might get an error include:

- Attempting to import a program that is larger than 512,000 characters.
  - We do not currently support importing programs that are larger than 512,000 characters. If you need to import a program that is larger than this limit, contact the engineering team and we can look into raising the size limit.
- Attempting to import a program with an admin name that matches the admin name of an existing program.
  - You can resolve this by editing the program admin name in the json, but please be careful when doing so and only use lowercase letters with dashes between words. Using invalid characters in a program admin name will result in another error.
- Exporting a program from an environment that is on a different CiviForm version than the import environment.
  - Please try to make sure environments are on the same CiviForm version before migrating programs between them. If they are on different versions, you might see an error about an expected field or translation missing.
- Attempting to import a program with program visibility set to “Visible to selected trusted intermediaries only” (shows up as “SELECT_TI” in the program json)
  - Since we don’t migrate ti groups with the program, you must select a different visibility for the program before migrating.

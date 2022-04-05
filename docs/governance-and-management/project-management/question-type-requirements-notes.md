# Question type requirements notes

## General comments

All question types have the following configuration options:

* Title (text shown to the user)
* Description or help text (this is raw text, but if we detect a URL, we can format it as a hyperlink.)
* Required or optional

Each question may have zero, one, or more validation criteria.

* For simplicity, if there are two or more criteria, it's assumed that they're joined with "AND" (all criteria must be met for the answer to be accepted)
* The list of supported validation criteria are given under each question type's heading.

Each validation criterion may be paired with an error message in case that criterion isn't met.

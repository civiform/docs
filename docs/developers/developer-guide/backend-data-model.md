# Backend data model

## CiviForm backend applicant data model

Applicant data, i.e. data provided by applicants for applying to programs, is structured according to question definitions and stored in JSON.

When the CiviForm admin creates a new question, they must provide a globally unique canonical name for the question. Once created, this name is immutable and so is not the same as the display name for the user.

When the applicant answers a question, the answer is stored at a path created from the question's canonical name ([canonical name to path logic here](https://github.com/seattle-uat/civiform/blob/main/universal-application-tool-0.0.1/app/services/question/types/QuestionDefinition.java#L102-L109)). For example, if a question's canonical name is `"Address (mailing)"` the JSON path to the answer would be `"Address_mailing"`.

The contents of an answer is determined by the question type. All question types have a hard-coded set of scalar values that comprise their answer. For example, [the address question type](https://github.com/seattle-uat/civiform/blob/main/universal-application-tool-0.0.1/app/services/applicant/question/AddressQuestion.java#L208-L226) has scalars for street, line 2, city, state, and zip code, all of which have a `ScalarType` of `STRING`. When an answer to an address question is stored, the scalars are stored in an object with the scalar names as keys. Answers to the mailing address questions could look like the following:

```json
{
  "Address_mailing": {
    "street": "1600 Amphitheatre Pkwy",
    "address line 2": "",
    "city": "Mountain View",
    "state": "CA",
    "zip": "11111"
  }
}
```

For simple question types that only have a single scalar, their answer is still nested in an object that holds the scalar. For example asking a question with the canonical name `"Favorite color"` and question type `Text` could have its answer stored like the following:

```json
{
  "Favorite_color": {
    "text": "green"
  }
}
```

If we always knew how many times a question needed to be asked then that would be the end of the story, but for some questions we don't e.g. asking questions about each child in a household. For those enumerator questions, we store answers using JSON arrays.

For an enumerator question with the canonical name `"Vehicles in household"` and a repeated question with the canonical name `"License plate number"`, and an applicant who has identified two vehicles with the nicknames `"Daily commuter"` and `"Pickup truck"`, the answers stored could look like the following:

```json
{
  "Vehicles_in_household": [
    {
      "entity name": "Daily commuter",
      "license_plate_number": {
        "text": "ABA1056"
      }
    },
    {
      "entity name": "Pickup truck",
      "license_plate_number": {
        "text": "VCS5234"
      }
    }
  ]
}
```

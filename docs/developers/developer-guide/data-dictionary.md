# Data Dictionary
## public.accounts
                                       
|       Column        |        Type         | Nullable | Description
|---------------------|---------------------|----------|------------
| id                  | bigint              | not null | Primary key
| email_address       | character varying   |          | Account email address
| member_of_group_id  | bigint              |          | Foreign key to ti_organizations
| managed_by_group_id | bigint              |          | Foreign key to ti_organizations
| admin_of            | character varying[] |          | Administrator of specified programs
| global_admin        | boolean             |          | Global system administrator
| authority_id        | character varying   |          | ???


## public.applicants

| Column           |            Type             | Nullable | Description 
|------------------|-----------------------------|----------|------------
| id               | bigint                      | not null | Primary key
| preferred_locale | character varying           |          | Applicant selected default locale
| object           | jsonb                       | not null | ???
| account_id       | bigint                      |          | Foreign key to accounts
| when_created     | timestamp without time zone |          | Date applicant record was created

<details>
    <summary>Sample JSON of the <code>object</code> column</summary>

For more information view the [backend data model page](https://github.com/seattle-uat/civiform/wiki/Backend-data-model)

```json
{
  "applicant": {
    "Address_mailing": {
      "street": "1600 Amphitheatre Pkwy",
      "address line 2": "",
      "city": "Mountain View",
      "state": "CA",
      "zip": "11111"
    },
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
}
```
</details>

## public.applications

|      Column      |            Type             | Nullable | Description
|------------------|-----------------------------|----------|------------
| id               | bigint                      | not null | Primary key
| applicant_id     | bigint                      |          | Foreign key to applicants table
| program_id       | bigint                      |          | Foreign key to programs table
| object           | jsonb                       | not null | ???
| lifecycle_stage  | character varying           |          | Status of the application (draft or active)
| submit_time      | timestamp without time zone |          | Date application record was submitted
| submitter_email  | character varying(255)      |          | ??? is this assumed to be null if done by applicant?
| create_time      | timestamp without time zone |          | Date application record was created
| preferred_locale | character varying           |          | ??? Applicant selected default locale. Why here and applicants?

<details>
    <summary>Sample JSON of the <code>object</code> column</summary>

For more information view the [backend data model page](https://github.com/seattle-uat/civiform/wiki/Backend-data-model)

```json
{
  "applicant": {
    "Address_mailing": {
      "street": "1600 Amphitheatre Pkwy",
      "address line 2": "",
      "city": "Mountain View",
      "state": "CA",
      "zip": "11111"
    },
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
}
```
</details>

## public.files

|      Column        |          Type          | Nullable | Description 
|--------------------|------------------------|----------|------------
| id                 | bigint                 | not null | Primary key
| name               | character varying(255) |          | ???
| original_file_name | character varying      |          | Name of the file uploaded by the applicant


## public.programs

|            Column            |       Type        | Nullable | Description
|------------------------------|-------------------|----------|------------
| id                           | bigint            | not null | Primary key
| name                         | character varying |          | Name of the program
| description                  | character varying |          | Description of the program
| block_definitions            | jsonb             | not null | Screens are defined here along with linking questions to screens
| export_definitions           | jsonb             |          | ??? Settings for exporting program data. Doesn't seem to get saved
| legacy_localized_name        | jsonb             |          | ???
| legacy_localized_description | jsonb             |          | ???
| slug                         | character varying |          | Used when creating a permalink to the new application of a program
| localized_name               | jsonb             |          | Translated versions of the program name
| localized_description        | jsonb             |          | Translated versions of the program description
| external_link                | character varying |          | URL to a resource outside of the application
| display_mode                 | character varying | not null | Determines whether the program is visible to the public or not (options are: HIDDEN_IN_INDEX and PUBLIC)

<details>
    <summary>Sample JSON of the <code>block_definitions</code> column</summary>

```json
[
  {
    "id": 1,
    "name": "Screen 1",
    "repeaterId": null,
    "description": "Screen 1 Description",
    "hidePredicate": null,
    "optionalPredicate": null,
    "questionDefinitions": [
      {
        "id": 1,
        "optional": false
      },
      {
        "id": 2,
        "optional": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Screen 2",
    "repeaterId": null,
    "description": "Screen 2 Description",
    "hidePredicate": null,
    "optionalPredicate": null,
    "questionDefinitions": [
      {
        "id": 3,
        "optional": false
      }
    ]
  },
  {
    "id": 3,
    "name": "Screen 3",
    "repeaterId": null,
    "description": "Screen 3 Description",
    "hidePredicate": {
      "action": "SHOW_BLOCK",
      "rootNode": {
        "node": {
          "type": "leaf",
          "value": {
            "type": "LIST_OF_STRINGS",
            "value": "[\"0\"]"
          },
          "scalar": "SELECTION",
          "operator": "IN",
          "questionId": 4
        }
      }
    },
    "optionalPredicate": null,
    "questionDefinitions": [
      {
        "id": 5,
        "optional": false
      }
    ]
  },
  {
    "id": 4,
    "name": "Screen 4",
    "repeaterId": 3,
    "description": "Screen 4 Description",
    "hidePredicate": null,
    "optionalPredicate": null,
    "questionDefinitions": [
      {
        "id": 6,
        "optional": false
      },
      {
        "id": 7,
        "optional": false
      }
    ]
  }
]
```
</details>


<details>
    <summary>Sample JSON of the <code>export_definitions</code> column</summary>

    Sample not yet available
</details>


<details>
    <summary>Sample JSON of the <code>localized_name</code> and <code>localized_description</code> columns</summary>

```json
{
  "isRequired": true,
  "translations": {
    "en_US": "English Text",
    "es_US": "Spanish Text"
  }
}
```
</details>


## public.questions

|          Column           |        Type         | Nullable | Description 
|---------------------------|---------------------|----------|------------
| id                        | bigint              | not null | Primary key
| name                      | character varying   |          | Name of the question
| description               | character varying   |          | Description of the question
| question_type             | character varying   |          | Type of question (options are: ADDRESS, CHECKBOX, CURRENCY, DATE, DROPDOWN, EMAIL, ENUMERATOR, FILEUPLOAD, ID, NAME, NUMBER, RADIO_BUTTON, STATIC, TEXT)
| legacy_question_text      | jsonb               |          | ???
| legacy_question_help_text | jsonb               |          | ???
| validation_predicates     | jsonb               |          | Configuration for question validation requirements
| legacy_question_options   | jsonb               |          | ???
| enumerator_id             | bigint              |          | This is a questions id of an ENUMERATOR question_type. It signifies that this questions is part of the enumerator and repeats for each entry.
| question_options          | jsonb               |          | The list of valid options for questions that have pre-defined answers (e.g. CHECKBOX, DROPDOWN)
| question_text             | jsonb               |          | Text of the question presented to the applicant in their preferred language
| question_help_text        | jsonb               |          | Help Text of the question presented to the applicant in their preferred language
| enumerator_entity_type    | jsonb               |          | ??? Enumerator text presented to the applicant in their preferred language
| question_tags             | character varying[] |          | ???

For information on versioning questions and programs see the [data versioning model page](https://github.com/seattle-uat/civiform/wiki/Data-versioning-model).


<details>
    <summary>Sample JSON of the <code>validation_predicates </code>column</summary>

#### Question Type: `ADDRESS`
```json
{
    "disallowPoBox": false
}
```

#### Question Type: `CHECKBOX`, `DROPDOWN`, & `RADIO_BUTTON`
```json
{
    "maxChoicesAllowed": 2,
    "minChoicesRequired": 1
}
```

#### Question Type: `ID` & `TEXT`
```json
{
    "maxLength": 9,
    "minLength": 5
}
```

#### Question Type: `NUMBER`
```json
{
    "max": 200,
    "min": 1
}
```

</details>


<details>
    <summary>Sample JSON of the <code>question_options</code> column</summary>

```json
[
  {
    "id": 0,
    "displayOrder": 0,
    "localizedOptionText": {
      "isRequired": true,
      "translations": {
        "en_US": "English text",
        "es_US": "Spanish text"
      }
    }
  }
]
```
</details>

<details>
    <summary>Sample JSON of the <code>question_text</code>, <code>question_help_text</code>, and <code>enumerator_entity_type</code> columns</summary>

```json
{
  "isRequired": true,
  "translations": {
    "en_US": "English text",
    "es_US": "Spanish text"
  }
}
```
</details>


 ## public.ti_organizations
 
|   Column    |       Type        | Nullable | Description
|-------------|-------------------|----------|------------
| id          | bigint            | not null | Primary key 
| name        | character varying | not null | Name of the organization
| description | character varying |          | Description of the organization


## public.versions

|          Column           |            Type             | Nullable | Description
|---------------------------|-----------------------------|----------|------------
| id                        | bigint                      | not null | Primary key
| lifecycle_stage           | character varying           | not null | Defines which versions are active, draft, or obsolete.
| submit_time               | timestamp without time zone |          | Date when last saved ???
| tombstoned_question_names | character varying[]         |          | ???
| tombstoned_program_names  | character varying[]         |          | ???

For information on versioning `questions` and `programs` see the [data versioning model page](https://github.com/seattle-uat/civiform/wiki/Data-versioning-model).


## public.versions_programs

|   Column    |  Type  | Nullable | Description
|-------------|--------|----------|------------
| programs_id | bigint | not null | !!! No actual foreign key reference in db. Foreign key to `programs` table
| versions_id | bigint | not null | !!! No actual foreign key reference in db. Foreign key to `versions` table


## public.versions_questions

|    Column    |  Type  | Nullable | Description
|--------------|--------|----------|------------
| questions_id | bigint | not null | !!! No actual foreign key reference in db. Foreign key to `questions` table
| versions_id  | bigint | not null | !!! No actual foreign key reference in db. Foreign key to `versions` table
          







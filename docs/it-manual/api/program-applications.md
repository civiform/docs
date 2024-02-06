# API: List Program Applications

todo link to generated api docs

## List program applications endpoint

`GET /api/v1/admin/programs/<programSlug>/applications`

Exports applications to a specific program as JSON.

## Parameters

### Path parameters

|Path component|Type  |Description                                                                                                                                                                                                                              |
|--------------|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|`programSlug` |string|Human readable identifier for the program to export. This is defined by the CiviForm admin during program creation. The CiviForm admin can find the slug for a program by examining the deep link URL on the program index page or in the list of allowed programs on the API key index page.|

### Query parameters

All query parameters are optional.

|Param name     |Type  |Description                                                                                                                                                                                        |
|---------------|------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|`fromDate`     |string|An ISO-8601 formatted date (i.e. YYYY-MM-DD). Limits results to applications submitted on or after the provided date, in the CiviForm instance's local time.                                       |
|`toDate`       |string|An ISO-8601 formatted date (i.e. YYYY-MM-DD). Limits results to applications submitted before the provided date, in the CiviForm instance's local time.                                            |
|`pageSize`     |uint  |A positive integer. Limits the number of results per page. If pageSize is larger than CiviForm's maximum page size then the maximum will be used. The default maximum is 1,000 and is configurable.|
|`nextPageToken`|string|An opaque, alphanumeric identifier for a specific page of results. When included CiviForm will return a page of results corresponding to the token.                                                |


## Responses

### **400: Bad Request**

Returned if any request parameters fail validation.

### **401: Unauthorized**

Returned if the API key is invalid or does not have access to the program. Check the server logs for the specific reason.

### **200: OK**

For valid requests, CiviForm returns a status code 200 with a JSON body of the structure:

{% code %}
```json
{
  payload: Array<ProgramApplication>,
  nextPageToken: string
}
```
{% endcode %}

## Pagination

If there are more results for the request, `nextPageToken` will be a string. If there are no more results to fetch it will be `null`. API consumers should request more pages using the `nextPageToken` query paramater until it returns `null` to ensure they have received a complete result set.

If `nextPageToken` is present the other query parameters are optional. If the other parameters are included, they must match the values provided on the initial request, or else CiviForm will reject the request as invalid.

## Payload

The value of the `payload` key is an array of objects, each consisting of metadata about an application and the application itself.

{% hint style="info" %}
The order of these properties is not guaranteed, they're displayed alphabetically here for convenience.
{% endhint %}

For example, one of these objects might look like this:

{% code %}
```json
{
  applicant_id: 1,
  application_id: 2,
  create_time: "2023/05/25 1:46:15 PM PDT",
  language: "en-US",
  program_name: "sample-application",
  program_version_id: 3,
  revision_state:, "CURRENT",
  status: "custom status",
  submit_time: "2023/05/26 1:46:15 PM PDT",
  submitter_type: "TRUSTED_INTERMEDIARY",
  ti_email: "alice@trustedintermediary.org",
  ti_organization: "TIs Inc.",
  application: {...}
}
```
{% endcode %}

### Payload metadata

#### applicant_id
- **Property**: `applicant_id`
- **JSON Type**: `number`
- **Format**: Integer
- **Description**: The unique integer ID of the applicant

#### application_id
- **Property**: `application_id`
- **JSON Type**: `number`
- **Format**: Integer
- **Description**: The unique integer ID of this application

#### create_time
- **Property**: `create_time`
- **JSON Type**: `string`
- **Format**: A datetime formatted as `yyyy/MM/dd h:mm:ss a z`. For example, `2023/10/26 3:01:56 PM PDT`.\
_Note_: See the [DateTimeFormatter javadoc](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) for format pattern specifics. This is _not_ ISO 8601 formatted.
- **Description**: The time the first question in a program was submitted, in the timezone of the CiviForm instance.\
_Note_: If a question is shared between programs, a question must be submitted _as part of this program_ to set `create_time`. Questions submitted as part of another program do not start the clock.

#### language
- **Property**: `language`
- **JSON Type**: `string`
- **Format**: An [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) language tag. US English is `en-US`.
- **Description**: Indicates the applicant's preferred language, as specified by the language dropdown in the header bar.

#### program_name
- **Property**: `program_name`
- **JSON Type**: `string`
- **Format**: All URL-safe characters
- **Description**: The immutable admin name of the program. This is also the `programSlug` used in the API request.

#### program_version_id
- **Property**: `program_version_id`
- **JSON Type**: `number`
- **Format**: Integer
- **Description**: The unique integer ID of this version of the program. This ID changes every time a program, or question within a program, is updated.

#### revision_state
- **Property**: `revision_state`
- **JSON Type**: `string`
- **Value**: An enum currently consisting of  [`CURRENT`, `OBSOLETE`].\
_Note_: More values may be added to this enum in the future. Ensure client code can handle additional "unknown" values.
- **Description**: Describes the current state of this application. `CURRENT` indicates this is the most recent version of the application. `OBSOLETE` indicates this application has been superseded by a newer submission.

#### status
- **Property**: `status`
- **JSON Type**: `string` or `null`
- **Value**: All characters
- **Description**: The admin-defined status of this application, as selected by a Program Admin. See [Add statuses to a program](/docs/user-manual/civiform-admin-guide/add-statuses.md) and [Review completed applications](/docs/user-manual/program-admin-guide/review-completed-applications.md#change-the-status-of-an-application) for more.

#### submit_time
- **Property**: `submit_time`
- **JSON Type**: `string`
- **Value**: A datetime formatted as `yyyy/MM/dd h:mm:ss a z`. For example, `2023/10/26 3:01:56 PM PDT`.\
_Note_: See the [DateTimeFormatter javadoc](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) for format pattern specifics. This is _not_ ISO 8601 formatted.
- **Description**: The time the application was submitted, in the timezone of the CiviForm instance.

#### submitter_type
- **Property**: `submitter_type`
- **JSON Type**: `string`
- **Value**: An enum consisting of [`APPLICANT`, `TRUSTED_INTERMEDIARY`]\
_Note_: More values may be added to this enum in the future. Ensure client code can handle additional "unknown" values.
- **Description**: The type of user submitting the applicant. `APPLICANT` indicates the applicant submitted the application themselves, and `TRUSTED_INTERMEDIARY` indicates the application was submitted by a TI on behalf of an applicant.

#### ti_email
- **Property**: `ti_email`
- **JSON Type**: `string` or `null`
- **Value**: All characters, formatted as an email address
- **Description**: The email address of the TI that submitted the application on behalf of an applicant. `null` if the applicant submitted the application themselves.

#### ti_organization
- **Property**: `ti_organization`
- **JSON Type**: `string` or `null`
- **Value**: All characters.
- **Description**: The name of the organization the TI belongs to, as specified in the Intermediaries admin panel. See [Manage trusted intermediaries](/docs/user-manual/civiform-admin-guide/manage-trusted-intermediaries.md) for more.

#### application
- **Property**: `application`
- **JSON Type**: `object`
- **Value**: The applicant's application
- **Description**: See the [Application object](#application-object) section below.

## Application object
The `application` object contains the applicant's answers to the questions in the program. It's a snapshot of the applicant's answers at the time they clicked submit on their application, and is not updated if they change their answer to a question as part of filling out an application to a different program.

If they update their answers to _this_ program and click submit again, a new application entry is created. See the [`revision_state`](#revision_state) metadata field for more.

{% hint style="warning" %}
**Warning** Currently only the questions that are in the most recent version of the program are included in the `application` object. Follow [Github Issue #5018](https://github.com/civiform/civiform/issues/5018) for the work to include all questions that have ever been part of a program in the `application` object.
{% endhint %}

The `application` object is organized as a set of `key`-`object` pairs that represent each question in the program. The `key` is generated from the admin name of the question, and the `object`contains the applicant's answer. For example, this is the `application` object for a program with two questions:
- "What is your name?", which has a question key of `applicant_name`.
- "What is your favorite color?", which has a question key of `favorite_color`.

{% code %}
```json
{
  "applicant_name": {
    "question_type": "NAME",
    "first_name": "Taylor",
    "middle_name": "Allison",
    "last_name": "Swift",
  },
  "favorite_color": {
    "question_type": "TEXT",
    "text": "purple"
  }
}
```
{% endcode %}

### Question keys
The question key is the generated from the immutable admin name of the question. The immutable admin name of the question is specified by the admin when creating a question, and the question key is visible in the generated API docs page.

The question key is generated by removing non-letter characters and replacing spaces with underscores, so `applicant name4?` becomes `applicant_name`.

For [enumerator](/docs/user-manual/civiform-admin-guide/using-enumerator-questions-and-screens-in-a-program.md) questions, such as "List all the members of your household?" (which might have a question key of `household_members`), and "What are each of their favorite colors?" (question key of `household_member_favorite_color`), the repeated question is nested under the enumerator question like this:

{% code %}
```json
{
  "household_members": {
    "question_type": "ENUMERATOR",
    "entities": [
      {
        "entity_name": "Taylor",
        "household_member_favorite_color": {
          "question_type": "TEXT",
          "text": "purple"
        }
      },
      {
        "entity_name": "Sza",
        "household_member_favorite_color": {
          "question_type": "TEXT",
          "text": "purple"
        }
      },
      {
        "entity_name": "Carley Rae",
        "household_member_favorite_color": {
          "question_type": "TEXT",
          "text": "red"
        }
      },
    ]
  },
}
```
{% endcode %}

In this example, to access the favorite color of the third household member, you'd use this path through the `application` object:

{% code %}
```js
application.household_members.entities[2].household_member_favorite_color.text
```
{% endcode %}

{% hint style="info" %}
Questions can be nested arbitrarily deep, so if a question asked for the hours worked at each job a household member has, a path might look like
{% code %}
```js
application.household_members.entities[2].household_member_jobs.entities[1].household_member_jobs_hours_worked.number
```
{% endcode %}
This is the path to the number of hours worked at the 2nd job of the 3rd household member.
{% endhint %}

See [Enumerator questions](#enumerator-questions) below for more about enumerator questions.

### Question objects
todo

#### Address questions
todo

#### Checkbox questions
Checkbox questions are a form of multi-select question. See [Multiselect questions](#multiselect-questions) below.

#### Currency questions
todo

#### Date questions
todo

#### Dropdown questions
Dropdown questions are a form of single-select questions. See [Single-select questions](#single-select-questions) below.

#### Email questions
todo

#### Enumerator questions
todo

#### File upload questions
File upload questions are not currently available in the API. See [GitHub Issue #5025](https://github.com/civiform/civiform/issues/5025) for progress on this feature.

#### ID questions
todo

#### Multi-select questions
todo

#### Name questions

#### Number questions

#### Radio questions
Radio questions are a form of single-select questions. See [Single-select questions](#single-select-questions) below.

#### Single-select questions
todo

#### Static text questions
Static text questions are not presented in the API because there is nothing for the applicant to answer.

#### Text questions
todo

#### Phone number questions
todo



todo add summary

todo add explanation of scalars

todo add explanatoin of nested enumerator questions

A question answer path is structured (in very loosely presented regex and [EBNF syntax](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form)):

{% code %}
```
basic_question_path = \.[a-zA-Z_]+
index = [0-9]
enumerator_question_path = basic_question_path\[index\]
full_question_path = [enumerator_question_path]*basic_question_path
```
{% endcode %}

Question names are converted to paths by removing all non-alphabetic characters and replacing one or more spaces with an underscore ([source](https://github.com/civiform/civiform/blob/main/server/app/services/question/types/QuestionDefinition.java#L110)).

Questions that are skipped are present but have null values for the skipped scalars. Scalar names and value types are determined by question type. Strings may contain unicode characters.

todo mention generated docs

**Question type export values**

|Question type|Scalar name     |Value                                                            |
|-------------|----------------|-----------------------------------------------------------------|
|Address      |street          |string                                                           |
|             |line2           |string                                                           |
|             |city            |string                                                           |
|             |state           |string, two-character state code                                 |
|             |zip             |string, 5-character zip code                                     |
|Currency     |currency_dollars|float with two digits of precision after the decimal             |
|Date         |date            |string, date formatted as an ISO 8601 date YYYY-MM-DD            |
|Email        |email           |string                                                           |
|ID           |id              |string                                                           |
|Multiselect  |selections      |array of strings, en-US localized strings of the selected options|
|Name         |first_name      |string                                                           |
|             |middle_name     |string                                                           |
|             |last_name       |string                                                           |
|Number       |number          |integer                                                          |
|Single select|selection       |string, en-US localized string of the selected option            |
|Text         |text            |string                                                           |
|Phone Number |phone_number    |E.164 format                                                     |

## Example endpoint response

todo update

{% code %}
```json
{
  "nextPageToken": "YXR0ZXJuIG9mIHZpb2xhdGlvbiBvZiBjb21tdW5pdHkKc3Rhb",
  "payload": [{
    "program_name": "Example Program With Enumerator",
    "program_version_id": 912,
    "applicant_id": 767,
    "application_id": 866,
    "language": "en-US",
    "create_time": "2022-04-19T21:46:05.774Z",
    "submitter_email": "Applicant",
    "submit_time": "2022-04-19T21:46:05.774624Z",
    "application": {
     "phone":{
        "phone_number":"+14258103298"
      },
      "applicant_favorite_color": {
        "text": "brown"
      },
      "applicant_monthly_income": {
        "currency_dollars": 3000.00
      },
      "applicant_household_members": [
        {
          "household_members_name": {
            "last_name": "Jameson",
            "middle_name": null,
            "first_name": "James"
          },
          "household_members_jobs": [
            {
              "household_members_days_worked": {
                "number": 111
              }
            },
            {
              "household_members_days_worked": {
                "number": 222
              }
            },
            {
              "household_members_days_worked": {
                "number": 333
              }
            }
          ]
        }
      ],
      "applicant_name": {
        "last_name": "Doe",
        "middle_name": null,
        "first_name": "John"
      }
    }
  }]
}
```
{% endcode %}

## Example client code: python

Requesting applications to a program named "Utility discount program" between January 3, 2022 and February 4, 2022, with a page size of 100.

{% code title="example_request.py" overflow="wrap" lineNumbers="true" %}
```python
import json
import os
import requests

URL = 'https://civiform.example.gov/api/v1/admin/programs/utility-discount-program/applications'
AUTH_HEADERS = { 'Authorization': 'Basic ' + os.getenv('CIVIFORM_API_KEY') }

params = { 'fromDate': '2022-01-03', 'toDate': '2022-02-04', 'pageSize': 100 }
results = []

while True:
    response = requests.get(URL, params=params, headers=AUTH_HEADERS)

    if response.status_code != 200:
        print("Request failed with status code: " + str(response.status_code))
        exit(1)

    response_json = response.json()
    results.extend(response_json['payload'])

    if response_json['nextPageToken'] is None:
        break

    params['nextPageToken'] = response_json['nextPageToken']

with open('exported_applications.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False)

print(f'Exported {len(results)} applications.')
```
{% endcode %}

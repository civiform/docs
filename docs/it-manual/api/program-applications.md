# API: Program Applications

## List program applications

`GET /api/v1/admin/programs/<programSlug>/applications`

Export applications to a specific program as JSON.

### Parameters

**Path parameters**

|Path component|Type  |Description                                                                                                                                                                                                                              |
|--------------|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|`programSlug` |string|Human readable identifier for the program to export. The CiviForm admin can find the slug for a given program by examining the deep link link URL on the program index page or in the list of allowed programs on the API key index page.|

**Query parameters**

|Param name     |Presence|Type  |Description                                                                                                                                                                                        |
|---------------|--------|------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|`fromDate`     |optional|string|An ISO-8601 formatted date (i.e. YYYY-MM-DD). Limits results to applications submitted on or after the provided date.                                                                              |
|`toDate`       |optional|string|An ISO-8601 formatted date (i.e. YYYY-MM-DD). Limits results to applications submitted before the provided date.                                                                                   |
|`pageSize`     |optional|uint  |A positive integer. Limits the number of results per page. If pageSize is larger than CiviForm's maximum page size then the maximum will be used. The default maximum is 1,000 and is configurable.|
|`nextPageToken`|optional|string|An opaque, alphanumeric identifier for a specific page of results. When included CiviForm will return a page of results corresponding to the token.                                                |

### Responses

#### **400: Bad Request**

Returned if any request parameters fail validation.

#### **401: Unauthorized**

Returned if the API key is invalid or does not have access to the program.

#### **200: OK**

For valid requests, CiviForm returns a status code 200 with a JSON body of the structure:

```
{
  payload: Array<ProgramApplication>,
  nextPageToken: string
}
```

**Pagination**

If there are more results for the request, `nextPageToken` will be a string. If there are no more results to fetch it will be `null`. API consumers should request more pages using the `nextPageToken` until it returns null to ensure they have received a complete result set.

If `nextPageToken` is present the other query parameters are optional. Including them will not change the response of the request unless they differ from the values provided on the initial request, in which case CiviForm will reject the request as invalid.

**Payload**

The value of the `payload` key is an array of program application objects, each of the structure:

```
{
  program_name: string,
  program_version_id: integer,
  application_id: integer,
  language: string,
  submitter_email: string,
  application: object
}
```

`program_name` the immutable admin name of the program.

`program_version_id` the integer ID of the program version for this application.

`application_id` the unique integer ID of this application.

`language` an IETF language tag indicating the applicant's preferred language
`submitter_email` either the applicant's email or trusted intermediary's, depending one which submitted the application.

`application` the contents of the application. Structure of the application data is determined by the question and program configuration. Each question has a JSON path derived from its admin name and enumerator relationship and an answer object containing the answer scalars and metadata. Metadata includes a timestamp of when the scalar was updated, useful so that program administrators can see if data was provided at an earlier time and may be out of date.

A question answer path is structured (in very loosely presented regex and [EBNF syntax](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form)):

```
basic_question_path = \.[a-zA-Z_]+
index = [0-9]
enumerator_question_path = basic_question_path\[index\]
full_question_path = [enumerator_question_path]*basic_question_path
```

Question names are converted to paths by removing all non-alphabetic characters and replacing one or more spaces with an underscore ([source](https://github.com/seattle-uat/civiform/blob/main/server/app/services/question/types/QuestionDefinition.java#L110)).

Questions that are skipped are present but have null values for the skipped scalars. Scalar names and value types are determined by question type. Strings may contain unicode characters.

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
|Updated at   |updated_at      |ISO 8601 date and time of when the scalar was updated            |

**Example export**

```
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
      "applicant_favorite_color": {
        "text": "brown",
        "updated_at": "2022-03-31T18:02:11.822075Z"
      },
      "applicant_monthly_income": {
        "currency_dollars": 3000.00,
        "updated_at": "2022-03-31T18:02:11.822075Z"
      },
      "applicant_household_members": [
        {
          "household_members_name": {
            "last_name": "Jameson",
            "middle_name": null,
            "first_name": "James",
            "updated_at": "2022-03-31T18:02:11.822075Z"
          },
          "household_members_jobs": [
            {
              "household_members_days_worked": {
                "number": 111,
                "updated_at": "2022-03-31T18:02:11.822075Z"
              }
            },
            {
              "household_members_days_worked": {
                "number": 222,
                "updated_at": "2022-03-31T18:02:11.822075Z"
              }
            },
            {
              "household_members_days_worked": {
                "number": 333,
                "updated_at": "2022-03-31T18:02:11.822075Z"
              }
            }
          ]
        }
      ],
      "applicant_name": {
        "last_name": "Doe",
        "middle_name": null,
        "first_name": "John",
        "updated_at": "2022-03-31T18:02:11.822075Z"
      }
    }
  }]
}
```

**Example client code: python**

Requesting applications to a program named "Utility discount program" between January 3, 2022 and February 4, 2022, with a page size of 100.

```
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

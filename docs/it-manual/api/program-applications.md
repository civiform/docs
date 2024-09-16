# API: List Program Applications

## List program applications endpoint

`GET /api/v1/admin/programs/<programSlug>/applications`

Exports applications to a specific program as JSON.

## Parameters

### Path parameters

#### `programSlug`
- **Parameter**: `programSlug`
- **Format**: A string matching a program slug, such as `sample-program`.
- **Description**: Human readable identifier for the program to export. This is defined by the CiviForm admin during program creation. The CiviForm admin can find the slug for a program by examining the deep link URL on the program index page or in the list of allowed programs on the API key index page.

### Query parameters

All query parameters are optional, but case-sensitive.

#### `fromDate`
- **Parameter**: `fromDate`
- **Format**: An ISO-8601 formatted date (i.e. YYYY-MM-DD).
- **Description**: Limits results to applications submitted on or after the provided date, in the CiviForm instance's local time.

#### `toDate`
- **Parameter**: `toDate`
- **Format**: An ISO-8601 formatted date (i.e. YYYY-MM-DD).
- **Description**: Limits results to applications submitted before the provided date, in the CiviForm instance's local time.

#### `pageSize`
- **Parameter**: `pageSize`
- **Format**: A positive integer.
- **Description**: Limits the number of results per page. If pageSize is larger than CiviForm's maximum page size then the maximum will be used. The default maximum is 1,000 and is configurable.

#### `nextPageToken`
- **Parameter**: `nextPageToken`
- **Format**: An opaque token, such as `eyJzZXJpYWxpemVkUGF5bG9hfQ==`
- **Description**: An opaque, alphanumeric identifier for a specific page of results. When included CiviForm will return a page of results corresponding to the token. See [Pagination](#pagination) for more.

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
  "payload": [application object]
  "nextPageToken": string
}
```
{% endcode %}

## Pagination

If there are more results for the request, `nextPageToken` will be a string. If there are no more results to fetch it will be `null`. API consumers should request more pages using the `nextPageToken` query paramater until it returns `null` to ensure they have received a complete result set.

If `nextPageToken` is present the other query parameters are optional. If the other parameters are included, they must match the values provided on the initial request or CiviForm will reject the request as invalid.

## Payload

The value of the `payload` property is an array of objects, each consisting of metadata about an application and the application itself.

{% hint style="info" %}
**Note** The order of these properties is not guaranteed, they're displayed alphabetically here for convenience.
{% endhint %}

For example, one of these objects might look like this:

{% code %}
```json
{
  "applicant_id": 1,
  "application_id": 2,
  "create_time": "2023-05-25T13:46:15-07:00",
  "language": "en-US",
  "program_name": "sample-application",
  "program_version_id": 3,
  "revision_state": "CURRENT",
  "status": "custom status",
  "submit_time": "2023-05-26T13:46:15-07:00",
  "submitter_type": "TRUSTED_INTERMEDIARY",
  "ti_email": "alice@trustedintermediary.org",
  "ti_organization": "TIs Inc.",
  "application": {...}
}
```
{% endcode %}

### Payload metadata

#### `applicant_id`
- **Property**: `applicant_id`
- **JSON Type**: `number`
- **Format**: Integer
- **Description**: The unique integer ID of the applicant.

#### `application_id`
- **Property**: `application_id`
- **JSON Type**: `number`
- **Format**: Integer
- **Description**: The unique integer ID of this application.

#### `create_time`
- **Property**: `create_time`
- **JSON Type**: `string`
- **Format**: A datetime formatted in the ISO 8601 extended offset format. For example, `2023-10-26T15:01:56-07:00`.\
_Note_: See the [DateTimeFormatter javadoc](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) for format pattern specifics. This is the ISO_OFFSET_DATE_TIME format.
- **Description**: The time the first question in a program was submitted, in the timezone of the CiviForm instance.\
_Note_: If a question is shared between programs, a question must be submitted _as part of this program_ to set `create_time`. Questions submitted as part of another program do not start the clock.

#### `language`
- **Property**: `language`
- **JSON Type**: `string`
- **Format**: An [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) language tag. US English is `en-US`.
- **Description**: Indicates the applicant's preferred language, as specified by the language dropdown in the header bar.

#### `program_name`
- **Property**: `program_name`
- **JSON Type**: `string`
- **Format**: All URL-safe characters
- **Description**: The immutable admin name of the program. This is also the `programSlug` used in the API request.

#### `program_version_id`
- **Property**: `program_version_id`
- **JSON Type**: `number`
- **Format**: Integer
- **Description**: The unique integer ID of this version of the program. This ID changes every time a program, or question within a program, is updated. If you need a stable identifier for a program, use the `program_name`.

#### `revision_state`
- **Property**: `revision_state`
- **JSON Type**: `string`
- **Value**: An [enum](https://github.com/civiform/civiform/blob/main/server/app/services/export/enums/RevisionState.java) currently consisting of one of [`CURRENT`, `OBSOLETE`].\
_Note_: More values may be added to this enum in the future. Ensure client code can handle additional "unknown" values.
- **Description**: Describes the current state of this application. `CURRENT` indicates this is the most recent version of the application. `OBSOLETE` indicates this application has been superseded by a newer submission.

#### `status`
- **Property**: `status`
- **JSON Type**: `string` or `null`
- **Value**: All characters
- **Description**: The admin-defined status of this application, as selected by a Program Admin. See [Add statuses to a program](/docs/user-manual/civiform-admin-guide/add-statuses.md) and [Review completed applications](/docs/user-manual/program-admin-guide/review-completed-applications.md#change-the-status-of-an-application) for more.

#### `submit_time`
- **Property**: `submit_time`
- **JSON Type**: `string`
- **Value**: A datetime formatted in the ISO 8601 extended offset format. For example, `2023-10-26T15:01:56-07:00`.\
_Note_: See the [DateTimeFormatter javadoc](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) for format pattern specifics. This is the ISO_OFFSET_DATE_TIME format.
- **Description**: The time the application was submitted, in the timezone of the CiviForm instance.

#### `submitter_type`
- **Property**: `submitter_type`
- **JSON Type**: `string`
- **Value**: An [enum](https://github.com/civiform/civiform/blob/main/server/app/services/export/enums/SubmitterType.java) consisting of one of [`APPLICANT`, `TRUSTED_INTERMEDIARY`]\
_Note_: More values may be added to this enum in the future. Ensure client code can handle additional "unknown" values.
- **Description**: The type of user submitting the application. `APPLICANT` indicates the applicant submitted the application themselves, and `TRUSTED_INTERMEDIARY` indicates the application was submitted by a TI on behalf of an applicant.

#### `ti_email`
- **Property**: `ti_email`
- **JSON Type**: `string` or `null`
- **Value**: All characters, formatted as an email address
- **Description**: The email address of the TI that submitted the application on behalf of an applicant. `null` if the applicant submitted the application themselves.

#### `ti_organization`
- **Property**: `ti_organization`
- **JSON Type**: `string` or `null`
- **Value**: All characters.
- **Description**: The name of the organization the TI belongs to, as specified in the Intermediaries admin panel. See [Manage trusted intermediaries](/docs/user-manual/civiform-admin-guide/manage-trusted-intermediaries.md) for more.

#### `application`
- **Property**: `application`
- **JSON Type**: `object`
- **Value**: The applicant's application
- **Description**: See the [Application object](#application-object) section below.

## Application object
The `application` object contains the applicant's answers to the questions in the program. It's a snapshot of the applicant's answers at the time they clicked submit on their application, and is not updated if they change their answer to a question as part of filling out an application to a different program.

If they update their answers to _this_ program and click submit again, a new application entry is created. See the [`revision_state`](#revision_state) metadata field for more.

The `application` object includes all questions that have ever been in a program, even if the applicant did not answer them or they were skipped due to a visibility condition.

{% hint style="info" %}
**Note** The `application` object includes all questions that have ever been in a program, even if they're not in the most recent version of a program. This is for two reasons:
1. If a question is removed from the API response, code that consumes the response may still expect the question to be present and break when it's not. Keeping questions in the response, even after they're removed from the program, prevents this failure scenario.
1. If an applicant submits an application and then a question is removed from the program, the API should still return all the applicant's answers. If the `application` object only included questions from the most recent version of the program, some of the applicant's answers would be missing.
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
    "suffix": "I"
  },
  "favorite_color": {
    "question_type": "TEXT",
    "text": "purple"
  }
}
```
{% endcode %}

### Question keys
The question key is generated from the immutable admin name of the question. The immutable admin name of the question is specified by the admin when creating a question, and the question key is visible in the [generated API docs](#generated-program-specific-docs) page.

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
**Note** Questions can be nested arbitrarily deep, so if a question asked for the hours worked at each job a household member has, a path might look like
{% code %}
```js
application.household_members.entities[2].household_member_jobs.entities[1].household_member_jobs_hours_worked.number
```
{% endcode %}
This is the path to the number of hours worked at the 2nd job of the 3rd household member.
{% endhint %}

See [Enumerator questions](#enumerator-questions) below for more about enumerator questions.

### Question objects
Question objects contain the applicant's answers to a question, as well as some additional metadata. They all contain the same metadata property, as well as additional properties that vary based on the question type.

{% hint style="warning" %}
**Warning** The order of properties within the a JSON object is not guaranteed.
{% endhint %}

#### Question metadata
All question objects have a `question_type` field.

- **Property**: `question_type`
- **JSON Type**: `string`
- **Format**: An [enum](https://github.com/civiform/civiform/blob/main/server/app/services/export/enums/QuestionTypeExternal.java) currently consisting of one of [`ADDRESS`, `MULTI_SELECT`, `CURRENCY`, `DATE`, `SINGLE_SELECT`, `EMAIL`, `ENUMERATOR`, `FILE_UPLOAD`, `ID`, `NAME`, `NUMBER`, `TEXT`, `PHONE`].\
_Note_: More values may be added to this enum in the future. Ensure client code can handle additional "unknown" values.
- **Description**: Specifies the type of question this object represents.

### Address questions
`"question_type": "ADDRESS"`

In addition to the metadata field, address questions have the following properties:

#### `street`
- **Property**: `street`
- **JSON Type**: `string` or `null`
- **Format**: A Unicode `string` of any characters. `null` if the question was unanswered.
- **Description**: The "street" portion of the applicant's address. If any of `street`, `line2`, `city`, `state`, or `zip` are provided, then only `line2` is optional.

#### `line2`
- **Property**: `line2`
- **JSON Type**: `string`  or `null`
- **Format**: A Unicode `string` of any characters. `null` if the question was unanswered or the field was not filled.
- **Description**: The second line of the applicant's address (such as their apartment, suite number, etc). If any of `street`, `line2`, `city`, `state`, or `zip` are provided, then only `line2` is optional.

#### `city`
- **Property**: `city`
- **JSON Type**: `string`  or `null`
- **Format**: A Unicode `string` of any characters. `null` if the question was unanswered.
- **Description**: The "city" portion of the applicant's address. If any of `street`, `line2`, `city`, `state`, or `zip` are provided, then only `line2` is optional.

#### `state`
- **Property**: `state`
- **JSON Type**: `string` or `null`
- **Format**: A two letter state code, capitalized. (e.g. `NY`). Includes 50 states, DC, and 8 territories. See [USPS's Two–Letter State and Possession Abbreviations](https://pe.usps.com/text/pub28/28apb.htm) for the full list. `null` if the question was unanswered.
- **Description**: The "state" portion of the applicant's address. If any of `street`, `line2`, `city`, `state`, or `zip` are provided, then only `line2` is optional.

#### `zip`
- **Property**: `zip`
- **JSON Type**: `string` or `null`
- **Format**: A Unicode `string` consisting of 5 digits (`55555`), or 5 digits, a dash, a 4 digits (`55555-5555`). `null` if the question was unanswered.
- **Description**: The "zip" portion of the applicant's address. If any of `street`, `line2`, `city`, `state`, or `zip` are provided, then only `line2` is optional.

#### `corrected`
- **Property**: `corrected`
- **JSON Type**: `string` or `null`
- **Format**: An [enum](https://github.com/civiform/civiform/blob/main/server/app/services/geo/CorrectedAddressState.java) consisting of [`Corrected`, `Failed`, `AsEnteredByUser`] or `null` if the question was unanswered or address correction is not enabled.
- **Description**: Indicates the result of correcting an address.

#### `latitude`
- **Property**: `latitude`
- **JSON Type**: `string` or `null`
- **Format**: A string consistening of a signed Java `double`. `null` if the question was unanswered, the address was not corrected, address correction failed, or the user kept the address as they entered it.
- **Description**: The latitude of the applicant's corrected address, as specified by the address correction server.

#### `longitude`
- **Property**: `longitude`
- **JSON Type**: `string` or `null`
- **Format**: A string consistening of a signed Java `double`. `null` if the question was unanswered, the address was not corrected, address correction failed, or the user kept the address as they entered it.
- **Description**: The longitude of the applicant's corrected address, as specified by the address correction server.

#### `well_known_id`
- **Property**: `well_known_id`
- **JSON Type**: `string` or `null`
- **Format**: A Well Known ID for a [spacial reference system](https://developers.arcgis.com/documentation/spatial-references/#commonly-used-coordinate-reference-systems). `null` if the question was unanswered, the address was not corrected, address correction failed, or the user kept the address as they entered it.
- **Description**: The Well Known ID for the spacial reference system used by the `latitude` and `longitude` properties.

#### `service_area`
- **Property**: `service_area`
- **JSON Type**: `string` or `null`
- **Format**: A comma-separated, serialized list of service areas. Each is formatted as `{service area name}_{inclusion state}_{unix timestamp}`, such as `springfield_county_InArea_1709069741`. The service area name is defined by the admin, the inclusion state is one of [`InArea`, `NotInArea`, `Failed`], and the unix timestamp is the time when the inclusion check was made. `null` if the question was unanswered, the address was not corrected, address correction failed, or the user kept the address as they entered it.\
See [Configure GIS Service](/docs/it-manual/configure-gis-service.md#configure-service-area-validation) and [`ServiceAreaInclusionGroup.java`](https://github.com/civiform/civiform/blob/9108192304407704abf7daf6817929cfab34d874/server/app/services/geo/ServiceAreaInclusionGroup.java#L47) for more.
- **Description**: Describes the service areas this address has been validated against, and whether it is in each one.

{% hint style="info" %}
**Note** If you would like an easier-to-consume format for address correction related fields, please let the CiviForm maintainer team know so changes can be prioritized.
{% endhint %}

Altogether, an address question looks like

{% code %}
```json
"applicant_home_address" : {
  "question_type" : "ADDRESS",
  "street" : "23 Cornelia Street",
  "line2" : null,
  "city" : "New York",
  "state" : "NY",
  "zip" : "10014",
  "corrected" : "Corrected",
  "latitude" : "40.73175",
  "longitude" : "-74.00224",
  "well_known_id" : "4326",
  "service_area" : "manhattan_InArea_1709069741,brooklyn_NotInArea_1709069741"
},
```
{% endcode %}

### Checkbox questions
Checkbox questions are a form of multi-select question. See [Multiselect questions](#multi-select-questions) below.

### Currency questions
`"question_type": "CURRENCY"`

In addition to the metadata field, currency questions have the following property:

#### `currency_dollars`
- **Property**: `currency_dollars`
- **JSON Type**: `number` or `null`
- **Format**: A JSON number. `null` if unanswered.
- **Description**: An amount, in dollars.

A currency question looks like

{% code %}
```json
"applicant_weekly_grocery_cost" : {
  "question_type" : "CURRENCY",
  "currency_dollars" : 123.45
},
```
{% endcode %}

### Date questions
`"question_type": "DATE"`

In addition to the metadata field, date questions have the following property:

#### `date`
- **Property**: `date`
- **JSON Type**: `string` or `null`
- **Format**: An ISO 8601 formatted date, without the timezone. e.g `YYYY-MM-DD`. `null` if unanswered.
- **Description**: The applicant's answer to the date question.

A date question looks like

{% code %}
```json
"birth_date" : {
  "question_type" : "DATE",
  "date" : "1989-12-13"
},
```
{% endcode %}

### Dropdown questions
Dropdown questions are a form of single-select questions. See [Single-select questions](#single-select-questions) below.

### Email questions
`"question_type": "EMAIL"`

In addition to the metadata field, email questions have the following property:

#### `email`
- **Property**: `email`
- **JSON Type**: `string` or `null`
- **Format**: A Unicode string containing an email address, as validated by the applicant's browser. `null` if unanswered.\
_Note_: This is only client-side validated, so it should be treated as containing anything. No validation is performed if the applicant's browser doesn't properly validate fields with `<input type="email">`. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#value) for more.
- **Description**: The applicant's answer to the email question.

An email question looks like

{% code %}
```json
"contact_email" : {
  "question_type" : "EMAIL",
  "email" : "tswift1989@gmail.com"
},
```
{% endcode %}

### Enumerator questions
`"question_type": "ENUMERATOR"`

[Enumerator](/docs/user-manual/civiform-admin-guide/using-enumerator-questions-and-screens-in-a-program.md) questions allow you to ask applicants the same question about multiple entities. For example, how many hours do they work at each of their jobs? Or what is the age of each of their household members?

Applicants are asked to list the name of each entity, and then asked each repeated question for each entity they named.

In addition to the metadata field, enumerator questions have the following property:

#### `entities`
- **Property**: `entities`
- **JSON Type**: `[object]`
- **Format**: An array of JSON `object`s, each of which represents a repeated entity. Empty `[]` if unanswered.
- **Description**: The list of repeated entities, each of which contains answers to the repeated questions for that entity.

##### Repeated entity `object`s
Each repeated entity is an object that follows the same semantics as the `application` object as a whole. It has an `entity_name` property, as well as a property for each repeated question.

###### `entity_name`
- **Property**: `entity_name`
- **JSON Type**: `string`
- **Format**: A Unicode `string` of any characters.
- **Description**: The name the applicant provided for each repeated entity. Used on each repeated screen in the repeated question title, such as "What is `$household_member`'s phone number?"

An enumerator question, with two entities and a repeated `household_member_phone_number` phone question and a repeated `household_member_job` text question, looks like

{% code %}
```json
"household_members": {
  "question_type": "ENUMERATOR",
  "entities": [
    {
      "entity_name": "Taylor",
      "household_member_job": {
        "question_type": "TEXT",
        "text": "Pop artist"
      },
      "household_member_phone_number": {
        "question_type": "PHONE",
        "phone_number": "+16156667777"
      }
    },
    {
      "entity_name": "Sza",
      "household_member_job": {
        "question_type": "TEXT",
        "text": "R&B artist"
      },
      "household_member_phone_number": {
        "question_type": "PHONE",
        "phone_number": "+18623334444"
      }
    }
  ]
},
```
{% endcode %}

### File upload questions
`"question_type": "FILE_UPLOAD"`

{% hint style="info" %}
The API doesn't currently support exporting files programatically. It only provides a link a Program Admin can use to retrieve the file. See [GitHub Issue #5025](https://github.com/civiform/civiform/issues/5025) for progress on supporting programmatically retrieving files.
{% endhint %}

In addition to the metadata field, file upload questions have the following property:

#### `file_key`
- **Property**: `file_key`
- **JSON Type**: `string` or `null`
- **Format**: A URL, `null` if unanswered.
- **Description**: A link to the file the applicant uploaded.\
_Note_: This property is deprecated and soon to be replaced by `file_urls`. It is not included if the MULTIPLE_FILE_UPLOAD_ENABLED flag is turned on.

#### `file_urls`
- **Property**: `file_urls`
- **JSON Type**: `[string]`
- **Format**: An array of URLs, or an empty array `[]` if unanswered.
- **Description**: An array of links to the file the applicant uploaded.\
_Note_: This link is not a link to the file that can be used programatically. It's a link that requires a Program Admin login to retrieve the file.

An file upload question looks like

{% code %}
```json
"proof_of_income" : {
  "question_type" : "FILE_UPLOAD",
  "file_key" : "https://my.civiform.gov/file_key.pdf",
  "file_urls" : [ "https://my.civiform.gov/file_key.pdf" ]
},
```
{% endcode %}

### ID questions
`"question_type": "ID"`

In addition to the metadata field, ID questions have the following property:

#### `id`
- **Property**: `id`
- **JSON Type**: `string` or `null`
- **Format**: A Unicode string consisting of only digits (`^[0-9]*$`). If min or max lengths are specified on the question they are also enforced.  `null` if unanswered.\
_Note_: Answers from applications from before a min or max constraint is added to a question will not follow that constraint and may be of any length.
- **Description**: The applicant's answer to the ID question.

An ID question looks like

{% code %}
```json
"drivers_license_number" : {
  "question_type" : "ID",
  "id" : "011235813"
},
```
{% endcode %}

### Multi-select questions
`"question_type": "MULTI_SELECT"`

Multi-select questions allow applicants to select multiple options from a list.

In addition to the metadata field, multi-select questions have the following property:

#### `selections`
- **Property**: `selections`
- **JSON Type**: `[string]`
- **Format**: An array of Unicode `string`s, which are the admin IDs of the selected options. An empty array `[]` if no options were selected or the question was unanswered. With the exception of questions created before March 2024, admin IDs can only contain lowercase letters, numbers, underscores, and dashes.\
_Note_: Any option admin ID that has ever been available for applicants to select may be returned. A list of all possible option admin IDs is available in the [program-specific API docs](#generated-program-specific-docs) in your CiviForm instance.
- **Description**: A list of the question options selected by the applicant.

A multi-select question looks like

{% code %}
```json
"kitchen_implements" : {
  "question_type" : "MULTI_SELECT",
  "selections" : ["whisk", "spatula", "garlic_press"]
},
```
{% endcode %}

### Name questions
`"question_type": "NAME"`

In addition to the metadata field, name questions have the following properties:

#### `first_name`
- **Property**: `first_name`
- **JSON Type**: `string` or `null`
- **Format**: A Unicode string of any characters. `null` if the question is unanswered.
- **Description**: The applicant's first name. If the question is answered, only the `middle_name` and `suffix` are optional.

#### `middle_name`
- **Property**: `middle_name`
- **JSON Type**: `string` or `null`
- **Format**: A Unicode string of any characters. `null` if unanswered or not provided.
- **Description**: The applicant's middle name. If the question is answered, only the `middle_name` and `suffix` are optional.

#### `last_name`
- **Property**: `last_name`
- **JSON Type**: `string` or `null`
- **Format**: A Unicode string of any characters. `null` if the question is unanswered.
- **Description**: The applicant's last name. If the question is answered, only the `middle_name` and `suffix` are optional.

#### `suffix`
- **Property**: `suffix`
- **JSON Type**: `string`
- **Value**: An [enum](https://github.com/civiform/civiform/blob/main/server/app/models/ApplicantModel.java#L43)
currently conssiting of one of [`JR`, `SR`, `I`, `II`, `III`, `IV`, `V`].\
_Note_: More values may be added to this enum in the future. Ensure client code can handle additional "unknown" values.
- **Description**: The applicant's name suffix. If the question is answered, only the `middle_name` and `suffix` are optional.

A name question looks like

{% code %}
```json
"applicant_name" : {
  "question_type" : "NAME",
  "first_name" : "Taylor",
  "middle_name" : "Allison",
  "last_name" : "Swift",
  "suffix" : "I"
},
```
{% endcode %}

### Number questions
`"question_type": "NUMBER"`

In addition to the metadata field, number questions have the following property:

#### `number`
- **Property**: `number`
- **JSON Type**: `number` or `null`
- **Format**: An integer number. If min or max values are specified on the question they are also enforced.  `null` if unanswered.\
_Note_: Answers from applications from before a min or max constraint is added to a question will not follow that constraint and may be of any value.
- **Description**: The applicant's answer to the number question.

A number question looks like

{% code %}
```json
"lucky_number" : {
  "question_type" : "NUMBER",
  "number" : "13"
},
```
{% endcode %}

### Radio questions
Radio questions are a form of single-select questions. See [Single-select questions](#single-select-questions) below.

### Single-select questions
`"question_type": "SINGLE_SELECT"`

Single-select questions allow applicants to select a single option from a list.

In addition to the metadata field, single-select questions have the following property:

#### `selection`
- **Property**: `selection`
- **JSON Type**: `string` or `null`
- **Format**: A Unicode `string` containing the admin ID of the selected option. `null` if unanswered. With the exception of questions created before March 2024, admin IDs can only contain lowercase letters, numbers, underscores, and dashes.\
_Note_: Any option admin ID that has ever been available for applicants to select may be returned. A list of all possible option admin IDs is available in the [program-specific API docs](#generated-program-specific-docs) in your CiviForm instance.
- **Description**: A list of the question options selected by the applicant.

A multi-select question looks like

{% code %}
```json
"kitchen_implements" : {
  "question_type" : "SINGLE_SELECT",
  "selection" : "garlic_press"
},
```
{% endcode %}

### Static text questions
Static text questions are not presented in the API because there is nothing for the applicant to answer.

### Text questions
`"question_type": "TEXT"`

In addition to the metadata field, text questions have the following property:

#### `text`
- **Property**: `text`
- **JSON Type**: `string` or `null`
- **Format**: A Unicode `string` containing any characters. If min or max lengths are specified on the question they are also enforced. `null` if unanswered.\
_Note_: Answers from applications from before a min or max constraint is added to a question will not follow that constraint and may be of any length.
- **Description**: The applicant's answer to the text question.

A text question looks like

{% code %}
```json
"favorite_color" : {
  "question_type" : "TEXT",
  "text" : "My favorite color is purple 💖"
},
```
{% endcode %}

### Phone number questions
`"question_type": "PHONE"`

In addition to the metadata field, phone number questions have the following property:

#### `phone_number`
- **Property**: `phone_number`
- **JSON Type**: `string` or `null`
- **Format**: A Unicode `string` consisting of a phone number prefixed with the country-code, in [E164](https://www.javadoc.io/doc/com.googlecode.libphonenumber/libphonenumber/latest/com/google/i18n/phonenumbers/PhoneNumberUtil.PhoneNumberFormat.html) format. For example, `+15556667777`. `null` if unanswered.\
_Note_: Phone numbers are validated to be in a valid pattern, but are not confirmed to be dialable.
- **Description**: The applicant's answer to the number question.

A phone number question looks like

{% code %}
```json
"cell_phone" : {
  "question_type" : "PHONE",
  "phone_number" : "+15556667777"
},
```
{% endcode %}

## Example endpoint response

### Generated program-specific docs
For an example response for one of your programs, go to "API docs" in the admin console, or visit `<my civiform url>/api/docs/v1/`. You can see the example response for both your active and draft programs.

{% hint style="info" %}
**Tip** For an example response for one of your programs, go to "API docs" in the admin console, or visit `<my civiform url>/api/docs/v1/`.
{% endhint %}

### Generic program example
Below is an example endpoint response for a generic program.

{% code %}
```json
{
  "nextPageToken": "YXR0ZXJuIG9mIHZpb2xhdGlvbiBvZiBjb21tdW5pdHkKc3Rhb",
  "payload": [{
    "applicant_id": 1,
    "application_id": 2,
    "create_time": "2023-05-25T13:46:15-07:00",
    "language": "en-US",
    "program_name": "sample-application",
    "program_version_id": 3,
    "revision_state": "CURRENT",
    "status": "custom status",
    "submit_time": "2023-05-26T13:46:15-07:00",
    "submitter_type": "TRUSTED_INTERMEDIARY",
    "ti_email": "alice@trustedintermediary.org",
    "ti_organization": "TIs Inc.",
    "application": {
      "favorite_color" : {
        "question_type" : "TEXT",
        "text" : "My favorite color is purple 💖"
      },
      "kitchen_implements" : {
        "question_type" : "SINGLE_SELECT",
        "selection" : "garlic_press"
      }
    }
  }, {
    "applicant_id": 3,
    "application_id": 4,
    "create_time": "2023-05-27T02:21:14-07:00",
    "language": "en-US",
    "program_name": "sample-application",
    "program_version_id": 5,
    "revision_state": "CURRENT",
    "status": "custom status",
    "submit_time": "2023-05-27T02:26:45-07:00",
    "submitter_type": "APPLICANT",
    "ti_email": null,
    "ti_organization": null,
    "application": {
      "favorite_color" : {
        "question_type" : "TEXT",
        "text" : "My favorite color is blue!"
      },
      "kitchen_implements" : {
        "question_type" : "SINGLE_SELECT",
        "selection" : "colander"
      }
    }
  }]
}
```
{% endcode %}

## Example client code: python

Below is a very minimal script demonstrating how to request applications to a program named "Utility discount program" between January 3, 2022 and February 4, 2022, with a page size of 100.

{% hint style="warning" %}
**Warning** This script is provided as an example only. It does not do things a production script should, such as retry failed requests.
{% endhint %}

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

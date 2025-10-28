# Manage questions

Questions form the structure of a CiviForm program. When a CiviForm Admin creates a question for one of their forms, the question is saved in the global question bank. When programs reuse the same question, all Applicant data related to the question gets autofilled. This reduces duplicate data entry and ensures accuracy by using previously vetted information.

### Create a question
Watch the video or follow the step-by-step guide below.

{% embed url="https://drive.google.com/file/d/1W6qisNemjmm-HBRlHTiohQls2oA9Q_Hz/view?usp=sharing" %} Create new questions in the shared question bank. {% endembed %}

1. Sign in to CiviForm as a CiviForm Admin.
2. Click **Questions** on the navigation bar.
3. Click **Create new question** and select a question type.\
   For more details on question types, go to [Question types](manage-questions.md#question-types).
4. Enter the information for the question.
5. Click **Create**.\
   The new question appears in the list of questions.

**Tip**: You might want to develop a naming convention for your questions. For example, address-residence, address-work, etc.


### Edit a question

You can edit both unpublished and published questions. To edit published questions, you need a new version. For more details on versioning, go to [Manage versions for programs & questions.](manage-versions-for-programs-and-questions.md)

1. Sign in to CiviForm as a CiviForm Admin.
2. Click **Questions** on the navigation bar and select a question.
3. Click **Edit draft**.
4. Modify the question information fields.
5. Click **Update**.

### Archive a question

If a question is no longer in use by any program, you can archive a question.

1. Sign in to CiviForm as a CiviForm Admin.
2. Click **Questions** on the navigation bar and select a question.
3. Click **Archive**.

### Restore an archived question

When you restore an archived question, you can use it in your programs. You can restore an archived question up until the next version is published. For more details on versioning, go to [Manage versions for programs & questions.](manage-versions-for-programs-and-questions.md)

1. Sign in to CiviForm as a CiviForm Admin.
2. Click **Questions** on the navigation bar and select an archived question.
3. Click **Restore archived**.


### Question type requirements

All question types have the following configuration options:

* Title (text shown to the user)
* Description or help text (this is raw text, but if we detect a URL, we can format it as a hyperlink.)
* Required or optional

Each question may have zero, one, or more validation criteria.

* For simplicity, if there are two or more criteria, it's assumed that they're joined with "AND" (all criteria must be met for the answer to be accepted)
* The list of supported validation criteria are given under each question type's heading.

Each validation criterion may be paired with an error message in case that criterion isn't met.


### Question types

You can customize your program to include multiple different question types. The table below shows the supported question types, along with the expected data input.

| **Type** | **Use case and expected data** |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Address | An Applicant’s address. For example, residential, work, mailing, school, etc. |
| Currency | Currency questions are formatted with a decimal point (.) as a separator between the dollars and cents. Useful for asking income and debt-related questions (e.g. wages, benefits received, loan amounts, etc). |
| Checkbox | Useful when Applicants need to check multiple items to answer the question fully.<br><strong>Tip</strong>: If you want Applicants to select only one option from a group of options, use a Dropdown or Radio Button question instead.<br><strong>Tip</strong>: If a Checkbox question is required, then Applicants <strong>must</strong> select at least one answer. For checkbox questions where an Applicant could have no answer, consider including a "None of these" option or making the checkbox question optional. |
| Date | Suitable for capturing dates. For example, date of birth, graduation date, employment start date. |
| Dropdown | Useful for long lists (>8 items) of static data where a single selection is required. For example, a daycare program restricted to certain daycare sites. |
| Email | An Applicant’s email address. |
| Enumerator | Allows applicants to create a list of one type of entity. For example, household members, vehicles, jobs, etc. Enumerators do not store question data. Instead, the data is stored within the repeated questions within the enumerator. Enumerators also allow you to dynamically add multiple questions whenever needed, reducing program clutter. For example, you can create a repeater to ask the same questions for every member of an Applicant’s household. Enumerator questions must be the only question in an enumerator screen. For more details, go to <a href="using-enumerator-questions-and-screens-in-a-program.md">Using enumerator questions &#x26; screens in a program.</a> |
| File Upload | Allows Applicants to upload files to support their application. For example, PDF files and images (PNG, JPG, GIF). File Upload questions must be the only question in a screen. |
| ID | Useful for requesting identification or account numbers. For example, a resident's utility account number. Only numeric numbers are allowed. The minimum and maximum length for this field can be defined in the question settings. |
| Map | Allows Applicants to select a location (point) on an interactive map or a checkbox list that corresponds with the map locations. Useful for helping Applicants understand where on the map the locations they are selecting are located. Admins must be able to provide an endpoint that returns [GeoJSON](https://datatracker.ietf.org/doc/html/rfc7946) location data (Point features only) with properties for display name, address, and details URL (field names configurable). When an applicant selects a location, the response includes the Feature ID and the display name at the time of selection. Admins can include a maximum number of selections for this question. For more details, go to [Map questions](manage-questions.md#map-questions). |
| Name | A full, legal name. |
| Number | Applicants can enter a numeric value. For example, annual household income. Numbers must be integers only with no decimals allowed. Users can increase or decrease the number using the arrow buttons within the field. |
| Radio Button | Suitable for a short list (&#x3C;=7 items) of static items where the Applicant is required to select only one option. For example, simple yes/no questions or employment status. <strong>Tip</strong>: If you want Applicants to select multiple options in a question, use a Checkbox question instead. |
| Static Text | A free form field that includes the ability to fully format text using Markdown. See <a href="using-markdown.md">Using Markdown</a> for more information. |
| Text | A free form field that can store letters, numbers, characters, or symbols. |
| Phone | Accepts two inputs from the user: the country, and the number. The number is a formatted input in the (xxx) xxx-xxxx format. Currently, it supports only US and Canadian numbers. The phone numbers are validated and stored as strings. When the admin views the entered number, they see it in the +1 xxx-xxx-xxxx format. |

### Map questions

Map questions allow applicants to interact with a geographic interface to select locations relevant to their application. This section covers the detailed setup and configuration options for map questions.

#### Setup requirements

To use map questions in your CiviForm instance, you need:

1. A GeoJSON endpoint that provides location data
2. Valid [GeoJSON](https://datatracker.ietf.org/doc/html/rfc7946) data containing Features with:
   - Unique identifiers
   - Point geometry only (longitude and latitude coordinates)
   - Properties must include fields for:
     - Display name of the location
     - Physical address of the location
     - URL linking to more information about the location
     
   When configuring the map question, admins specify which GeoJSON property fields contain this information.

#### Configuration options

When creating a map question, admins must configure:

1. **GeoJSON Property Mappings**:
   - **Display Name Field**: Specify which GeoJSON property contains the location's display name (e.g., "facility_name", "location_title")
   - **Address Field**: Specify which property contains the location's address (e.g., "street_address", "location")
   - **Details URL Field**: Specify which property contains the URL for more information (e.g., "more_info_link", "website")

Admins can also configure:

- **Maximum selections**: Limit how many locations an applicant can choose
- **Filters**: Add filters based on specific GeoJSON property keys to help applicants find relevant locations
- **Alerts**: Configure alert messages that display when an applicant selects a location with specific property values

For example, if your GeoJSON data looks like:
```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [-122.4194, 37.7749]
  },
  "properties": {
    "facility_name": "Main Community Center",
    "location": "123 Main St, San Francisco, CA",
    "more_info_link": "https://example.com/center",
    "wheelchair_accessible": true,
    "capacity": "limited"
  }
}
```

You would:
1. Map `facility_name` as the display name field
2. Map `location` as the address field
3. Map `more_info_link` as the details URL field
4. Optionally add a filter for `wheelchair_accessible`
5. Optionally add an alert for locations where `capacity` equals "limited"

#### Data storage and refresh settings

The map question stores the complete GeoJSON response from the endpoint. When an applicant makes a selection, CiviForm stores as Applicant data:
- The Feature ID of the selected location
- The value of the configured name field at the time of selection

Note: It is the admin's responsibility to maintain a record of which location corresponds to each Feature ID.

By default, the stored GeoJSON response won't be automatically updated. To enable automatic data refresh:

1. Set `durable_jobs.map_refresh=true` in your application configuration
2. Once enabled, CiviForm will ping the GeoJSON endpoint every 10 minutes to refresh the location data

This automatic refresh is useful for locations with frequently changing properties (e.g., availability, capacity, or service hours).

#### Validation options

The map question supports:
- Required vs optional selection
- Maximum number of selections

#### Accessibility considerations

To ensure map questions are accessible to all users:
- Ensure location names are clear
- Include filters if possible to help Applicants narrow down the list of locations

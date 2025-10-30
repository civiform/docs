# Map questions

Map questions allow applicants to interact with a geographic interface to select locations relevant to their application. This section covers the detailed setup and configuration options for map questions.

## Setup requirements

1. A GeoJSON endpoint that provides location data
2. Valid [GeoJSON](https://datatracker.ietf.org/doc/html/rfc7946) data containing Features with:
   - Unique identifiers
   - Point geometry only (longitude and latitude coordinates)
   - Properties must include fields for:
     - Display name of the location
     - Physical address of the location
     - URL linking to more information about the location
   
   When configuring the map question, admins specify which GeoJSON property fields contain this information.

## Configuration options

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

## Data storage and refresh settings

The map question stores the complete GeoJSON response from the endpoint. When an applicant makes a selection, CiviForm returns:
- The Feature ID of the selected location
- The value of the configured name field at the time of selection

Note: It is the admin's responsibility to maintain a record of which location corresponds to each Feature ID, as CiviForm only returns these two pieces of information.

By default, the stored GeoJSON response won't be automatically updated. To enable automatic data refresh:

1. Set `durable_jobs.map_refresh=true` in your application configuration
2. Once enabled, CiviForm will ping the GeoJSON endpoint every 10 minutes to refresh the location data

This automatic refresh is useful for locations with frequently changing properties (e.g., availability, capacity, or service hours).

## Validation options

The map question supports:
- Required vs optional selection
- Maximum number of selections

## Accessibility considerations

To ensure map questions are accessible to all users:
- Ensure location names are clear
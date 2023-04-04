# How to Configure your GIS service for address correction and service area validation

There are several configuration values needed to enable address correction and service area validation. These features rely on an external Esri service and are not compatible with other geolocation services.

The address correction feature may be enabled on its own, but service area validation depends on address correction being enabled.

## Configure Address Correction

[ESRI_ADDRESS_CORRECTION_ENABLED](https://github.com/civiform/civiform/blob/fd0aaa002e2ee01d378ca90f236c316641ed0101/server/conf/application.conf#L725) - Boolean

Enables the feature that allows address correction for address questions.

[ESRI_FIND_ADDRESS_CANDIDATES_URL](https://github.com/civiform/civiform/blob/fd0aaa002e2ee01d378ca90f236c316641ed0101/server/conf/application.conf#L726) - String

The URL CiviForm will use to call Esri’s [findAddressCandidates service](https://developers.arcgis.com/rest/geocode/api-reference/geocoding-find-address-candidates.htm).

## Configure Service Area Validation

[ESRI_ADDRESS_SERVICE_AREA_VALIDATION_ENABLED](https://github.com/civiform/civiform/blob/fd0aaa002e2ee01d378ca90f236c316641ed0101/server/conf/application.conf#L729) - Boolean

Enables the feature that allows for service area validation of a corrected address. ESRI_ADDRESS_CORRECTION_ENABLED needs to be enabled.

[ESRI_ADDRESS_SERVICE_AREA_VALIDATION_LABELS](https://github.com/civiform/civiform/blob/fd0aaa002e2ee01d378ca90f236c316641ed0101/server/conf/application.conf#L730) - String[]

Human readable labels used to present the service area validation options in CiviForm’s admin UI.

Example value: ["Seattle"]

[ESRI_ADDRESS_SERVICE_AREA_VALIDATION_IDS](https://github.com/civiform/civiform/blob/fd0aaa002e2ee01d378ca90f236c316641ed0101/server/conf/application.conf#L731) - String[]

The value CiviForm uses to validate if an address is in a service area.

Example value: ["Seattle"]

[ESRI_ADDRESS_SERVICE_AREA_VALIDATION_URLS](https://github.com/civiform/civiform/blob/fd0aaa002e2ee01d378ca90f236c316641ed0101/server/conf/application.conf#L732) - String[]

The URL CiviForm will use to call Esri’s [map query service](https://developers.arcgis.com/rest/services-reference/enterprise/query-feature-service-layer-.htm) for service area validation.

Example value: ["https://gisdata.your city.gov/server/rest/services/City_Limits/MapServer/1/query"]

[ESRI_ADDRESS_SERVICE_AREA_VALIDATION_ATTRIBUTES](https://github.com/civiform/civiform/blob/fd0aaa002e2ee01d378ca90f236c316641ed0101/server/conf/application.conf#L733) - String[]

The attribute CiviForm checks from the service area validation response to get the service area validation ID.

Example value: ["CITYNAME"]

[ESRI_EXTERNAL_CALL_TRIES](https://github.com/civiform/civiform/blob/fd0aaa002e2ee01d378ca90f236c316641ed0101/server/conf/application.conf#L735) - Integer

The number of tries CiviForm will attempt requests to external Esri services.



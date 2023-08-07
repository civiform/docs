# Data intake

This page describes where various pieces of data related to user accounts originate.

CiviForm's use of a flexible, admin-defined [backend data model](./backend-data-model.md) complicates investigations into where a given piece of data about an applicant comes from.

## `ApplicantData`

Generally speaking, data stored in [ApplicantData](https://github.com/civiform/civiform/blob/main/server/app/services/applicant/ApplicantData.java) (per the [backend data model](./backend-data-model.md) schema) originates from applicants (or TIs acting on an applicant's behalf) answering questions.

### Hard-coded ApplicantData entries

#### Well known paths

["Well known paths"](https://github.com/civiform/civiform/blob/main/server/app/services/WellKnownPaths.java#L4) are hard-coded pointers into `ApplicantData` that enable hard-coded logic for reading and writing specific pieces of data in the flexible schema. These were added to support features such as searching for an applicant by their name or date of birth and displaying the applicant's name in the UI:
- TIs can directly update applicant name and DoB ([example](https://github.com/civiform/civiform/blob/main/server/app/services/ti/TrustedIntermediaryService.java#L199-L200))
- Authentication logic sets the applicant's name using the identity provider-furnished value when they login ([example](https://github.com/civiform/civiform/blob/main/server/app/auth/oidc/applicant/ApplicantProfileCreator.java#L113))

#### Preferred locale

The applicant's preferred locale is stored in `ApplicantData` with [hard coded and and write logic](https://github.com/civiform/civiform/blob/main/server/app/controllers/applicant/ApplicantInformationController.java#L179) to support the applicant specifying it.

## Account data

Data stored on an applicant's account originates from identity providers and CiviForm Admin user behavior.

### Email address

Each account's email address originates from the identity provider the account authenticated with. It is unset for guest accounts.

### Permissions data

#### Global admin

The `globalAdmin` boolean on `Account` determines if an account is a CiviForm Admin. [Authentication logic](https://github.com/civiform/civiform/blob/main/server/app/auth/oidc/admin/AdfsProfileCreator.java#L55-L64) sets this value based on [OIDC claims](https://github.com/civiform/civiform/blob/main/server/conf/env-var-docs.json#L244-L247) from the staff identity provider.

#### Administered programs

The `adminOf` list on `Account` determines what, if any, programs the account is an administrator of. It is set by CiviForm Admin role.

#### Managed by group

If `managedByGroup` is set on `Account`, the account is an applicant account and a client of the TI organization referenced by the `managedByGroup` attribute. `managedByGroup` is set when a TI creates a client.

#### Member of group

If `memberOfGroup` is set on `Account`, the account is a TI account and a member of the TI organization referenced by the `memberOfGroup` attribute. `memberOfGroup` is set when [the CiviForm Admin role specifies an account as a TI](https://github.com/civiform/civiform/blob/main/server/app/repository/UserRepository.java#L178).

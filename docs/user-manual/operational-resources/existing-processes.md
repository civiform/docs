# Working with existing program processes
In order for CiviForm to be implemented sucessfully, it must be easy for your program staff to continue administering their programs without significantly disturbing their existing workflows and processes. Integrating CiviForm with existing tools and processes allows staff to take advantage of CiviForm's benefits without introducing a substantial learning curve. 

This approach assumes there are three phases of end-to-end service delivery: (1) Accepting applications, (2) reviewing applications, and (3) delivering benefits/services. Existing tools may serve all or none of these purposes, whereas CiviForm can serve to (1) accept applications, and optionally (2) review applications, depending on the needs and existing approach of each program.

Here are a few examples of how CiviForm can integrate with existing tools and processes.

## Accepting applications from CiviForm to process with existing tools
Certain programs may already have back-office tools that work well for program staff. In such cases, CiviForm can integrate with those tools as a channel to acccept applications without significant additional effort necessary on the part of program staff.

### CiviForm as the primary channel for accepting applications
|  | Accept applications | Review Applications | Deliver benefits/services |
| -- | -- | -- | -- |
| **CiviForm** | ✅ | ❌ | ❌ |
| **Existing tool** | ❌ | ✅ | ✅ |

If a program doesn't have a significant existing online application (e.g. primarily paper, phone, or walk-in applications), but does have existing back-office tools for application review and processing, then CiviForm can serve as the primary resident-facing channel through which the program accepts applications online. When residents submit applications through CiviForm, the data can be exported using the API and ingested into the existing tool for program staff to review and process as they normally do.

### CiviForm as a secondary channel for accepting applications
|  | Accept applications | Review Applications | Deliver benefits/services |
| -- | -- | -- | -- |
| **CiviForm** | ✅ | ❌ | ❌ |
| **Existing tool** | ✅ | ✅ | ✅ |

If a program already has an online form for accepting applications that the program wishes to keep, CiviForm can be used as a secondary channel for accepting applications. Similar to the option above, application revview and processing takes place in existing tools -- CiviForm just acts as another source of applications.

### Keeping tools in sync
In the examples above, program staff do not need to interact with CiviForm at all, since it is simply being used as another channel for accepting applications into existing back-office tools. However, depending on the remainder of the process, it may be important to keep specific information in sync across existing tools and CiviForm.

For example, if you wish to communicate program status updates via email to applicants using CiviForm, that information must be updated in CiviForm, either via the interface or through the API (API re-design in progress as of Q2 2023). However, if status updates are communicated through existing tools, then no such integration back into CiviForm is necessary and CiviForm's status update feature can be disabled for that program.

Similarly, if additional information needs to be collected from an applicant, if that information is collected through a tool other than CiviForm, it will not be apparent to the applicant that their information has been updated. In this case, asking the applicant to submit the additional information from within CiviForm directly, or having a mechanism to feed the new information back into CiviForm via the interface or API (API re-design in progress as of Q2 2023) may be necessary to ensure a good applicant experience with consistent information across tools.

Additionally, if information requirements change in existing forms or online applications, mechanisms must be put in place to update CiviForm's forms to match those changes and ensure consistency across different channels.

#### Linking data with existing accounts

[comment]: # (TODO: Add details here.)

### CiviForm for discovery or eligibility screening
Even if CiviForm is not used to accept applications for a given program, it may be valuable as a tool for discovery or eligibily screening that then directs applicants to an existing application form. See "[Discovery, Eligiblity Screening, and Intake](discovery-eligibility-intake.md)" for more information.

## Accepting and reviewing applications within CiviForm
If a program doesn't already have a back-office application review tool or is looking to replace an existing tool, program staff can directly use CiviForm to review applications. For simple programs, this enables staff to take advantage of CiviForm's built-in features such as status tracking, status notifications, and note-keeping. For more complex programs, additional steps may be required for the delivery of benefits/services after applications are approved within CiviForm (for example, exporting data to a payment processor or another system to disburse funds, or referring someone to a service provider for next steps).

### CiviForm as the primary tool for reviewing applications
|  | Accept applications | Review Applications | Deliver benefits/services |
| -- | -- | -- | -- |
| **CiviForm** | ✅ | ✅ | ❌ |
| **Existing tool** | 🟡 | ❌ | 🟡 |

If a program wishes to use CiviForm as the primary interface through which applications are reviewed, CiviForm can perform this functionality out of the box. Program administrators can review applications, keep internal notes, update an application's status, and send notifications to applicants when their application status changes.

This approach can be taken regardless of whether or not there are existing channels for application intake; however, administration may be simpler if a program chooses to standardize on using CiviForm for application intake (for example, encouraging individuals to apply through CiviForm, or having program or CBO staff submit walk-in or phone applications through CiviForm on behalf of residents). Otherwise, there will be separate review processes for different application channels.

### CiviForm as a secondary tool for reviewing applications
|  | Accept applications | Review Applications | Deliver benefits/services |
| -- | -- | -- | -- |
| **CiviForm** | ✅ | ✅ | ❌ |
| **Existing tool** | 🟡 | 🟡 | 🟡 |

If there is already a tool used for reviewing applications that a program wishes to keep, CiviForm can be used alongside that tool, albeit at the cost of having two different review processes. This may be useful in a state of transition as a program consolidates to use one tool (whether CiviForm or the existing tool), or if there is a way to consolidate the remainder of the delivery process after applications are reviewed across tools. Understanding the primary channels for accepting applications and the downstream processes after applications are review can help make a decision about how to best integrate CiviForm within a program's workflow.

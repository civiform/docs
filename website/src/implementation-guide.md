---
layout: layouts/page.njk
title: CiviForm | Implementation Guide
---

# CiviForm Implementation Guide

## Overview

CiviForm is a powerful [open-source](https://en.wikipedia.org/wiki/Open_source) tool that helps civic entities and governments simplify the administration of benefit programs so they can better reach communities in need. It makes it easier for residents to access those benefits by helping them find and apply to multiple programs in one place.

Your CiviForm implementation will be most successful if:

* It has an owner and champion.  
* You can decide early as to which will be the first programs you will deploy on CiviForm.  
* You can simplify, condense, and centralize your program applications.  
* You can simplify how you process and follow up on applications.

To ensure a successful CiviForm implementation, read through the guide below to start building your programs. 

## Explore Your Needs and Goals

* **Define resident and program needs:** To create program forms that people will find intuitive and easy to use, based on the needs of both your residents and program administrators.  
  * Spend time to understand how your residents and administrators interact with your program’s current application process so that you can optimize the experience of CiviForm for the people who will be using it the most:  
    * Review [Preparing for Human-Centered Redesign](https://beeckcenter.georgetown.edu/report/preparing-for-human-centered-redesign/).  
    * Read more about [mapping the applicant experience](https://github.com/usds/benefits-enrollment-prototype/blob/master/assets/discovery-findings-mapping-enrollment-Nov2016.pdf).  
  * Consider engaging community-based organizations for user research.

* **Decide who will be** responsible for CiviForm within your civic entity  
  * Decide who will be the [**Admin**](https://docs.civiform.us/overview/how-does-civiform-work#civiform-admin-experience) that creates forms and programs on CiviForm.   
  * Decide who will be the IT person who deploys CiviForm updates, monitors the system, and maintains your CiviForm instance (IT team, Digital Services or other).

* **Review and evaluate** the [Recommended CiviForm Launch Team](https://docs.google.com/document/d/1AacsuDbMmVfmBuWWSNRz3nOUYR3WG5_KDnDgxrc6z0A/edit)  
  * Consider if any new staffing or resources are needed for the implementation and maintenance of CiviForm and/or the programs.

## Design the Forms

* **Choose programs to put in CiviForm:** Determine which programs will benefit most from using CiviForm (e.g., benefit applications, complaint forms, event registrations, permit applications).  
  * Evaluate programs most likely to benefit from CiviForm by using these resources:  
    *  [CiviForm Fellowship - Program Assessment](https://docs.google.com/document/d/10TTk68evp-X8iJ2W3S2--MpiqMeg1Uf0jTysbZITEdg/edit?usp=sharing)  
    *  [CiviForm - Program Evaluation Worksheet ](https://docs.google.com/spreadsheets/d/1_NNMln-LOAxxXCoYgh1oI0uaS6YhoyMoBvudaiKRMm4/edit?resourcekey=0-KPl3Y1YgUYty81OKHbRMpQ#gid=629433048)  
* **Streamline the questions that appear across CiviForm**: Examine selected programs to identify the questions that appear on each of their application forms, and consolidate any questions that appear across multiple forms:  
  * Review the information gathered on the application for each program and identify common questions across programs (Ex. Name, Address, Income). Explore ways to consolidate these questions to streamline reuse. Keep in mind that there may be different definitions for certain question types. For example, “household or income” may be different across different programs such that you can’t use a universal question to collect this information and reuse it. However, take this opportunity to remove any truly unnecessary or redundant questions.  
  * Review program applications and questions so that they comply with any legal, regulatory, or compliance requirements.   
  * Gather the administrative and policy requirements for different programs from program stakeholders, including program administrators.   
  * Consider creating an initial “Common Intake” or “Get Started” form for residents to complete necessary information for multiple programs at once and to check if residents are eligible for additional programs.  
* **Design the process for each program**  
  * Decide on who the program owner and primary point of contact will be.  
  * Decide if applications to the program will be reviewed in CiviForm or in an external system. If an external system, identify the technical points of contact.  
  * Consider principles of organizational change management when working with program staff. Working with new technology is always challenging and will require changes to your process. Consider important members of the leadership team who should be involved early and can champion the change process.   
  * Review the [form building how-to-guide](https://docs.civiform.us/user-manual/civiform-admin-guide/working-with-programs/create-a-program) to begin building your first program  
    * Create forms that are easy to understand and complete, using [plain language](http://plainlanguage.gov).  
    * Keep  accessibility standards (e.g., [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/)) in mind when creating your forms.  
    * Consider which natural languages you will support for navigation, program questions and answers. Find translation resources and add time to your project timeline for translations for program descriptions, questions, and answers. Note: [CiviForm natively supports these languages](https://docs.civiform.us/user-manual/civiform-admin-guide/manage-translations-for-programs-and-questions) for the User Interface.

## Test and Implement

* Identify the list of relevant success metrics to identify what a successful launch would look like for each program launch. Forms may need to be designed to include key data points like demographic information to measure equitable program reach. Example metrics:  
  * Reduced time to complete an application  
  * Increase in residents’ access to annual savings / benefits (dollars)  
  * Increase in number of programs online / added to CiviForm  
* Identify key stakeholders throughout the community (eg. CBOs), quasi governmental agencies, and  local governments who might be able to connect target user groups with the program to ensure a successful launch.  
* If resident applications are managed or reviewed in an external case management system, work with your technical team to ensure necessary data pipelines are set up and tested.  
* Implement formatting checks (such as entering phone numbers in a specific format) and provide hints to users (such as, “select only two choices”) to prevent errors and ensure data accuracy.  
* Select an identity and authentication provider (i.e. [Login.gov](http://Login.gov)) in collaboration with your IT team.  
* Conduct comprehensive testing to identify and fix issues before launch.  
* Train program administrators how to use CiviForm and how to route questions and issues they have.   
* Perform user experience studies.  
  * Work with specific programs to test the end-to-end process for application submission and processing and make adjustments as needed.  
  * Ensure that at least 10 real people have tested the new program.  
* Plan a pilot launch to gather feedback and make improvements.  
* Plan a launch announcement to ensure that residents can find and apply for the new streamlined programs.  
  * Identify the communication channels you’ll use (eg. press release, website announcement, social media posts, a newsletter) to drive awareness about the program.  
  * Consider relevant metrics to measure if you are reaching your residents.  
* Remember to work with your tech team to get ready for launch. Click here for the CiviForm Technical Implementation Guide.  
  * If the initial CiviForm implementation is performed by one team but ongoing maintenance of CiviForm will be performed by a different team, ensure that you perform a comprehensive handover.

## Launch and Announce CiviForm 

* Provide ways for residents and program administrators to provide feedback so that users can ask any questions or report issues.   
* Provide residents and program administrators with a timeline of any future planned launches for additional programs.  
* Generate excitement by recording demos and sharing any initial findings, positive data outcomes, or testimonials resulting from use of CiviForm to connect users to the program. 

Iterate and Grow

* Learn how the CiviForm community works.  
  * [Community member responsibilities](https://docs.civiform.us/governance-and-management/governance/roles-committees-and-responsibilities)  
  * [Governance Processes](https://docs.civiform.us/governance-and-management/governance/governance-processes)  
* Learn about the [CiviForm community's communication channels](https://docs.civiform.us/governance-and-management/governance/communication).  
  * Join [CiviForm Slack](https://civiform.slack.com/) and introduce yourself in the \#introductions channel.  
  * Join the [mailing lists](https://docs.civiform.us/governance-and-management/governance/communication) as appropriate.  
  * Create a [Github](https://github.com/) account so you can [file issues for bugs and/or feature requests](https://github.com/civiform/civiform/issues).  
* Join the CiviForm community meetings ([view / add CiviForm Community calendar](https://calendar.google.com/calendar/u/0?cid=Y18xMDk1OWVlMWExYzg4MTY0N2ZjZmRlZTY2NWQ4MjMyZGRlYjViOWUyNDUwNDdhM2MxYTlmZjJhMjc0NGNmZTNjQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20))   
  * Every other week join the CiviForm Product Design Committee to learn about new features or ask questions of fellow governments using CiviForm.  
  * Monthly join the CiviForm Governance group to learn about best practices, new features and tools, as well as how other civic entities are leveraging CiviForm.

## Check out these links to read more about CiviForm

* [Learn More about CiviForm](https://civiform.us/learnmore/)  
* [What is CiviForm](https://docs.civiform.us/overview/what-is-civiform)  
* [How CiviForm works](https://docs.civiform.us/overview/how-does-civiform-work)  
* [CiviForm Onboarding guide](https://docs.civiform.us/user-manual/onboarding-guide)  
* Technical deployment checklist for CiviForm

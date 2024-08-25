**CiviForm Business Owner Deployment Guide**  
This document is for someone that has decided to use CiviForm and now needs a guide of how to deploy it in their organization. It includes an overview as well as a detailed guide of what steps are needed at  each stage. It will help you:

* Choose your initial programs  
* Create test and production forms for programs  
* [Optimize the program administration process / program mapping](https://docs.civiform.us/user-manual/onboarding-guide/journey-mapping)  
* Simplify forms and the application process  
* Set up user testing for forms / program applications  
* Prepare for your launch  
* Join the CiviForm community

---

## Overview

CiviForm is a powerful open source tool for civic entities and governments designed to simplify the administration of benefit programs, and make it easier for residents to access those benefits. It lets residents and community organizations find and apply to multiple services in one place. CiviForm also makes it easier for governments to administer their programs so they can better reach communities in need. CiviForm deployments will be most successful if:

* Your CiviForm deployment has an owner and champion.  
* You can decide early as to which will be the first program(s) you will deploy on CiviForm.  
* You can simplify and optimize your program applications.  
* You can simplify how you process and follow up on applications.

To ensure a successful CiviForm implementation, read through the brief guide below and create your plan to build programs.

## Understanding Your Needs and Goals

- [ ] **Define user needs:** To create program forms that people will find intuitive and easy to use, consider the needs of both your residents and program administrators.  
      - [ ] Spend time to understand how your residents interact with the program applications so that you can optimize the experience of CiviForm users (including residents and administrators):  
            - [ ] Review [Preparing for Human-Centered Redesign](https://beeckcenter.georgetown.edu/report/preparing-for-human-centered-redesign/).  
            - [ ] Read more about [mapping the applicant experience](https://github.com/usds/benefits-enrollment-prototype/blob/master/assets/discovery-findings-mapping-enrollment-Nov2016.pdf).  
      - [ ] Consider engaging community-based organizations for user research.

- [ ] **Decide who will be the [CiviForm Admin](https://docs.civiform.us/overview/how-does-civiform-work\#civiform-admin-experience)** across your civic entity  
      - [ ] Decide who will own and maintain your CiviForm instance in the long term (IT team, Digital Services or other). This will be the person who creates the Forms and Programs on CiviForm.

- [ ] **Review and evaluate** the [Recommended CiviForm Launch Team](https://docs.google.com/document/d/1AacsuDbMmVfmBuWWSNRz3nOUYR3WG5\_KDnDgxrc6z0A/edit)  
      - [ ] Consider if any new staffing or resources are needed for the implementation / maintenance of CiviForm and/or the programs.

- [ ] **Choose programs to put in CiviForm:** Determine which programs will benefit most from using CiviForm (e.g., benefit applications, complaint forms, event registrations, permit applications).  
      - [ ] Evaluate programs most likely to benefit from CiviForm by using these resources:  
            - [ ]  [CiviForm Fellowship - Program Assessment](https://docs.google.com/document/d/10TTk68evp-X8iJ2W3S2--MpiqMeg1Uf0jTysbZITEdg/edit?usp=sharing)  
            - [ ]  [CiviForm - Program Evaluation Worksheet ](https://docs.google.com/spreadsheets/d/1\_NNMln-LOAxxXCoYgh1oI0uaS6YhoyMoBvudaiKRMm4/edit?resourcekey=0-KPl3Y1YgUYty81OKHbRMpQ\#gid=629433048)  
      - [ ] Examine selected programs to identify opportunities to streamline overlapping questions:  
            - [ ] Review the information gathered on the application for each program and remove any unnecessary questions.  
            - [ ] Work with program stakeholders including program administrators to understand the administrative and policy requirements for different programs.   
            - [ ] Identify common questions across programs (Ex. Name, Address, income).  
            - [ ] Explore ways to consolidate these questions to streamline reuse.  
            - [ ] Consider creating a “Common Intake” form as a “Get Started”.  
      - [ ] For each program:  
            - [ ] Decide on who the program leader/owner and primary point of contact will be.  
            - [ ] Decide how applications to the program will be reviewed. Will they be reviewed in CiviForm, or pulled into an external system? If an external system, identify the technical PoCs.

- [ ] **Join the CiviForm community**  
      - [ ] Understand how the CiviForm community works.  
            - [ ] [Community member responsibilities](https://docs.civiform.us/governance-and-management/governance/roles-committees-and-responsibilities)  
            - [ ] [Governance Processes](https://docs.civiform.us/governance-and-management/governance/governance-processes)  
      - [ ] Learn about  the [CiviForm community's communication channels](https://docs.civiform.us/governance-and-management/governance/communication).  
            - [ ] Join [CiviForm Slack](https://civiform.slack.com/) and introduce yourself in the \#introductions channel.  
            - [ ] Join the [mailing lists](https://docs.civiform.us/governance-and-management/governance/communication) as appropriate.  
            - [ ] Create a [Github](https://github.com/) account so you can [file issues for bugs and/or feature requests](https://github.com/civiform/civiform/issues).  
      - [ ] Join the CiviForm community meetings:  
            - [ ] Every other week join the CiviForm Product Design Committee to learn about new features or ask questions of fellow governments using CiviForm.  
            - [ ] Monthly join the CiviForm Governance group to learn about best practices, new features and tools, as well as how other civic entities are leveraging CiviForm.

## Preparation for Launch 

- [ ] Review the [form building how-to-guide](https://docs.civiform.us/user-manual/civiform-admin-guide/working-with-programs/create-a-program) to begin building your first program  
      - [ ] User-centric design: Create forms that are easy to understand and complete, using [plain language](http://plainlanguage.gov).  
      - [ ] Keep  accessibility standards (e.g., WCAG) in mind when creating your forms.  
      - [ ] Consider which languages Program questions and answers will be translated to and which languages [CiviForm supports natively](https://docs.civiform.us/user-manual/civiform-admin-guide/manage-translations-for-programs-and-questions).  
            - [ ] Find translation resources and add time for translations to your project timeline.  
      - [ ] Data validation: Implement program checks (such as phone number formats and hints to users “select only two choices” to prevent errors and ensure data accuracy.  
      - [ ] Work with your IT team to select an identity and authentication provider (i.e. Login.gov).  
- [ ] Identify the list of relevant Key Performance Indicators (KPIs) and metrics to identify what a successful launch would look like for each program launch. Example metrics:  
      - [ ] Reduction in time to complete an application.  
      - [ ] Increase in residents’ access to annual savings / benefits (dollars).  
      - [ ] Increase in number of programs online / added to CiviForm.  
- [ ] Identify key stakeholders throughout the community (eg. CBOs) and local governments who might be able to connect target user groups with the program to ensure a successful launch.  
- [ ] If resident applications are managed or reviewed in an external case management system, work with your technical team to ensure necessary data pipelines are set up and tested.  
- [ ] Develop a plan for thorough testing: Conduct comprehensive testing to identify and fix issues before launch.  
- [ ] Train program administrators how to use CiviForm and how to route questions / issues they have.   
- [ ] Perform user experience studies.  
      - [ ] Ensure that at least 10 real end users have tested the new program.  
      - [ ] Work with specific programs to test the end-to-end process for application submission and processing and make adjustments as needed.  
- [ ] Pilot program: Plan a pilot launch to gather feedback and make improvements.  
- [ ] Decide on launch announcement plans to ensure that residents can find and apply for the new streamlined programs.  
      - [ ] Identify target audience/user group, communication channels (eg. press release, website announcement, social media posts, a newsletter) to share the news with residents.  
      - [ ] Develop a communication plan: Inform citizens and stakeholders about the new system and its benefits and consider how you may drive awareness about the program.  
      - [ ] Consider relevant metrics to measure if you are reaching your residents.  
- [ ] Generate excitement by recording demos and sharing any initial findings, positive data outcomes, or testimonials resulting from use of CiviForm to connect users to the program.   
- [ ] **Announce CiviForm to your community**   
- [ ] Put ample opportunities for feedback in place during and after the launch so that users can flag any questions or bugs.   
- [ ] If programs will be rolled out in phases, provide users with a timeline of future planned launches for additional programs.

## Next steps \- Ongoing Evaluation and Improvement

- [ ] Performance metrics: Track key performance indicators (KPIs) to measure the impact of CiviForm.  
- [ ] User feedback: Gather feedback from citizens and staff to identify areas for improvement.  
- [ ] Iterative development: Continuously update and refine forms based on user needs and data analysis.  
- [ ] Continue to grow CiviForm, adding new programs over time.

## Check out these links to read more about CiviForm

* CiviForm home page (To Be Linked)  
* CiviForm “Learn More” (To Be Linked)  
* [What is CiviForm](https://docs.civiform.us/overview/what-is-civiform)  
* [How CiviForm works](https://docs.civiform.us/overview/how-does-civiform-work)  
* [CiviForm Onboarding guide](https://docs.civiform.us/user-manual/onboarding-guide)  
* Technical deployment checklist for CiviForm (To Be Linked)


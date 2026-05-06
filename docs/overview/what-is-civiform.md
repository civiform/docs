---
description: An introduction to the problem and the CiviForm solution.
---

# What is CiviForm?

CiviForm is open-source software that helps governments bring benefit program applications online, making it easier for residents to find and apply for services, and easier for government staff to build and manage them.

Residents seeking public benefits often face a fragmented experience: Programs may be spread across multiple websites, each managed by a different agency or office, each requiring the same personal information to be entered from scratch. Or programs may not be digitized at all, leaving residents to navigate cumbersome paper forms and phone calls.

Government staff face their own version of this problem. Every program office tends to build or buy its own intake solution, or rely on paper forms that return unstructured data that's hard to process and act on. When a form needs to change, staff are often dependent on IT or an outside vendor to make it happen. The result is duplicated effort, inconsistent data, and slow response to changing program needs.

CiviForm addresses these problems by giving governments a shared platform to build and publish digital applications in one place. Program staff can create and update forms without writing code or waiting for a deployment. And at the core of the applicant experience is a simple but powerful idea: Residents enter their information once and can reuse it across every CiviForm program they apply to.

Because CiviForm is open source, there are no fees to use the base software. Governments own their deployment and their data, with no dependency on a single vendor. When new features are released, every government on the platform benefits. [Exygy](https://www.exygy.com), a certified B Corp, serves as product steward, maintaining the shared codebase and supporting the community of jurisdictions using the platform.

---

## Who uses CiviForm?

CiviForm is currently deployed by governments at the city, county, and state level across the United States, including [Seattle](https://civiform.seattle.gov), [Arkansas](https://myarciviform.arkansas.gov), [Charlotte](https://civiform.charlottenc.gov), and [Bloomington](https://civiform.bloomington.in.gov). Use cases range from city benefit and discount programs to statewide workforce and health services to universal housing applications. Across deployments, governments have reduced average application times by 65–96%.

The CiviForm product serves four types of users:
- **Residents** find and apply for public benefit programs through a single portal in their preferred language.
- **CiviForm Admins** are government staff who build, update, and publish application forms using a no-code form builder.
- **Program Admins** are government staff who review submitted applications and manage applicant statuses.
- **Trusted Intermediaries** are staff at community organizations who apply on behalf of residents they serve, managing their caseload from a dedicated dashboard.

## Is CiviForm right for you?
CiviForm is a good fit if your government or team
- Offers multiple benefit, assistance, or service programs that require data from residents and currently live on separate sites or use separate forms
- Has programs administered across multiple departments or agencies that would benefit from a shared platform
- Is still relying on paper or PDF-based applications
- Wants program staff to be able to build and update forms without depending on IT or a vendor
- Wants applicants to be able to find and apply to multiple programs in one place

## Security and data ownership
All applicant data is owned and managed by the deploying government. CiviForm integrates with existing government single sign-on systems via OIDC and SAML, and is built to defend against common security threats including cross-site scripting, SQL injection, and cross-site request forgery. For full technical and infrastructure details, see the [IT Manual].

## Getting started with CiviForm
 
The base CiviForm software is free to use. Governments can deploy and manage their own instance, and the full codebase is available on [GitHub](https://github.com/civiform/civiform). For governments ready to get started, the [Onboarding Guide] walks through planning and program assessment through launch.

[Exygy](https://www.exygy.com), a certified B Corp, can provide support with deployment, managed hosting, and feature development. [Get in touch](https://civiform.us/contact) to learn more.

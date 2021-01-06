
###WSO2 Open Banking
WSO2 Open Banking is a solution made up of software and services that helps banks quickly secure regulatory compliance and enable extensive consumer-centric open banking business use cases.

WSO2 Open Banking comprises the API management, identity access management, analytics, and optional enterprise integration capabilities in a componentized architecture. The solution provides API templates, third-party provider onboarding or client registration, Strong Customer Authentication, consent management, agile integration to core banking systems, and a developer portal. In addition WSO2 Open Banking offers consultancy services on enabling banks to effectively use the technological capabilities of the solution to enable commercial open banking use cases.

------------------------------------------------------------------------
###WSO2 Open Banking Accelerator
WSO2 Open Banking Accelerator speeds up the open banking journey for a bank. It reduces the complexity configuring and  implementing the core open banking components such as client registration, strong customer authentication, and consent management.

------------------------------------------------------------------------
###User Types
We can categorise the users in an open banking environment in to the nine user types in WSO2 Open Banking environment:

- Super Admin
WSO2 Open Banking provider that hosts and manages the overall functional aspects of the open banking system. 
Example: Bank infra/IT. 
A super admin is responsible for creating user roles in the system, assigning them to users, managing databases, security, etc.

- Admin
An Admin manages the overall functional aspects of WSO2 Open Banking.
Example: Bank IT Manager.

- Manager
They are typically bank's decision makers and bank infrastructure staff.

- API Creator
A technical role capable of understanding the technical aspects of the APIs such as interfaces, documentation, and versions, and provisioning APIs. 
The API creators use the API Store to consult ratings and feedback provided by API users. An API creator can add APIs to the API Store, but cannot manage their life cycles.

- API Publisher
An API publisher manages a set of APIs across the enterprise or business unit and controls the API lifecycle,  subscriptions, and monetization aspects.
The API publisher is also interested in usage patterns for APIs and has access to all API statistics.

- API Consumer
This is an API subscriber that uses the API Store to discover APIs, read the documentation and forums, rate/comment on the APIs, subscribe to APIs, obtain access tokens, and invoke the APIs.
Example: TPP/ Client, App Developer, Fintech App Developer. 

- End User
Retail and corporate customers of banking services.

- Observer
Regulators interested in performance and/or compliance aspects in an open banking environment. 

- App Admin
These are decision makers for the Third-Party/Client application.

------------------------------------------------------------------------
###Consent Management
Consent management refers to the practice of prompting, collecting, and managing bank customer’s approval for collecting or sharing the customer's personal information. The consent life cycle describes five phases for a consent:

- Consent Provisioning

The TPP/ADR initiates by sending a consent request to the bank containing the bank information that it wants to access.

- Consent Granting

The bank customer is required to provide the consent (Yes/No) for the TPP/ADR to access the requested information. 

- Consent Verification

The bank verifies if the customer has approved the TPP/ADR to access the customer's bank information in order to proceed. If the bank customer has denied the consent, the bank needs to have proper validations to detect it and stop the TPP/ADR from invoking the banking APIs.

- Consent Revocation

Once a consent is granted, the bank customer has liberty to revoke the given-consent via bank UIs. It can either be done by the customer themselves or by a bank representative upon customer’s request. 

- Consent Expiration

When the consent validity period expires, the bank has to set the consent status as expired. In order for the TPP/ADR to access customer information again, the customer needs to regrant the consent.

------------------------------------------------------------------------




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
Mediation
When performing transactions, it is inevitable for systems to communicate in various protocols and formats communication with each other. Mediation enables exchange of messages between such disparate systems with less complexity. Message mediation encompasses message routing, message filtering, message transformation, protocol switching, etc. WSO2 Open Banking facilitates message mediation that enables integrating with core banking systems and other internal banking services including legacy systems. 

------------------------------------------------------------------------
###APIs
An API (Application Programming Interface) is an intermediate layer that acts as a communication protocol between a consumer and a banking service, simplifying the consumption of the service. In addition to hiding the underlying implementation details of a service, an API provides a secure, controlled, and a well-documented approach to accessing the exposed service.

------------------------------------------------------------------------
###API Resources
An API is made up of one or more resources, each of which has a unique resource path (URI). An API Resource has a set of HTTP methods that operates on it. The supported HTTP methods are GET, POST, PUT, DELETE, PATCH, HEAD, and OPTIONS.

------------------------------------------------------------------------
###API Lifecycle
The stages that an API goes through from creation to retirement. APIs have their own lifecycle stages that are independent of the backend services they rely on. The life cycle of APIs is customized based on the needs of an organization. The lifecycle's states are CREATED, PROTOTYPED, PUBLISHED, DEPRECATED,  RETIRED, and BLOCKED. 

- CREATED
In this stage, the API metadata are added to the API Store but the API is not deployed in the API Gateway. Therefore, the API is not visible in the API Store to subscribers.

- PROTOTYPED
The APIs in this stage are deployed and published in the API Store as prototypes. A prototype API is usually a mock implementation made public in order to get feedback about its usability. Users can invoke the API without a subscription.

- PUBLISHED
These APIs are visible in the API Store and available for subscription.

- DEPRECATED
Deprecated APIs are not available for subscription. But these APIs are still deployed in the API Gateway and are available at runtime to existing subscribers. Existing subscribers can continue to use it as usual until the API is retired.

- RETIRED
These APIs are unpublished from the API Gateway and deleted from the API Store.

- BLOCKED
Access to the API is temporarily blocked. Runtime calls are blocked and the API is not shown in the API Store anymore.

------------------------------------------------------------------------
###API Visibility
API visibility determines who can view the API on the developer portal. The available visibility levels are:

- Public
Visible to all users

- Restricted by role
Visible only to the users under the creator's tenant domain who have the relevant roles attached  

- Visible to my domain
Visible to all users who are registered to the API creator's tenant domain. This applies only when there is more than 1 tenant in the system.

------------------------------------------------------------------------
###API Documentation
WSO2 Open Banking facilitates adding documentation to APIs. API documentation helps API subscribers to understand the functionality of the API and API publishers to market their APIs better and sustain the competition. 

------------------------------------------------------------------------
###Rate Limiting
Rate limiting allows you to limit the number of permitted requests to an API within a given time window. Rate limiting can be useful to:
Protect your APIs from common types of security attacks such as certain types of Denial of Service (DoS) attacks.
Regulate traffic according to infrastructure availability.
To apply request quotas for monetization purposes of APIs.

------------------------------------------------------------------------
###API Applications
The logical representation of a physical application such as a mobile app, web app, device, etc is known as an “Application”. For an application to use an API, the application should subscribe to the relevant APIs it intends to use. A subscription to an API happens over a selected business plan, which determines the usage quota the application gets. 
WSO2 Open Banking comes with a pre-created default application, which allows unlimited access by default. You can also create your own applications. 


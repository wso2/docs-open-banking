When you implement an open banking architecture, it is not entirely about securely exposing banking APIs to 
API consumers. Banks need to manage and allow API consumers to provide services to their customers. There are key 
requirements to consider when you implement an open banking architecture. This section explains how WSO2 Open 
Banking Accelerator addresses the open banking requirements in the solution:

![open banking requirements](../assets/img/get-started/open-banking-requirements/open-banking-requirements.png)

## How WSO2 Open Banking Accelerator delivers open banking requirements

1. **API Consumer Onboarding** - API consumer onboarding is the process of verifying an API consumer when they register 
with a bank to provide services to customers. It is important since the API consumer has access to the customer's 
financial information via their applications. The solution provides dynamic client registration for API consumers.
 
2. **Consent Management** - Consent management is the process of prompting, collecting, and managing bank customer’s 
consent before an API consumer collects or shares the customer's financial information. The Solution includes a 
fully-featured consent management module that:

    - securely exposes consent data through an API
    - provides in-built consent management user interfaces for customers and bank staff
    - manages the entire consent life cycle
   
    A consent goes through a phased life cycle as follows:
   ![lifecycle of a consent](../assets/img/get-started/open-banking-requirements/consent-lifecycle.png)
   
     - **Consent provision**: An API consumer application sends a consent request to the bank containing the customer’s 
     financial information that it wants to access.
   
     - **Consent grant**: The bank redirects the consent request to the customer to approve/deny.
 
     - **Consent verification**: The bank verifies if the customer has approved the API consumer application to access 
     the information. If the bank customer has denied the consent, the bank must detect and stop the application from 
     invoking the banking APIs.
 
     - **Consent revocation**: A customer can revoke the consent via consent management applications. It can either be 
     done by the customer themselves or by a bank representative upon the customer’s request.
 
     - **Consent expiration**: When the consent validity period expires, the bank sets the consent status as expired. 
     For the API consumer application to access the customer’s financial information again, the customer needs to regrant 
     the consent.
  
3. **Consumer Authentication** - Consumer authentication is an authentication mechanism with a layered defence. 
When a user initiates a payment or accesses information via an API consumer application, it authenticates the user 
using the following factors one at a time:
   ![authentication factors](../assets/img/get-started/open-banking-requirements/authentication-factors.png)
  
     - Knowledge	: something the user knows. For example: password.
     - Possession	: something the user owns. For example: ATM cards.
     - Inherence	: something the user is. For example: fingerprint.

    The solution supports multifactor authentication and identifier-first authentication. In addition, you can extend 
    the existing authenticators or write new authenticators in accordance with your open banking standard.

4. **Developer Portal** - The solution offers a customizable Developer Portal that enables application developers to 
publish, republish, subscribe, and test APIs.
 
5. **Banking Systems Integration** - The solution uses the integration capabilities of [WSO2 Micro Integrator](https://apim.docs.wso2.com/en/latest/integrate/integration-overview/) 
to help banks connect their core banking systems and overcome the challenges of legacy technology. With the help of 
the Micro Integrator, WSO2 Open Banking can support:
     - different message protocols (HTTP/TCP), message types (REST/SOAP), and formats (ISO 8583, ISO 20022).
     - mediation between a legacy or digital core and other banking systems, and the bank’s library of open banking APIs.

6. **Data Analytics** - The solution to mediate between the bank’s systems and modern analytics systems. Analytics allows 
banks to monitor user patterns and behaviours and to identify fraudulent activities.

7. **API Security** - API consumers invoke APIs to access customer’s financial information. Therefore, API security plays 
a vital role in open banking to mitigate data theft. The solution has built-in support for global industry-standards 
such as OpenID Connect Financial Grade API (FAPI), OAuth 2.0, Electronic Identification and Trust Services (eIDAS).

     API security can be categorised into two main levels:

     - Application layer security -     Validates API consumers against the certificates issued by competent authorities. 
     For example: open banking directories, Qualified Trust Service Providers (QTSPs).
    
     Also, the solution supports OAuth2 security implementations such as Private key JWT authentication, 
     client-credentials grant type, and authorization code grant type.
    
     - Transport layer security - Secures the communication between the API consumer, and the bank using Mutual Transport 
     Layer Security (MTLS). 

8. **User Experience** - The solution provides an enhanced user experience for the banks, API consumers, and customers with 
self-explanatory and simple actions.

9. **Premium APIs and Monetization** - Using the capabilities in WSO2 API Manager, WSO2 Open Banking Accelerator allows:
    - banks to publish highly-performant custom APIs for API consumers. 
    - banks to expose their performance and compliance data by integrating into analytics engines.
    - banks to plug in any billing engines with subscription-based freemium, tiered pricing, or per-request pricing.

10. **Standards-based API Templates** - WSO2 API Manager offers standard API management capabilities, and you can customize 
the API templates according to your open banking and other requirements.

## Open Banking Approaches

Open banking is a global trend that has been adopted by different regions and countries differently. In a broader 
context, open banking approaches can be categorised into two types:

 1. Market-driven approach
 2. Regulatory-driven approach

Let’s compare the two approaches:

| Market-driven approach    | Regulator-driven approach |
| ----------------------    | ------------------------- |  
| Policy-makers, instead of regulators, introduce measures to promote the Open-API framework to initiate open banking.    | Regulatory entities analyse the market and define the implementation guidelines for open banking. |  
| In most countries, only the big banks tend to embrace the initiative. Therefore, the lower part of the demographics won’t get to take advantage.       | Set timelines for the banks to expose and third-parties to consume banking APIs. Once the timelines are met, everyone in the demographics can take advantage.       |  
| Addresses market requirements. | Addresses market requirements.     | 

In conclusion, both approaches address the market requirements of the respective region/country. However, reports show 
that the regulatory-driven approach is much cleaner and standardizes open banking growth. It helps all the banks to 
securely expose their banking APIs to API consumer applications at a given time offering all their customers to make 
use of it.

#Client-Initiated Backchannel Authentication (CIBA) Flow

WSO2 Open Banking Accelerator provides support for the
[OpenID Connect Client-Initiated Backchannel Authentication Flow](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html). 

The CIBA flow is an authentication flow like OpenID Connect. In the OpenID Connect authentication flow, the bank customers 
are redirected to the bank in order to log in by providing their credentials. The customers are authenticating themselves 
through the same device that is used for the rest of the flow. 

However, in CIBA, the bank sends a notification to the customer's mobile device and verifies the account owners. CIBA 
uses a decoupled direct channel to verify the customer without relying on redirects. This flow consists of 2 types of devices:

- Consumption Device:  Device used to interact with the bank
- Authentication Device: Device used for authentication and consent grant

The customer starts the flow with a relying party (a Third Party Provider/API consumer application) at the Consumption Device 
but authenticates and grants consent on the Authentication Device. This makes the flow a form of 
**Decoupled authentication/authorization**.

CIBA flow increases the security by involving a second device, which is similar to Two-Factor Authentication. Customers 
simply receive a mobile notification to authenticate themselves and grant access to their accounts. This also
improves the user experience as the customers are not redirected between websites. 


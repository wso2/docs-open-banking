#Client-Initiated Backchannel Authentication (CIBA) Flow

WSO2 Open Banking Accelerator provides support for the
[OpenID Connect Client-Initiated Backchannel Authentication Flow](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html). 

The CIBA flow is an authentication flow like OpenID Connect. In the OpenID Connect authentication flow, the bank customers 
are redirected to the bank backend to log in by providing a username and password. The customers are authenticating themselves 
through the same device that is used for the rest of the flow. However, in CIBA, the solution sends a notification to the 
customer's mobile device and verifies the account owners. Therefore, the CIBA flow uses 2 devices:

- Consumption Device:  The device used to interact with the bank
- Authentication Device: The device used for authentication and consent grant

The customer starts the flow with the bank at the Consumption Device, but authenticates and grants consent on the 
Authentication Device. This makes the flow **Decoupled authentication/authorization**.

CIBA flow increases the security by involving a second device, which is similar to Two-Factor Authentication. This also 
improves the user experience as the customers are not redirected between websites. They simply receive a mobile notification
to authenticate themselves and grant access to their accounts. 


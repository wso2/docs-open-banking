The Dynamic Client Registration (DCR) API provides a mechanism to dynamically register OAuth 2.0 clients with 
authorization servers. With the use of the DCR API, the OAuth 2.0 client applications can register with banks in a 
seamless and fully-automated process. The API consumer applications go through an in-depth verification during DCR to 
make sure the application is authorized and secured before sharing customers’ financial data.

The API consumer applications may send registration requests with a set of desired client metadata values. The bank 
then provides real-time responses with a client identifier and client metadata values registered for the 
application. The application can then use the client ID in the registration information to communicate with the bank. 

The bank needs to provide the DCR API from its open banking solution and WSO2  Open Banking Accelerator provides the 
DCR capabilities with an endpoint that performs the following:

- Validates if the API consumer application is authorized by a competent authority
- Validates information such as the role of the API consumer, signature algorithm, authorization scopes, 
 OAuth2.0 grant types, application type, and the request issuance time
- Allows registered API consumer applications to access data via open banking APIs

!!! note 
    The Dynamic Client Registration functionality available in WSO2 Open Banking Accelerator meets the open banking requirements including OAuth 2.0 and OpenID Connect standards.

## How Dynamic Client Registration works

API consumer applications use the DCR API to register with a bank and obtain access to open banking APIs to retrieve 
details needed for the application functionalities. It is a standard API that registers an application and responds 
with a client ID and registration details. The API consumer applications can use these credentials to obtain 
application access tokens that are required to invoke the open banking APIs. 

![dynamic client registration](../assets/img/learn/dcr/dcr-flow.png)

   - Before registering in the bank, the API consumer applications have to register with a regulated directory. After successful registration, they can obtain signing and transport certificates from the directory.
   - A Software Statement Assertion (SSA) is also generated for a particular application and they can download this assertion.
   - Now, the API consumer applications can invoke the DCR endpoint of the desired bank and register. This registration happens through an API call and no prior token is expected. However, communication should take place through a channel protected by mutual TLS.
   - The registration request is an encoded JSON Web Token (JWT), which is signed by the signing certificate obtained from the regulated directory. The request payload also contains the encoded and signed SSA.
   - After successful validation of the request, the API consumer applications receive a client ID, which they can use to obtain application access tokens and access banking APIs. 

## Dynamic Client Registration Request Validations supported by Accelerator

WSO2 Open Banking Accelerator leverages the [OAuth 2.0 Dynamic Client Registration (DCR)](https://is.docs.wso2.com/en/latest/guides/authentication/oidc/oauth-dynamic-client-registration/) endpoint in WSO2 Identity Server as the foundation for Open Banking DCR. Standard Dynamic Client Registration request validations, as specified in the [OAuth 2.0 Dynamic Client Registration Protocol](https://datatracker.ietf.org/doc/html/rfc7591), are handled by WSO2 Identity Server.

In addition, the Open Banking Accelerator provides a set of Open Banking–specific validations out of the box. These built-in validations are included to reduce the implementation effort required from toolkit developers and ensure compliance with Open Banking requirements.

The following validations are supported by the Open Banking Accelerator:

- JWT signature validation for DCR create and update requests that include a JWT payload.
- Token–client binding validation to ensure the access token is bound to the client ID in DCR retrieval, update, and delete requests.
- Required attribute validation for DCR create and update requests, based on the configured mandatory attributes. Refer to [Configuring Dynamic Client Registration.](../learn/dynamic-client-registration-configuration.md#configuring-dcr-request-parameters) to configure mandatory attributes.
- Issuer validation to ensure that the issuer in the request matches the Software ID in the SSA for DCR create and update requests.
- SSA issuer validation to verify that the SSA issuer matches the configured issuer for DCR create and update requests. Refer to [Configuring Dynamic Client Registration.](../learn/dynamic-client-registration-configuration.md#configuring-dcr-request-parameters) to configure the SSA Issuer.
- JTI replay validation to detect replayed JTIs in both the Software Statement and the DCR request for create and update operations.
- Redirect URL format validation to ensure redirect URLs (in both the request and SSA) use HTTPS and do not include localhost for DCR create and update requests.
- Redirect URL subset validation to confirm that the redirect URLs in the request are a subset of those defined in the SSA for DCR create and update requests.
- Hostname consistency validation to ensure that redirect URIs and other URIs (Logo URI, TOS URI, Policy URI, and Client URI) in the SSA share the same hostname for DCR create and update requests.
- Token endpoint authentication validation to ensure that the signing algorithm is specified and not empty when the token endpoint authentication method is private_key_jwt for DCR create and update requests.

Toolkit developers can enable or disable these validations at the configuration level. Refer to [Configuring Dynamic Client Registration In-built Validators.](../learn/dynamic-client-registration-configuration.md#configuring-inbuilt-dcr-request-validators).

You can customize the validations performed in the DCR process according to your specification and other requirements.
For information, see [OpenAPI Extensions for DCR](../develop/openapi-extensions-dcr.md).

When an API consumer registers an application, a consumer-key and a consumer-secret is given for that application. 
These are the credentials of the application that is being registered. The consumer-key becomes 
the unique identifier of the application, which is similar to a username that is used for authentication. 
When an **access token** is issued for the application, it is issued against the latter mentioned consumer-key.

API consumers generate access tokens and pass them in the incoming API requests. The generated access token is a simple 
string that you need to pass as an HTTP header. For example, `"Authorization: Bearer NtBQkXoKElu0H1a1fQ0DWfo6IX4a"`. 

WSO2 Open Banking Accelerator supports two types of access tokens for authentication:

   - **Application Access Tokens**: Tokens to identify and authenticate an application. 
   
   - **User Access Tokens**: Tokens to identify the final user of an application. 

For more information on access tokens, see the 
[overview of access tokens in WSO2 API Manager documentation](https://apim.docs.wso2.com/en/latest/learn/consume-api/manage-application/generate-keys/obtain-access-token/overview-of-access-tokens/).

In order to cater to any open banking requirement, WSO2 Open Banking Accelerator contains the following access token 
features:

## Certificate-bound access tokens 

Certificate-bound access tokens are access tokens that have a certificate attached to them. When using certificate-bound 
access tokens, you need to pass the certificate, which is bound to the token to gain access to protected resources. This 
prevents attacks to the access tokens from unauthorized parties. The validation for such tokens take place as 
follows:

   - Step 1: During the token API invocation, ensure that the transport certificate is passed as a header or in the context. 
   This is performed by a **Token Filter** before the API hits the authorization server.

   - Step 2: Bind the transport certificate to the access token via the confirmation (`cnf`) claim. All **Grant Handler** 
   types (`authorization_code`, `client_credentials`, and `refresh_token`) bind the transport certificate hash to the 
   token using the `cnf` claim.

   - Step 3: Return the `cnf` claim via an access token, the `cnf` claim ensures that the certificate is bound to the access 
   token.
 
   - Step 4: Validate the certificate during the API invocation. The API Manager server needs to ensure that the 
   certificate being passed during the API call is the same certificate that is bound to the token.

The diagram below explains the flow and how the Grant Handler and Token Filters engage:
![token_flow](../assets/img/learn/access-tokens/token-flow.png)

### Token Filter

A Token Filter is engaged at the Servlet container level before the request approaches the Token API. The Token Filter 
engages the following validators:

   - **MTLS enforcement validator**: This enforces that a certificate needs to be passed during the token creation. This 
   certificate is then bound to the access token. 
   
    !!! note "To decode the certificate when it is passed from the load balancer to the Gateway:"
           1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
           2. Add the following configurations and set the value to `true`.
              ``` toml
               [open_banking.identity.mutualtls] 
               client_certificate_encode=true 
              ```
           3. Restart the servers.
      
   - **Client authenticator validator**: This validates whether the token request follows the client authentication 
   method format that was registered through Dynamic Client Registration. While ensuring that it is a registered client 
   authenticator, this validator also limits the client authentication methods for regulatory applications. Regulatory 
   applications are allowed to register either the `private_key_jwt` or `tls_client_auth` method as the client 
   authentication method.
   - **Signature enforcement validator**: This validates whether the client assertion is signed with the algorithm that 
   was registered through Dynamic Client Registration.

You can add customized filter validators to the solution. For more information on customizations, see 
[customizing Token Filters](../develop/token-filters.md).

### Grant Handler

A Grant Handler validates the grant, scopes, and access delegation. By default, the following Grant Handler types are 
engaged when issuing tokens:

   - Authorization Code Grant Handler  
   - Client Credentials Grant Handler   
   - Refresh Grant Handler  
   
Mutual TLS authentication is enabled by default in WSO2 Open Banking Accelerator. When MTLS authentication is enabled, 
the **Signature algorithm enforcement validator**, **Client authentication enforcement validator**, and the 
**MTLS enforcement validator** are engaged. Regardless of the client authentication method, you need to ensure that the 
TLS certificate is passed with every token request. 

You can customize the above Grant Handlers to modify the token response and for other open banking requirements. 
For more information, see [customizing Grant Handlers](../develop/grant-handlers.md).

## Client Authentication 

According to OAuth 2.0, the authorization server and the client need to establish a client authentication method that 
meets the security requirements of the authorization server. The client has the option of choosing the authentication 
method. However, the algorithm to sign the ID token needs to be restricted for each client. The OpenID specification 
mentions a set of client authentication methods to authenticate the clients to the authorization server when using the 
token endpoint.

During the client registration process, the client can register an authentication method. Regulatory applications are 
allowed to register either `private_key_jwt` or `tls_client_auth` as the authentication method. However, if no 
authentication method is registered, 
[the default method](https://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication), 
which is `client_secret_basic` is used. 

According to [OAuth 2.0 Dynamic Client Registration (DCR)](https://www.google.com/url?q=https://tools.ietf.org/html/rfc7591%23section-2&sa=D&source=editors&ust=1619022501431000&usg=AOvVaw2Axr2N7pHOdBR0co99WNkV), 
a registered client has a set of metadata values that are associated with their client identifier. 

  - The **token_endpoint_auth_method** metadata field specifies the client authentication method. If the value of this field 
  is not specified, the default client authentication method which is `client_secret_basic` is configured.
  - The **token_endpoint_auth_signing_alg** field specifies the token endpoint signing algorithm.


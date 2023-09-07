This page explains how to onboard API consumers using the Dynamic Client Registration API. 

!!! tip "Before you begin..."

    1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
    
    2. Configure the JWKS endpoints by following the sample given below. These endpoints are used for validating the SSA signature. 
    ```toml
    [open_banking.dcr]
    jwks_url_sandbox = "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/0015800001HQQrZAAX.jwks"
    jwks_url_production = "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/0015800001HQQrZAAX.jwks"
    ```
       
    3. Restart the Identity Server.

    4. If you are using **WSO2 API Manager at U2 level 4.0.0.102 or above**, disable the Resident Key Manager:
        1. Open the `<APIM_HOME>/repository/conf/deployment.toml` file.
        2. Disable `[apim.key_manager]` configurations by commenting them out:

            ``` toml
            #[apim.key_manager]
            #service_url = "https://localhost:9446${carbon.context}services/"
            #type = "WSO2-IS"
            #key_manager_client_impl = "org.wso2.carbon.apimgt.impl.AMDefaultKeyManagerImpl"
            #username = "$ref{super_admin.username}"
            #password = "$ref{super_admin.password}"
            #pool.init_idle_capacity = 50
            #pool.max_idle = 100
            #key_validation_handler_type = "default"
            #key_validation_handler_type = "custom"
            #key_validation_handler_impl = "org.wso2.carbon.apimgt.keymgt.handlers.DefaultKeyValidationHandler"
            ```

    5. If you are using **WSO2 API Manager 4.2.0**, you need to change the API Manager REST API version from V2 to V3.
        1. Open the `<APIM_HOME>/repository/conf/deployment.toml` file.
        2. Locate the `[open_banking.dcr.apim_rest_endpoints]` tag. By default, the configuration is commented out.
        3. Uncomment the configuration and update as shown below:

            ```toml
            [open_banking.dcr.apim_rest_endpoints]
            app_creation = "api/am/devportal/v3/applications"
            key_generation = "api/am/devportal/v3/applications/application-id/map-keys"
            api_retrieve = "api/am/devportal/v3/apis"
            api_subscribe = "api/am/devportal/v3/subscriptions/multiple"
            retrieve_subscribe="api/am/devportal/v3/subscriptions"
            ```

    6. Restart the API Manager.

### Step 1: Deploy the Dynamic Client Registration(DCR) API

1. Sign in to the API Publisher Portal at [https://localhost:9443/publisher](https://localhost:9443/publisher) as `mark@gold.com` who has `creator/publisher` permissions.
privileges. 

2. In the homepage, go to **REST API** and select **Import Open API**.

3. Select **OpenAPI File/Archive**. ![select_API](../assets/img/learn/dcr/dcr-try-out/step-3.png)

4. Click **Browse File to Upload** and select the `<APIM_HOME>/<OB_APIM_ACCELERATOR_HOME>/repository/resources/apis/
DynamicClientRegistration/dcr-swagger.yaml` file.

5. Click **Next**.

6. Set the value for **Endpoint** as follows:
```
https://localhost:9446/api/openbanking/dynamic-client-registration
```
    ![set_endpoint](../assets/img/learn/dcr/dcr-try-out/step-4.png)

7. Click **Create**. 

8. Select **Subscriptions** from the left menu pane and set the business plan to **Unlimited: Allows unlimited requests**. ![select_subscriptions](../assets/img/learn/dcr/dcr-try-out/step-5.png)

9. Click **Save**.

10. Go to **Deployments** using the left menu pane and select **Default Hybrid** API Gateway. ![deploy_api_gateway](../assets/img/learn/dcr/dcr-try-out/deploy_api_gateway.png)

11. Click **Deploy**.

12.Go to **Overview** using the left menu pane. 

   ![select_overview](../assets/img/learn/dcr/dcr-try-out/step-8.png)
 
13.Click **Publish**. 

  ![publish_api](../assets/img/learn/dcr/dcr-try-out/step8-publish.png)

14.The deployed DCR API is now available in the Developer Portal at [https://localhost:9443/devportal](https://localhost:9443/devportal).

15.Upload the root and issuer certificates in OBIE ([Sandbox certificates](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/252018873/OB+Root+and+Issuing+Certificates+for+Sandbox)/
[Production certificates](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/80544075/OB+Root+and+Issuing+Certificates+for+Production))
to the client trust stores in `<APIM_HOME>/repository/resources/security/client-truststore.jks` and 
`<IS_HOME>/repository/resources/security/client-truststore.jks` using the following command:

  ```
  keytool -import -alias <alias> -file <certificate_location> -storetype JKS -keystore <truststore_location> -storepass wso2carbon
  ```

16.Restart the Identity Server and API Manager instances. 

### Step 2: Configure IS as Key Manager

 1. Sign in to the Admin Portal of API Manager at <https://localhost:9443/admin>.
 2. Go to **Key Managers** on the left main menu. ![add_Key_Manager](../assets/img/learn/dcr/dcr-try-out/step-9.png)
 3. Click **Add New Key Manager** and configure Key Manager. 
    
    ??? tip "Click here to see the full list of configurations..."
        | Configuration       | Description                           | Value                    |
        | -------------       |-------------                          | -----                    |
        | Name                | The name of the authorization server. | OBKM                     |
        | Display Name        | A name to display on the UI.          | OBKM                     |
        | Description         | The name of the authorization server. | (Optional)               |
        | Key Manager Type    | The type of the Key Manager to be selected. | Select `ObKeyManager` |
        |Well-known-url      | The well-known URL of the authorization server (Key Manager).| `https://<IS_HOST>:9446/oauth2/token/.well-known/openid-configuration` |
        | Issuer              | The issuer that consumes or validates access tokens.         | `https://<IS_HOST>:9446/oauth2/token` |
        |**Key Manager Endpoints**                                                                |
        | Client Registration Endpoint | The endpoint that verifies the identity and obtain profile information of the end-user based on the authentication performed by an authorization server.  |  `https://<IS_HOST>:9446/keymanager-operations/dcr/register`| 
        | Introspection Endpoint | The endpoint that allows authorized protected resources to query the authorization server to determine the set of metadata for a given token that was presented to them by an OAuth Client. | `https://<IS_HOST>:9446/oauth2/introspect` |
        | Token Endpoint      | The endpoint that issues the access tokens. | `https://<IS_HOST>:9446/oauth2/token` |
        | Revoke Endpoint     | The endpoint that revokes the access tokens.| `https://<IS_HOST>:9446/oauth2/revoke` |
        | Userinfo Endpoint   | The endpoint that allows clients to verify the identity of the end-user based on the authentication performed by an authorization server, as well as to obtain basic profile information about the end-user. | `https://<IS_HOST>:9446/oauth2/userinfo?schema=openid` |
        | Authorize Endpoint  | The endpoint used to obtain an authorization grant from the resource owner via the user-agent redirection. | `https://<IS_HOST>:9446/oauth2/authorize` |
        | Scope Management Endpoint | The endpoint used to manage the scopes. | `https://<IS_HOST>:9446/api/identity/oauth2/v1.0/scopes` |
        | **Connector Configurations**                        |
        | Username            | The username of an admin user who is authorized to connect to the authorization server. |  |
        | Password            | The password corresponding to the latter mentioned admin user who is authorized to connect to the authorization server. | |
        | **Claim URIs**      |   
        | Consumer Key Claim URI | The claim URI for the consumer key.  | (Optional)  |
        | Scopes Claim URI | The claim URI for the scopes | (Optional) | 
        | Grant Types | The supported grant types. Add multiple grant types by adding a grant type press Enter. Add the `client_credentials`, `authorization_code`, `refresh_token`, and `urn:ietf:params:oauth:grant-type:jwt-bearer` grant types. | (Mandatory) |
        | **Certificates** | 
        | PEM | Either copy and paste the certificate in PEM format or upload the PEM file. | (Optional) |
        | JWKS | The JSON Web Key Set (JWKS) endpoint is a read-only endpoint. This URL returns the Identity Server's public key set in JSON web key set format. This contains the signing key(s) the Relying Party (RP) uses to validate signatures from the Identity Server. | `https://<IS_HOST>:9446/oauth2/jwks` |
        | **Advanced Configurations** |
        | Token Generation | This enables token generation via the authorization server. | (Mandatory) |
        | Out Of Band Provisioning | This enables the provisioning of Auth clients that have been created without the use of the Developer Portal, such as previously created Auth clients. | (Mandatory) |
        | Oauth App Creation | This enables the creation of Auth clients. | (Mandatory) |
        | **Token Validation Method** | The method used to validate the JWT signature. |
        | Self Validate JWT | The kid value is used to validate the JWT token signature. If the kid value is not present, `gateway_certificate_alias` will be used. | (Mandatory) |
        | Use introspect | The JWKS endpoint is used to validate the JWT token signature. | - |
        | **Token Handling Options** | This provides a way to validate the token for this particular authorization server. This is mandatory if the Token Validation Method is introspect.| (Optional) |
        | REFERENCE | The tokens that match a specific regular expression (regEx) are validated. e.g., <code>[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}</code> | (Optional) |
        | JWT | The tokens that match a specific JWT are validated. | Select this icon |
        | CUSTOM | The tokens that match a custom pattern are validated. | (Optional) |
        | **Claim Mappings** | Local and remote claim mapping. | (Optional) |
    

3. Go to the list of Key Managers and select **Resident Key Manager**. ![select_Resident_KM](../assets/img/learn/dcr/dcr-try-out/step-10.png)

4. Locate **Connector Configurations** and provide a username and a password for a user with super admin credentials.

5. Click **Update**.

6. Disable the Resident Key Manager.

   ![Disable_Resident_KM](../assets/img/learn/dcr/dcr-try-out/step-11.png)

### Step 3: Register an application
The API allows the API consumer to request the bank to register a new application. The process is as follows:

- The API consumer sends a registration request including a Software Statement Assertion (SSA) as a claim in the payload. 
This SSA contains API consumer's metadata. A sample request looks as follows:

 For the Transport Layer Security purposes in this sample flow, you can use the attached
 [private key](../../assets/attachments/transport-certs/obtransport.key) and 
 [public certificate](../../assets/attachments/transport-certs/obtransport.pem). 

```
curl -X POST https://localhost:8243/open-banking/0.1/register \
 -H 'Content-Type: application/jwt' \
 --cert <TRANSPORT_PUBLIC_CERT_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \
 -d 'eyJ0eXAiOiJKV1QiLCJhbGciOiJQUzI1NiIsImtpZCI6ImgzWkNGMFZyemdYZ25IQ3FiSGJLWHp6ZmpUZyJ9.eyJpc3MiOiJvUTRLb2FhdnBPdW9FN3J2UXNaRU9WMyIsImlhdCI6MTU3MTgwODE2NywiZXhwIjoyMTQ3NDgzNjQ2LCJqdGkiOiIzNzc0N2NkMWMxMDU0NTY5OWY3NTRhZGYyOGI3M2UzMiIsImF1ZCI6Imh0dHBzOi8vc2VjdXJlLmFwaS5kYXRhaG9sZGVyLmNvbS9pc3N1ZXIiLCJyZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vd3d3Lm1vY2tjb21wYW55LmNvbS9yZWRpcmVjdHMvcmVkaXJlY3QxIl0sInRva2VuX2VuZHBvaW50X2F1dGhfc2lnbmluZ19hbGciOiJQUzI1NiIsInRva2VuX2VuZHBvaW50X2F1dGhfbWV0aG9kIjoicHJpdmF0ZV9rZXlfand0IiwiZ3JhbnRfdHlwZXMiOlsiY2xpZW50X2NyZWRlbnRpYWxzIiwiYXV0aG9yaXphdGlvbl9jb2RlIiwicmVmcmVzaF90b2tlbiIsInVybjppZXRmOnBhcmFtczpvYXV0aDpncmFudC10eXBlOmp3dC1iZWFyZXIiXSwicmVzcG9uc2VfdHlwZXMiOlsiY29kZSBpZF90b2tlbiJdLCJhcHBsaWNhdGlvbl90eXBlIjoid2ViIiwiaWRfdG9rZW5fc2lnbmVkX3Jlc3BvbnNlX2FsZyI6IlBTMjU2IiwiaWRfdG9rZW5fZW5jcnlwdGVkX3Jlc3BvbnNlX2FsZyI6IlJTQS1PQUVQIiwiaWRfdG9rZW5fZW5jcnlwdGVkX3Jlc3BvbnNlX2VuYyI6IkEyNTZHQ00iLCJyZXF1ZXN0X29iamVjdF9zaWduaW5nX2FsZyI6IlBTMjU2Iiwic2NvcGUiOiJvcGVuaWQgYWNjb3VudHMgcGF5bWVudHMiLCJzb2Z0d2FyZV9zdGF0ZW1lbnQiOiJleUpoYkdjaU9pSlFVekkxTmlJc0ltdHBaQ0k2SW1neldrTkdNRlp5ZW1kWVoyNUlRM0ZpU0dKTFdIcDZabXBVWnlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcGMzTWlPaUpQY0dWdVFtRnVhMmx1WnlCTWRHUWlMQ0pwWVhRaU9qRTJORGMwTURVNU5EQXNJbXAwYVNJNklqTTJZalZrWm1Vd01qQTFZelF3TmpBaUxDSnpiMlowZDJGeVpWOWxiblpwY205dWJXVnVkQ0k2SW5OaGJtUmliM2dpTENKemIyWjBkMkZ5WlY5dGIyUmxJam9pVkdWemRDSXNJbk52Wm5SM1lYSmxYMmxrSWpvaWIxRTBTMjloWVhad1QzVnZSVGR5ZGxGeldrVlBWak1pTENKemIyWjBkMkZ5WlY5amJHbGxiblJmYVdRaU9pSnZVVFJMYjJGaGRuQlBkVzlGTjNKMlVYTmFSVTlXTXlJc0luTnZablIzWVhKbFgyTnNhV1Z1ZEY5dVlXMWxJam9pVjFOUE1pQlBjR1Z1SUVKaGJtdHBibWNnVkZCUU1pQW9VMkZ1WkdKdmVDa2lMQ0p6YjJaMGQyRnlaVjlqYkdsbGJuUmZaR1Z6WTNKcGNIUnBiMjRpT2lKWFUwOHlJRTl3Wlc0Z1FtRnVhMmx1WnlCVVVGQXlJR1p2Y2lCMFpYTjBhVzVuSWl3aWMyOW1kSGRoY21WZmRtVnljMmx2YmlJNk1TNDFMQ0p6YjJaMGQyRnlaVjlqYkdsbGJuUmZkWEpwSWpvaWFIUjBjSE02THk5M2QzY3ViVzlqYTJOdmJYQmhibmt1WTI5dEwzSmxaR2x5WldOMGN5OXlaV1JwY21WamRERWlMQ0p6YjJaMGQyRnlaVjl5WldScGNtVmpkRjkxY21seklqcGJJbWgwZEhCek9pOHZkM2QzTG0xdlkydGpiMjF3WVc1NUxtTnZiUzl5WldScGNtVmpkSE12Y21Wa2FYSmxZM1F4SWwwc0luTnZablIzWVhKbFgzSnZiR1Z6SWpwYklsQkpVMUFpTENKQlNWTlFJaXdpUTBKUVNVa2lYU3dpYjNKbllXNXBjMkYwYVc5dVgyTnZiWEJsZEdWdWRGOWhkWFJvYjNKcGRIbGZZMnhoYVcxeklqcDdJbUYxZEdodmNtbDBlVjlwWkNJNklrOUNSMEpTSWl3aWNtVm5hWE4wY21GMGFXOXVYMmxrSWpvaVZXNXJibTkzYmpBd01UVTRNREF3TURGSVVWRnlXa0ZCV0NJc0luTjBZWFIxY3lJNklrRmpkR2wyWlNJc0ltRjFkR2h2Y21sellYUnBiMjV6SWpwYmV5SnRaVzFpWlhKZmMzUmhkR1VpT2lKSFFpSXNJbkp2YkdWeklqcGJJbEJKVTFBaUxDSkJTVk5RSWl3aVEwSlFTVWtpWFgwc2V5SnRaVzFpWlhKZmMzUmhkR1VpT2lKSlJTSXNJbkp2YkdWeklqcGJJbEJKVTFBaUxDSkRRbEJKU1NJc0lrRkpVMUFpWFgwc2V5SnRaVzFpWlhKZmMzUmhkR1VpT2lKT1RDSXNJbkp2YkdWeklqcGJJbEJKVTFBaUxDSkJTVk5RSWl3aVEwSlFTVWtpWFgxZGZTd2ljMjltZEhkaGNtVmZiRzluYjE5MWNta2lPaUpvZEhSd2N6b3ZMM2R6YnpJdVkyOXRMM2R6YnpJdWFuQm5JaXdpYjNKblgzTjBZWFIxY3lJNklrRmpkR2wyWlNJc0ltOXlaMTlwWkNJNklqQXdNVFU0TURBd01ERklVVkZ5V2tGQldDSXNJbTl5WjE5dVlXMWxJam9pVjFOUE1pQW9WVXNwSUV4SlRVbFVSVVFpTENKdmNtZGZZMjl1ZEdGamRITWlPbHQ3SW01aGJXVWlPaUpVWldOb2JtbGpZV3dpTENKbGJXRnBiQ0k2SW5SbGMzUkFkM052TWk1amIyMGlMQ0p3YUc5dVpTSTZJaXM1TkRBd01EQXdNREF3TUNJc0luUjVjR1VpT2lKVVpXTm9ibWxqWVd3aWZTeDdJbTVoYldVaU9pSkNkWE5wYm1WemN5SXNJbVZ0WVdsc0lqb2lkR1Z6ZEVCM2MyOHlMbU52YlNJc0luQm9iMjVsSWpvaUt6azBNREF3TURBd01EQXdJaXdpZEhsd1pTSTZJa0oxYzJsdVpYTnpJbjFkTENKdmNtZGZhbmRyYzE5bGJtUndiMmx1ZENJNkltaDBkSEJ6T2k4dmEyVjVjM1J2Y21VdWIzQmxibUpoYm10cGJtZDBaWE4wTG05eVp5NTFheTh3TURFMU9EQXdNREF4U0ZGUmNscEJRVmd2TURBeE5UZ3dNREF3TVVoUlVYSmFRVUZZTG1wM2EzTWlMQ0p2Y21kZmFuZHJjMTl5WlhadmEyVmtYMlZ1WkhCdmFXNTBJam9pYUhSMGNITTZMeTlyWlhsemRHOXlaUzV2Y0dWdVltRnVhMmx1WjNSbGMzUXViM0puTG5Wckx6QXdNVFU0TURBd01ERklVVkZ5V2tGQldDOXlaWFp2YTJWa0x6QXdNVFU0TURBd01ERklVVkZ5V2tGQldDNXFkMnR6SWl3aWMyOW1kSGRoY21WZmFuZHJjMTlsYm1Sd2IybHVkQ0k2SW1oMGRIQnpPaTh2YTJWNWMzUnZjbVV1YjNCbGJtSmhibXRwYm1kMFpYTjBMbTl5Wnk1MWF5OHdNREUxT0RBd01EQXhTRkZSY2xwQlFWZ3ZiMUUwUzI5aFlYWndUM1Z2UlRkeWRsRnpXa1ZQVmk1cWQydHpJaXdpYzI5bWRIZGhjbVZmYW5kcmMxOXlaWFp2YTJWa1gyVnVaSEJ2YVc1MElqb2lhSFIwY0hNNkx5OXJaWGx6ZEc5eVpTNXZjR1Z1WW1GdWEybHVaM1JsYzNRdWIzSm5MblZyTHpBd01UVTRNREF3TURGSVVWRnlXa0ZCV0M5eVpYWnZhMlZrTDI5Uk5FdHZZV0YyY0U5MWIwVTNjblpSYzFwRlQxWXVhbmRyY3lJc0luTnZablIzWVhKbFgzQnZiR2xqZVY5MWNta2lPaUpvZEhSd2N6b3ZMM2R6YnpJdVkyOXRJaXdpYzI5bWRIZGhjbVZmZEc5elgzVnlhU0k2SW1oMGRIQnpPaTh2ZDNOdk1pNWpiMjBpTENKemIyWjBkMkZ5WlY5dmJsOWlaV2hoYkdaZmIyWmZiM0puSWpvaVYxTlBNaUJQY0dWdUlFSmhibXRwYm1jaWZRLlZBSHlickpXcndKTHo4anRBZEJqUjIzOWpKSlZHS0o2U05oV3FhbjVpMG50WVFLY3AtTXlaQXltUVZHcUo1R2ZScXJYSHhZS1VHZE50V2ZTa1E5cW12ejM4Yy1tMXY1emEweU9nRkg0eDMtXzFqdzV3UEJmMGVpY1VnSGM3XzNDd1g4NXpRQ3hVN1M4R0VTWm5KbWJLOC1IZTlMUzVEMmJnMnhTWXQ2VE9uemdmWlVUMk5oWDVqWk9JcG9pRDJVWnh0MGF3bmd3MFRZUGRrdXhUdWxhTjNjYlJHYkZSYUFoVlhRblFoUzMtWWFqN3Z1TGJ6RnVPSUZMSVJnVm1kcElfd1lKXzhlSDlGQ3Fqa2pMbG9UaDZyVDNaeExtWXYwZXI0RGxwdV9rUl9ZOWNKUElWc2FNVHA0c21WR1M2eWxCTXhjTWRuY2E2UmUtUFFjRU0wRlJCZyJ9.VgkJ6WcAankpS7nBX2pKRNErXLqsstYeodTpiXmgE7ZuFQNHIbgJXYMZ9kDG0GiXzL4cxi4KwNQAcnov5nGJLjPp5MXNIiancqWpI9uVTOQ7bLganlR8yT97R7_x2E1KRc5k39yr64jy4N_AzdMephFKExNpC6g3BtjoYEzLpTPxt2nOh97aDznnKQutaYNGA9Q96ifF4z4QAnrHP1DgZkqhfadGupk0AXaFkXJGrfab8_DijPLPTKnpWP0VJfpfsVXJZiBLzwL7GLjS6hsg97s2RPm-tu0jm2WSwPPwhQYXRuc2--G5eHQm07fJxwehqvKxcPyYdjnpJPzLaLl-NQ' 
```

The payload is a signed JWT.

??? tip "Click here to see the decoded format of the payload..."

    ```
    {
      "typ": "JWT",
      "alg": "PS256",
      "kid": "h3ZCF0VrzgXgnHCqbHbKXzzfjTg"
    }

    {
      "iss": "oQ4KoaavpOuoE7rvQsZEOV3",
      "iat": 1571808167,
      "exp": 2147483646,
      "jti": "37747cd1c10545699f754adf28b73e31",
      "aud": "https://secure.api.dataholder.com/issuer",
      "redirect_uris": [
        "https://www.mockcompany.com/redirects/redirect1"
      ],
      "token_endpoint_auth_signing_alg": "PS256",
      "token_endpoint_auth_method": "private_key_jwt",
      "grant_types": [
         "client_credentials",
         "authorization_code",
         "refresh_token",
         "urn:ietf:params:oauth:grant-type:jwt-bearer"
      ],
      "response_types": [
         "code id_token"
      ],
      "application_type": "web",
      "id_token_signed_response_alg": "PS256",
      "id_token_encrypted_response_alg": "RSA-OAEP",
      "id_token_encrypted_response_enc": "A256GCM",
      "request_object_signing_alg": "PS256",
      "scope": "openid accounts payments",
      "software_statement": "eyJhbGciOiJQUzI1NiIsImtpZCI6ImgzWkNGMFZyemdYZ25IQ3FiSGJLWHp6ZmpUZyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJPcGVuQmFua2luZyBMdGQiLCJpYXQiOjE2NDc0MDU5NDAsImp0aSI6IjM2YjVkZmUwMjA1YzQwNjAiLCJzb2Z0d2FyZV9lbnZpcm9ubWVudCI6InNhbmRib3giLCJzb2Z0d2FyZV9tb2RlIjoiVGVzdCIsInNvZnR3YXJlX2lkIjoib1E0S29hYXZwT3VvRTdydlFzWkVPVjMiLCJzb2Z0d2FyZV9jbGllbnRfaWQiOiJvUTRLb2FhdnBPdW9FN3J2UXNaRU9WMyIsInNvZnR3YXJlX2NsaWVudF9uYW1lIjoiV1NPMiBPcGVuIEJhbmtpbmcgVFBQMiAoU2FuZGJveCkiLCJzb2Z0d2FyZV9jbGllbnRfZGVzY3JpcHRpb24iOiJXU08yIE9wZW4gQmFua2luZyBUUFAyIGZvciB0ZXN0aW5nIiwic29mdHdhcmVfdmVyc2lvbiI6MS41LCJzb2Z0d2FyZV9jbGllbnRfdXJpIjoiaHR0cHM6Ly93d3cubW9ja2NvbXBhbnkuY29tL3JlZGlyZWN0cy9yZWRpcmVjdDEiLCJzb2Z0d2FyZV9yZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vd3d3Lm1vY2tjb21wYW55LmNvbS9yZWRpcmVjdHMvcmVkaXJlY3QxIl0sInNvZnR3YXJlX3JvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXSwib3JnYW5pc2F0aW9uX2NvbXBldGVudF9hdXRob3JpdHlfY2xhaW1zIjp7ImF1dGhvcml0eV9pZCI6Ik9CR0JSIiwicmVnaXN0cmF0aW9uX2lkIjoiVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWCIsInN0YXR1cyI6IkFjdGl2ZSIsImF1dGhvcmlzYXRpb25zIjpbeyJtZW1iZXJfc3RhdGUiOiJHQiIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX0seyJtZW1iZXJfc3RhdGUiOiJJRSIsInJvbGVzIjpbIlBJU1AiLCJDQlBJSSIsIkFJU1AiXX0seyJtZW1iZXJfc3RhdGUiOiJOTCIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX1dfSwic29mdHdhcmVfbG9nb191cmkiOiJodHRwczovL3dzbzIuY29tL3dzbzIuanBnIiwib3JnX3N0YXR1cyI6IkFjdGl2ZSIsIm9yZ19pZCI6IjAwMTU4MDAwMDFIUVFyWkFBWCIsIm9yZ19uYW1lIjoiV1NPMiAoVUspIExJTUlURUQiLCJvcmdfY29udGFjdHMiOlt7Im5hbWUiOiJUZWNobmljYWwiLCJlbWFpbCI6InRlc3RAd3NvMi5jb20iLCJwaG9uZSI6Iis5NDAwMDAwMDAwMCIsInR5cGUiOiJUZWNobmljYWwifSx7Im5hbWUiOiJCdXNpbmVzcyIsImVtYWlsIjoidGVzdEB3c28yLmNvbSIsInBob25lIjoiKzk0MDAwMDAwMDAwIiwidHlwZSI6IkJ1c2luZXNzIn1dLCJvcmdfandrc19lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxSFFRclpBQVgvMDAxNTgwMDAwMUhRUXJaQUFYLmp3a3MiLCJvcmdfandrc19yZXZva2VkX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC9yZXZva2VkLzAwMTU4MDAwMDFIUVFyWkFBWC5qd2tzIiwic29mdHdhcmVfandrc19lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxSFFRclpBQVgvb1E0S29hYXZwT3VvRTdydlFzWkVPVi5qd2tzIiwic29mdHdhcmVfandrc19yZXZva2VkX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC9yZXZva2VkL29RNEtvYWF2cE91b0U3cnZRc1pFT1YuandrcyIsInNvZnR3YXJlX3BvbGljeV91cmkiOiJodHRwczovL3dzbzIuY29tIiwic29mdHdhcmVfdG9zX3VyaSI6Imh0dHBzOi8vd3NvMi5jb20iLCJzb2Z0d2FyZV9vbl9iZWhhbGZfb2Zfb3JnIjoiV1NPMiBPcGVuIEJhbmtpbmcifQ.VAHybrJWrwJLz8jtAdBjR239jJJVGKJ6SNhWqan5i0ntYQKcp-MyZAymQVGqJ5GfRqrXHxYKUGdNtWfSkQ9qmvz38c-m1v5za0yOgFH4x3-_1jw5wPBf0eicUgHc7_3CwX85zQCxU7S8GESZnJmbK8-He9LS5D2bg2xSYt6TOnzgfZUT2NhX5jZOIpoiD2UZxt0awngw0TYPdkuxTulaN3cbRGbFRaAhVXQnQhS3-Yaj7vuLbzFuOIFLIRgVmdpI_wYJ_8eH9FCqjkjLloTh6rT3ZxLmYv0er4Dlpu_kR_Y9cJPIVsaMTp4smVGS6ylBMxcMdnca6Re-PQcEM0FRBg"
    }

    <signature>
    ```

??? tip "Click here to see the decoded format of an SSA..."

    ```
    {
      "alg": "PS256",
      "kid": "h3ZCF0VrzgXgnHCqbHbKXzzfjTg",
      "typ": "JWT"
    }

    {
      "iss": "OpenBanking Ltd",
      "iat": 1647405940,
      "jti": "36b5dfe0205c4060",
      "software_environment": "sandbox",
      "software_mode": "Test",
      "software_id": "oQ4KoaavpOuoE7rvQsZEOV3",
      "software_client_id": "oQ4KoaavpOuoE7rvQsZEOV3",
      "software_client_name": "WSO2 Open Banking TPP2 (Sandbox)",
      "software_client_description": "WSO2 Open Banking TPP2 for testing",
      "software_version": 1.5,
      "software_client_uri": "https://www.mockcompany.com/redirects/redirect1",
      "software_redirect_uris": [
         "https://www.mockcompany.com/redirects/redirect1"
      ],
      "software_roles": [
         "PISP",
         "AISP",
         "CBPII"
      ],
      "organisation_competent_authority_claims": {
         "authority_id": "OBGBR",
         "registration_id": "Unknown0015800001HQQrZAAX",
         "status": "Active",
         "authorisations": [
            {
               "member_state": "GB",
               "roles": [
                  "PISP",
                  "AISP",
                  "CBPII"
            ]
            },
            {
            "member_state": "IE",
            "roles": [
               "PISP",
               "CBPII",
               "AISP"
            ]
            },
            {
            "member_state": "NL",
            "roles": [
               "PISP",
               "AISP",
               "CBPII"
            ]
            }
         ]
      },
      "software_logo_uri": "https://wso2.com/wso2.jpg",
      "org_status": "Active",
      "org_id": "0015800001HQQrZAAX",
      "org_name": "WSO2 (UK) LIMITED",
      "org_contacts": [
         {
            "name": "Technical",
            "email": "test@wso2.com",
            "phone": "+94000000000",
            "type": "Technical"
         },
         {
            "name": "Business",
            "email": "test@wso2.com",
            "phone": "+94000000000",
            "type": "Business"
         }
      ],
      "org_jwks_endpoint": "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/0015800001HQQrZAAX.jwks",
      "org_jwks_revoked_endpoint": "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/revoked/0015800001HQQrZAAX.jwks",
      "software_jwks_endpoint": "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/oQ4KoaavpOuoE7rvQsZEOV.jwks",
      "software_jwks_revoked_endpoint": "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/revoked/oQ4KoaavpOuoE7rvQsZEOV.jwks",
      "software_policy_uri": "https://wso2.com",
      "software_tos_uri": "https://wso2.com",
      "software_on_behalf_of_org": "WSO2 Open Banking"
    }

    <signature>
    ```

!!! note 
    If you change the payload, use the following certificates to sign the JWT and SSA:
    
    - [signing certificate](../../assets/attachments/signing-certs/obsigning.pem)
    - [private keys](../../assets/attachments/signing-certs/obsigning.key)

- The bank registers the application using the metadata sent in the SSA.

- If an application is successfully created, the bank responds with a JSON payload describing the API consumer that the application was created. 
The API consumer can then use the identifier (`Client ID`) to access customers' financial data on the bank's resource server. A sample response is 
given below:
```
{
   "client_id":"ZRsNz6FOaNSWjEwEGFW_Osid8aAa",
   "client_id_issued_at":"1664173296",
   "redirect_uris":[
      "https://www.mockcompany.com/redirects/redirect1"
      ],
      "grant_types":[
         "client_credentials",
         "authorization_code",
         "refresh_token",
         "urn:ietf:params:oauth:grant-type:jwt-bearer"
      ],
      "response_types":[
         "code id_token"
      ],
      "application_type":"web",
      "id_token_signed_response_alg":"PS256",
      "request_object_signing_alg":"PS256",
      "scope":"openid accounts payments",
      "software_id":"oQ4KoaavpOuoE7rvQsZEOV3",
      "token_endpoint_auth_method":"private_key_jwt",
      "software_statement":"eyJhbGciOiJQUzI1NiIsImtpZCI6ImgzWkNGMFZyemdYZ25IQ3FiSGJLWHp6ZmpUZyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJPcGVuQmFua2luZyBMdGQiLCJpYXQiOjE2NDc0MDU5NDAsImp0aSI6IjM2YjVkZmUwMjA1YzQwNjAiLCJzb2Z0d2FyZV9lbnZpcm9ubWVudCI6InNhbmRib3giLCJzb2Z0d2FyZV9tb2RlIjoiVGVzdCIsInNvZnR3YXJlX2lkIjoib1E0S29hYXZwT3VvRTdydlFzWkVPVjMiLCJzb2Z0d2FyZV9jbGllbnRfaWQiOiJvUTRLb2FhdnBPdW9FN3J2UXNaRU9WMyIsInNvZnR3YXJlX2NsaWVudF9uYW1lIjoiV1NPMiBPcGVuIEJhbmtpbmcgVFBQMiAoU2FuZGJveCkiLCJzb2Z0d2FyZV9jbGllbnRfZGVzY3JpcHRpb24iOiJXU08yIE9wZW4gQmFua2luZyBUUFAyIGZvciB0ZXN0aW5nIiwic29mdHdhcmVfdmVyc2lvbiI6MS41LCJzb2Z0d2FyZV9jbGllbnRfdXJpIjoiaHR0cHM6Ly93d3cubW9ja2NvbXBhbnkuY29tL3JlZGlyZWN0cy9yZWRpcmVjdDEiLCJzb2Z0d2FyZV9yZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vd3d3Lm1vY2tjb21wYW55LmNvbS9yZWRpcmVjdHMvcmVkaXJlY3QxIl0sInNvZnR3YXJlX3JvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXSwib3JnYW5pc2F0aW9uX2NvbXBldGVudF9hdXRob3JpdHlfY2xhaW1zIjp7ImF1dGhvcml0eV9pZCI6Ik9CR0JSIiwicmVnaXN0cmF0aW9uX2lkIjoiVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWCIsInN0YXR1cyI6IkFjdGl2ZSIsImF1dGhvcmlzYXRpb25zIjpbeyJtZW1iZXJfc3RhdGUiOiJHQiIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX0seyJtZW1iZXJfc3RhdGUiOiJJRSIsInJvbGVzIjpbIlBJU1AiLCJDQlBJSSIsIkFJU1AiXX0seyJtZW1iZXJfc3RhdGUiOiJOTCIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX1dfSwic29mdHdhcmVfbG9nb191cmkiOiJodHRwczovL3dzbzIuY29tL3dzbzIuanBnIiwib3JnX3N0YXR1cyI6IkFjdGl2ZSIsIm9yZ19pZCI6IjAwMTU4MDAwMDFIUVFyWkFBWCIsIm9yZ19uYW1lIjoiV1NPMiAoVUspIExJTUlURUQiLCJvcmdfY29udGFjdHMiOlt7Im5hbWUiOiJUZWNobmljYWwiLCJlbWFpbCI6InRlc3RAd3NvMi5jb20iLCJwaG9uZSI6Iis5NDAwMDAwMDAwMCIsInR5cGUiOiJUZWNobmljYWwifSx7Im5hbWUiOiJCdXNpbmVzcyIsImVtYWlsIjoidGVzdEB3c28yLmNvbSIsInBob25lIjoiKzk0MDAwMDAwMDAwIiwidHlwZSI6IkJ1c2luZXNzIn1dLCJvcmdfandrc19lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxSFFRclpBQVgvMDAxNTgwMDAwMUhRUXJaQUFYLmp3a3MiLCJvcmdfandrc19yZXZva2VkX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC9yZXZva2VkLzAwMTU4MDAwMDFIUVFyWkFBWC5qd2tzIiwic29mdHdhcmVfandrc19lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxSFFRclpBQVgvb1E0S29hYXZwT3VvRTdydlFzWkVPVi5qd2tzIiwic29mdHdhcmVfandrc19yZXZva2VkX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC9yZXZva2VkL29RNEtvYWF2cE91b0U3cnZRc1pFT1YuandrcyIsInNvZnR3YXJlX3BvbGljeV91cmkiOiJodHRwczovL3dzbzIuY29tIiwic29mdHdhcmVfdG9zX3VyaSI6Imh0dHBzOi8vd3NvMi5jb20iLCJzb2Z0d2FyZV9vbl9iZWhhbGZfb2Zfb3JnIjoiV1NPMiBPcGVuIEJhbmtpbmcifQ.VAHybrJWrwJLz8jtAdBjR239jJJVGKJ6SNhWqan5i0ntYQKcp-MyZAymQVGqJ5GfRqrXHxYKUGdNtWfSkQ9qmvz38c-m1v5za0yOgFH4x3-_1jw5wPBf0eicUgHc7_3CwX85zQCxU7S8GESZnJmbK8-He9LS5D2bg2xSYt6TOnzgfZUT2NhX5jZOIpoiD2UZxt0awngw0TYPdkuxTulaN3cbRGbFRaAhVXQnQhS3-Yaj7vuLbzFuOIFLIRgVmdpI_wYJ_8eH9FCqjkjLloTh6rT3ZxLmYv0er4Dlpu_kR_Y9cJPIVsaMTp4smVGS6ylBMxcMdnca6Re-PQcEM0FRBg"
}

```

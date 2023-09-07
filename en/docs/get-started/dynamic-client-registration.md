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
 -d 'eyJ0eXAiOiJKV1QiLCJhbGciOiJQUzI1NiIsImtpZCI6ImgzWkNGMFZyemdYZ25IQ3FiSGJLWHp6ZmpUZyJ9.eyJpc3MiOiJTNnUySGU0anl3dnl5cFQ3ZkdZRXhMU3lwUVlhIiwiaWF0IjoxNjk0MDc1NzEzLCJleHAiOjIxNDc0ODM2NDYsImp0aSI6IjM3NzQ3Y2QxYzEwNTQ1Njk5Zjc1NGFkZjI4YjczZTMyIiwiYXVkIjoiaHR0cHM6Ly9zZWN1cmUuYXBpLmRhdGFob2xkZXIuY29tL2lzc3VlciIsInJlZGlyZWN0X3VyaXMiOlsiaHR0cHM6Ly93d3cubW9ja2NvbXBhbnkuY29tL3JlZGlyZWN0cy9yZWRpcmVjdDEiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9zaWduaW5nX2FsZyI6IlBTMjU2IiwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJwcml2YXRlX2tleV9qd3QiLCJncmFudF90eXBlcyI6WyJjbGllbnRfY3JlZGVudGlhbHMiLCJhdXRob3JpemF0aW9uX2NvZGUiLCJyZWZyZXNoX3Rva2VuIiwidXJuOmlldGY6cGFyYW1zOm9hdXRoOmdyYW50LXR5cGU6and0LWJlYXJlciJdLCJyZXNwb25zZV90eXBlcyI6WyJjb2RlIGlkX3Rva2VuIl0sImFwcGxpY2F0aW9uX3R5cGUiOiJ3ZWIiLCJpZF90b2tlbl9zaWduZWRfcmVzcG9uc2VfYWxnIjoiUFMyNTYiLCJpZF90b2tlbl9lbmNyeXB0ZWRfcmVzcG9uc2VfYWxnIjoiUlNBLU9BRVAiLCJpZF90b2tlbl9lbmNyeXB0ZWRfcmVzcG9uc2VfZW5jIjoiQTI1NkdDTSIsInJlcXVlc3Rfb2JqZWN0X3NpZ25pbmdfYWxnIjoiUFMyNTYiLCJzY29wZSI6Im9wZW5pZCBhY2NvdW50cyBwYXltZW50cyIsInNvZnR3YXJlX3N0YXRlbWVudCI6ImV5SmhiR2NpT2lKUVV6STFOaUlzSW10cFpDSTZJbWd6V2tOR01GWnllbWRZWjI1SVEzRmlTR0pMV0hwNlptcFVaeUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwYzNNaU9pSlBjR1Z1UW1GdWEybHVaeUJNZEdRaUxDSnBZWFFpT2pFMk5EYzBNRFU1TkRBc0ltcDBhU0k2SWpNMllqVmtabVV3TWpBMVl6UXdOakFpTENKemIyWjBkMkZ5WlY5bGJuWnBjbTl1YldWdWRDSTZJbk5oYm1SaWIzZ2lMQ0p6YjJaMGQyRnlaVjl0YjJSbElqb2lWR1Z6ZENJc0luTnZablIzWVhKbFgybGtJam9pYjFFMFMyOWhZWFp3VDNWdlJUZHlkbEZ6V2tWUFZqTWlMQ0p6YjJaMGQyRnlaVjlqYkdsbGJuUmZhV1FpT2lKdlVUUkxiMkZoZG5CUGRXOUZOM0oyVVhOYVJVOVdNeUlzSW5OdlpuUjNZWEpsWDJOc2FXVnVkRjl1WVcxbElqb2lWMU5QTWlCUGNHVnVJRUpoYm10cGJtY2dWRkJRTWlBb1UyRnVaR0p2ZUNraUxDSnpiMlowZDJGeVpWOWpiR2xsYm5SZlpHVnpZM0pwY0hScGIyNGlPaUpYVTA4eUlFOXdaVzRnUW1GdWEybHVaeUJVVUZBeUlHWnZjaUIwWlhOMGFXNW5JaXdpYzI5bWRIZGhjbVZmZG1WeWMybHZiaUk2TVM0MUxDSnpiMlowZDJGeVpWOWpiR2xsYm5SZmRYSnBJam9pYUhSMGNITTZMeTkzZDNjdWJXOWphMk52YlhCaGJua3VZMjl0TDNKbFpHbHlaV04wY3k5eVpXUnBjbVZqZERFaUxDSnpiMlowZDJGeVpWOXlaV1JwY21WamRGOTFjbWx6SWpwYkltaDBkSEJ6T2k4dmQzZDNMbTF2WTJ0amIyMXdZVzU1TG1OdmJTOXlaV1JwY21WamRITXZjbVZrYVhKbFkzUXhJbDBzSW5OdlpuUjNZWEpsWDNKdmJHVnpJanBiSWxCSlUxQWlMQ0pCU1ZOUUlpd2lRMEpRU1VraVhTd2liM0puWVc1cGMyRjBhVzl1WDJOdmJYQmxkR1Z1ZEY5aGRYUm9iM0pwZEhsZlkyeGhhVzF6SWpwN0ltRjFkR2h2Y21sMGVWOXBaQ0k2SWs5Q1IwSlNJaXdpY21WbmFYTjBjbUYwYVc5dVgybGtJam9pVlc1cmJtOTNiakF3TVRVNE1EQXdNREZJVVZGeVdrRkJXQ0lzSW5OMFlYUjFjeUk2SWtGamRHbDJaU0lzSW1GMWRHaHZjbWx6WVhScGIyNXpJanBiZXlKdFpXMWlaWEpmYzNSaGRHVWlPaUpIUWlJc0luSnZiR1Z6SWpwYklsQkpVMUFpTENKQlNWTlFJaXdpUTBKUVNVa2lYWDBzZXlKdFpXMWlaWEpmYzNSaGRHVWlPaUpKUlNJc0luSnZiR1Z6SWpwYklsQkpVMUFpTENKRFFsQkpTU0lzSWtGSlUxQWlYWDBzZXlKdFpXMWlaWEpmYzNSaGRHVWlPaUpPVENJc0luSnZiR1Z6SWpwYklsQkpVMUFpTENKQlNWTlFJaXdpUTBKUVNVa2lYWDFkZlN3aWMyOW1kSGRoY21WZmJHOW5iMTkxY21raU9pSm9kSFJ3Y3pvdkwzZHpiekl1WTI5dEwzZHpiekl1YW5Cbklpd2liM0puWDNOMFlYUjFjeUk2SWtGamRHbDJaU0lzSW05eVoxOXBaQ0k2SWpBd01UVTRNREF3TURGSVVWRnlXa0ZCV0NJc0ltOXlaMTl1WVcxbElqb2lWMU5QTWlBb1ZVc3BJRXhKVFVsVVJVUWlMQ0p2Y21kZlkyOXVkR0ZqZEhNaU9sdDdJbTVoYldVaU9pSlVaV05vYm1sallXd2lMQ0psYldGcGJDSTZJblJsYzNSQWQzTnZNaTVqYjIwaUxDSndhRzl1WlNJNklpczVOREF3TURBd01EQXdNQ0lzSW5SNWNHVWlPaUpVWldOb2JtbGpZV3dpZlN4N0ltNWhiV1VpT2lKQ2RYTnBibVZ6Y3lJc0ltVnRZV2xzSWpvaWRHVnpkRUIzYzI4eUxtTnZiU0lzSW5Cb2IyNWxJam9pS3prME1EQXdNREF3TURBd0lpd2lkSGx3WlNJNklrSjFjMmx1WlhOekluMWRMQ0p2Y21kZmFuZHJjMTlsYm1Sd2IybHVkQ0k2SW1oMGRIQnpPaTh2YTJWNWMzUnZjbVV1YjNCbGJtSmhibXRwYm1kMFpYTjBMbTl5Wnk1MWF5OHdNREUxT0RBd01EQXhTRkZSY2xwQlFWZ3ZNREF4TlRnd01EQXdNVWhSVVhKYVFVRllMbXAzYTNNaUxDSnZjbWRmYW5kcmMxOXlaWFp2YTJWa1gyVnVaSEJ2YVc1MElqb2lhSFIwY0hNNkx5OXJaWGx6ZEc5eVpTNXZjR1Z1WW1GdWEybHVaM1JsYzNRdWIzSm5MblZyTHpBd01UVTRNREF3TURGSVVWRnlXa0ZCV0M5eVpYWnZhMlZrTHpBd01UVTRNREF3TURGSVVWRnlXa0ZCV0M1cWQydHpJaXdpYzI5bWRIZGhjbVZmYW5kcmMxOWxibVJ3YjJsdWRDSTZJbWgwZEhCek9pOHZhMlY1YzNSdmNtVXViM0JsYm1KaGJtdHBibWQwWlhOMExtOXlaeTUxYXk4d01ERTFPREF3TURBeFNGRlJjbHBCUVZndmIxRTBTMjloWVhad1QzVnZSVGR5ZGxGeldrVlBWaTVxZDJ0eklpd2ljMjltZEhkaGNtVmZhbmRyYzE5eVpYWnZhMlZrWDJWdVpIQnZhVzUwSWpvaWFIUjBjSE02THk5clpYbHpkRzl5WlM1dmNHVnVZbUZ1YTJsdVozUmxjM1F1YjNKbkxuVnJMekF3TVRVNE1EQXdNREZJVVZGeVdrRkJXQzl5WlhadmEyVmtMMjlSTkV0dllXRjJjRTkxYjBVM2NuWlJjMXBGVDFZdWFuZHJjeUlzSW5OdlpuUjNZWEpsWDNCdmJHbGplVjkxY21raU9pSm9kSFJ3Y3pvdkwzZHpiekl1WTI5dElpd2ljMjltZEhkaGNtVmZkRzl6WDNWeWFTSTZJbWgwZEhCek9pOHZkM052TWk1amIyMGlMQ0p6YjJaMGQyRnlaVjl2Ymw5aVpXaGhiR1pmYjJaZmIzSm5Jam9pVjFOUE1pQlBjR1Z1SUVKaGJtdHBibWNpZlEuVkFIeWJySldyd0pMejhqdEFkQmpSMjM5akpKVkdLSjZTTmhXcWFuNWkwbnRZUUtjcC1NeVpBeW1RVkdxSjVHZlJxclhIeFlLVUdkTnRXZlNrUTlxbXZ6MzhjLW0xdjV6YTB5T2dGSDR4My1fMWp3NXdQQmYwZWljVWdIYzdfM0N3WDg1elFDeFU3UzhHRVNabkptYks4LUhlOUxTNUQyYmcyeFNZdDZUT256Z2ZaVVQyTmhYNWpaT0lwb2lEMlVaeHQwYXduZ3cwVFlQZGt1eFR1bGFOM2NiUkdiRlJhQWhWWFFuUWhTMy1ZYWo3dnVMYnpGdU9JRkxJUmdWbWRwSV93WUpfOGVIOUZDcWprakxsb1RoNnJUM1p4TG1ZdjBlcjREbHB1X2tSX1k5Y0pQSVZzYU1UcDRzbVZHUzZ5bEJNeGNNZG5jYTZSZS1QUWNFTTBGUkJnIn0.RcSgoPRVRZe2Pfzbi_MMlbhYTCSsRrXBrA7w6f32HbkDLUJUJ9Kbdja0G8deh_Muh49KvBaN5nss2uE4V1DRPStO2Vxf7E6SmDgNFVy6eF8SitnWAm-cYv7G4ezE0o7yTRBBQHB4i3gIZr8Zj9luj4hDBCb0iUU9Pjd5h5BKcQuEyiYJBRtrJl03F2U1KNuxPH9Ee4aXBqC_PNILb7qNO-Vb5cN-FTR8oDbOuL4muT0mY-HW-tzNKrYjtnTDaTS_FTeZCEyhd1UJDWx7mIeqM75lphbQbQYCCChAXCGy-QNewWp9_zFgXeptOiBNbE_yPqZ-r7chLZAXcjpvAZC90w' 
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
      "iss": "S6u2He4jywvyypT7fGYExLSypQYa",
      "iat": 1694075713,
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
      "software_statement": "eyJhbGciOiJQUzI1NiIsImtpZCI6ImgzWkNGMFZyemdYZ25IQ3FiSGJLWHp6ZmpUZyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJPcGVuQmFua2luZyBMdGQiLCJpYXQiOjE2OTQwNzU3MTMsImp0aSI6IjM2YjVkZmUwMjA1YzQwNjAiLCJzb2Z0d2FyZV9lbnZpcm9ubWVudCI6InNhbmRib3giLCJzb2Z0d2FyZV9tb2RlIjoiVGVzdCIsInNvZnR3YXJlX2lkIjoiUzZ1MkhlNGp5d3Z5eXBUN2ZHWUV4TFN5cFFZYSIsInNvZnR3YXJlX2NsaWVudF9pZCI6IlM2dTJIZTRqeXd2eXlwVDdmR1lFeExTeXBRWWEiLCJzb2Z0d2FyZV9jbGllbnRfbmFtZSI6IldTTzIgT3BlbiBCYW5raW5nIFRQUDIgKFNhbmRib3gpIiwic29mdHdhcmVfY2xpZW50X2Rlc2NyaXB0aW9uIjoiV1NPMiBPcGVuIEJhbmtpbmcgVFBQMiBmb3IgdGVzdGluZyIsInNvZnR3YXJlX3ZlcnNpb24iOjEuNSwic29mdHdhcmVfY2xpZW50X3VyaSI6Imh0dHBzOi8vd3d3Lm1vY2tjb21wYW55LmNvbS9yZWRpcmVjdHMvcmVkaXJlY3QxIiwic29mdHdhcmVfcmVkaXJlY3RfdXJpcyI6WyJodHRwczovL3d3dy5tb2NrY29tcGFueS5jb20vcmVkaXJlY3RzL3JlZGlyZWN0MSJdLCJzb2Z0d2FyZV9yb2xlcyI6WyJQSVNQIiwiQUlTUCIsIkNCUElJIl0sIm9yZ2FuaXNhdGlvbl9jb21wZXRlbnRfYXV0aG9yaXR5X2NsYWltcyI6eyJhdXRob3JpdHlfaWQiOiJPQkdCUiIsInJlZ2lzdHJhdGlvbl9pZCI6IlVua25vd24wMDE1ODAwMDAxSFFRclpBQVgiLCJzdGF0dXMiOiJBY3RpdmUiLCJhdXRob3Jpc2F0aW9ucyI6W3sibWVtYmVyX3N0YXRlIjoiR0IiLCJyb2xlcyI6WyJQSVNQIiwiQUlTUCIsIkNCUElJIl19LHsibWVtYmVyX3N0YXRlIjoiSUUiLCJyb2xlcyI6WyJQSVNQIiwiQ0JQSUkiLCJBSVNQIl19LHsibWVtYmVyX3N0YXRlIjoiTkwiLCJyb2xlcyI6WyJQSVNQIiwiQUlTUCIsIkNCUElJIl19XX0sInNvZnR3YXJlX2xvZ29fdXJpIjoiaHR0cHM6Ly93c28yLmNvbS93c28yLmpwZyIsIm9yZ19zdGF0dXMiOiJBY3RpdmUiLCJvcmdfaWQiOiIwMDE1ODAwMDAxSFFRclpBQVgiLCJvcmdfbmFtZSI6IldTTzIgKFVLKSBMSU1JVEVEIiwib3JnX2NvbnRhY3RzIjpbeyJuYW1lIjoiVGVjaG5pY2FsIiwiZW1haWwiOiJ0ZXN0QHdzbzIuY29tIiwicGhvbmUiOiIrOTQwMDAwMDAwMDAiLCJ0eXBlIjoiVGVjaG5pY2FsIn0seyJuYW1lIjoiQnVzaW5lc3MiLCJlbWFpbCI6InRlc3RAd3NvMi5jb20iLCJwaG9uZSI6Iis5NDAwMDAwMDAwMCIsInR5cGUiOiJCdXNpbmVzcyJ9XSwib3JnX2p3a3NfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMUhRUXJaQUFYLzAwMTU4MDAwMDFIUVFyWkFBWC5qd2tzIiwib3JnX2p3a3NfcmV2b2tlZF9lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxSFFRclpBQVgvcmV2b2tlZC8wMDE1ODAwMDAxSFFRclpBQVguandrcyIsInNvZnR3YXJlX2p3a3NfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMUhRUXJaQUFYL29RNEtvYWF2cE91b0U3cnZRc1pFT1YuandrcyIsInNvZnR3YXJlX2p3a3NfcmV2b2tlZF9lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxSFFRclpBQVgvcmV2b2tlZC9vUTRLb2FhdnBPdW9FN3J2UXNaRU9WLmp3a3MiLCJzb2Z0d2FyZV9wb2xpY3lfdXJpIjoiaHR0cHM6Ly93c28yLmNvbSIsInNvZnR3YXJlX3Rvc191cmkiOiJodHRwczovL3dzbzIuY29tIiwic29mdHdhcmVfb25fYmVoYWxmX29mX29yZyI6IldTTzIgT3BlbiBCYW5raW5nIn0.S23OePFDgyQJkfPDgMxs2BRgMZxbmKuRSDSOXCgqYmvKLbSPV1XJIprcGNog-iyLrQGOAmnDoYUQ5luSbbo1qB5C-qArkwY36FeSA3r4ZSIUXG0Ft_T-Et2swm6VSHWGJkgiWpShBIx5ARGmHTen352DxJEMtTpcp5-Ey2orfbPLlNFYnMxHXyf_kBUOEUZLmSPylVkiKPZnwbzSXz6VTvyb2CxTmr5bKf0d4gIp5J8y_lUo05Szq4bc0S_x-l8QxJna8QdnIOYr_FgCTN5-esVJV_T8Pyf2gHYLI01zTZE5BacCjeSxYW4JCJ1OTKQ7iz27cTJLtWd_e2gXnz0LgQ"
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
      "iat": 1694075713,
      "jti": "36b5dfe0205c4060",
      "software_environment": "sandbox",
      "software_mode": "Test",
      "software_id": "S6u2He4jywvyypT7fGYExLSypQYa",
      "software_client_id": "S6u2He4jywvyypT7fGYExLSypQYa",
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
   "client_id":"S6u2He4jywvyypT7fGYExLSypQYa",
   "client_id_issued_at":"1694075713",
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
      "software_statement":"eyJhbGciOiJQUzI1NiIsImtpZCI6ImgzWkNGMFZyemdYZ25IQ3FiSGJLWHp6ZmpUZyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJPcGVuQmFua2luZyBMdGQiLCJpYXQiOjE2OTQwNzU3MTMsImp0aSI6IjM2YjVkZmUwMjA1YzQwNjAiLCJzb2Z0d2FyZV9lbnZpcm9ubWVudCI6InNhbmRib3giLCJzb2Z0d2FyZV9tb2RlIjoiVGVzdCIsInNvZnR3YXJlX2lkIjoiUzZ1MkhlNGp5d3Z5eXBUN2ZHWUV4TFN5cFFZYSIsInNvZnR3YXJlX2NsaWVudF9pZCI6IlM2dTJIZTRqeXd2eXlwVDdmR1lFeExTeXBRWWEiLCJzb2Z0d2FyZV9jbGllbnRfbmFtZSI6IldTTzIgT3BlbiBCYW5raW5nIFRQUDIgKFNhbmRib3gpIiwic29mdHdhcmVfY2xpZW50X2Rlc2NyaXB0aW9uIjoiV1NPMiBPcGVuIEJhbmtpbmcgVFBQMiBmb3IgdGVzdGluZyIsInNvZnR3YXJlX3ZlcnNpb24iOjEuNSwic29mdHdhcmVfY2xpZW50X3VyaSI6Imh0dHBzOi8vd3d3Lm1vY2tjb21wYW55LmNvbS9yZWRpcmVjdHMvcmVkaXJlY3QxIiwic29mdHdhcmVfcmVkaXJlY3RfdXJpcyI6WyJodHRwczovL3d3dy5tb2NrY29tcGFueS5jb20vcmVkaXJlY3RzL3JlZGlyZWN0MSJdLCJzb2Z0d2FyZV9yb2xlcyI6WyJQSVNQIiwiQUlTUCIsIkNCUElJIl0sIm9yZ2FuaXNhdGlvbl9jb21wZXRlbnRfYXV0aG9yaXR5X2NsYWltcyI6eyJhdXRob3JpdHlfaWQiOiJPQkdCUiIsInJlZ2lzdHJhdGlvbl9pZCI6IlVua25vd24wMDE1ODAwMDAxSFFRclpBQVgiLCJzdGF0dXMiOiJBY3RpdmUiLCJhdXRob3Jpc2F0aW9ucyI6W3sibWVtYmVyX3N0YXRlIjoiR0IiLCJyb2xlcyI6WyJQSVNQIiwiQUlTUCIsIkNCUElJIl19LHsibWVtYmVyX3N0YXRlIjoiSUUiLCJyb2xlcyI6WyJQSVNQIiwiQ0JQSUkiLCJBSVNQIl19LHsibWVtYmVyX3N0YXRlIjoiTkwiLCJyb2xlcyI6WyJQSVNQIiwiQUlTUCIsIkNCUElJIl19XX0sInNvZnR3YXJlX2xvZ29fdXJpIjoiaHR0cHM6Ly93c28yLmNvbS93c28yLmpwZyIsIm9yZ19zdGF0dXMiOiJBY3RpdmUiLCJvcmdfaWQiOiIwMDE1ODAwMDAxSFFRclpBQVgiLCJvcmdfbmFtZSI6IldTTzIgKFVLKSBMSU1JVEVEIiwib3JnX2NvbnRhY3RzIjpbeyJuYW1lIjoiVGVjaG5pY2FsIiwiZW1haWwiOiJ0ZXN0QHdzbzIuY29tIiwicGhvbmUiOiIrOTQwMDAwMDAwMDAiLCJ0eXBlIjoiVGVjaG5pY2FsIn0seyJuYW1lIjoiQnVzaW5lc3MiLCJlbWFpbCI6InRlc3RAd3NvMi5jb20iLCJwaG9uZSI6Iis5NDAwMDAwMDAwMCIsInR5cGUiOiJCdXNpbmVzcyJ9XSwib3JnX2p3a3NfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMUhRUXJaQUFYLzAwMTU4MDAwMDFIUVFyWkFBWC5qd2tzIiwib3JnX2p3a3NfcmV2b2tlZF9lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxSFFRclpBQVgvcmV2b2tlZC8wMDE1ODAwMDAxSFFRclpBQVguandrcyIsInNvZnR3YXJlX2p3a3NfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMUhRUXJaQUFYL29RNEtvYWF2cE91b0U3cnZRc1pFT1YuandrcyIsInNvZnR3YXJlX2p3a3NfcmV2b2tlZF9lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxSFFRclpBQVgvcmV2b2tlZC9vUTRLb2FhdnBPdW9FN3J2UXNaRU9WLmp3a3MiLCJzb2Z0d2FyZV9wb2xpY3lfdXJpIjoiaHR0cHM6Ly93c28yLmNvbSIsInNvZnR3YXJlX3Rvc191cmkiOiJodHRwczovL3dzbzIuY29tIiwic29mdHdhcmVfb25fYmVoYWxmX29mX29yZyI6IldTTzIgT3BlbiBCYW5raW5nIn0.S23OePFDgyQJkfPDgMxs2BRgMZxbmKuRSDSOXCgqYmvKLbSPV1XJIprcGNog-iyLrQGOAmnDoYUQ5luSbbo1qB5C-qArkwY36FeSA3r4ZSIUXG0Ft_T-Et2swm6VSHWGJkgiWpShBIx5ARGmHTen352DxJEMtTpcp5-Ey2orfbPLlNFYnMxHXyf_kBUOEUZLmSPylVkiKPZnwbzSXz6VTvyb2CxTmr5bKf0d4gIp5J8y_lUo05Szq4bc0S_x-l8QxJna8QdnIOYr_FgCTN5-esVJV_T8Pyf2gHYLI01zTZE5BacCjeSxYW4JCJ1OTKQ7iz27cTJLtWd_e2gXnz0LgQ"
}

```

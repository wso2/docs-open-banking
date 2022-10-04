This page explains how to onboard API consumers using the Dynamic Client Registration API. 

!!! tip "Before you begin..."
    1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
    
    2. Configure the jwks endpoints by following the sample given below. These endpoints are used for validating the SSA signature. 
    ```toml
    [open_banking.dcr]
    jwks_url_sandbox = "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/0015800001HQQrZAAX.jwks"
    jwks_url_production = "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/0015800001HQQrZAAX.jwks"
    ```   
    
    3. Restart the Identity Server.

    4. If you are using an **API Manager at U2 level 4.0.0.102 or above**, disable the Resident Key Manager:
        1. Open the `<APIM-HOME>/repository/conf/deployment.toml` file.
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

        3. Restart the API Manager.

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
 -d 'eyJ0eXAiOiJKV1QiLCJhbGciOiJQUzI1NiIsImtpZCI6Inc3TkZlTU9EekNNT1plbl9XRUNBbEc5TjhnZyJ9.eyJpc3MiOiJvUTRLb2FhdnBPdW9FN3J2UXNaRU9WMyIsImlhdCI6MTU3MTgwODE2NywiZXhwIjoyMTQ3NDgzNjQ2LCJqdGkiOiIzNzc0N2NkMWMxMDU0NTY5OWY3NTRhZGYyOGI3M2UzMSIsImF1ZCI6Imh0dHBzOi8vc2VjdXJlLmFwaS5kYXRhaG9sZGVyLmNvbS9pc3N1ZXIiLCJyZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vd3d3Lm1vY2tjb21wYW55LmNvbS9yZWRpcmVjdHMvcmVkaXJlY3QxIiwiaHR0cHM6Ly93d3cubW9ja2NvbXBhbnkuY29tL3JlZGlyZWN0cy9yZWRpcmVjdDIiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9zaWduaW5nX2FsZyI6IlBTMjU2IiwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJwcml2YXRlX2tleV9qd3QiLCJncmFudF90eXBlcyI6WyJjbGllbnRfY3JlZGVudGlhbHMiLCJhdXRob3JpemF0aW9uX2NvZGUiLCJyZWZyZXNoX3Rva2VuIiwidXJuOmlldGY6cGFyYW1zOm9hdXRoOmdyYW50LXR5cGU6and0LWJlYXJlciJdLCJyZXNwb25zZV90eXBlcyI6WyJjb2RlIGlkX3Rva2VuIl0sImFwcGxpY2F0aW9uX3R5cGUiOiJ3ZWIiLCJpZF90b2tlbl9zaWduZWRfcmVzcG9uc2VfYWxnIjoiUFMyNTYiLCJpZF90b2tlbl9lbmNyeXB0ZWRfcmVzcG9uc2VfYWxnIjoiUlNBLU9BRVAiLCJpZF90b2tlbl9lbmNyeXB0ZWRfcmVzcG9uc2VfZW5jIjoiQTI1NkdDTSIsInJlcXVlc3Rfb2JqZWN0X3NpZ25pbmdfYWxnIjoiUFMyNTYiLCJzY29wZSI6Im9wZW5pZCBhY2NvdW50cyBwYXltZW50cyIsInNvZnR3YXJlX3N0YXRlbWVudCI6ImV5SmhiR2NpT2lKUVV6STFOaUlzSW10cFpDSTZJbmMzVGtabFRVOUVla05OVDFwbGJsOVhSVU5CYkVjNVRqaG5aeUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwYzNNaU9pSlBjR1Z1UW1GdWEybHVaeUJNZEdRaUxDSnBZWFFpT2pFMk5EYzBNRFU1TkRBc0ltcDBhU0k2SWpNMllqVmtabVV3TWpBMVl6UXdOakFpTENKemIyWjBkMkZ5WlY5bGJuWnBjbTl1YldWdWRDSTZJbk5oYm1SaWIzZ2lMQ0p6YjJaMGQyRnlaVjl0YjJSbElqb2lWR1Z6ZENJc0luTnZablIzWVhKbFgybGtJam9pYjFFMFMyOWhZWFp3VDNWdlJUZHlkbEZ6V2tWUFZqTWlMQ0p6YjJaMGQyRnlaVjlqYkdsbGJuUmZhV1FpT2lKdlVUUkxiMkZoZG5CUGRXOUZOM0oyVVhOYVJVOVdNeUlzSW5OdlpuUjNZWEpsWDJOc2FXVnVkRjl1WVcxbElqb2lWMU5QTWlCUGNHVnVJRUpoYm10cGJtY2dWRkJRTWlBb1UyRnVaR0p2ZUNraUxDSnpiMlowZDJGeVpWOWpiR2xsYm5SZlpHVnpZM0pwY0hScGIyNGlPaUpYVTA4eUlFOXdaVzRnUW1GdWEybHVaeUJVVUZBeUlHWnZjaUIwWlhOMGFXNW5JaXdpYzI5bWRIZGhjbVZmZG1WeWMybHZiaUk2TVM0MUxDSnpiMlowZDJGeVpWOWpiR2xsYm5SZmRYSnBJam9pYUhSMGNITTZMeTkzZDNjdWJXOWphMk52YlhCaGJua3VZMjl0TDNKbFpHbHlaV04wY3k5eVpXUnBjbVZqZERFaUxDSnpiMlowZDJGeVpWOXlaV1JwY21WamRGOTFjbWx6SWpwYkltaDBkSEJ6T2k4dmQzZDNMbTF2WTJ0amIyMXdZVzU1TG1OdmJTOXlaV1JwY21WamRITXZjbVZrYVhKbFkzUXhJbDBzSW5OdlpuUjNZWEpsWDNKdmJHVnpJanBiSWxCSlUxQWlMQ0pCU1ZOUUlpd2lRMEpRU1VraVhTd2liM0puWVc1cGMyRjBhVzl1WDJOdmJYQmxkR1Z1ZEY5aGRYUm9iM0pwZEhsZlkyeGhhVzF6SWpwN0ltRjFkR2h2Y21sMGVWOXBaQ0k2SWs5Q1IwSlNJaXdpY21WbmFYTjBjbUYwYVc5dVgybGtJam9pVlc1cmJtOTNiakF3TVRVNE1EQXdNREZJVVZGeVdrRkJXQ0lzSW5OMFlYUjFjeUk2SWtGamRHbDJaU0lzSW1GMWRHaHZjbWx6WVhScGIyNXpJanBiZXlKdFpXMWlaWEpmYzNSaGRHVWlPaUpIUWlJc0luSnZiR1Z6SWpwYklsQkpVMUFpTENKQlNWTlFJaXdpUTBKUVNVa2lYWDBzZXlKdFpXMWlaWEpmYzNSaGRHVWlPaUpKUlNJc0luSnZiR1Z6SWpwYklsQkpVMUFpTENKRFFsQkpTU0lzSWtGSlUxQWlYWDBzZXlKdFpXMWlaWEpmYzNSaGRHVWlPaUpPVENJc0luSnZiR1Z6SWpwYklsQkpVMUFpTENKQlNWTlFJaXdpUTBKUVNVa2lYWDFkZlN3aWMyOW1kSGRoY21WZmJHOW5iMTkxY21raU9pSm9kSFJ3Y3pvdkwzZHpiekl1WTI5dEwzZHpiekl1YW5Cbklpd2liM0puWDNOMFlYUjFjeUk2SWtGamRHbDJaU0lzSW05eVoxOXBaQ0k2SWpBd01UVTRNREF3TURGSVVWRnlXa0ZCV0NJc0ltOXlaMTl1WVcxbElqb2lWMU5QTWlBb1ZVc3BJRXhKVFVsVVJVUWlMQ0p2Y21kZlkyOXVkR0ZqZEhNaU9sdDdJbTVoYldVaU9pSlVaV05vYm1sallXd2lMQ0psYldGcGJDSTZJblJsYzNSQWQzTnZNaTVqYjIwaUxDSndhRzl1WlNJNklpczVOREF3TURBd01EQXdNQ0lzSW5SNWNHVWlPaUpVWldOb2JtbGpZV3dpZlN4N0ltNWhiV1VpT2lKQ2RYTnBibVZ6Y3lJc0ltVnRZV2xzSWpvaWRHVnpkRUIzYzI4eUxtTnZiU0lzSW5Cb2IyNWxJam9pS3prME1EQXdNREF3TURBd0lpd2lkSGx3WlNJNklrSjFjMmx1WlhOekluMWRMQ0p2Y21kZmFuZHJjMTlsYm1Sd2IybHVkQ0k2SW1oMGRIQnpPaTh2YTJWNWMzUnZjbVV1YjNCbGJtSmhibXRwYm1kMFpYTjBMbTl5Wnk1MWF5OHdNREUxT0RBd01EQXhTRkZSY2xwQlFWZ3ZNREF4TlRnd01EQXdNVWhSVVhKYVFVRllMbXAzYTNNaUxDSnZjbWRmYW5kcmMxOXlaWFp2YTJWa1gyVnVaSEJ2YVc1MElqb2lhSFIwY0hNNkx5OXJaWGx6ZEc5eVpTNXZjR1Z1WW1GdWEybHVaM1JsYzNRdWIzSm5MblZyTHpBd01UVTRNREF3TURGSVVWRnlXa0ZCV0M5eVpYWnZhMlZrTHpBd01UVTRNREF3TURGSVVWRnlXa0ZCV0M1cWQydHpJaXdpYzI5bWRIZGhjbVZmYW5kcmMxOWxibVJ3YjJsdWRDSTZJbWgwZEhCek9pOHZhMlY1YzNSdmNtVXViM0JsYm1KaGJtdHBibWQwWlhOMExtOXlaeTUxYXk4d01ERTFPREF3TURBeFNGRlJjbHBCUVZndmIxRTBTMjloWVhad1QzVnZSVGR5ZGxGeldrVlBWaTVxZDJ0eklpd2ljMjltZEhkaGNtVmZhbmRyYzE5eVpYWnZhMlZrWDJWdVpIQnZhVzUwSWpvaWFIUjBjSE02THk5clpYbHpkRzl5WlM1dmNHVnVZbUZ1YTJsdVozUmxjM1F1YjNKbkxuVnJMekF3TVRVNE1EQXdNREZJVVZGeVdrRkJXQzl5WlhadmEyVmtMMjlSTkV0dllXRjJjRTkxYjBVM2NuWlJjMXBGVDFZdWFuZHJjeUlzSW5OdlpuUjNZWEpsWDNCdmJHbGplVjkxY21raU9pSm9kSFJ3Y3pvdkwzZHpiekl1WTI5dElpd2ljMjltZEhkaGNtVmZkRzl6WDNWeWFTSTZJbWgwZEhCek9pOHZkM052TWk1amIyMGlMQ0p6YjJaMGQyRnlaVjl2Ymw5aVpXaGhiR1pmYjJaZmIzSm5Jam9pVjFOUE1pQlBjR1Z1SUVKaGJtdHBibWNpZlEuV1E1N0JoVG1iNmp1a0U3QllEcWgyNGRQNmRNdVJ1ZTFsSlpnZUlYdUZjREtsTlo3a0ZfWW9pZmkyS3BJeHFCbEs3WmhzY3VhVFhqbS1wb01USkVMekFXaW43V3NrWElHRTBlUm5CV1VSLWVmeURkeC1tN0RYM1ZTTTdaUl95WENXeUg5QUpZeXB1MW0yMmtYejBTaVg4cWRYREVjQXlnRHVEZ1pNOElZYnBLWlRGWF91aUtpc3Iza1ZCbThKZFJkOTJPclZTNWFDT3pjN1ZWelVNbThSTk45NDB2QVVhbnNLckoyWDFKT2F5SjJVVEI2clN2Um1rejVrTXdLWXN4cG9oY2h6eWZDcFEwTUJMVEZTZWdkamtTeWxBOWF4ZWdnVXNVQ0NjOVRybHlfUGhqdldVRFRFb0txQW9ibUVsaVlZX3EtSzVEUFR0VTdwM0FxcHMtQXBnIn0.joUbfQEzFTi4imRFP-NWuK2ue0k_eJ9jESY0EJarS3JgbWgARdxmg4mMHMTB6d6AWJHfU1JjAyAIp9A8W4saVFwHqnIGJBrXzs0_fTnOuL8ZxtOL-sHEIcv5KTKK4miq4YqCE-l1bppku9TiP7aMMSU9kLxdwgrQgsKL36TIaQPl0emDaxsZ-acCgVcbRG2g2vT5I5ERW3OzLF41JF16LzkS9x74eAE_BdKtqJJYy_ICHUFGrnxSKIQ_Xmc9rWLVRGIFrObPOSmojZP4yYBpBT5GU9GM2Au0OewmO4ReZJKlWNQudosZqsXxy2JS5pl05pMcvsNNUA5XPz4J-bhR8Q' 
```

The payload is a signed JWT.

??? tip "Click here to see the decoded format of the payload..."

    ```
    {
      "typ": "JWT",
      "alg": "PS256",
      "kid": "w7NFeMODzCMOZen_WECAlG9N8gg"
    }

    {
      "iss": "oQ4KoaavpOuoE7rvQsZEOV3",
      "iat": 1571808167,
      "exp": 2147483646,
      "jti": "37747cd1c10545699f754adf28b73e31",
      "aud": "https://secure.api.dataholder.com/issuer",
      "redirect_uris": [
        "https://www.mockcompany.com/redirects/redirect1",
        "https://www.mockcompany.com/redirects/redirect2"
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
      "software_statement": "eyJhbGciOiJQUzI1NiIsImtpZCI6Inc3TkZlTU9EekNNT1plbl9XRUNBbEc5TjhnZyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJPcGVuQmFua2luZyBMdGQiLCJpYXQiOjE2NDc0MDU5NDAsImp0aSI6IjM2YjVkZmUwMjA1YzQwNjAiLCJzb2Z0d2FyZV9lbnZpcm9ubWVudCI6InNhbmRib3giLCJzb2Z0d2FyZV9tb2RlIjoiVGVzdCIsInNvZnR3YXJlX2lkIjoib1E0S29hYXZwT3VvRTdydlFzWkVPVjMiLCJzb2Z0d2FyZV9jbGllbnRfaWQiOiJvUTRLb2FhdnBPdW9FN3J2UXNaRU9WMyIsInNvZnR3YXJlX2NsaWVudF9uYW1lIjoiV1NPMiBPcGVuIEJhbmtpbmcgVFBQMiAoU2FuZGJveCkiLCJzb2Z0d2FyZV9jbGllbnRfZGVzY3JpcHRpb24iOiJXU08yIE9wZW4gQmFua2luZyBUUFAyIGZvciB0ZXN0aW5nIiwic29mdHdhcmVfdmVyc2lvbiI6MS41LCJzb2Z0d2FyZV9jbGllbnRfdXJpIjoiaHR0cHM6Ly93d3cubW9ja2NvbXBhbnkuY29tL3JlZGlyZWN0cy9yZWRpcmVjdDEiLCJzb2Z0d2FyZV9yZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vd3d3Lm1vY2tjb21wYW55LmNvbS9yZWRpcmVjdHMvcmVkaXJlY3QxIl0sInNvZnR3YXJlX3JvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXSwib3JnYW5pc2F0aW9uX2NvbXBldGVudF9hdXRob3JpdHlfY2xhaW1zIjp7ImF1dGhvcml0eV9pZCI6Ik9CR0JSIiwicmVnaXN0cmF0aW9uX2lkIjoiVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWCIsInN0YXR1cyI6IkFjdGl2ZSIsImF1dGhvcmlzYXRpb25zIjpbeyJtZW1iZXJfc3RhdGUiOiJHQiIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX0seyJtZW1iZXJfc3RhdGUiOiJJRSIsInJvbGVzIjpbIlBJU1AiLCJDQlBJSSIsIkFJU1AiXX0seyJtZW1iZXJfc3RhdGUiOiJOTCIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX1dfSwic29mdHdhcmVfbG9nb191cmkiOiJodHRwczovL3dzbzIuY29tL3dzbzIuanBnIiwib3JnX3N0YXR1cyI6IkFjdGl2ZSIsIm9yZ19pZCI6IjAwMTU4MDAwMDFIUVFyWkFBWCIsIm9yZ19uYW1lIjoiV1NPMiAoVUspIExJTUlURUQiLCJvcmdfY29udGFjdHMiOlt7Im5hbWUiOiJUZWNobmljYWwiLCJlbWFpbCI6InRlc3RAd3NvMi5jb20iLCJwaG9uZSI6Iis5NDAwMDAwMDAwMCIsInR5cGUiOiJUZWNobmljYWwifSx7Im5hbWUiOiJCdXNpbmVzcyIsImVtYWlsIjoidGVzdEB3c28yLmNvbSIsInBob25lIjoiKzk0MDAwMDAwMDAwIiwidHlwZSI6IkJ1c2luZXNzIn1dLCJvcmdfandrc19lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxSFFRclpBQVgvMDAxNTgwMDAwMUhRUXJaQUFYLmp3a3MiLCJvcmdfandrc19yZXZva2VkX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC9yZXZva2VkLzAwMTU4MDAwMDFIUVFyWkFBWC5qd2tzIiwic29mdHdhcmVfandrc19lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxSFFRclpBQVgvb1E0S29hYXZwT3VvRTdydlFzWkVPVi5qd2tzIiwic29mdHdhcmVfandrc19yZXZva2VkX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC9yZXZva2VkL29RNEtvYWF2cE91b0U3cnZRc1pFT1YuandrcyIsInNvZnR3YXJlX3BvbGljeV91cmkiOiJodHRwczovL3dzbzIuY29tIiwic29mdHdhcmVfdG9zX3VyaSI6Imh0dHBzOi8vd3NvMi5jb20iLCJzb2Z0d2FyZV9vbl9iZWhhbGZfb2Zfb3JnIjoiV1NPMiBPcGVuIEJhbmtpbmcifQ.WQ57BhTmb6jukE7BYDqh24dP6dMuRue1lJZgeIXuFcDKlNZ7kF_Yoifi2KpIxqBlK7ZhscuaTXjm-poMTJELzAWin7WskXIGE0eRnBWUR-efyDdx-m7DX3VSM7ZR_yXCWyH9AJYypu1m22kXz0SiX8qdXDEcAygDuDgZM8IYbpKZTFX_uiKisr3kVBm8JdRd92OrVS5aCOzc7VVzUMm8RNN940vAUansKrJ2X1JOayJ2UTB6rSvRmkz5kMwKYsxpohchzyfCpQ0MBLTFSegdjkSylA9axeggUsUCCc9Trly_PhjvWUDTEoKqAobmEliYY_q-K5DPTtU7p3Aqps-Apg"
   }

    <signature>
    ```

??? tip "Click here to see the decoded format of an SSA..."

    ```
    {
      "alg": "PS256",
      "kid": "w7NFeMODzCMOZen_WECAlG9N8gg",
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
      "https://www.mockcompany.com/redirects/redirect1",
      "https://www.mockcompany.com/redirects/redirect2"
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
      "software_statement":"eyJhbGciOiJQUzI1NiIsImtpZCI6Inc3TkZlTU9EekNNT1plbl9XRUNBbEc5TjhnZyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJPcGVuQmFua2luZyBMdGQiLCJpYXQiOjE2NDc0MDU5NDAsImp0aSI6IjM2YjVkZmUwMjA1YzQwNjAiLCJzb2Z0d2FyZV9lbnZpcm9ubWVudCI6InNhbmRib3giLCJzb2Z0d2FyZV9tb2RlIjoiVGVzdCIsInNvZnR3YXJlX2lkIjoib1E0S29hYXZwT3VvRTdydlFzWkVPVjMiLCJzb2Z0d2FyZV9jbGllbnRfaWQiOiJvUTRLb2FhdnBPdW9FN3J2UXNaRU9WMyIsInNvZnR3YXJlX2NsaWVudF9uYW1lIjoiV1NPMiBPcGVuIEJhbmtpbmcgVFBQMiAoU2FuZGJveCkiLCJzb2Z0d2FyZV9jbGllbnRfZGVzY3JpcHRpb24iOiJXU08yIE9wZW4gQmFua2luZyBUUFAyIGZvciB0ZXN0aW5nIiwic29mdHdhcmVfdmVyc2lvbiI6MS41LCJzb2Z0d2FyZV9jbGllbnRfdXJpIjoiaHR0cHM6Ly93d3cubW9ja2NvbXBhbnkuY29tL3JlZGlyZWN0cy9yZWRpcmVjdDEiLCJzb2Z0d2FyZV9yZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vd3d3Lm1vY2tjb21wYW55LmNvbS9yZWRpcmVjdHMvcmVkaXJlY3QxIl0sInNvZnR3YXJlX3JvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXSwib3JnYW5pc2F0aW9uX2NvbXBldGVudF9hdXRob3JpdHlfY2xhaW1zIjp7ImF1dGhvcml0eV9pZCI6Ik9CR0JSIiwicmVnaXN0cmF0aW9uX2lkIjoiVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWCIsInN0YXR1cyI6IkFjdGl2ZSIsImF1dGhvcmlzYXRpb25zIjpbeyJtZW1iZXJfc3RhdGUiOiJHQiIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX0seyJtZW1iZXJfc3RhdGUiOiJJRSIsInJvbGVzIjpbIlBJU1AiLCJDQlBJSSIsIkFJU1AiXX0seyJtZW1iZXJfc3RhdGUiOiJOTCIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX1dfSwic29mdHdhcmVfbG9nb191cmkiOiJodHRwczovL3dzbzIuY29tL3dzbzIuanBnIiwib3JnX3N0YXR1cyI6IkFjdGl2ZSIsIm9yZ19pZCI6IjAwMTU4MDAwMDFIUVFyWkFBWCIsIm9yZ19uYW1lIjoiV1NPMiAoVUspIExJTUlURUQiLCJvcmdfY29udGFjdHMiOlt7Im5hbWUiOiJUZWNobmljYWwiLCJlbWFpbCI6InRlc3RAd3NvMi5jb20iLCJwaG9uZSI6Iis5NDAwMDAwMDAwMCIsInR5cGUiOiJUZWNobmljYWwifSx7Im5hbWUiOiJCdXNpbmVzcyIsImVtYWlsIjoidGVzdEB3c28yLmNvbSIsInBob25lIjoiKzk0MDAwMDAwMDAwIiwidHlwZSI6IkJ1c2luZXNzIn1dLCJvcmdfandrc19lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxSFFRclpBQVgvMDAxNTgwMDAwMUhRUXJaQUFYLmp3a3MiLCJvcmdfandrc19yZXZva2VkX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC9yZXZva2VkLzAwMTU4MDAwMDFIUVFyWkFBWC5qd2tzIiwic29mdHdhcmVfandrc19lbmRwb2ludCI6Imh0dHBzOi8va2V5c3RvcmUub3BlbmJhbmtpbmd0ZXN0Lm9yZy51ay8wMDE1ODAwMDAxSFFRclpBQVgvb1E0S29hYXZwT3VvRTdydlFzWkVPVi5qd2tzIiwic29mdHdhcmVfandrc19yZXZva2VkX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC9yZXZva2VkL29RNEtvYWF2cE91b0U3cnZRc1pFT1YuandrcyIsInNvZnR3YXJlX3BvbGljeV91cmkiOiJodHRwczovL3dzbzIuY29tIiwic29mdHdhcmVfdG9zX3VyaSI6Imh0dHBzOi8vd3NvMi5jb20iLCJzb2Z0d2FyZV9vbl9iZWhhbGZfb2Zfb3JnIjoiV1NPMiBPcGVuIEJhbmtpbmcifQ.WQ57BhTmb6jukE7BYDq* 
h24dP6dMuRue1lJZgeIXuFcDKlNZ7kF_Yoifi2KpIxqBlK7ZhscuaTXjm-poMTJELzAWin7WskXIGE0eRnBWUR-efyDdx-m7DX3VSM7ZR_yXCWyH9AJYypu1m22kXz0SiX8qdXDEcAygDuDgZM8IYbpKZTFX_uiKisr3kVBm8JdRd92OrVS5aCOzc7VVzUMm8RNN940vAUansKrJ2X1JOayJ2UTB6rSvRmkz5kMwKYsxpohchzyfCpQ0MBLTFSegdjkSylA9axeggUsUCCc9Trly_PhjvWUDTEoKqAobmEliYY_q-K5DPTtU7p3Aqps-Apg"
}

```

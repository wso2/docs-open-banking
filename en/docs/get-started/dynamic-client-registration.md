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
 -d 'eyJ0eXAiOiJKV1QiLCJhbGciOiJQUzI1NiIsImtpZCI6ImNJWW8tNXpYNE9UV1pwSHJtbWlaRFZ4QUNKTSJ9.eyJpc3MiOiJvUTRLb2FhdnBPdW9FN3J2UXNaRU9WIiwiaWF0IjoxNjk0MDc1NzEzLCJleHAiOjIxNDc0ODM2NDYsImp0aSI6IjM3NzQ3Y2QxYzEwNTQ1Njk5Zjc1NGFkZjI4YjczZTMyIiwiYXVkIjoiaHR0cHM6Ly9zZWN1cmUuYXBpLmRhdGFob2xkZXIuY29tL2lzc3VlciIsInJlZGlyZWN0X3VyaXMiOlsiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9yZWRpcmVjdHMvcmVkaXJlY3QxIl0sInRva2VuX2VuZHBvaW50X2F1dGhfc2lnbmluZ19hbGciOiJQUzI1NiIsInRva2VuX2VuZHBvaW50X2F1dGhfbWV0aG9kIjoicHJpdmF0ZV9rZXlfand0IiwiZ3JhbnRfdHlwZXMiOlsiY2xpZW50X2NyZWRlbnRpYWxzIiwiYXV0aG9yaXphdGlvbl9jb2RlIiwicmVmcmVzaF90b2tlbiIsInVybjppZXRmOnBhcmFtczpvYXV0aDpncmFudC10eXBlOmp3dC1iZWFyZXIiXSwicmVzcG9uc2VfdHlwZXMiOlsiY29kZSBpZF90b2tlbiJdLCJhcHBsaWNhdGlvbl90eXBlIjoid2ViIiwiaWRfdG9rZW5fc2lnbmVkX3Jlc3BvbnNlX2FsZyI6IlBTMjU2IiwiaWRfdG9rZW5fZW5jcnlwdGVkX3Jlc3BvbnNlX2FsZyI6IlJTQS1PQUVQIiwiaWRfdG9rZW5fZW5jcnlwdGVkX3Jlc3BvbnNlX2VuYyI6IkEyNTZHQ00iLCJyZXF1ZXN0X29iamVjdF9zaWduaW5nX2FsZyI6IlBTMjU2Iiwic2NvcGUiOiJvcGVuaWQgYWNjb3VudHMgcGF5bWVudHMiLCJzb2Z0d2FyZV9zdGF0ZW1lbnQiOiJleUpoYkdjaU9pSlFVekkxTmlJc0ltdHBaQ0k2SW1OSldXOHROWHBZTkU5VVYxcHdTSEp0YldsYVJGWjRRVU5LVFNJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcGMzTWlPaUpQY0dWdVFtRnVhMmx1WnlCTWRHUWlMQ0pwWVhRaU9qRTNNVFk1TlRVMk1UTXNJbXAwYVNJNkltSmhNMkpoWmpOak9EUTNNalExWm1FaUxDSnpiMlowZDJGeVpWOWxiblpwY205dWJXVnVkQ0k2SW5OaGJtUmliM2dpTENKemIyWjBkMkZ5WlY5dGIyUmxJam9pVkdWemRDSXNJbk52Wm5SM1lYSmxYMmxrSWpvaWIxRTBTMjloWVhad1QzVnZSVGR5ZGxGeldrVlBWaUlzSW5OdlpuUjNZWEpsWDJOc2FXVnVkRjlwWkNJNkltOVJORXR2WVdGMmNFOTFiMFUzY25aUmMxcEZUMVlpTENKemIyWjBkMkZ5WlY5amJHbGxiblJmYm1GdFpTSTZJbGRUVHpJZ1QzQmxiaUJDWVc1cmFXNW5JRlJRVURJZ0tGTmhibVJpYjNncElpd2ljMjltZEhkaGNtVmZZMnhwWlc1MFgyUmxjMk55YVhCMGFXOXVJam9pVjFOUE1pQlBjR1Z1SUVKaGJtdHBibWNnVkZCUU1pQm1iM0lnZEdWemRHbHVaeUlzSW5OdlpuUjNZWEpsWDNabGNuTnBiMjRpT2lJeExqVWlMQ0p6YjJaMGQyRnlaVjlqYkdsbGJuUmZkWEpwSWpvaWFIUjBjSE02THk5M2QzY3VaMjl2WjJ4bExtTnZiU0lzSW5OdlpuUjNZWEpsWDNKbFpHbHlaV04wWDNWeWFYTWlPbHNpYUhSMGNITTZMeTkzZDNjdVoyOXZaMnhsTG1OdmJTOXlaV1JwY21WamRITXZjbVZrYVhKbFkzUXhJbDBzSW5OdlpuUjNZWEpsWDNKdmJHVnpJanBiSWxCSlUxQWlMQ0pCU1ZOUUlpd2lRMEpRU1VraVhTd2liM0puWVc1cGMyRjBhVzl1WDJOdmJYQmxkR1Z1ZEY5aGRYUm9iM0pwZEhsZlkyeGhhVzF6SWpwN0ltRjFkR2h2Y21sMGVWOXBaQ0k2SWs5Q1IwSlNJaXdpY21WbmFYTjBjbUYwYVc5dVgybGtJam9pVlc1cmJtOTNiakF3TVRVNE1EQXdNREZJVVZGeVdrRkJXQ0lzSW5OMFlYUjFjeUk2SWtGamRHbDJaU0lzSW1GMWRHaHZjbWx6WVhScGIyNXpJanBiZXlKdFpXMWlaWEpmYzNSaGRHVWlPaUpIUWlJc0luSnZiR1Z6SWpwYklsQkpVMUFpTENKQlNWTlFJaXdpUTBKUVNVa2lYWDBzZXlKdFpXMWlaWEpmYzNSaGRHVWlPaUpKUlNJc0luSnZiR1Z6SWpwYklsQkpVMUFpTENKRFFsQkpTU0lzSWtGSlUxQWlYWDBzZXlKdFpXMWlaWEpmYzNSaGRHVWlPaUpPVENJc0luSnZiR1Z6SWpwYklsQkpVMUFpTENKQlNWTlFJaXdpUTBKUVNVa2lYWDFkZlN3aWMyOW1kSGRoY21WZmJHOW5iMTkxY21raU9pSm9kSFJ3Y3pvdkwzZDNkeTVuYjI5bmJHVXVZMjl0SWl3aWIzSm5YM04wWVhSMWN5STZJa0ZqZEdsMlpTSXNJbTl5WjE5cFpDSTZJakF3TVRVNE1EQXdNREZJVVZGeVdrRkJXQ0lzSW05eVoxOXVZVzFsSWpvaVYxTlBNaUFvVlVzcElFeEpUVWxVUlVRaUxDSnZjbWRmWTI5dWRHRmpkSE1pT2x0N0ltNWhiV1VpT2lKVVpXTm9ibWxqWVd3aUxDSmxiV0ZwYkNJNkluTmhZMmhwYm1selFIZHpiekl1WTI5dElpd2ljR2h2Ym1VaU9pSXJPVFEzTnpReU56UXpOelFpTENKMGVYQmxJam9pVkdWamFHNXBZMkZzSW4wc2V5SnVZVzFsSWpvaVFuVnphVzVsYzNNaUxDSmxiV0ZwYkNJNkluTmhZMmhwYm1selFIZHpiekl1WTI5dElpd2ljR2h2Ym1VaU9pSXJPVFEzTnpReU56UXpOelFpTENKMGVYQmxJam9pUW5WemFXNWxjM01pZlYwc0ltOXlaMTlxZDJ0elgyVnVaSEJ2YVc1MElqb2lhSFIwY0hNNkx5OXJaWGx6ZEc5eVpTNXZjR1Z1WW1GdWEybHVaM1JsYzNRdWIzSm5MblZyTHpBd01UVTRNREF3TURGSVVWRnlXa0ZCV0M4d01ERTFPREF3TURBeFNGRlJjbHBCUVZndWFuZHJjeUlzSW05eVoxOXFkMnR6WDNKbGRtOXJaV1JmWlc1a2NHOXBiblFpT2lKb2RIUndjem92TDJ0bGVYTjBiM0psTG05d1pXNWlZVzVyYVc1bmRHVnpkQzV2Y21jdWRXc3ZNREF4TlRnd01EQXdNVWhSVVhKYVFVRllMM0psZG05clpXUXZNREF4TlRnd01EQXdNVWhSVVhKYVFVRllMbXAzYTNNaUxDSnpiMlowZDJGeVpWOXFkMnR6WDJWdVpIQnZhVzUwSWpvaWFIUjBjSE02THk5clpYbHpkRzl5WlM1dmNHVnVZbUZ1YTJsdVozUmxjM1F1YjNKbkxuVnJMekF3TVRVNE1EQXdNREZJVVZGeVdrRkJXQzl2VVRSTGIyRmhkbkJQZFc5Rk4zSjJVWE5hUlU5V0xtcDNhM01pTENKemIyWjBkMkZ5WlY5cWQydHpYM0psZG05clpXUmZaVzVrY0c5cGJuUWlPaUpvZEhSd2N6b3ZMMnRsZVhOMGIzSmxMbTl3Wlc1aVlXNXJhVzVuZEdWemRDNXZjbWN1ZFdzdk1EQXhOVGd3TURBd01VaFJVWEphUVVGWUwzSmxkbTlyWldRdmIxRTBTMjloWVhad1QzVnZSVGR5ZGxGeldrVlBWaTVxZDJ0eklpd2ljMjltZEhkaGNtVmZjRzlzYVdONVgzVnlhU0k2SW1oMGRIQnpPaTh2ZDNkM0xtZHZiMmRzWlM1amIyMGlMQ0p6YjJaMGQyRnlaVjkwYjNOZmRYSnBJam9pYUhSMGNITTZMeTkzZDNjdVoyOXZaMnhsTG1OdmJTSXNJbk52Wm5SM1lYSmxYMjl1WDJKbGFHRnNabDl2Wmw5dmNtY2lPaUpYVTA4eUlFOXdaVzRnUW1GdWEybHVaeUo5LlZuZlhycHBHbUNjWUdXTGNtVDNnQjIycjI5N1ZjMHBwaWJMcmwwbXY4UEdrYjdvWkxFa0lxYUFkejlPQndGamVoRGlIbEl6T3JDek5nekpENUd2eWFjWlNpb3JGa3B6QnBiVjgwcS1uXy11RlR1Z0U3bXJDVm5OZlRzYjFTQkVkb1dDUm5fQmJ6SC1UMllzdHFMV1BoYl9mSGtEU0ZUR0plU25GR3AxRWNNWFZteDhQLXBDZ3NvVFMta1hFUERYRDdGNGlaalp3Y0ZmeERwZV9OOEZ2QVVDMjhsM1R6bTFhdTRiTGpySTBUOTRQVm9FSkVtQWs5QVVfc29tRnlfWEV2dUt1dVVMZmNjVzNDRFI2S0didlhWN01WUE5BNVhUVDVnX0g5YlJ4Y1BYNFphYVdmSWFSVmZaMjhkX1pDUnRzVUlpTGdtXzZlWmtpRC03RWgzcXlWUSJ9.YQG2V25jnO9RYSF2bPOlHxWciiYi5UanUgza5IfzIhkYRZrccZwPPJuxJRtKJ1GQZvIVrjaVNCgovC-MYwQOXYUg5gfQxPd6QF2fhuQd_3vujU6XZ1VLckzGrA4mX3gLf_tK-QGwpIlqwphIPhm71NcF6dwHJy8A6BGjhkYPXC94DjwYfYnIfksEqXKfUPskDEBTuvlOo4sDTuFO-e5xGCV4L7SQvCkjh42uPXHwoHm56mFu69BRYsCer8kak3ZSsm2l0XVbYX74fYq1TBIFSdsA9R3Xo-fn7VgLcQOXQqHGVs2JWIF9-Pf5-gGbM_YE3PUj7kq2dp0saNIoeAvmfQ' 
```

The payload is a signed JWT.

??? tip "Click here to see the decoded format of the payload..."

    ```
    {
      "typ": "JWT",
      "alg": "PS256",
      "kid": "cIYo-5zX4OTWZpHrmmiZDVxACJM"
    }

    {
      "iss": "oQ4KoaavpOuoE7rvQsZEOV",
      "iat": 1694075713,
      "exp": 2147483646,
      "jti": "37747cd1c10545699f754adf28b73e32",
      "aud": "https://secure.api.dataholder.com/issuer",
      "redirect_uris": [
        "https://www.google.com/redirects/redirect1"
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
      "software_statement": "eyJhbGciOiJQUzI1NiIsImtpZCI6ImNJWW8tNXpYNE9UV1pwSHJtbWlaRFZ4QUNKTSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJPcGVuQmFua2luZyBMdGQiLCJpYXQiOjE3MTY5NTU2MTMsImp0aSI6ImJhM2JhZjNjODQ3MjQ1ZmEiLCJzb2Z0d2FyZV9lbnZpcm9ubWVudCI6InNhbmRib3giLCJzb2Z0d2FyZV9tb2RlIjoiVGVzdCIsInNvZnR3YXJlX2lkIjoib1E0S29hYXZwT3VvRTdydlFzWkVPViIsInNvZnR3YXJlX2NsaWVudF9pZCI6Im9RNEtvYWF2cE91b0U3cnZRc1pFT1YiLCJzb2Z0d2FyZV9jbGllbnRfbmFtZSI6IldTTzIgT3BlbiBCYW5raW5nIFRQUDIgKFNhbmRib3gpIiwic29mdHdhcmVfY2xpZW50X2Rlc2NyaXB0aW9uIjoiV1NPMiBPcGVuIEJhbmtpbmcgVFBQMiBmb3IgdGVzdGluZyIsInNvZnR3YXJlX3ZlcnNpb24iOiIxLjUiLCJzb2Z0d2FyZV9jbGllbnRfdXJpIjoiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbSIsInNvZnR3YXJlX3JlZGlyZWN0X3VyaXMiOlsiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9yZWRpcmVjdHMvcmVkaXJlY3QxIl0sInNvZnR3YXJlX3JvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXSwib3JnYW5pc2F0aW9uX2NvbXBldGVudF9hdXRob3JpdHlfY2xhaW1zIjp7ImF1dGhvcml0eV9pZCI6Ik9CR0JSIiwicmVnaXN0cmF0aW9uX2lkIjoiVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWCIsInN0YXR1cyI6IkFjdGl2ZSIsImF1dGhvcmlzYXRpb25zIjpbeyJtZW1iZXJfc3RhdGUiOiJHQiIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX0seyJtZW1iZXJfc3RhdGUiOiJJRSIsInJvbGVzIjpbIlBJU1AiLCJDQlBJSSIsIkFJU1AiXX0seyJtZW1iZXJfc3RhdGUiOiJOTCIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX1dfSwic29mdHdhcmVfbG9nb191cmkiOiJodHRwczovL3d3dy5nb29nbGUuY29tIiwib3JnX3N0YXR1cyI6IkFjdGl2ZSIsIm9yZ19pZCI6IjAwMTU4MDAwMDFIUVFyWkFBWCIsIm9yZ19uYW1lIjoiV1NPMiAoVUspIExJTUlURUQiLCJvcmdfY29udGFjdHMiOlt7Im5hbWUiOiJUZWNobmljYWwiLCJlbWFpbCI6InNhY2hpbmlzQHdzbzIuY29tIiwicGhvbmUiOiIrOTQ3NzQyNzQzNzQiLCJ0eXBlIjoiVGVjaG5pY2FsIn0seyJuYW1lIjoiQnVzaW5lc3MiLCJlbWFpbCI6InNhY2hpbmlzQHdzbzIuY29tIiwicGhvbmUiOiIrOTQ3NzQyNzQzNzQiLCJ0eXBlIjoiQnVzaW5lc3MifV0sIm9yZ19qd2tzX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC8wMDE1ODAwMDAxSFFRclpBQVguandrcyIsIm9yZ19qd2tzX3Jldm9rZWRfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMUhRUXJaQUFYL3Jldm9rZWQvMDAxNTgwMDAwMUhRUXJaQUFYLmp3a3MiLCJzb2Z0d2FyZV9qd2tzX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC9vUTRLb2FhdnBPdW9FN3J2UXNaRU9WLmp3a3MiLCJzb2Z0d2FyZV9qd2tzX3Jldm9rZWRfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMUhRUXJaQUFYL3Jldm9rZWQvb1E0S29hYXZwT3VvRTdydlFzWkVPVi5qd2tzIiwic29mdHdhcmVfcG9saWN5X3VyaSI6Imh0dHBzOi8vd3d3Lmdvb2dsZS5jb20iLCJzb2Z0d2FyZV90b3NfdXJpIjoiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbSIsInNvZnR3YXJlX29uX2JlaGFsZl9vZl9vcmciOiJXU08yIE9wZW4gQmFua2luZyJ9.VnfXrppGmCcYGWLcmT3gB22r297Vc0ppibLrl0mv8PGkb7oZLEkIqaAdz9OBwFjehDiHlIzOrCzNgzJD5GvyacZSiorFkpzBpbV80q-n_-uFTugE7mrCVnNfTsb1SBEdoWCRn_BbzH-T2YstqLWPhb_fHkDSFTGJeSnFGp1EcMXVmx8P-pCgsoTS-kXEPDXD7F4iZjZwcFfxDpe_N8FvAUC28l3Tzm1au4bLjrI0T94PVoEJEmAk9AU_somFy_XEvuKuuULfccW3CDR6KGbvXV7MVPNA5XTT5g_H9bRxcPX4ZaaWfIaRVfZ28d_ZCRtsUIiLgm_6eZkiD-7Eh3qyVQ"
    }

    <signature>
    ```

??? tip "Click here to see the decoded format of an SSA..."

    ```
    {
      "alg": "PS256",
      "kid": "cIYo-5zX4OTWZpHrmmiZDVxACJM",
      "typ": "JWT"
    }

    {
      "iss": "OpenBanking Ltd",
      "iat": 1647405940,
      "jti": "36b5dfe0205c4060",
      "software_environment": "sandbox",
      "software_mode": "Test",
      "software_id": "oQ4KoaavpOuoE7rvQsZEOV",
      "software_client_id": "oQ4KoaavpOuoE7rvQsZEOV",
      "software_client_name": "WSO2 Open Banking TPP2 (Sandbox)",
      "software_client_description": "WSO2 Open Banking TPP2 for testing",
      "software_version": 1.5,
      "software_client_uri": "https://www.google.com",
      "software_redirect_uris": [
         "https://www.google.com/redirects/redirect1"
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
      "software_policy_uri": "https://google.com",
      "software_tos_uri": "https://google.com",
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
      "https://www.google.com/redirects/redirect1"
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
      "software_statement":"eyJhbGciOiJQUzI1NiIsImtpZCI6ImNJWW8tNXpYNE9UV1pwSHJtbWlaRFZ4QUNKTSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJPcGVuQmFua2luZyBMdGQiLCJpYXQiOjE3MTY5NTU2MTMsImp0aSI6ImJhM2JhZjNjODQ3MjQ1ZmEiLCJzb2Z0d2FyZV9lbnZpcm9ubWVudCI6InNhbmRib3giLCJzb2Z0d2FyZV9tb2RlIjoiVGVzdCIsInNvZnR3YXJlX2lkIjoib1E0S29hYXZwT3VvRTdydlFzWkVPViIsInNvZnR3YXJlX2NsaWVudF9pZCI6Im9RNEtvYWF2cE91b0U3cnZRc1pFT1YiLCJzb2Z0d2FyZV9jbGllbnRfbmFtZSI6IldTTzIgT3BlbiBCYW5raW5nIFRQUDIgKFNhbmRib3gpIiwic29mdHdhcmVfY2xpZW50X2Rlc2NyaXB0aW9uIjoiV1NPMiBPcGVuIEJhbmtpbmcgVFBQMiBmb3IgdGVzdGluZyIsInNvZnR3YXJlX3ZlcnNpb24iOiIxLjUiLCJzb2Z0d2FyZV9jbGllbnRfdXJpIjoiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbSIsInNvZnR3YXJlX3JlZGlyZWN0X3VyaXMiOlsiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9yZWRpcmVjdHMvcmVkaXJlY3QxIl0sInNvZnR3YXJlX3JvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXSwib3JnYW5pc2F0aW9uX2NvbXBldGVudF9hdXRob3JpdHlfY2xhaW1zIjp7ImF1dGhvcml0eV9pZCI6Ik9CR0JSIiwicmVnaXN0cmF0aW9uX2lkIjoiVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWCIsInN0YXR1cyI6IkFjdGl2ZSIsImF1dGhvcmlzYXRpb25zIjpbeyJtZW1iZXJfc3RhdGUiOiJHQiIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX0seyJtZW1iZXJfc3RhdGUiOiJJRSIsInJvbGVzIjpbIlBJU1AiLCJDQlBJSSIsIkFJU1AiXX0seyJtZW1iZXJfc3RhdGUiOiJOTCIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX1dfSwic29mdHdhcmVfbG9nb191cmkiOiJodHRwczovL3d3dy5nb29nbGUuY29tIiwib3JnX3N0YXR1cyI6IkFjdGl2ZSIsIm9yZ19pZCI6IjAwMTU4MDAwMDFIUVFyWkFBWCIsIm9yZ19uYW1lIjoiV1NPMiAoVUspIExJTUlURUQiLCJvcmdfY29udGFjdHMiOlt7Im5hbWUiOiJUZWNobmljYWwiLCJlbWFpbCI6InNhY2hpbmlzQHdzbzIuY29tIiwicGhvbmUiOiIrOTQ3NzQyNzQzNzQiLCJ0eXBlIjoiVGVjaG5pY2FsIn0seyJuYW1lIjoiQnVzaW5lc3MiLCJlbWFpbCI6InNhY2hpbmlzQHdzbzIuY29tIiwicGhvbmUiOiIrOTQ3NzQyNzQzNzQiLCJ0eXBlIjoiQnVzaW5lc3MifV0sIm9yZ19qd2tzX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC8wMDE1ODAwMDAxSFFRclpBQVguandrcyIsIm9yZ19qd2tzX3Jldm9rZWRfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMUhRUXJaQUFYL3Jldm9rZWQvMDAxNTgwMDAwMUhRUXJaQUFYLmp3a3MiLCJzb2Z0d2FyZV9qd2tzX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC9vUTRLb2FhdnBPdW9FN3J2UXNaRU9WLmp3a3MiLCJzb2Z0d2FyZV9qd2tzX3Jldm9rZWRfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMUhRUXJaQUFYL3Jldm9rZWQvb1E0S29hYXZwT3VvRTdydlFzWkVPVi5qd2tzIiwic29mdHdhcmVfcG9saWN5X3VyaSI6Imh0dHBzOi8vd3d3Lmdvb2dsZS5jb20iLCJzb2Z0d2FyZV90b3NfdXJpIjoiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbSIsInNvZnR3YXJlX29uX2JlaGFsZl9vZl9vcmciOiJXU08yIE9wZW4gQmFua2luZyJ9.VnfXrppGmCcYGWLcmT3gB22r297Vc0ppibLrl0mv8PGkb7oZLEkIqaAdz9OBwFjehDiHlIzOrCzNgzJD5GvyacZSiorFkpzBpbV80q-n_-uFTugE7mrCVnNfTsb1SBEdoWCRn_BbzH-T2YstqLWPhb_fHkDSFTGJeSnFGp1EcMXVmx8P-pCgsoTS-kXEPDXD7F4iZjZwcFfxDpe_N8FvAUC28l3Tzm1au4bLjrI0T94PVoEJEmAk9AU_somFy_XEvuKuuULfccW3CDR6KGbvXV7MVPNA5XTT5g_H9bRxcPX4ZaaWfIaRVfZ28d_ZCRtsUIiLgm_6eZkiD-7Eh3qyVQ"
}

```

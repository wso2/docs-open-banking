### Step 1: Deploy the Dynamic Client Registration(DCR) API

1. Sign in to the API Publisher Portal at [https:/localhost:9443/publisher](https:/{APIM_HOST}:9443/publisher) with `creator/publisher` 
privileges. 

2. In the Homepage, click **Import Open API**. ![import_API](../assets/img/advanced/dcr/dcr-try-out/step-2.png)

3. Select **OpenAPI File/Archive**. ![select_API](../assets/img/advanced/dcr/dcr-try-out/step-3.png)

4. Click **Browse File to Upload** and select the `<APIM_HOME>/<OB_APIM_ACCELERATOR_HOME>/repository/resources/apis/
DynamicClientRegistration/dcr-swagger.yaml` file.

5. Click **Next**.

6. Set the value for **Endpoint** as follows:
```
https://localhost:9446/api/openbanking/dynamic-client-registration
```
    ![set_endpoint](../assets/img/advanced/dcr/dcr-try-out/step-4.png)

7. Select **Subscriptions** from the left menu pane and set the business plan to **Unlimited: Allows unlimited requests**.

8. Click **Save**.

9. Go to **Deployments** using the left menu pane and click **Deploy New Revision**. ![deploy a new revision](../assets/img/advanced/dcr/dcr-try-out/step-6.png)

10.Provide a description for the new revision.

11.Select `localhost` from the dropdown list. ![select_localhost](../assets/img/advanced/dcr/dcr-try-out/step-7.png)

12.Click **Deploy**.

13.Go to **Overview** using the left menu pane and click **Publish**. ![publish_API](../assets/img/advanced/dcr/dcr-try-out/step-8.png)

14.The deployed DCR API is now available in the Developer Portal at `https://{APIM_HOST}:9443/devportal`.

15.Upload the root and issuer certificates found [here](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/252018873/OB+Root+and+Issuing+Certificates+for+Sandbox) 
to the client trust stores in `<APIM_HOME>/repository/resources/security/client-truststore.jks` and 
`<IS_HOME>/repository/resources/security/client-truststore.jks` using the following command:
```
keytool -import -alias <alias> -file <certificate_location> -storetype JKS -keystore <truststore_location>
```

16.See [Configurations](dynamic-client-registration-configuration.md) to configure WSO2 Open Banking Accelerator for DCR.
### Step 2: Configure IS as Key Manager

 1. Sign in to the Admin Portal of API Manager at `https://{APIM_HOST}:9443/admin`.
 2. Go to **Key Manager** on the left main menu. ![add_Key_Manager](../assets/img/advanced/dcr/dcr-try-out/step-9.png)
 3. Click **Add New Key Manager** and configure Key Manager. 
    
    ??? tip "Click here to see the full list of configurations..."
        | Configuration       | Description                           | Value                    |
        | -------------       |-------------                          | -----                    |
        | Name                | The name of the authorization server. | OBKM                     |
        | Display Name        | A name to display on the UI.          | OBKM                     |
        | Description         | The name of the authorization server. | (Optional)               |
        | Key Manager Type    | The type of the Key Manager to be selected. | Select `ObKeyManager` |
        |Well-known-url      | The well-known URL of the authorization server (Key Manager).| https://{IS_HOST}:9446/oauth2/token/.well-known/openid-configuration |
        | Issuer              | The issuer that consumes or validates access tokens.         | https://{IS_HOST}:9446/oauth2/token |
        |**Key Manager Endpoints**                                                                |
        | Client Registration Endpoint | The endpoint that verifies the identity and obtain profile information of the end-user based on the authentication performed by an authorization server.  |  https://{IS_HOST}:9446/keymanager-operations/dcr/register| 
        | Introspection Endpoint | The endpoint that allows authorized protected resources to query the authorization server to determine the set of metadata for a given token that was presented to them by an OAuth Client. | https://{IS_HOST}:9446/oauth2/introspect |
        | Token Endpoint      | The endpoint that issues the access tokens. | https://{IS_HOST}:9446/oauth2/token |
        | Revoke Endpoint     | The endpoint that revokes the access tokens.| https://{IS_HOST}:9446/oauth2/revoke |
        | Userinfo Endpoint   | The endpoint that allows clients to verify the identity of the end-user based on the authentication performed by an authorization server, as well as to obtain basic profile information about the end-user. | https://{IS_HOST}:9446/oauth2/userinfo?schema=openid |
        | Authorize Endpoint  | The endpoint used to obtain an authorization grant from the resource owner via the user-agent redirection. | https://{IS_HOST}:9446/oauth2/authorize |
        | Scope Management Endpoint | The endpoint used to manage the scopes. | https://{IS_HOST}:9446/api/identity/oauth2/v1.0/scopes |
        | **Connector Configurations**                        |
        | Username            | The username of an admin user who is authorized to connect to the authorization server. |  |
        | Password            | The password corresponding to the latter mentioned admin user who is authorized to connect to the authorization server. | |
        | **Claim URIs**      |   
        | Consumer Key Claim URI | The claim URI for the consumer key.  | (Optional)  |
        | Scopes Claim URI | The claim URI for the scopes | (Optional) | 
        | Grant Types | The supported grant types. Add multiple grant types by adding a grant type press Enter. | (Optional) |
        | **Certificates** | 
        | PEM | Either copy and paste the certificate in PEM format or upload the PEM file. | (Optional) |
        | JWKS | The JSON Web Key Set (JWKS) endpoint is a read-only endpoint. This URL returns the Identity Server's public key set in JSON web key set format. This contains the signing key(s) the Relying Party (RP) uses to validate signatures from the Identity Server. | https://{IS_HOST}:9446/oauth2/jwks |
        | **Advanced Configurations** |
        | Token Generation | This enables token generation via the authorization server. | (Mandatory) |
        | Out Of Band Provisioning | This enables the provisioning of Auth clients that have been created without the use of the Developer Portal, such as previously created Auth clients. | (Mandatory) |
        | Oauth App Creation | This enables the creation of Auth clients. | (Mandatory) |
        | **Token Validation Method** | The method used to validate the JWT signature. |
        | Self Validate JWT | The kid value is used to validate the JWT token signature. If the kid value is not present, `gateway_certificate_alias` will be used. | (Mandatory) |
        | Use introspect | The JWKS endpoint is used to validate the JWT token signature. | - |
        | Token Handling Options | This provides a way to validate the token for this particular authorization server. This is mandatory if the Token Validation Method is introspect.| (Optional) |
        | REFERENCE | The tokens that match a specific regular expression (regEx) are validated. e.g., <code>[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}</code> | (Optional) |
        | JWT | The tokens that match a specific JWT are validated. | Select this icon |
        | CUSTOM | The tokens that match a custom pattern are validated. | (Optional) |
        | **Claim Mappings** | Local and remote claim mapping. | (Optional) |
    

3. Go to the list of Key Managers and select **Resident Key Manager**. ![select_Resident_KM](../assets/img/advanced/dcr/dcr-try-out/step-10.png)

4. Locate **Connector Configurations** and provide a username and a password for a user with super admin credentials.

5. Click **Update**.

6. Disable the Resident Key Manager. ![Disable_Resident_KM](../assets/img/advanced/dcr/dcr-try-out/step-11.png)

### Step 3: Register an application
The API allows the API consumer to request the bank to register a new application. The process is as follows:

- The API consumer sends a registration request including a Software Statement Assertion (SSA) as a claim in the payload. 
This SSA contains API consumer's metadata. A sample request looks as follows:

```
curl -X POST\
https://localhost:8243/open-banking/0.1/register \
 -H 'Content-Type: application/jwt' \
 -H 'Authorization: Basic YWRtaW5Ad3NvMi5jb206d3NvMjEyMw==' \
 -d 'eyJ0eXAiOiJKV1QiLCJhbGciOiJQUzI1NiIsImtpZCI6IkR3TUtkV01tajdQV2ludm9xZlF5WFZ6eVo2USJ9.eyJpc3MiOiI3NDBDMzY4Ri1FQ0Y5LT
REMjktQTJFQS0wNTE0QTY2QjBDRE4iLCJpYXQiOjE1NzE4MDgxNjcsImV4cCI6MjE0NzQ4MzY0NiwianRpIjoiMzc3NDdjZDFjMTA1NDU2OTlmNzU0YWRmMj
hiNzNlMzEiLCJhdWQiOiJodHRwczovL3NlY3VyZS5hcGkuZGF0YWhvbGRlci5jb20vaXNzdWVyIiwicmVkaXJlY3RfdXJpcyI6WyJodHRwczovL3d3dy5tb2
NrY29tcGFueS5jb20uYXUvcmVkaXJlY3RzL3JlZGlyZWN0MSIsImh0dHBzOi8vd3d3Lm1vY2tjb21wYW55LmNvbS5hdS9yZWRpcmVjdHMvcmVkaXJlY3QyIl
0sInRva2VuX2VuZHBvaW50X2F1dGhfc2lnbmluZ19hbGciOiJQUzI1NiIsInRva2VuX2VuZHBvaW50X2F1dGhfbWV0aG9kIjoicHJpdmF0ZV9rZXlfand0Ii
wiZ3JhbnRfdHlwZXMiOlsiY2xpZW50X2NyZWRlbnRpYWxzIiwiYXV0aG9yaXphdGlvbl9jb2RlIiwicmVmcmVzaF90b2tlbiIsInVybjppZXRmOnBhcmFtcz
pvYXV0aDpncmFudC10eXBlOmp3dC1iZWFyZXIiXSwicmVzcG9uc2VfdHlwZXMiOlsiY29kZSBpZF90b2tlbiJdLCJhcHBsaWNhdGlvbl90eXBlIjoid2ViIi
wiaWRfdG9rZW5fc2lnbmVkX3Jlc3BvbnNlX2FsZyI6IlBTMjU2IiwiaWRfdG9rZW5fZW5jcnlwdGVkX3Jlc3BvbnNlX2FsZyI6IlJTQS1PQUVQIiwiaWRfdG
9rZW5fZW5jcnlwdGVkX3Jlc3BvbnNlX2VuYyI6IkEyNTZHQ00iLCJyZXF1ZXN0X29iamVjdF9zaWduaW5nX2FsZyI6IlBTMjU2Iiwic29mdHdhcmVfc3RhdG
VtZW50IjoiZXlKaGJHY2lPaUpRVXpJMU5pSXNJbXRwWkNJNklrUjNUVXRrVjAxdGFqZFFWMmx1ZG05eFpsRjVXRlo2ZVZvMlVTSXNJblI1Y0NJNklrcFhWQ0
o5LmV5SnBjM01pT2lKalpISXRjbVZuYVhOMFpYSWlMQ0pwWVhRaU9qRTFOekU0TURneE5qY3NJbVY0Y0NJNk1qRTBOelE0TXpZME5pd2lhblJwSWpvaU0ySm
pNakExWVRGbFltTTVORE5tWW1JMk1qUmlNVFJtWTJJeU5ERXhPVFlpTENKdmNtZGZhV1FpT2lJelFqQkNNRUUzUWkwelJUZENMVFJCTWtNdE9UUTVOeTFGTX
pVM1FUY3hSREEzUXpnaUxDSnZjbWRmYm1GdFpTSTZJazF2WTJzZ1EyOXRjR0Z1ZVNCSmJtTXVJaXdpWTJ4cFpXNTBYMjVoYldVaU9pSk5iMk5ySUZOdlpuUj
NZWEpsSWl3aVkyeHBaVzUwWDJSbGMyTnlhWEIwYVc5dUlqb2lRU0J0YjJOcklITnZablIzWVhKbElIQnliMlIxWTNRZ1ptOXlJSFJsYzNScGJtY2dVMU5CSW
l3aVkyeHBaVzUwWDNWeWFTSTZJbWgwZEhCek9pOHZkM2QzTG0xdlkydGpiMjF3WVc1NUxtTnZiUzVoZFNJc0luSmxaR2x5WldOMFgzVnlhWE1pT2xzaWFIUj
BjSE02THk5M2QzY3VaMjl2WjJ4bExtTnZiUzl5WldScGNtVmpkSE12Y21Wa2FYSmxZM1F4SWl3aWFIUjBjSE02THk5M2QzY3VaMjl2WjJ4bExtTnZiUzl5Wl
dScGNtVmpkSE12Y21Wa2FYSmxZM1F5SWwwc0lteHZaMjlmZFhKcElqb2lhSFIwY0hNNkx5OTNkM2N1Ylc5amEyTnZiWEJoYm5rdVkyOXRMbUYxTDJ4dloyOX
pMMnh2WjI4eExuQnVaeUlzSW5SdmMxOTFjbWtpT2lKb2RIUndjem92TDNkM2R5NXRiMk5yWTI5dGNHRnVlUzVqYjIwdVlYVXZkRzl6TG1oMGJXd2lMQ0p3Yj
J4cFkzbGZkWEpwSWpvaWFIUjBjSE02THk5M2QzY3ViVzlqYTJOdmJYQmhibmt1WTI5dExtRjFMM0J2YkdsamVTNW9kRzFzSWl3aWFuZHJjMTkxY21raU9pSm
9kSFJ3Y3pvdkwydGxlWE4wYjNKbExtOXdaVzVpWVc1cmFXNW5kR1Z6ZEM1dmNtY3VkV3N2TURBeE5UZ3dNREF3TVVoUlVYSmFRVUZZTHpsaU5YVnpSSEJpVG
5SdGVFUmpWSHB6TjBkNlMzQXVhbmRyY3lJc0luSmxkbTlqWVhScGIyNWZkWEpwSWpvaWFIUjBjSE02THk5bmFYTjBMbWRwZEdoMVluVnpaWEpqYjI1MFpXNT
BMbU52YlM5cGJXVnphRGswTHpNeE56SmxNbVUwTlRjMU4yTmtZVEE0WldNeU56STNaamt3WWpjeVkyVmtMM0poZHk5bVpqQmtNMlZoWW1VMFkyUmtZMlUwTj
JWbFl6QXlNamhtTlRreU1UYzFNakl6WkdRNU1tSXlMM2R6YnpJdFlYVXRaR055TFdSbGJXOHVhbmRyY3lJc0luSmxZMmx3YVdWdWRGOWlZWE5sWDNWeWFTST
ZJbWgwZEhCek9pOHZkM2QzTG0xdlkydGpiMjF3WVc1NUxtTnZiUzVoZFNJc0luTnZablIzWVhKbFgybGtJam9pTnpRd1F6TTJPRVl0UlVOR09TMDBSREk1TF
VFeVJVRXRNRFV4TkVFMk5rSXdRMFJPSWl3aWMyOW1kSGRoY21WZmNtOXNaWE1pT2lKa1lYUmhMWEpsWTJsd2FXVnVkQzF6YjJaMGQyRnlaUzF3Y205a2RXTj
BJaXdpYzJOdmNHVWlPaUppWVc1ck9tRmpZMjkxYm5SekxtSmhjMmxqT25KbFlXUWdZbUZ1YXpwaFkyTnZkVzUwY3k1a1pYUmhhV3c2Y21WaFpDQmlZVzVyT2
5SeVlXNXpZV04wYVc5dWN6cHlaV0ZrSUdKaGJtczZjR0Y1WldWek9uSmxZV1FnWW1GdWF6cHlaV2QxYkdGeVgzQmhlVzFsYm5Sek9uSmxZV1FnWTI5dGJXOX
VPbU4xYzNSdmJXVnlMbUpoYzJsak9uSmxZV1FnWTI5dGJXOXVPbU4xYzNSdmJXVnlMbVJsZEdGcGJEcHlaV0ZrSUdOa2NqcHlaV2RwYzNSeVlYUnBiMjRpZl
EuYkt0dVE5QU01ZWtLeDFsM1IzNmRrSmk0MjNqYWdadnJLZmxOelpqWnQ4dkZJR2dCWXAxMGcwUlRZa0w0dXZKUElDY2ZvNmUwMXRQNG5NZDFaNDdUdkhkTW
RBeGstMU1yNlFweEpRRmVWUnJ0STJNSFBpQ05yRC0wYjAtMmw2VnhONVlPLWdnSnExd291aGVjS3hSLUhuSExycG9PNmw5WnNybm91eTRyUWJ6bkRGc1Ftdl
gyTjduLXJLVW5EOTN6X1RvandMcUlJRUNLQ0FaaGxKcGpnT01JaTRiWm9lNC15XzF6a1VTOUQtVkIyWkEtZWZ0RVFmc0QxLWFROW1Oc24tdUZtV1NBQ3NhVF
lPTWQ2eG1zb29nNWRWZDI5aTJIRUtYcGlMTmwwMlhlTVJsRldVSG1Kdk9Gd2VyS1FFU0ZNVjJldmRnMWd5Q1I1b2RHXzhkeFhnIn0.T4eJlGktlHOld1Lhah
ojH4NROSyYgiCk49c6CdE2M82odcRt3bAJfEeQizQbLwZ4SGs8GmEpBxa97XWHAxmDMnEDm2gDsZXGnAlX70szVmvTpp1aY1uEAMVnH4Rg12yfj5SeWwLcfx
HTDLA8ZEQSlpqLfe567gtT-Cs8WAR7izJCvteWs_OkNG303VFRKIrz4xHd6XrcvJsRYFnvnNhEi14sITo5ZYX1_Q9RnfHYKde98fdu9yK7XUb51qnvLsDMKL
HR67xscSoodr80ZP_TJvYXwLiQmzSIetTMACL3RFs33ZQrwFjp_-kKGxcHWAAClSiViyanA3D2_B9KByIOLw' 
```
The payload is a signed JWT. Its format looks as follows:
```
{
  "typ": "JWT",
  "alg": "PS256",
  "kid": "DwMKdWMmj7PWinvoqfQyXVzyZ6Q"
}
{
  "iss": "740C368F-ECF9-4D29-A2EA-0514A66B0CDN",
  "iat": 1571808167,
  "exp": 2147483646,
  "jti": "37747cd1c10545699f754adf28b73e31",
  "aud": "https://secure.api.dataholder.com/issuer",
  "redirect_uris": [
    "https://www.mockcompany.com.au/redirects/redirect1",
    "https://www.mockcompany.com.au/redirects/redirect2"
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
  "software_statement": "eyJhbGciOiJQUzI1NiIsImtpZCI6IkR3TUtkV01tajdQV2ludm9xZlF5WFZ6eVo2USIsInR5cCI6IkpXVCJ9.eyJpc3MiOi
JjZHItcmVnaXN0ZXIiLCJpYXQiOjE1NzE4MDgxNjcsImV4cCI6MjE0NzQ4MzY0NiwianRpIjoiM2JjMjA1YTFlYmM5NDNmYmI2MjRiMTRmY2IyNDExOTYiLC
JvcmdfaWQiOiIzQjBCMEE3Qi0zRTdCLTRBMkMtOTQ5Ny1FMzU3QTcxRDA3QzgiLCJvcmdfbmFtZSI6Ik1vY2sgQ29tcGFueSBJbmMuIiwiY2xpZW50X25hbW
UiOiJNb2NrIFNvZnR3YXJlIiwiY2xpZW50X2Rlc2NyaXB0aW9uIjoiQSBtb2NrIHNvZnR3YXJlIHByb2R1Y3QgZm9yIHRlc3RpbmcgU1NBIiwiY2xpZW50X3
VyaSI6Imh0dHBzOi8vd3d3Lm1vY2tjb21wYW55LmNvbS5hdSIsInJlZGlyZWN0X3VyaXMiOlsiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9yZWRpcmVjdHMvcm
VkaXJlY3QxIiwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9yZWRpcmVjdHMvcmVkaXJlY3QyIl0sImxvZ29fdXJpIjoiaHR0cHM6Ly93d3cubW9ja2NvbXBhbn
kuY29tLmF1L2xvZ29zL2xvZ28xLnBuZyIsInRvc191cmkiOiJodHRwczovL3d3dy5tb2NrY29tcGFueS5jb20uYXUvdG9zLmh0bWwiLCJwb2xpY3lfdXJpIj
oiaHR0cHM6Ly93d3cubW9ja2NvbXBhbnkuY29tLmF1L3BvbGljeS5odG1sIiwiandrc191cmkiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC
5vcmcudWsvMDAxNTgwMDAwMUhRUXJaQUFYLzliNXVzRHBiTnRteERjVHpzN0d6S3AuandrcyIsInJldm9jYXRpb25fdXJpIjoiaHR0cHM6Ly9naXN0LmdpdG
h1YnVzZXJjb250ZW50LmNvbS9pbWVzaDk0LzMxNzJlMmU0NTc1N2NkYTA4ZWMyNzI3ZjkwYjcyY2VkL3Jhdy9mZjBkM2VhYmU0Y2RkY2U0N2VlYzAyMjhmNT
kyMTc1MjIzZGQ5MmIyL3dzbzItYXUtZGNyLWRlbW8uandrcyIsInJlY2lwaWVudF9iYXNlX3VyaSI6Imh0dHBzOi8vd3d3Lm1vY2tjb21wYW55LmNvbS5hdS
IsInNvZnR3YXJlX2lkIjoiNzQwQzM2OEYtRUNGOS00RDI5LUEyRUEtMDUxNEE2NkIwQ0ROIiwic29mdHdhcmVfcm9sZXMiOiJkYXRhLXJlY2lwaWVudC1zb2
Z0d2FyZS1wcm9kdWN0Iiwic2NvcGUiOiJiYW5rOmFjY291bnRzLmJhc2ljOnJlYWQgYmFuazphY2NvdW50cy5kZXRhaWw6cmVhZCBiYW5rOnRyYW5zYWN0aW
9uczpyZWFkIGJhbms6cGF5ZWVzOnJlYWQgYmFuazpyZWd1bGFyX3BheW1lbnRzOnJlYWQgY29tbW9uOmN1c3RvbWVyLmJhc2ljOnJlYWQgY29tbW9uOmN1c3
RvbWVyLmRldGFpbDpyZWFkIGNkcjpyZWdpc3RyYXRpb24ifQ.bKtuQ9AM5ekKx1l3R36dkJi423jagZvrKflNzZjZt8vFIGgBYp10g0RTYkL4uvJPICcfo6e
01tP4nMd1Z47TvHdMdAxk-1Mr6QpxJQFeVRrtI2MHPiCNrD-0b0-2l6VxN5YO-ggJq1wouhecKxR-HnHLrpoO6l9Zsrnouy4rQbznDFsQmvX2N7n-rKUnD93
z_TojwLqIIECKCAZhlJpjgOMIi4bZoe4-y_1zkUS9D-VB2ZA-eftEQfsD1-aQ9mNsn-uFmWSACsaTYOMd6xmsoog5dVd29i2HEKXpiLNl02XeMRlFWUHmJvO
FwerKQESFMV2evdg1gyCR5odG_8dxXg"
}
<signature>
```

The format of the SSA:
```
{
  "alg": "PS256",
  "kid": "DwMKdWMmj7PWinvoqfQyXVzyZ6Q",
  "typ": "JWT"
}
{
      "iss": "cdr-register",
      "iat": 1571808167,
      "exp": 2147483646,
      "jti": "3bc205a1ebc943fbb624b14fcb241196",
      "org_id": "3B0B0A7B-3E7B-4A2C-9497-E357A71D07C8",
      "org_name": "Mock Company Inc.",
      "client_name": "Mock Software",
      "client_description": "A mock software product for testing SSA",
      "client_uri": "https://www.mockcompany.com.au",
      "redirect_uris": [
        "https://www.google.com/redirects/redirect1",
        "https://www.google.com/redirects/redirect2"
      ],
      "logo_uri": "https://www.mockcompany.com.au/logos/logo1.png",
      "tos_uri": "https://www.mockcompany.com.au/tos.html",
      "policy_uri": "https://www.mockcompany.com.au/policy.html",
      "jwks_uri": "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/9b5usDpbNtmxDcTzs7GzKp.jwks",
      "revocation_uri": "https://gist.githubusercontent.com/imesh94/3172e2e45757cda08ec2727f90b72ced/raw/ff0d3eabe4cddce47eec0228f592175223dd92b2/wso2-au-dcr-demo.jwks",
      "recipient_base_uri": "https://www.mockcompany.com.au",
      "software_id": "740C368F-ECF9-4D29-A2EA-0514A66B0CDN",
      "software_roles": "data-recipient-software-product",
      "scope": "bank:accounts.basic:read bank:accounts.detail:read bank:transactions:read bank:payees:read bank:regular_payments:read common:customer.basic:read common:customer.detail:read cdr:registration"
    }
<signature>
```
!!! note 
    If you change the payload, use the following certificates to sign the JWT and SSA:
    
    - [signing certificate](../../assets/attachments/signing_certificate.pem)
    - [private keys](../../assets/attachments/signing_key.key)

- The bank registers the application using the metadata sent in the SSA.

- If an application is successfully created, the bank responds with a JSON payload describing the API consumer that the application was created. 
The API consumer can then use the identifier (`Client ID`) to access customers' financial data on the bank's resource server. A sample response is 
given below:
```
{
        "client_id": "CVY8RUWT3XVHAlRV_ZiA0dlB2Owa",
        "client_id_issued_at": "1617198228",
        "redirect_uris": [
            "https://www.mockcompany.com.au/redirects/redirect1",
            "https://www.mockcompany.com.au/redirects/redirect2"
        ],
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
        "request_object_signing_alg": "PS256",
        "scope": "bank:accounts.basic:read bank:accounts.detail:read bank:transactions:read bank:payees:read bank:regular_payments:read common:customer.basic:read common:customer.detail:read cdr:registration",
        "software_id": "740C368F-ECF9-4D29-A2EA-0514A66B0CDN",
        "token_endpoint_auth_method": "private_key_jwt",
        "software_statement": "eyJhbGciOiJQUzI1NiIsImtpZCI6IkR3TUtkV01tajdQV2ludm9xZlF5WFZ6eVo2USIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZHItcmVnaXN0ZXIiLCJpYXQiOjE1NzE4MDgxNjcsImV4cCI6MjE0NzQ4MzY0NiwianRpIjoiM2JjMjA1YTFlYmM5NDNmYmI2MjRiMTRmY2IyNDExOTYiLCJvcmdfaWQiOiIzQjBCMEE3Qi0zRTdCLTRBMkMtOTQ5Ny1FMzU3QTcxRDA3QzgiLCJvcmdfbmFtZSI6Ik1vY2sgQ29tcGFueSBJbmMuIiwiY2xpZW50X25hbWUiOiJNb2NrIFNvZnR3YXJlIiwiY2xpZW50X2Rlc2NyaXB0aW9uIjoiQSBtb2NrIHNvZnR3YXJlIHByb2R1Y3QgZm9yIHRlc3RpbmcgU1NBIiwiY2xpZW50X3VyaSI6Imh0dHBzOi8vd3d3Lm1vY2tjb21wYW55LmNvbS5hdSIsInJlZGlyZWN0X3VyaXMiOlsiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9yZWRpcmVjdHMvcmVkaXJlY3QxIiwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9yZWRpcmVjdHMvcmVkaXJlY3QyIl0sImxvZ29fdXJpIjoiaHR0cHM6Ly93d3cubW9ja2NvbXBhbnkuY29tLmF1L2xvZ29zL2xvZ28xLnBuZyIsInRvc191cmkiOiJodHRwczovL3d3dy5tb2NrY29tcGFueS5jb20uYXUvdG9zLmh0bWwiLCJwb2xpY3lfdXJpIjoiaHR0cHM6Ly93d3cubW9ja2NvbXBhbnkuY29tLmF1L3BvbGljeS5odG1sIiwiandrc191cmkiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMUhRUXJaQUFYLzliNXVzRHBiTnRteERjVHpzN0d6S3AuandrcyIsInJldm9jYXRpb25fdXJpIjoiaHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9pbWVzaDk0LzMxNzJlMmU0NTc1N2NkYTA4ZWMyNzI3ZjkwYjcyY2VkL3Jhdy9mZjBkM2VhYmU0Y2RkY2U0N2VlYzAyMjhmNTkyMTc1MjIzZGQ5MmIyL3dzbzItYXUtZGNyLWRlbW8uandrcyIsInJlY2lwaWVudF9iYXNlX3VyaSI6Imh0dHBzOi8vd3d3Lm1vY2tjb21wYW55LmNvbS5hdSIsInNvZnR3YXJlX2lkIjoiNzQwQzM2OEYtRUNGOS00RDI5LUEyRUEtMDUxNEE2NkIwQ0ROIiwic29mdHdhcmVfcm9sZXMiOiJkYXRhLXJlY2lwaWVudC1zb2Z0d2FyZS1wcm9kdWN0Iiwic2NvcGUiOiJiYW5rOmFjY291bnRzLmJhc2ljOnJlYWQgYmFuazphY2NvdW50cy5kZXRhaWw6cmVhZCBiYW5rOnRyYW5zYWN0aW9uczpyZWFkIGJhbms6cGF5ZWVzOnJlYWQgYmFuazpyZWd1bGFyX3BheW1lbnRzOnJlYWQgY29tbW9uOmN1c3RvbWVyLmJhc2ljOnJlYWQgY29tbW9uOmN1c3RvbWVyLmRldGFpbDpyZWFkIGNkcjpyZWdpc3RyYXRpb24ifQ.bKtuQ9AM5ekKx1l3R36dkJi423jagZvrKflNzZjZt8vFIGgBYp10g0RTYkL4uvJPICcfo6e01tP4nMd1Z47TvHdMdAxk-1Mr6QpxJQFeVRrtI2MHPiCNrD-0b0-2l6VxN5YO-ggJq1wouhecKxR-HnHLrpoO6l9Zsrnouy4rQbznDFsQmvX2N7n-rKUnD93z_TojwLqIIECKCAZhlJpjgOMIi4bZoe4-y_1zkUS9D-VB2ZA-eftEQfsD1-aQ9mNsn-uFmWSACsaTYOMd6xmsoog5dVd29i2HEKXpiLNl02XeMRlFWUHmJvOFwerKQESFMV2evdg1gyCR5odG_8dxXg"
    }

```

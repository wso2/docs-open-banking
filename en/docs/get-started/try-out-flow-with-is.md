This document provides step by step instructions to invoke the Accounts Information Service API.
Following diagram illustrates the sample Open Banking flow which is going to try from this documentation section.

![Open Banking Demo Flow](../assets/img/get-started/quick-start-guide/ob_demo_flow.png)

!!! note
    In the following steps, there are JWTs that's needed to be created where the payload has to be changed. Hence, use the following certificates to sign the JWT in following steps:

    - [signing certificate](../../assets/attachments/signing-certs/obsigning.pem)
    - [private keys](../../assets/attachments/signing-certs/obsigning.key)

### Step 1: Generate application access token
1. Once you register the application, generate an application access token using the following command. For the 
Transport Layer Security purposes in this sample flow, you can use the attached [private key](../assets/attachments/transport-certs/obtransport.key) and
[public certificate](../assets/attachments/transport-certs/obtransport.pem).

    ```
    curl -X POST \
    https://localhost:9446/oauth2/token \
    --cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \
    -d 'grant_type=client_credentials&scope=accounts%20openid&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&client_id=<CLIENT_ID>&client_assertion=<CLIENT_ASSERTION_JWT>&redirect_uri=https://www.google.com/redirects/redirect1'
    ```
   
    - The CLIENT_ID can be taken from the client_id of the DCR request's response, or "Client ID" of the OAuth2.0/OpenID Connect settings of the application in the Identity Server Console.
    - The request payload contains a client assertion JWT:
      - In the assertion JWT, make sure to change the values accordingly with respect to the sample provided.
    
    ``` jwt tab="Sample"
    eyJraWQiOiJjSVlvLTV6WDRPVFdacEhybW1pWkRWeEFDSk0iLCJ0eXAiOiJKV1QiLCJhbGciOiJQUzI1NiJ9.eyJzdWIiOiJqWHVIUHhQaGl0TVVldmQ0ZDMxR1NzMjV1V2NhIiwiYXVkIjoiaHR0cHM6Ly9vYi1pYW06OTQ0Ni9vYXV0aDIvdG9rZW4iLCJpc3MiOiJqWHVIUHhQaGl0TVVldmQ0ZDMxR1NzMjV1V2NhIiwiZXhwIjoxNzQ5MDQ0ODIzLCJpYXQiOjE3NDkwMTQ4MjMsImp0aSI6IjE3NDkwMTQ4MjM0MjEifQ.vzPOE0XMDi_x8OR6Z6Jd5gCLZCbdKyzGlC7yh1oANIVjjNRV4dYd8_uwyO6c7uzhidmblbXVAeX2xd0M1gdk4xUWdZcDOScPvcUM-ds_T5sWC6pXf2WDCFC_AH9B7U7NgqoVINyhg9ROAL32mWNHaFtsQ9F8khXUBvP87dFFrYERwj1kevst0puWxlu1Xcnxm0tKO40XTaYUdjKjud7ZXUe9v8qT91hLdjA2Uk2B-KI8wmiTimmr1rP9iODIfodceVZ8Tk4aXX-Egelqb2LKKu3CRriFHc_Rc4q0GPxStrPyWT4M4A67PV546xp76pArlVdr4v3jfzSZMYyyBBb1Ng
    ```
   
    ``` json tab="Format"
    {
    "alg": "<<The algorithm used for signing.>>",
    "kid": "<<The KID value of the signing jwk set.>>",
    "typ": "JWT"
    }
      
    {
    "iss": "<<This is the issuer of the token. For example, client ID of your application>>",
    "sub": "<<This is the subject identifier of the issuer. For example, client ID of your application>>",
    "exp": <<This is epoch time of the token expiration date/time>>,
    "iat": <<This is epoch time of the token issuance date/time>>,
    "jti": "<<This is an incremental unique value.>>",
    "aud": "<<This is the audience that the ID token is intended for. For example, https://<IS_HOST>:9446/oauth2/token>>"
    }
      
    <signature: For DCR, the client assertion is signed by the private key of the signing certificate. Otherwise the private
    signature of the application certificate is used.>
    ```

2. Upon successful token generation, you obtain a token as follows:
   ```
   {
    "access_token": "eyJ4NXQiOiJ5SFl1RDhrVHZWYzhGdjNUd3pmRUd1dHBudUEiLCJraWQiOiJOemRpTkRBd05ETmpaRE5rWlROak5UQm1NVE5rTVRObE1qRTNNakJqTnpobE1USmtaalk0TUdabU5ERmlZMll3TUdRM01qZzBNakpqT0RnM1lUWmtOUV9SUzI1NiIsInR5cCI6ImF0K2p3dCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJqWHVIUHhQaGl0TVVldmQ0ZDMxR1NzMjV1V2NhIiwiYXV0IjoiQVBQTElDQVRJT04iLCJiaW5kaW5nX3R5cGUiOiJjZXJ0aWZpY2F0ZSIsImlzcyI6Imh0dHBzOlwvXC9vYi1pYW06OTQ0Nlwvb2F1dGgyXC90b2tlbiIsImNsaWVudF9pZCI6ImpYdUhQeFBoaXRNVWV2ZDRkMzFHU3MyNXVXY2EiLCJhdWQiOiJqWHVIUHhQaGl0TVVldmQ0ZDMxR1NzMjV1V2NhIiwibmJmIjoxNzQ5MDE0ODI1LCJhenAiOiJqWHVIUHhQaGl0TVVldmQ0ZDMxR1NzMjV1V2NhIiwib3JnX2lkIjoiMTAwODRhOGQtMTEzZi00MjExLWEwZDUtZWZlMzZiMDgyMjExIiwic2NvcGUiOiJhY2NvdW50cyIsImNuZiI6eyJ4NXQjUzI1NiI6Ik5SLW5mWVVmS3NDNnRBT0JIdmhtSHB3Sm51aWV0eVloTWRqWHdiS1RwOVEifSwiZXhwIjoxNzQ5MDE4NDI1LCJvcmdfbmFtZSI6IlN1cGVyIiwiaWF0IjoxNzQ5MDE0ODI1LCJiaW5kaW5nX3JlZiI6IjcxNGY4ZmNkM2E4N2VkZDBhNzg1ZDhlZDRmMzYwNTgzIiwianRpIjoiZjNkZWI2ZGQtYjQzNS00NTE4LWJhODQtYmQ2YTNlYzlkOWI5In0.GNu_ypDGilX5aGAdl7HTSwL0QoA2iSdqrN__VsREJ8Daq1knziOy69Fz_-3vvNecizXYEZ8bwkSR-XiVBSeOq8cj7K5KaGyWSA_ZjY4u6FDPML3FRg5NwULxy-qMAQPgXC-pgSEmS_Rg40jWS3OcJv4_PBw1I23YuQEcjkPc_N8BRgqPrryVZ3L-i22qTqC8crl7XhWYLc_864EDPGRz0pDbT_S710xLg6iMwXydCVe55LyFAdupX4OIEhvPj3jhBPs539cXAmCONw5dlR_FSOqtq8Pi6_gthZDADcPnd1ly9DuCaELdGLh6sKCxwcL8k_wxbp6UqZ33wpCT9OepaQ",
    "scope": "accounts",
    "token_type": "Bearer",
    "expires_in": 3600
   }
   ```

### Step 2: Initiate a consent

In this step, the API consumer creates a request to get the consent of the customer to access the accounts and its 
information from the bank. 

A sample consent initiation request looks as follows. You can try out this sample flow with the transport certificates 
available [here](../assets/attachments/transport-certs):

!!!note
      Replace the <AUTH_HEADER_VALUE> with Base64 encoded "admin_username:admin_password" value.
               `Eg: Base64(admin_username:admin_password)`

```
curl --location --request POST 'https://localhost:9446/api/fs/consent/manage/account-access-consents' \
--header 'Authorization: Basic <AUTH_HEADER_VALUE>' \
--header 'x-wso2-client-id: <CLIENT_ID>' \
--header 'Content-Type: application/json' \
--cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \
--data '{
   "Data":{
      "Permissions":[
         "ReadAccountsBasic",
         "ReadAccountsDetail",
         "ReadBalances",
         "ReadTransactionsDetail"
      ],
      "ExpirationDateTime": "2026-01-02T00:00:00+00:00",
      "TransactionFromDateTime": "2025-06-03T00:00:00+00:00",
      "TransactionToDateTime": "2025-12-01T00:00:00+00:00"
   },
   "Risk":{
   }
}'
```
The response contains a Consent ID. A sample response looks as follows:
```
{
    "Risk": {
        
    },
    "Data": {
        "ConsentId": "12a4ebc8-b98c-4f80-9a37-44679363b97b",
        "StatusUpdateDateTime": "2025-06-04T10:57:06+05:30",
        "Status": "AwaitingAuthorisation",
        "CreationDateTime": "2025-06-04T10:57:06+05:30",
        "Permissions": [
            "ReadAccountsBasic",
            "ReadAccountsDetail",
            "ReadBalances",
            "ReadTransactionsDetail"
        ],
        "ExpirationDateTime": "2026-01-02T00:00:00+00:00",
        "TransactionToDateTime": "2025-12-01T00:00:00+00:00",
        "TransactionFromDateTime": "2025-06-03T00:00:00+00:00"
    }
}
```

### Step 3: Authorizing a consent

The API consumer application redirects the bank customer to authenticate and approve/deny application-provided consents.

1. Generate a request object by signing your JSON payload using the supported algorithms. 
    
    ???tip "Click here to see a sample request object..."
        - Given below is a sample request object in the JWT format:
        
        ``` jwt tab='Sample'
        eyJraWQiOiJoM1pDRjBWcnpnWGduSENxYkhiS1h6emZqVGciLCJhbGciOiJQUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXhfYWdlIjo4NjQwMCwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6OTQ0Ni9vYXV0aDIvdG9rZW4iLCJzY29wZSI6ImFjY291bnRzIG9wZW5pZCIsImlzcyI6IlM2dTJIZTRqeXd2eXlwVDdmR1lFeExTeXBRWWEiLCJjbGFpbXMiOnsiaWRfdG9rZW4iOnsiYWNyIjp7InZhbHVlcyI6WyJ1cm46b3BlbmJhbmtpbmc6cHNkMjpzY2EiLCJ1cm46b3BlbmJhbmtpbmc6cHNkMjpjYSJdLCJlc3NlbnRpYWwiOnRydWV9LCJvcGVuYmFua2luZ19pbnRlbnRfaWQiOnsidmFsdWUiOiI4NmM4YTA4NS1hNDQ0LTQyZDUtYmU0My05NjhiMzY2YTU0NjciLCJlc3NlbnRpYWwiOnRydWV9fSwidXNlcmluZm8iOnsib3BlbmJhbmtpbmdfaW50ZW50X2lkIjp7InZhbHVlIjoiODZjOGEwODUtYTQ0NC00MmQ1LWJlNDMtOTY4YjM2NmE1NDY3IiwiZXNzZW50aWFsIjp0cnVlfX19LCJyZXNwb25zZV90eXBlIjoiY29kZSBpZF90b2tlbiIsInJlZGlyZWN0X3VyaSI6Imh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vIiwic3RhdGUiOiJZV2x6Y0Rvek1UUTIiLCJleHAiOjE3NTcyMzM1ODgsIm5vbmNlIjoibi0wUzZfV3pBMk1qIiwiY2xpZW50X2lkIjoiUzZ1MkhlNGp5d3Z5eXBUN2ZHWUV4TFN5cFFZYSJ9.mClPy-6g0Kn3JIF8P7odd-PiWYCSDhVyQJqn9SkHAXo07saGYD-YxQcqfghRnUbYc41SyAwtkw4bfbNLpqLFnmJsBiP3XjjDE0YwKwD4UXFMAac4zW9ooQtzr_5qXkGS5nNpua7KtpvNezNBgS5-c4MjuI6nUxL63rgmZyRoDlrK_Uxgx4CSxmJQkcHP8YzNvCVxe9ftpuKUlanCCgNvGg2ocmwpRP1G1-ZBr2e3nIfGsFxSaX-4vkur4chEyjk5YogfoxjnG1UjvP_al9M07W0J-eysviGMNqzJ7LDIVCDp5ZKrOnf1p_zPLE4No3xV8cN1ZTJJ_ufUABhJTYQKEw
        ```
        
        ``` tab='Format'
        {
          "kid": "<The KID value of the signing jwk set>",
          "alg": "<SUPPORTED_ALGORITHM>",
          "typ": "JWT"
        }
        {
          "max_age": 86400,
          "aud": "<This is the audience that the ID token is intended for. Example, https://<IS_HOST>:9446/oauth2/token>",
          "scope": "accounts openid",
          "iss": "<CLIENT_ID>",
          "claims": {
            "id_token": {
              "acr": {
                "values": [
                  "urn:openbanking:psd2:sca",
                  "urn:openbanking:psd2:ca"
                ],
                "essential": true
              },
              "openbanking_intent_id": {
                "value": "<CONSENTID>",
                "essential": true
              }
            },
            "userinfo": {
              "openbanking_intent_id": {
                "value": "<CONSENTID>",
                "essential": true
              }
            }
          },
          "response_type": "code id_token",  
          "redirect_uri": "<CLIENT_APPLICATION_REDIRECT_URI>",
          "state": "YWlzcDozMTQ2",
          "exp": <The expiration time of the request object in Epoch format>,
          "nonce": "<PREVENTS_REPLAY_ATTACKS>",
          "client_id": "<CLIENT_ID>"
        }
        ```

2. The bank sends the request to the customer stating the accounts and information that the API 
consumer wishes to access. This request is in the format of a URL as follows: 

    ``` url tab="Sample"
        https://localhost:9446/oauth2/authorize/?request=eyJraWQiOiJjSVlvLTV6WDRPVFdacEhybW1pWkRWeEFDSk0iLCJ0eXAiOiJKV1QiLCJhbGciOiJQUzI1NiJ9.eyJhdWQiOiJodHRwczovL29iLWlhbTo5NDQ2L29hdXRoMi90b2tlbiIsIm5iZiI6MTc0OTAyMDQ5MCwiY3JpdCI6e30sInNjb3BlIjoib3BlbmlkIGFjY291bnRzIG9wZW5pZCIsImNsYWltcyI6eyJpZF90b2tlbiI6eyJhY3IiOnsidmFsdWVzIjpbInVybjpvcGVuYmFua2luZzpwc2QyOmNhIiwidXJuOm9wZW5iYW5raW5nOnBzZDI6c2NhIl0sImVzc2VudGlhbCI6dHJ1ZX0sIm9wZW5iYW5raW5nX2ludGVudF9pZCI6eyJ2YWx1ZSI6IjE5NmFkZjAzLTQ2ZDAtNDA4Yy1hNzdiLWFhZWY0MDFlZWM2MiIsImVzc2VudGlhbCI6dHJ1ZX19LCJ1c2VyaW5mbyI6eyJvcGVuYmFua2luZ19pbnRlbnRfaWQiOnsidmFsdWUiOiIxOTZhZGYwMy00NmQwLTQwOGMtYTc3Yi1hYWVmNDAxZWVjNjIiLCJlc3NlbnRpYWwiOnRydWV9fX0sImlzcyI6ImpYdUhQeFBoaXRNVWV2ZDRkMzFHU3MyNXVXY2EiLCJyZXNwb25zZV90eXBlIjoiY29kZSBpZF90b2tlbiIsInJlZGlyZWN0X3VyaSI6Imh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vcmVkaXJlY3RzL3JlZGlyZWN0MSIsInN0YXRlIjoiZTkwNzY0YWYtOWIyZS00N2IyLWI3MzUtNzExNjE5ZTA2MmMzIiwiZXhwIjoxNzQ5MDIzOTcwLCJub25jZSI6IjIzNTJiMjZjLTE2YzUtNDdmNy04OTg4LWNhNDA1ZTdhZDIxZCIsImNsaWVudF9pZCI6ImpYdUhQeFBoaXRNVWV2ZDRkMzFHU3MyNXVXY2EifQ.rmM1Muwbm6qqtm_f3rcZOYMpbiaRQfFsQSs2SVxPCUIncaSHMcBp2vVeEoKkdo-kwysteNEdQw1uhceAU86muAqho7zFVvmTRdMGBi5Ad0zCtvu2QS00c-3Ur2GYKZM-EvfUhxYbwNx15Yu79rPWpgs9dT1qLTLTHtzkXQ_0Ib8U8u42jM3hiOnJontrRJn7WU3pAmcXRH886GJBBhPhgVPr9cpfsFvTcHIiPaxROuyteRh1_x2-_-4pz_1XZq-YkirsbN-p29CohEOzAdHhV80rIqCU_Wknp5Rkt4NT0hMSNeonxTOwfocQkXraZ5kDLb60Y_4vR5N8UUcmkIXQSw&scope=accounts%20openid&response_type=code%20id_token&redirect_uri=https%3A%2F%2Fwww.google.com%2Fredirects%2Fredirect1&state=ace6befc-90a4-4627-ae17-9aa4f75594e8&nonce=nonce&client_id=jXuHPxPhitMUevd4d31GSs25uWca
    ```
   
    ``` url tab="Format"
        https://<IS_HOST>:9446/oauth2/authorize?response_type=code%20id_token&client_id=<CLIENT_ID>&scope=accounts%20openid&redirect_uri=<APPLICATION_REDIRECT_URI>&state=YWlzcDozMTQ2&request=<REQUEST_OBJECT>&prompt=login&nonce=<REQUEST_OBJECT_NONCE>
    ```
   
3. Run the URL in a browser to prompt the invocation of the authorize API.

   ![login-screen-in-tryout-flow.png](../assets/img/get-started/quick-start-guide/login-screen-in-tryout-flow.png)

4. Upon successful authentication, the user is redirected to the consent authorize page. Use the login credentials of a user that has a `consumer` role. 

5. The page displays a list of bank accounts and the information that the API consumer wishes to access.
   ![grant consent](../assets/img/learn/consent-manager/consent-page-confirm.png)   
    
6. Data requested by the consent such as permissions, transaction period, and expiration date are displayed. Click 
 **Confirm** to grant these permissions.
    
7. Upon providing consent, an authorization code is generated on the web page of the `redirect_uri`. See the sample 
given below:

    The authorization code from the below URL is in the code parameter (`code=07e213e5-9971-3f0e-9acc-2fd99fd0304b`).

    ```
    https://www.google.com/redirects/redirect1#id_token=eyJ4NXQiOiJ5SFl1RDhrVHZWYzhGdjNUd3pmRUd1dHBudUEiLCJraWQiOiJOemRpTkRBd05ETmpaRE5rWlROak5UQm1NVE5rTVRObE1qRTNNakJqTnpobE1USmtaalk0TUdabU5ERmlZMll3TUdRM01qZzBNakpqT0RnM1lUWmtOUV9QUzI1NiIsImFsZyI6IlBTMjU2In0.eyJpc2siOiJmMGFkZTFkMDVmNjg4MTRlNzhjZTY2MTU5OTI1YzZhMDcyZTMwNWE0ZDI5NmRlOWJkODU2ZjdiOWMwMjQ0MTliIiwic3ViIjoiOTljMzEzMjAtNzA4ZC00NjYxLWEwYTgtZGVhYjZhMDQwYTJlQGNhcmJvbi5zdXBlciIsImFtciI6WyJCYXNpY0F1dGhlbnRpY2F0b3IiXSwiaXNzIjoiaHR0cHM6XC9cL29iLWlhbTo5NDQ2XC9vYXV0aDJcL3Rva2VuIiwibm9uY2UiOiJlODAzMTNlNC04ZTZlLTRkYjctOTg2Yi0yNjYwNDQ3OThlOTciLCJzaWQiOiI0NjQ5MDlhYi1jYjZjLTRjZDktYTU5OC0wYWU1MjExYzQzOTciLCJhdWQiOiJqWHVIUHhQaGl0TVVldmQ0ZDMxR1NzMjV1V2NhIiwiY19oYXNoIjoiVTZDWFVqc1h4VGdEMWxrM3JRRnpFdyIsInVzZXJfb3JnIjoiMTAwODRhOGQtMTEzZi00MjExLWEwZDUtZWZlMzZiMDgyMjExIiwic19oYXNoIjoiOHlLSmpOcE5RMlVVQXFuN2FFU3lvdyIsImF6cCI6ImpYdUhQeFBoaXRNVWV2ZDRkMzFHU3MyNXVXY2EiLCJvcmdfaWQiOiIxMDA4NGE4ZC0xMTNmLTQyMTEtYTBkNS1lZmUzNmIwODIyMTEiLCJleHAiOjE3NDkwMjgyODIsIm9yZ19uYW1lIjoiU3VwZXIiLCJpYXQiOjE3NDkwMjQ2ODIsImp0aSI6IjZmNWFhZGI1LTdkYTEtNDhiMS04NjVjLTBjOWY5YzRkMzc2NSIsImNvbnNlbnRfaWQiOiI3NDk5ZmYzMy1mNGRlLTRkZjQtYWI0MS1hMDEzMzQ0MGI3OGMifQ.Pe18gebXzDciawD_HwXnezPfP-hgB7QrAjxl1pyWYREuVEhWJ8s-S1hnp5KzOhPbeR8nyws7Qqg7gHurFFGfCFCyLJsH34889LAWSZhcLuPl1ia9wAtHCKztCd9ga6vohhyDoQXqLaIN8E4ZARuQ75xRkLKPektf3fXQiK5Tklr0g4Le-Ht53d39soPNzoF0cSl8csLrpPPSiSie5bNpL8OEZlsJWLv88Mv3RcxC8BhBeGVGMwImmmBD4oJc-wCetUgldoG4txAA_JtckOw0TWKSvuEF_Vx036Z_n6bY8YenILzgbb3MeHrAY7tHPE3JEKe9I4KhRyv6XkZ7gSA5Lg
    &code=07e213e5-9971-3f0e-9acc-2fd99fd0304b
    &session_state=0d1e5b4ce6cbc2a338f25baa18efab4929129127f058c6812e9ee0130a4715ea.L25p4RAFA8WfK3UH10OddQ
    &state=64f525ed-af4a-42f7-a671-78636bf6dd09
    ```
   
### Step 4: Generate user access token

1. You can generate a user access token using the sample request given below:
    ```
    curl -X POST \
    https://localhost:9446/oauth2/token \
    -H 'Cache-Control: no-cache' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    --cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH> \
    -d 'grant_type=authorization_code&code=07e213e5-9971-3f0e-9acc-2fd99fd0304b&scope=openid%20accounts&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&client_assertion=<CLIENT_ASSERTION>&redirect_uri=https://www.google.com/redirects/redirect1'
    ```

2. The `client_assertion` parameter is a JWT as explained in the 
[Generating an application access token](#step-1-generate-application-access-token) step.

3. Update all parameters and use the authorization code you generated in the previous step as `code`.

4. The response contains a user access token as below.
      ```
      {
       "access_token": "eyJ4NXQiOiJ5SFl1RDhrVHZWYzhGdjNUd3pmRUd1dHBudUEiLCJraWQiOiJOemRpTkRBd05ETmpaRE5rWlROak5UQm1NVE5rTVRObE1qRTNNakJqTnpobE1USmtaalk0TUdabU5ERmlZMll3TUdRM01qZzBNakpqT0RnM1lUWmtOUV9SUzI1NiIsInR5cCI6ImF0K2p3dCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5MWI2MjY2NC1jNGM3LTRkZTQtODZiMi1lMWNiMzg3MWIyMWVAY2FyYm9uLnN1cGVyIiwiYXV0IjoiQVBQTElDQVRJT05fVVNFUiIsImJpbmRpbmdfdHlwZSI6ImNlcnRpZmljYXRlIiwiaXNzIjoiaHR0cHM6XC9cL29iLWlhbTo5NDQ2XC9vYXV0aDJcL3Rva2VuIiwiY2xpZW50X2lkIjoialh1SFB4UGhpdE1VZXZkNGQzMUdTczI1dVdjYSIsImF1ZCI6ImpYdUhQeFBoaXRNVWV2ZDRkMzFHU3MyNXVXY2EiLCJuYmYiOjE3NDkwMTQ4NjAsImF6cCI6ImpYdUhQeFBoaXRNVWV2ZDRkMzFHU3MyNXVXY2EiLCJvcmdfaWQiOiIxMDA4NGE4ZC0xMTNmLTQyMTEtYTBkNS1lZmUzNmIwODIyMTEiLCJzY29wZSI6ImFjY291bnRzIG9wZW5pZCIsImNuZiI6eyJ4NXQjUzI1NiI6Ik5SLW5mWVVmS3NDNnRBT0JIdmhtSHB3Sm51aWV0eVloTWRqWHdiS1RwOVEifSwiZXhwIjoxNzQ5MDE4NDYwLCJvcmdfbmFtZSI6IlN1cGVyIiwiaWF0IjoxNzQ5MDE0ODYwLCJiaW5kaW5nX3JlZiI6IjcxNGY4ZmNkM2E4N2VkZDBhNzg1ZDhlZDRmMzYwNTgzIiwianRpIjoiNzJlZDkxOGEtYmNjMC00MGZlLTgzOTktZDgwODE1ZGNkMzRjIiwiY29uc2VudF9pZCI6IjEyYTRlYmM4LWI5OGMtNGY4MC05YTM3LTQ0Njc5MzYzYjk3YiJ9.vX1pCm55Ihcrxti1P4OAE59nit6FF28rrP8DuFVuxiz97i54V0Uu9EYyXUYeCe8fhJiJFjzlyfsh2PrW0o-RwM-tY3HRWF3Gx1hkUHxUJX7cIvfRKnnPIAvvVywZo5MrUSV_V0RFlu2VrG7fU8ADo8A-s3n_faqmN_PyoafAMjt5BUkfmqAmXuQlTl9DLnxbGf68fF5s8xf_gSOjHFfRx2nWM3TWcPR-IbWOiT1jQSf3m1M-q9kHthL7u1jN0UfqFZmjNEiFigphXxkCXOdhi9p4ci2JFH4YlZiAb0r6NPoWkGLfTErU_rOnSM77IWDV3Hbn7-NasBi2O30zqVq-kg",
       "refresh_token": "ae63f973-ad49-38f5-b9c1-9bef2cc129bf",
       "scope": "accounts openid",
       "id_token": "eyJ4NXQiOiJ5SFl1RDhrVHZWYzhGdjNUd3pmRUd1dHBudUEiLCJraWQiOiJOemRpTkRBd05ETmpaRE5rWlROak5UQm1NVE5rTVRObE1qRTNNakJqTnpobE1USmtaalk0TUdabU5ERmlZMll3TUdRM01qZzBNakpqT0RnM1lUWmtOUV9QUzI1NiIsImFsZyI6IlBTMjU2In0.eyJpc2siOiI0YTI1MWVkNjMzN2JiNWFhYTYxM2UwNTllMTc3YTFmOTZiOGVkYTJmYTQ0MjUxZWFkNTdiNDU4MmIyZDM1M2JhIiwiYXRfaGFzaCI6IlBxS2VvSmk5clRHMEdvLVVzS1ByTEEiLCJzdWIiOiI5MWI2MjY2NC1jNGM3LTRkZTQtODZiMi1lMWNiMzg3MWIyMWVAY2FyYm9uLnN1cGVyIiwiYW1yIjpbIkJhc2ljQXV0aGVudGljYXRvciJdLCJpc3MiOiJodHRwczpcL1wvb2ItaWFtOjk0NDZcL29hdXRoMlwvdG9rZW4iLCJub25jZSI6IjkzMTYxMGFiLWJhOTAtNDRjZi1hOWQ3LWYzMDlkNGE0MjY2YiIsImF1ZCI6ImpYdUhQeFBoaXRNVWV2ZDRkMzFHU3MyNXVXY2EiLCJhY3IiOiJ1cm46bWFjZTppbmNvbW1vbjppYXA6c2lsdmVyIiwiY19oYXNoIjoiZF9zelhPZkVKY3A5OXFaNHpMeWhCQSIsIm5iZiI6MTc0OTAxNDg2MCwiYXpwIjoialh1SFB4UGhpdE1VZXZkNGQzMUdTczI1dVdjYSIsIm9yZ19pZCI6IjEwMDg0YThkLTExM2YtNDIxMS1hMGQ1LWVmZTM2YjA4MjIxMSIsImV4cCI6MTc0OTAxODQ2MCwib3JnX25hbWUiOiJTdXBlciIsImlhdCI6MTc0OTAxNDg2MCwianRpIjoiMGRlZDcxYTAtM2EzOC00OGQ3LWFlYTEtZTlhZmI3MGYxNTc5In0.wjgZ0XuMhFUJMOBqnhkkSdO4Z7eiaNPWllg3SIoR5YQxec0WWIaRScfizXwTpzWtx7Y2zD94m1MsUDFwG857eyxTidpY_p3Yxk9MW8GJp9dDkfDjw3NR6aop-1441_SucYmoEVMGw0cMosAq6xmtI66ALAnHkjgGM6WTK2ymPi4oLHWjJ1xgCHvc5rftJPyBlvi92fb7SUjrow8rHLWTOKmw0fKe2IBqIqCM6oVvvE9_Q85RFOtEjqatpD2GJeb9Uz7BHrAJL5HChmge5BMfb-F9WdYeZfAIa0VaF2gdGWxfaPkQPnaStjyl6JN4tEZa7VVV2xZ42M1rgXd9fhM5Zg",
       "token_type": "Bearer",
       "expires_in": 3600
      }
      ```

### Step 5: Validate Account Information Invocation

The Consent Validate implements the validations that are required when the resource endpoints are invoked with a user access token.

!!! note
    In a real-life open banking environment, the API consumer applications can retrieve details of accounts for which 
    the bank customer has granted them consent.
 
- A sample request looks as follows:
   ```
   curl -X POST \
   https://localhost:9446/api/fs/consent/validate/validate \
   -H 'x-fapi-financial-id: open-bank' \
   -H 'x-wso2-client-id: <CLIENT_ID>' \
   -H 'Authorization: Basic <AUTH_HEADER_VALUE>' \
   -H 'Accept: application/json' \
   -H 'Content-Type: application/jwt \
   --cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH> \
   --data 'eyJraWQiOiJjSVlvLTV6WDRPVFdacEhybW1pWkRWeEFDSk0iLCJ0eXAiOiJKV1QiLCJhbGciOiJQUzI1NiJ9.CgkJCXsKICAgICAgCQkJImhlYWRlcnMiOiB7CiAJCQkgIAkJIkF1dGhvcml6YXRpb24iOiAiQmFzaWMgYVhOZllXUnRhVzVBZDNOdk1pNWpiMjA2ZDNOdk1qRXlNdz09IiwKIAkJCSAJIAkiY29uc2VudC1pZCI6ICIxMmE0ZWJjOC1iOThjLTRmODAtOWEzNy00NDY3OTM2M2I5N2IiLAogCQkJICAJCSJhY3Rpdml0eWlkIjogIjg2NjZhYTg0LWZjNWEtNDI1ZS05MWM5LTM3ZmEzMGE5NTc4NCIsCiAJCQkgIAkJIkNhY2hlLUNvbnRyb2wiOiAibm8tY2FjaGUiLAogCQkJICAJCSJDb25uZWN0aW9uIjogImtlZXAtYWxpdmUiLAogCQkgICAgICAJCSJVc2VyLUFnZW50IjogIlBvc3RtYW5SdW50aW1lLzcuMjguNCIsCiAJCQkgIAkJIkhvc3QiOiAibG9jYWxob3N0OjgyNDMiLAogCQkJICAJCSJQb3N0bWFuLVRva2VuIjogIjI0NGQxNWI2LWViMTgtNDA0NS1iYTg3LThlZTZjODMwYjg0YyIsCiAJCQkgIAkJIkFjY2VwdC1FbmNvZGluZyI6ICJnemlwLCBkZWZsYXRlLCBiciIsCiAJCQkgIAkJImFjY2VwdCI6ICJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04IgogCQkJICAJfSwKICAgICAgICAJCSJjb25zZW50SWQiOiAiMTJhNGViYzgtYjk4Yy00ZjgwLTlhMzctNDQ2NzkzNjNiOTdiIiwKICAgICAgICAJCSJyZXNvdXJjZVBhcmFtcyI6IHsKCQkJCQkicmVzb3VyY2UiOiAiL2Fpc3AvYWNjb3VudHMiLAoJCQkJCSJjb250ZXh0IjogIi9vcGVuLWJhbmtpbmcvdjMuMS9haXNwIiwKCQkJCQkiaHR0cE1ldGhvZCI6ICJHRVQiCiAJCQkgCSB9LAogCQkJICAgICJ1c2VySWQiOiAicHN1QHdzbzIuY29tIiwKICAgICAJCSAJImVsZWN0ZWRSZXNvdXJjZSI6ICIvYWNjb3VudHMiLAoJCQkJImNsaWVudElkIjogImpYdUhQeFBoaXRNVWV2ZDRkMzFHU3MyNXVXY2EiCiAJCQl9CiAgICAJCQk.mjbOnLQUvpCfIpy8WRaYxBmSMnENNIu7OG89Dc7kLJTk9NebnKsgFRo0PAyrkCN-h0g5PRfM0HPhSeBxbazgjekaLpA0iSXiuaXKZUmIUSBORNxORjvqD6flQRzUraaf2qG_OKSBMBpal-unqjcCAlNdgwclCnJMwDmQrJPMqs7jJoiJAudIHwppnJ1uK82Zz_J3bWkL4kEuT4Hz4P8ukdTzTALCPGqxt4VT4dh_ADzR-NTGmpAuSNo8dEWkW9a3QAxhS4WZXRTK192wAS16YqRPOk3UXasqF2qI1KVBb5txNFtjw5eZFW0Eg8cNSOQ0BSwp3B_6zd0jHf9EiwTbLA'
   ```

???tip "Click here to see a sample data payload..."
      - Given below is a sample payload in the JWT format:

           ```
           {
               "kid": "<The KID value of the signing jwk set>",
               "alg": "<SUPPORTED_ALGORITHM>",
               "typ": "JWT"
           }
           {
               "headers": {
                  "Authorization": "Basic aXNfYWRtaW5Ad3NvMi5jb206d3NvMjEyMw==",
                  "consent-id": "12a4ebc8-b98c-4f80-9a37-44679363b97b",
                  "activityid": "8666aa84-fc5a-425e-91c9-37fa30a95784",
                  "Cache-Control": "no-cache",
                  "Connection": "keep-alive",
                  "User-Agent": "PostmanRuntime/7.28.4",
                  "Host": "localhost:8243",
                  "Postman-Token": "244d15b6-eb18-4045-ba87-8ee6c830b84c",
                  "Accept-Encoding": "gzip, deflate, br",
                  "accept": "application/json; charset=utf-8"
               },
               "consentId": "<CONSENT_ID>",
               "resourceParams": {
               "resource": "/aisp/accounts",
               "context": "/open-banking/v3.1/aisp",
               "httpMethod": "GET"
           },
           "userId": "psu@wso2.com",
           "electedResource": "/accounts",
           "clientId": "<CLIENT_ID>"
           }
           ```
     
- The request validates the Account Information access request. 

    !!! note
        The response contains the validity of the Account access request along with consent information or the reason for the validation failure.

```
{
    "isValid": true,
    "consentInformation": "eyJhbGciOiJSUzI1NiJ9.eyJjbGllbnRJZCI6ImpYdUhQeFBoaXRNVWV2ZDRkMzFHU3MyNXVXY2EiLCJjdXJyZW50U3RhdHVzIjoiQXV0aG9yaXNlZCIsImNyZWF0ZWRUaW1lc3RhbXAiOjE3NDkwMTQ4MjYsInJlY3VycmluZ0luZGljYXRvciI6ZmFsc2UsImF1dGhvcml6YXRpb25SZXNvdXJjZXMiOlt7InVwZGF0ZWRUaW1lIjoxNzQ5MDE0ODU4LCJjb25zZW50SWQiOiIxMmE0ZWJjOC1iOThjLTRmODAtOWEzNy00NDY3OTM2M2I5N2IiLCJhdXRob3JpemF0aW9uSWQiOiI0NzRlYzFhMS1kZDRkLTQ1YjQtYTk4Zi1kMWYwNGRlMjUxYWEiLCJhdXRob3JpemF0aW9uVHlwZSI6ImF1dGhvcmlzYXRpb24iLCJ1c2VySWQiOiJwc3VAd3NvMi5jb20iLCJhdXRob3JpemF0aW9uU3RhdHVzIjoiQXV0aG9yaXNlZCJ9XSwidXBkYXRlZFRpbWVzdGFtcCI6MTc0OTAxNDg1OCwiY29uc2VudF90eXBlIjoiYWNjb3VudHMiLCJ2YWxpZGl0eVBlcmlvZCI6MCwiY29uc2VudEF0dHJpYnV0ZXMiOnt9LCJjb25zZW50SWQiOiIxMmE0ZWJjOC1iOThjLTRmODAtOWEzNy00NDY3OTM2M2I5N2IiLCJjb25zZW50TWFwcGluZ1Jlc291cmNlcyI6W3sibWFwcGluZ0lkIjoiNjZhOTU4YWItMjNkNC00ODhhLTg3M2EtYzM3MzRjN2VlMzVkIiwibWFwcGluZ1N0YXR1cyI6ImFjdGl2ZSIsImFjY291bnRfaWQiOiIzMDA4MDAxMjM0MzQ1NiIsImF1dGhvcml6YXRpb25JZCI6IjQ3NGVjMWExLWRkNGQtNDViNC1hOThmLWQxZjA0ZGUyNTFhYSIsInBlcm1pc3Npb24iOiJwcmltYXJ5In1dLCJhZGRpdGlvbmFsQ29uc2VudEluZm8iOnt9LCJyZWNlaXB0Ijp7IlJpc2siOnt9LCJEYXRhIjp7IlRyYW5zYWN0aW9uVG9EYXRlVGltZSI6IjIwMjUtMDYtMDdUMTA6NTc6MDIuOTczNDIxKzA1OjMwIiwiRXhwaXJhdGlvbkRhdGVUaW1lIjoiMjAyNS0wNi0wOVQxMDo1NzowMi45NzIyNjErMDU6MzAiLCJQZXJtaXNzaW9ucyI6WyJSZWFkQWNjb3VudHNCYXNpYyIsIlJlYWRBY2NvdW50c0RldGFpbCIsIlJlYWRCYWxhbmNlcyIsIlJlYWRUcmFuc2FjdGlvbnNEZXRhaWwiXSwiVHJhbnNhY3Rpb25Gcm9tRGF0ZVRpbWUiOiIyMDI1LTA2LTA0VDEwOjU3OjAyLjk3MzMyNCswNTozMCJ9fSwiY29uc2VudEZyZXF1ZW5jeSI6MH0.dtk8sPwuLdgHENiu7soD-I7cinmVGKn2Dn23pfcrPzqoGC5HuSJ9pPvYnCOeEMvf0gtvSaLbtn02CIo3oNn9JQiyQeR6iaINMfnXxINybWZvIlYowXAePESt3mh9BKNJ8SUWBdQQ1rjq5Jv4WY2Y3rKSqVyxn1l-5bmS7hiE6eb-REE4zqQY4sD8cfQAtJPcn5QWBDjUTssiTHuHJlROdXZTs7NpexzueFWOnMEPw00u9agW-hVnq6i8bDT4AH-ZLNZVT8IozGZ0AFbf9qBbYr5t0wmmiRwXmMEeoXa4np_nFOxzlt4kFdqdM47QIwq71dAzhQW9psMoZd6p6yMPug"
}
```

This document provides step by step instructions to invoke the Accounts Information Service API without use of pre consent initiation. Following diagram illustrates the sample Open Banking flow which is going to try from this documentation section.

![Open Banking Demo Flow](../../assets/img/get-started/quick-start-guide/scope_based_consent_flow.png)


??? note "Click here to see the configurations:"
    - Open the `<IS_HOME>/repository/conf/deployment.toml` file.
    - Set `is_pre_initiated_consent` to false. Setting below config to false will enable scope based consent flow for all scopes registered in the deployment.

      ``` toml
         [financial_services.consent]
         is_pre_initiated_consent=false
      ```

    - If you want to enable scope based consent flow only for specific scopes only you can use the following configuration.

      ``` toml
         [financial_services.consent]
         is_pre_initiated_consent=true
         pre_initiated.scopes=["payments"]
         scope_based.scopes=["accounts", "balances"]
      ```

!!! note
      In the following steps, there are JWTs that's needed to be created where the payload has to be changed. Hence, use the following certificates to sign the JWT in following steps:

       - [signing certificate](../../assets/attachments/signing-certs/obsigning.pem)
       - [private keys](../../assets/attachments/signing-certs/obsigning.key)

### Step 3: Authorizing a consent

The API consumer application redirects the bank customer to authenticate and approve/deny application-provided consents.

1. Generate a request object by signing your JSON payload using the supported algorithms.


      - ??? tip "Click here to see a sample request object..."
            - Given below is a sample request object in the JWT format:
      
            ``` jwt tab='Sample'
                 eyJraWQiOiJzQ2VrTmdTV0lhdVEzNGtsUmhER3Fmd3BqYzQiLCJ0eXAiOiJKV1QiLCJhbGciOiJQUzI1NiJ9.eyJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo5NDQ2L29hdXRoMi90b2tlbiIsIm5iZiI6MTc1Njc4Mjk2NSwiY3JpdCI6e30sInNjb3BlIjoib3BlbmlkIGFjY291bnRzIiwiY2xhaW1zIjp7ImlkX3Rva2VuIjp7ImFjciI6eyJ2YWx1ZXMiOlsidXJuOm9wZW5iYW5raW5nOnBzZDI6Y2EiLCJ1cm46b3BlbmJhbmtpbmc6cHNkMjpzY2EiXSwiZXNzZW50aWFsIjp0cnVlfX19LCJpc3MiOiJpZEh2SGNVNUdIbTd3ZnNEMDZwd2xQcWZWNVFhIiwicmVzcG9uc2VfdHlwZSI6ImNvZGUgaWRfdG9rZW4iLCJyZWRpcmVjdF91cmkiOiJodHRwczovL3d3dy5nb29nbGUuY29tL3JlZGlyZWN0cy9yZWRpcmVjdDEiLCJzdGF0ZSI6IjhkYTZmNmVmLThjZjktNDY1MS1iNTdmLTljNGNjNzlkZGE4OCIsImV4cCI6MTc1Njc4NjQ0NSwibm9uY2UiOiIzZThlMzllZC01Yzc0LTQ2ZmQtYjYyOS01YzAxYTMyMzViZWMiLCJjbGllbnRfaWQiOiJpZEh2SGNVNUdIbTd3ZnNEMDZwd2xQcWZWNVFhIn0.hqt_HhsYVcqACFudUq8Z58EnLaMyMTMvdroGBWyx7zNELU-nSx5-SYj6qUYOzHyAWsgwGkVO-ZMZcAU_xxaU1MJai1JGpBRDOqFbcmfondsxHqQYQuSm0AEK2JYHVQjlGsg8ynIrC__QCzOKl8KflhiTPF7hu4l5pm15QDgNR2dVz4XBcKNc8q2pqYotu3K65eJDRdv-En9G3yTpyE56u-9aTupYTKCn4nUYhH5DF6zsz6RNsq_W8LxWyr53SNJxkKZyAZVUmCuZnfEoYERtngh90S4QuLOdYrnG76Yh9VhbrU7D6bFI4tv-Uerg4RzdkxkURmLutVdppfIYQ14TOg
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
        https://localhost:9446/oauth2/authorize/?request=eyJraWQiOiJzQ2VrTmdTV0lhdVEzNGtsUmhER3Fmd3BqYzQiLCJ0eXAiOiJKV1QiLCJhbGciOiJQUzI1NiJ9.eyJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo5NDQ2L29hdXRoMi90b2tlbiIsIm5iZiI6MTc1Njc4Mjk2NSwiY3JpdCI6e30sInNjb3BlIjoib3BlbmlkIGFjY291bnRzIiwiY2xhaW1zIjp7ImlkX3Rva2VuIjp7ImFjciI6eyJ2YWx1ZXMiOlsidXJuOm9wZW5iYW5raW5nOnBzZDI6Y2EiLCJ1cm46b3BlbmJhbmtpbmc6cHNkMjpzY2EiXSwiZXNzZW50aWFsIjp0cnVlfX19LCJpc3MiOiJpZEh2SGNVNUdIbTd3ZnNEMDZwd2xQcWZWNVFhIiwicmVzcG9uc2VfdHlwZSI6ImNvZGUgaWRfdG9rZW4iLCJyZWRpcmVjdF91cmkiOiJodHRwczovL3d3dy5nb29nbGUuY29tL3JlZGlyZWN0cy9yZWRpcmVjdDEiLCJzdGF0ZSI6IjhkYTZmNmVmLThjZjktNDY1MS1iNTdmLTljNGNjNzlkZGE4OCIsImV4cCI6MTc1Njc4NjQ0NSwibm9uY2UiOiIzZThlMzllZC01Yzc0LTQ2ZmQtYjYyOS01YzAxYTMyMzViZWMiLCJjbGllbnRfaWQiOiJpZEh2SGNVNUdIbTd3ZnNEMDZwd2xQcWZWNVFhIn0.hqt_HhsYVcqACFudUq8Z58EnLaMyMTMvdroGBWyx7zNELU-nSx5-SYj6qUYOzHyAWsgwGkVO-ZMZcAU_xxaU1MJai1JGpBRDOqFbcmfondsxHqQYQuSm0AEK2JYHVQjlGsg8ynIrC__QCzOKl8KflhiTPF7hu4l5pm15QDgNR2dVz4XBcKNc8q2pqYotu3K65eJDRdv-En9G3yTpyE56u-9aTupYTKCn4nUYhH5DF6zsz6RNsq_W8LxWyr53SNJxkKZyAZVUmCuZnfEoYERtngh90S4QuLOdYrnG76Yh9VhbrU7D6bFI4tv-Uerg4RzdkxkURmLutVdppfIYQ14TOg&scope=openid accounts&response_type=code id_token&redirect_uri=https://www.google.com/redirects/redirect1&state=8b028d5e-f149-49a9-977a-c204fd330446&nonce=nonce&client_id=idHvHcU5GHm7wfsD06pwlPqfV5Qa
    ```

    ``` url tab="Format"
        https://<IS_HOST>:9446/oauth2/authorize?response_type=code%20id_token&client_id=<CLIENT_ID>&scope=accounts%20openid&redirect_uri=<APPLICATION_REDIRECT_URI>&state=YWlzcDozMTQ2&request=<REQUEST_OBJECT>&prompt=login&nonce=<REQUEST_OBJECT_NONCE>
    ```

3. Run the URL in a browser to prompt the invocation of the authorize API.

   ![login-screen-in-tryout-flow.png](../../assets/img/get-started/quick-start-guide/login-screen-in-tryout-flow.png)

4. Upon successful authentication, the user is redirected to the consent authorize page. Use the login credentials of a user that has a `consumer` role.

5. The page displays a list of bank accounts and the information that the API consumer wishes to access.
   ![grant consent](../../assets/img/try-out/scope-based-consent-screen.png)

6. Data requested by the consent such as scopes and expiration date are displayed. Click **Confirm** to grant these permissions.

7. Upon providing consent, an authorization code is generated on the web page of the `redirect_uri`. See the sample
   given below:

   The authorization code from the below URL is in the code parameter (`code=144060b4-4d8c-3a0b-a44e-66baf58651f1`).

   ```
       https://www.google.com/redirects/redirect1#id_token=eyJ4NXQiOiJjZmNONHdac21NMWxtOXBXX2xFUl9LS3ZwRmMiLCJraWQiOiJPV0ptTnpneU5UTmhNR05pTXpFMU5HUTNaall4WlRVellUSTJNbVpoWlRFeVl6SmtZVGRsTURCallqSTJNRE5sWldJeFltUTJNRGt6WVdZNU9ERm1aUV9QUzI1NiIsImFsZyI6IlBTMjU2In0.eyJpc2siOiI0OTcyZjc1YzRjNTBiNTZiYWY1NmJhYzI4MGNiNDFkMWUxYjk5MmRhYTgzNTFiMWE3NGZiZWFiOGJmNDMyOWQzIiwic3ViIjoiMGE0ZmI0ZDgtNGMwMy00MGQ5LWI1MWItNmE1NGRlZDNmNzFlQGNhcmJvbi5zdXBlciIsImFtciI6WyJCYXNpY0F1dGhlbnRpY2F0b3IiXSwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQ2XC9vYXV0aDJcL3Rva2VuIiwibm9uY2UiOiIzZThlMzllZC01Yzc0LTQ2ZmQtYjYyOS01YzAxYTMyMzViZWMiLCJzaWQiOiIzMzViM2UzYS05YTI2LTRhYzUtYjdlMy0wZmRiMGIyMzFmNjYiLCJhdWQiOiJpZEh2SGNVNUdIbTd3ZnNEMDZwd2xQcWZWNVFhIiwiYWNyIjoidXJuOm1hY2U6aW5jb21tb246aWFwOnNpbHZlciIsImNfaGFzaCI6IjJYZDcxWGxGVGowcmJrSF9LeWFNenciLCJ1c2VyX29yZyI6IjEwMDg0YThkLTExM2YtNDIxMS1hMGQ1LWVmZTM2YjA4MjIxMSIsInNfaGFzaCI6Ikg2ODhGZkNJZkFBdEg4YUhBUXVwREEiLCJhenAiOiJpZEh2SGNVNUdIbTd3ZnNEMDZwd2xQcWZWNVFhIiwib3JnX2lkIjoiMTAwODRhOGQtMTEzZi00MjExLWEwZDUtZWZlMzZiMDgyMjExIiwiZXhwIjoxNzU2Nzg2NTkzLCJvcmdfbmFtZSI6IlN1cGVyIiwiaWF0IjoxNzU2NzgyOTkzLCJqdGkiOiJhNjNkOGJhMC01MzdlLTQ5YmQtODI0OC1kMTFjMzJmMjYwNmQiLCJjb25zZW50X2lkIjoiNWRlMzhiZGMtZGNmZS00ODUxLWFkMDAtMDM0NjkyYjYzMzgzIn0.O7wVUa239KyF7uswwHDptwlb5rqkyF4mNE5ZS-pD0-oiF08kDimy4f6HGmtCZ93oWVVM4ItCR4z3AeSyi_gIHsqf8Lo3XS5bfODONnvuhtt0vZahxy_G6jiHSaeuiAM5TMasFys_nVOC6T7dAlo_FAI5J6sCHB18bynuYEyPSotz5ZalOl2JeVdUueDIMzhgXuJGeX6_a4E5VrX8c-hm3kytN2vt0HPxPEdkKfFuxHql84OIwn2yhJuPJ1uBhRxsu-V58a8F4qslnqVs2pmd4-V4nfTlLWpSi-w71ycYQB3PZsH2UglRVxksITzDc4YpxKQ0fTHL3m2BdwdfXxwDcg&code=144060b4-4d8c-3a0b-a44e-66baf58651f1&session_state=643f531cef2255b3fd44b1144dad89153282eae20e95fa33d5891ffac114a515.AWErsW9ia1w7Pi11KK_H-w&state=8da6f6ef-8cf9-4651-b57f-9c4cc79dda88
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

??? tip "Click here to see a sample data payload..."
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

The response contains the validity of the Account access request along with consent information or the reason for the validation failure.

```
{
    "isValid": true,
    "consentInformation": "eyJhbGciOiJSUzI1NiJ9.eyJjbGllbnRJZCI6ImpYdUhQeFBoaXRNVWV2ZDRkMzFHU3MyNXVXY2EiLCJjdXJyZW50U3RhdHVzIjoiQXV0aG9yaXNlZCIsImNyZWF0ZWRUaW1lc3RhbXAiOjE3NDkwMTQ4MjYsInJlY3VycmluZ0luZGljYXRvciI6ZmFsc2UsImF1dGhvcml6YXRpb25SZXNvdXJjZXMiOlt7InVwZGF0ZWRUaW1lIjoxNzQ5MDE0ODU4LCJjb25zZW50SWQiOiIxMmE0ZWJjOC1iOThjLTRmODAtOWEzNy00NDY3OTM2M2I5N2IiLCJhdXRob3JpemF0aW9uSWQiOiI0NzRlYzFhMS1kZDRkLTQ1YjQtYTk4Zi1kMWYwNGRlMjUxYWEiLCJhdXRob3JpemF0aW9uVHlwZSI6ImF1dGhvcmlzYXRpb24iLCJ1c2VySWQiOiJwc3VAd3NvMi5jb20iLCJhdXRob3JpemF0aW9uU3RhdHVzIjoiQXV0aG9yaXNlZCJ9XSwidXBkYXRlZFRpbWVzdGFtcCI6MTc0OTAxNDg1OCwiY29uc2VudF90eXBlIjoiYWNjb3VudHMiLCJ2YWxpZGl0eVBlcmlvZCI6MCwiY29uc2VudEF0dHJpYnV0ZXMiOnt9LCJjb25zZW50SWQiOiIxMmE0ZWJjOC1iOThjLTRmODAtOWEzNy00NDY3OTM2M2I5N2IiLCJjb25zZW50TWFwcGluZ1Jlc291cmNlcyI6W3sibWFwcGluZ0lkIjoiNjZhOTU4YWItMjNkNC00ODhhLTg3M2EtYzM3MzRjN2VlMzVkIiwibWFwcGluZ1N0YXR1cyI6ImFjdGl2ZSIsImFjY291bnRfaWQiOiIzMDA4MDAxMjM0MzQ1NiIsImF1dGhvcml6YXRpb25JZCI6IjQ3NGVjMWExLWRkNGQtNDViNC1hOThmLWQxZjA0ZGUyNTFhYSIsInBlcm1pc3Npb24iOiJwcmltYXJ5In1dLCJhZGRpdGlvbmFsQ29uc2VudEluZm8iOnt9LCJyZWNlaXB0Ijp7IlJpc2siOnt9LCJEYXRhIjp7IlRyYW5zYWN0aW9uVG9EYXRlVGltZSI6IjIwMjUtMDYtMDdUMTA6NTc6MDIuOTczNDIxKzA1OjMwIiwiRXhwaXJhdGlvbkRhdGVUaW1lIjoiMjAyNS0wNi0wOVQxMDo1NzowMi45NzIyNjErMDU6MzAiLCJQZXJtaXNzaW9ucyI6WyJSZWFkQWNjb3VudHNCYXNpYyIsIlJlYWRBY2NvdW50c0RldGFpbCIsIlJlYWRCYWxhbmNlcyIsIlJlYWRUcmFuc2FjdGlvbnNEZXRhaWwiXSwiVHJhbnNhY3Rpb25Gcm9tRGF0ZVRpbWUiOiIyMDI1LTA2LTA0VDEwOjU3OjAyLjk3MzMyNCswNTozMCJ9fSwiY29uc2VudEZyZXF1ZW5jeSI6MH0.dtk8sPwuLdgHENiu7soD-I7cinmVGKn2Dn23pfcrPzqoGC5HuSJ9pPvYnCOeEMvf0gtvSaLbtn02CIo3oNn9JQiyQeR6iaINMfnXxINybWZvIlYowXAePESt3mh9BKNJ8SUWBdQQ1rjq5Jv4WY2Y3rKSqVyxn1l-5bmS7hiE6eb-REE4zqQY4sD8cfQAtJPcn5QWBDjUTssiTHuHJlROdXZTs7NpexzueFWOnMEPw00u9agW-hVnq6i8bDT4AH-ZLNZVT8IozGZ0AFbf9qBbYr5t0wmmiRwXmMEeoXa4np_nFOxzlt4kFdqdM47QIwq71dAzhQW9psMoZd6p6yMPug"
}
```

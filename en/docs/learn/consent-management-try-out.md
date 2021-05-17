This document provides the instructions to try out consent initiation, retrieval, update, and deletion.

!!! tip "Prerequisites" 
    - Before you try out the consent flow, you need to do the following:
        - Register an application for the API consumer.
        - Deploy and subscribe to the relevant APIs to access banking information. For example, account and payment information.
        
        !!!note
            - For testing purposes, we have included the following sample APIs in the Accelerator pack for WSO2 API Manager. 
                - Dynamic Client Registration API. See [Deploy DCR API](https://ob.docs.wso2.com/en/latest/get-started/api-consumer-onboarding/#step-1-deploy-the-dynamic-client-registrationdcr-api) for instructions.
                - Account Information Service API. See [Deploy and Subscribe sample Account and Transaction API](https://ob.docs.wso2.com/en/latest/get-started/try-out-flow/) for instructions.
                
### Step 1: Consent Initiation
- The API consumer needs to initiate an authorisation flow before accessing the account information of a customer. Therefore, 
the API consumer creates a request to get the consent of the customer to access the accounts and its information from 
the bank. A sample request looks as follows:
```
curl -X POST \
https://<IS_HOST>:9446/oauth2/authorize? \
-H 'Authorization: Bearer eyJ4NXQiOiJZMkk0WW1Rek5URmlZems0TXpVek5qQXdPRFUxWTJOaVl6SXpPVGhoTmpZM01tVm1aVEpqTWpJMFlqQTRNR1U1TUdJd09Ua3paVEV5TWpjM05tSTVZUSIsImtpZCI6IjEyMyIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhZG1pbkB3c28yLmNvbUBjYXJib24uc3VwZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IkpFR2dyYllxaWhBdXRmeVRHYlVoaTZvQlVNUWEiLCJuYmYiOjE2MTc1NTIzNzksImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJhenAiOiJKRUdncmJZcWloQXV0ZnlUR2JVaGk2b0JVTVFhIiwic2NvcGUiOiJhY2NvdW50cyBwYXltZW50cyIsImlzcyI6Imh0dHBzOlwvXC9vYjMtdGVzdHNlcnZlcjE6OTQ0Nlwvb2F1dGgyXC90b2tlbiIsImNuZiI6eyJ4NXQjUzI1NiI6ImRtaVk1ZE03cE81VzdpbjhrUmFqZkFycXlUTU9uRlcyOVdCVU5rUUlYZTgifSwiZXhwIjoxNjE3NTU1OTc5LCJpYXQiOjE2MTc1NTIzNzksImp0aSI6IjU3MTEyM2M0LTk3NTYtNDk4ZC05N2JhLTdlOGZiZjk5YmQyYyJ9.tbBfM4qFqkKwRumUDWdCPG9nDeRkx2M5Jw03FRkgPgSDazffycCXP6CQMIlJ2eK2Wn54YDe2gUlV-QHh9WybxJ8Q_ol7WPG5aGEzRKGRFrL66k08IF90YCBAZJZlyhpQo1uePQsDHSFypbS1Iw8hOfmtTHWFa7dguqSdJcXffmoRLH2p6XWA6V3VauFMsX96GugLH9FFUxbZoFMJhhPSjPDdJSY5r1za-MacZ_vaaqEUMOaYffkVsPo-aHZhdBeLA9tb9FMEmr5dQZo67d3xfPiZtV7cZojblJ_x3qDwgm-WOwh-UebfgcdE9ZsQ2Q7P7-kqVGztUGEtg0vmWa3JBA' \
-H 'Content-Type: application/json' \
--cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \
-d '{
   "Data":{
      "Permissions": [
       "ReadAccountsDetail",
       "ReadTransactionsDetail",
       "ReadBalances"
    ],
      "ExpirationDateTime":"2021-09-02T00:00:00+00:00",
      "TransactionFromDateTime":"2021-01-01T00:00:00+00:00",
      "TransactionToDateTime":"2021-03-03T00:00:00+00:00"
   },
   "Risk":{

   }
}'
```
- The response contains a Consent ID. A sample response looks as follows:
```
{
    "consentId": "1631c501-474a-4335-829d-7de25ca6ecdb",
    "Risk": {},
    "Data": {
        "TransactionToDateTime": "2021-03-03T00:00:00+00:00",
        "ExpirationDateTime": "2021-09-02T00:00:00+00:00",
        "Permissions": [
            "ReadAccountsDetail",
            "ReadTransactionsDetail",
            "ReadBalances"
        ],
        "TransactionFromDateTime": "2021-01-01T00:00:00+00:00"
    }
}
```
- The bank sends the request to the customer stating the accounts and information that the API consumer wishes to access.
    
??? tip "Click here to see the authorization flow..."
    - The request that the bank sends to the customer is in the format of a URL as follows: 
      ```
      https://{IS_HOST}:9446/oauth2/authorize?response_type=code%20id_token&client_id=HOUkaSby8DydnbeIhE7lycbkII8a&redir
      ect_uri=https://wso2.com&scope=accounts%20openid&state=af0ifjsldkj&nonce=n-0S6_WzA2Mj&request=eyJraWQiOiJEd01LZFdN
      bWo3UFdpbnZvcWZReVhWenlaNlEiLCJ0eXAiOiJKV1QiLCJhbGciOiJQUzI1NiJ9.eyJhdWQiOiJodHRwczovL29iMy10ZXN0c2VydmVyMTo5NDQ2L
      29hdXRoMi90b2tlbiIsIm1heF9hZ2UiOjg2NDAwLCJjcml0IjpbImI2NCIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvaWF0IiwiaHR0cDovL29
      wZW5iYW5raW5nLm9yZy51ay9pc3MiLCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL3RhbiJdLCJzY29wZSI6ImFjY291bnRzIG9wZW5pZCIsImV4c
      CI6MTk1NDcwODcxMCwiY2xhaW1zIjp7ImlkX3Rva2VuIjp7ImFjciI6eyJ2YWx1ZXMiOlsidXJuOm9wZW5iYW5raW5nOnBzZDI6Y2EiLCJ1cm46b3B
      lbmJhbmtpbmc6cHNkMjpzY2EiXSwiZXNzZW50aWFsIjp0cnVlfSwib3BlbmJhbmtpbmdfaW50ZW50X2lkIjp7InZhbHVlIjoiMTMyZWUzMTktZTk5M
      i00M2ZmLTk5YWMtOTI2ZTdkY2JhZGEyIiwiZXNzZW50aWFsIjp0cnVlfX0sInVzZXJpbmZvIjp7Im9wZW5iYW5raW5nX2ludGVudF9pZCI6eyJ2YWx
      1ZSI6IjEzMmVlMzE5LWU5OTItNDNmZi05OWFjLTkyNmU3ZGNiYWRhMiIsImVzc2VudGlhbCI6dHJ1ZX19fSwiaXNzIjoiSE9Va2FTYnk4RHlkbmJlS
      WhFN2x5Y2JrSUk4YSIsInJlc3BvbnNlX3R5cGUiOiJjb2RlIGlkX3Rva2VuIiwicmVkaXJlY3RfdXJpIjoiaHR0cHM6Ly93c28yLmNvbSIsInN0YXR
      lIjoiMHBOME5CVEhjdiIsIm5vbmNlIjoiakJYaE9tT0tDQiIsImNsaWVudF9pZCI6IkhPVWthU2J5OER5ZG5iZUloRTdseWNia0lJOGEifQ.AVjFFO
      HsSTIfZG93NBnX6W_1vdYUb0sfICviNBj7v7UkFSmGVixH9hmYSa86ZM7zLlr8p3aPGxSYsCwcUpHnHGAyNsMJQRaAlhDKFch5lcYU_4_m6Xlqd78r
      p3qNU25NGEPXpa-6F8jVyL42IacPRg_Trd-L0htbxhUVQ0J0lSTcD0HJVJZJDhSMuWCRbWnDKl6XFFayuTgRU6X92Ly6913aL0ag8REzyVnwalDj_2
      ec4nkz4oURerM17FY4vPxxfoc7NNrd83Gg6Mmg1WrKjXdqalevavI2U5uie0FWZIviPe8ZfKqga5cutLC0lbqbX_6_A3XhiSEjVILHS_bGIQ
      ```
      ???tip "Click here to see how to generate a request object..."
              - Generate the request object by signing the following JSON payload using the supported algorithms. Given below is 
              a sample request object in the JWT format:
              ```
              eyJraWQiOiJfTG03VFVWNF8yS3dydWhJQzZUWTdtel82WTQxMlhabG54dHl5QXB6eEw4Iiwi
              YWxnIjoiUFMyNTYiLCJ0eXAiOiJKV1QifQ.eyJtYXhfYWdlIjo4NjQwMCwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6ODI0My90b2tlbiIsInNjb3BlIjoiY
              WNjb3VudHMgb3BlbmlkIiwiaXNzIjoiNGhaSUxBVGZQeVhsTEZxa1AzWjBPQllobUR3YSIsImNsYWltcyI6eyJpZF90b2tlbiI6eyJhY3IiOnsidmFsdWVzI
              jpbInVybjpvcGVuYmFua2luZzpwc2QyOnNjYSIsInVybjpvcGVuYmFua2luZzpwc2QyOmNhIl0sImVzc2VudGlhbCI6dHJ1ZX0sIm9wZW5iYW5raW5nX2lud
              GVudF9pZCI6eyJ2YWx1ZSI6Ijg2YzhhMDg1LWE0NDQtNDJkNS1iZTQzLTk2OGIzNjZhNTQ2NyIsImVzc2VudGlhbCI6dHJ1ZX19LCJ1c2VyaW5mbyI6eyJvc
              GVuYmFua2luZ19pbnRlbnRfaWQiOnsidmFsdWUiOiI4NmM4YTA4NS1hNDQ0LTQyZDUtYmU0My05NjhiMzY2YTU0NjciLCJlc3NlbnRpYWwiOnRydWV9fX0sI
              nJlc3BvbnNlX3R5cGUiOiJjb2RlIGlkX3Rva2VuIiwicmVkaXJlY3RfdXJpIjoiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8iLCJzdGF0ZSI6IllXbHpjRG96T
              VRRMiIsImV4cCI6MTYzMzU4NjQwOCwibm9uY2UiOiJuLTBTNl9XekEyTWoiLCJjbGllbnRfaWQiOiI0aFpJTEFUZlB5WGxMRnFrUDNaME9CWWhtRHdhIn0.m
              -iCjJ76a7zDUIwRme2fP17oBcDAS9nxlt-KOSKVKZYRQ5Z534TNfRhfd0uVAcay0-eLATwNIAHQaAgM8FPcgeUeOS5ZKHBJ-0py5G5jxkkVPDwIY7lDvL6nd
              ADy6Cq720CDOLOe5mqmIdKeJNTn-OBmFkcSsr00MxOYZIOqyof2c1Zxx4WEqWtQza4bb84Xji_AoHlezTYEGSm9OOP--uMaOMdY8GjJtjpcSWRGWmQPQFjhQ
              RpK70Dz7AiZ73ODN8Ic9XCTDwKiE5jE_hHYi7qF2QIIUubjeVgRMAjF9A18t9VQDqLt_x-dhWPXerCcOL4FaFrI7RGS8s_YK6fdag&prompt=login&nonce
              =n-0S6_WzA2Mj
              ```
              - The format of the decoded sample request object looks as follows:
              ```
              {
                "kid": "<CERTIFICATE_FINGERPRINT>",
                "alg": "<SUPPORTED_ALGORITHM>",
                "typ": "JWT"
              }
              {
                "max_age": 86400,
                "aud": "<This is the audience that the ID token is intended for. e.g., https://<WSO2_OB_APIM_HOST>:8243/token>",
                "scope": "fundsconfirmation openid",
                "iss": "<APPLICATION_ID>",
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
                "response_type": "<code:Retrieves authorize code/code id_token: Retrieves authorize token and ID token>",  
                "redirect_uri": "<CLIENT_APPLICATION_REDIRECT_URI>",
                "state": "YWlzcDozMTQ2",
                "exp": <EPOCH_TIME_OF_TOKEN_EXPIRATION>,
                "nonce": "<PREVENTS_REPLAY_ATTACKS>",
                "client_id": "<APPLICATION_ID>"
              }
              ```
      - Change the value of the `<CLIENT_ID>` placeholder with the value you obtained in the application registration.
        
      - Upon successful authentication, the user is redirected to the consent authorize page. Use the login 
      credentials of a user that has a `subscriber` role. 
        
      - You can view the list of bank accounts and the information that the API consumer wishes to access.
        
      - Upon providing consent, an authorization code is generated on the URL of the web page defined in `redirect_uri`.
 
### Step 2: Retrieve a consent 
- An API consumer can retrieve a consent resource that they have created to check its status. In order to make this request, 
the API consumer must have an access token issued by the bank using the client credentials grant.

??? tip "Click here to find how to generate an application access token..."
    - Generate an application access token using the following command: 
      ```
      curl -X POST \
      https://{IS_HOST}:9446/oauth2/token \
      --cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \
      -d 'grant_type=client_credentials&scope=accounts%20openid&client_assertion=eyJraWQiOiJEd01LZFdNbWo3UFdpbnZvcWZReVhWe
      nlaNlEiLCJhbGciOiJQUzI1NiJ9.eyJzdWIiOiJIT1VrYVNieThEeWRuYmVJaEU3bHljYmtJSThhIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6OT
      Q0Ni9vYXV0aDIvdG9rZW4iLCJpc3MiOiJIT1VrYVNieThEeWRuYmVJaEU3bHljYmtJSThhIiwiZXhwIjoxNjg0MDk5ODEyLCJpYXQiOjE2ODQwOTk4
      MTMsImp0aSI6IjE2ODQwOTk4MTIifQ.EMZ2q3jciJ4MmrsH93kH_VGacrt2izbLaCBchGWiyUltdWwj3GwDMKfhpeMHtThd0DszwV8LUPKZaMT3wUS
      oH3adY2IBC8aa2GKeb_vaQB5b0ZO6WpYQ45y_xIttAVj56d6oPli8wN4MlJoJsFPUlaxQohCLunN43BxSr-kFgeFMj7ynEsVbQvuYuEiTppwTSyXlt
      Jmv70-nwpGU9UyuPCkXUsU53ShICrY0nC-3NUhY6oNpZclJP4MwG8mP4ZOvUIez_PSoP3AiaNithWhPCfLuKd68OLAReTBGdItqidsWWnn8lPVbM2F
      LvehukHDCJhf9-ev1pdWIiwDSVDV7uQ&redirect_uri=www.wso2.com'
      ```
      - The request payload contains a client assertion in the following format:
      ```
      {
      "alg": "<<The algorithm used for signing.>>",
      "kid": "<<The thumbprint of the certificate.>>",
      "typ": "JWT"
      }
        
      {
      "iss": "<<This is the issuer of the token. For example, client ID of your application>>",
      "sub": "<<This is the subject identifier of the issuer. For example, client ID of your application>>",
      "exp": <<This is epoch time of the token expiration date/time>>,
      "iat": <<This is epoch time of the token issuance date/time>>,
      "jti": "<<This is an incremental unique value>>",
      "aud": "<<This is the audience that the ID token is intended for. For example, https://<APIM_HOST>:8243/token>>"
      }
        
      <signature: For DCR, the client assertion is signed by the private key of the signing certificate. Otherwise the private
      signature of the application certificate is used.>
      ```
      - Upon successful token generation, you obtain a token as follows:
      ```
      {
         "access_token":"aa8ce78b-d81e-3385-81b1-a9fdd1e71daf",
         "scope":"accounts payments  openid",
         "id_token":"eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiaHVBcS1GbzB0N2pFZmtiZ1A4TkJwdyIsImF1ZCI6WyJrYkxuSkpfdVFMMlllNjh1YUNSYlBJSk9SNFVhIiwiaHR0cDpcL1wvb3JnLndzbzIuYXBpbWd0XC9nYXRld2F5Il0sInN1YiI6ImFkbWluQHdzbzIuY29tQGNhcmJvbi5zdXBlciIsIm5iZiI6MTYwMTk5MzA5OCwiYXpwIjoia2JMbkpKX3VRTDJZZTY4dWFDUmJQSUpPUjRVYSIsImFtciI6WyJjbGllbnRfY3JlZGVudGlhbHMiXSwic2NvcGUiOlsiYW1fYXBwbGljYXRpb25fc2NvcGUiLCJvcGVuaWQiXSwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo4MjQzXC90b2tlbiIsImV4cCI6MTYwMTk5NjY5OCwiaWF0IjoxNjAxOTkzMDk4fQ.cGdQ-9qK5JvKW32lK_PqhyJZyRb3r_86UPRFI2hlgiScnLYD8RsXDBNalmmnHiAbfb06e69QHQnmEKa6pcSSFWor0OAuzisBb6C5V51E9vH0eCr4hIa_lBtmjvLmsSue7puRUaYcyptwiuUkwjLFb-3_cpeuzWH29Knwne6zVD8gav_FPi1ub4vkrkX8ktLZH_JQG20fim1Ai5j2Q7jcnaMIHShYnC9sLBP5usp3thFLdQEyH8KCHJK79yNKzaruUntkq9yqqO_MQvY7VevLlDEDPllniRVih0r4TICdGrgJ0Ibr4wh_xFksVhYqa2_6x71ed_K9SX3hG-6T6pBUVA",
         "token_type":"Bearer",
         "expires_in":3600
      }
      ```
- A sample request to retrieve a consent looks as follows:
```
curl GET \
  https://{APIM_HOST}:8243/open-banking/v3.1/aisp/account-access-consents/<CONSENT_ID> \
  -H 'x-fapi-financial-id: open-bank' \
  -H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>' \
  -H 'Accept: application/json' \
  -H 'charset: UTF-8' \
  -H 'Content-Type: application/json; charset=UTF-8' \
  --cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH>
```
- A sample response looks as follows:
```
{
    "Meta": {
        "TotalPages": 1
    },
    "Risk": {},
    "Links": {
        "Self": "https://{IS_HOST}:8243/open-banking/v3.1/aisp/account-access-consents/<CONSENT_ID>"
    },
    "Data": {
        "Status": "Authorised",
        "StatusUpdateDateTime": "2020-10-07T12:46Z",
        "CreationDateTime": "2020-10-07T09:29Z",
        "TransactionToDateTime": "2020-10-09T10:28:49+05:30",
        "ExpirationDateTime": "2020-10-11T10:28:49+05:30",
        "Permissions": [
            "ReadAccountsDetail",
            "ReadBalances",
            "ReadTransactionsDetail"
        ],
        "ConsentId": "41042513-fa45-4da8-93be-1513b3caffac",
        "TransactionFromDateTime": "2020-10-06T10:28:49+05:30"
    }
}
```
### Step 3: Delete a consent
- If the customer revokes a consent to data access with the API consumer, the API consumer must delete the consent resource. 
In order to make this request, the API consumer must have an access token issued by the API consumer using the client 
credentials grant.

- A sample request to delete a consent looks as follows:
```
curl DELETE \
  https://{APIM_HOST}:8243/open-banking/v3.1/aisp/account-access-consents/<CONSENT_ID> \
  -H 'x-fapi-financial-id: open-bank' \
  -H 'Authorization: Bearer 0895e677-9f13-3ce3-84f4-46113f9048be' \
  -H 'Accept: application/json' \
  -H 'charset: UTF-8' \
  -H 'Content-Type: application/json; charset=UTF-8' \
  --cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH>
```
- If the deletion is successful you will get a `204 No Content` response.
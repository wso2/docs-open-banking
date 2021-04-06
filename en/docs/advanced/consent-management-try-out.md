This documents provide the step by step instructions to try out consent initiation, retrieval, update, and deletion.

!!! tip "Prerequisites" 
    - To initiate an authorization flow for an API,  you need to do the following:
        - Register an application for the API consumer.
        - Deploy and subscribe the relevant APIs to access banking information. For example, account and payment information.
        
        !!!note
            - For testing purposes we have included the following sample APIs in the Accelerator pack for WSO2 API Manager. 
                - Dynamic Client Registration API. See [Deploy DCR API](https://ob.docs.wso2.com/en/latest/get-started/api-consumer-onboarding/#step-1-deploy-the-dynamic-client-registrationdcr-api) for instructions.
                - Account Information Service API. See [Deploy and Subscribe sample Account and Transaction API](https://ob.docs.wso2.com/en/latest/get-started/try-out-flow/) for instructions.
                
### Step 1: Consent Initiation
- The API consumer needs to initiate an authorisation flow before accessing the account information of a customer. Therefore, 
the API consumer creates a request to get the consent of the customer to access the accounts and its information from 
the bank. A sample request looks as follows:
```
curl -X POST \
https://{APIM_HOST}:8243/open-banking/v3.1/aisp/account-access-consents \
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
- The Bank sends the request to the customer stating the accounts and information that the API consumer wishes to access.
    
??? tip "Click here to see the authorization flow..."
    - The request that the bank sends to the customer is in the format of a URL as follows: 
      ```
        
      https://{APIN_HOST}:8243/authorize/?response_type=jwt&client_id=<CLIENT_ID>&scope=accounts%20openid&redir
      ect_uri=www.wso2.com&state=YWlzcDozMTQ2&request=eyJraWQiOiJfTG03VFVWNF8yS3dydWhJQzZUWTdtel82WTQxMlhabG54dHl5QXB6eEw4Iiwi
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
      - Change the value of the `<CLIENT_ID>` placeholder with the value you obtained in the application registration.
        
      - Upon successful authentication, the user red is redirected to the consent authorise page. Use the login 
      credentials of a user that has a `subscriber` role. 
        
      - You can view the list of bank accounts and the information that the API consumer wishes to access.
        
      - Upon providing consent, an authorization code is generated on the web page of the `redirect_uri`.
 
### Step 2: Retrieve a consent 
- An API consumer can retrieve a consent resource that they have created to check its status. In order to make this request, 
the API consumer must have an access token issued by the bank using a client credentials grant.

??? tip "Click here to find how to generate an application access token..."
    - Generate an application access token using the following command: 
      ```
      curl -X POST \
      https://{APIM_HOST}:8243/token \
      --cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \
      -d 'grant_type=client_credentials&scope=accounts openid&client_assertion=eyJraWQiOiJEd01LZFdNbWo3UFdpbnZvcWZReVhWenlaN
      lEiLCJhbGciOiJQUzI1NiJ9.eyJzdWIiOiJrYkxuSkpfdVFMMlllNjh1YUNSYlBJSk9SNFVhIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6ODI0My90b2tl
      biIsImlzcyI6ImtiTG5KSl91UUwyWWU2OHVhQ1JiUElKT1I0VWEiLCJleHAiOjE2Mzg3ODg0NDIsImlhdCI6MTYwMTk5Mjk2MSwianRpIjoiMTYwMTk5Mjk2
      MSJ9.kWeV242yEXvF1vTntHsjxMfFqGAGIwiXQM1QeSTMoXyYePB450UZHZaVVo4_Q4SM9--FWQYCVKa7_SDMvmGcaiHeb5UTp0rdivMvVMZ1HkaYQRopC9c
      eR3tSJbJ7J7XFKTEIUOqk6ehXZcQ9tTQDlaRHmL67y6s_XgTu_Gca3Q4ejEFQRr5JGGyzTimXdlqEfd3Lo6WD1I_s-c26tAuAJ00oGvAXOBPy0EoDFMdLDXv
      -ZSAASZGYZr9F5s06qh5KHIY4rxQdr104dAalD-7pGhMwY2lwZymVlud73hCHfwq60fevra57HoVAD1hZVJ7hMf09QvlltLL6i3Gd4WzPXQ&client_asser
      tion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&redirect_uri=www.wso2.com'
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
  https://https://{IS_HOST}:9446/api/openbanking/consent/manage/account-consents/<CONSENT_ID> \
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
            "ReadBeneficiariesDetail",
            "ReadDirectDebits",
            "ReadProducts",
            "ReadStandingOrdersDetail",
            "ReadTransactionsCredits",
            "ReadTransactionsDebits",
            "ReadTransactionsDetail",
            "ReadOffers",
            "ReadPAN",
            "ReadParty",
            "ReadPartyPSU",
            "ReadScheduledPaymentsDetail",
            "ReadStatementsDetail"
        ],
        "ConsentId": "41042513-fa45-4da8-93be-1513b3caffac",
        "TransactionFromDateTime": "2020-10-06T10:28:49+05:30"
    }
}
```
### Step 3: Delete a consent
- If the customer revokes a consent to data access with the API consumer, the API consumer must delete the consent resource. 
In order to make this request, the API consumer must have an access token issued by the API consumer using a client 
credentials grant.

- A sample request to delete a consent looks as follows:
```
curl DELETE \
  https://IS_HOST}:9446/open-banking/v3.1/aisp/account-access-consents/<CONSENT_ID> \
  -H 'x-fapi-financial-id: open-bank' \
  -H 'Authorization: Bearer 0895e677-9f13-3ce3-84f4-46113f9048be' \
  -H 'Accept: application/json' \
  -H 'charset: UTF-8' \
  -H 'Content-Type: application/json; charset=UTF-8' \
  --cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH>
  -d '{
   "Data":{
      "Permissions":[
         "ReadAccountsDetail",
         "ReadBalances",
         "ReadBeneficiariesDetail",
         "ReadDirectDebits",
         "ReadProducts",
         "ReadStandingOrdersDetail",
         "ReadTransactionsCredits",
         "ReadTransactionsDebits",
         "ReadTransactionsDetail",
         "ReadOffers",
         "ReadPAN",
         "ReadParty",
         "ReadPartyPSU",
         "ReadScheduledPaymentsDetail",
         "ReadStatementsDetail"
      ],
      "ExpirationDateTime":"2020-10-11T10:28:49.599+05:30",
      "TransactionFromDateTime":"2020-10-06T10:28:49.600+05:30",
      "TransactionToDateTime":"2020-10-09T10:28:49.600+05:30"
   },
   "Risk":{
       
   }
}'
```
- If the deletion is successful you will get a `204 No Content` response.
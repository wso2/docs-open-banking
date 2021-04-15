This document provides step by step instructions to invoke the Accounts Information Service API.

!!! note 
    You need to deploy and subscribe an API before invoking it. For the testing purposes, you can use the sample AccountandTransaction 
    API we have included in the pack.
    
    ??? tip "Click here to see how to deploy and subscribe to the sample API..."
        1. Sign in to the API Publisher Portal at `https:/localhost:9443/publisher` with `creator/publisher` 
        privileges. 

        2. In the homepage, Go to **Create API** and click **Import Open API**. ![import_API](../assets/img/get-started/select-api.png)

        3. Select **OpenAPI File/Archive**. 

        4. Click **Browse File to Upload** and select `<APIM_HOME>/<OB_APIM_ACCELERATOR
        _HOME>/repository/resources/apis/Accounts/account-info-swagger.yaml`.  

        5. Click **Next**.

        6. Leave the Endpoint field empty as it is and click **Create**. 

        8. Select **Subscriptions** from the left menu pane and set the business plan to **Unlimited: Allows unlimited 
        requests**.

        9. Click **Save**.
    
        10.Go to **Runtime** using the left menu pane. 
    
        ![select_runtime](../assets/img/get-started/select-runtime.png)
    
        11.Click the edit button under **Request** -> **Message Mediation**.
    
        12.Now, select the **Custom Policy** option. 
    
        13.Upload the 
        `<APIM_HOME>/<OB_APIM_ACCELERATOR_HOME>/repository/resources/apis/Accounts/accounts-dynamic-endpoint-insequence.xml` 
        file and click **SELECT**.
    
        14.Scroll down and click **SAVE**. 
        
        15.Go to **Endpoints** using the left menu pane and locate **Dynamic Endpoint** and click **Add**. ![set_endpoint](../assets/img/get-started/set-endpoint.png)
    
        16.Select the endpoint types; `Production Endpoint/Sandbox Endpoint` and click **Save**.

        17.Go to **Deployments** using the left menu pane and click **Deploy New Revision**.
    
        18.Provide a description for the new revision.
    
        19.Select `localhost` from the dropdown list. 
    
        20.Click **Deploy**.
    
        21.Go to **Overview** using the left menu pane and click **Publish**. 
    
        22.Now that you have deployed the API, go to [https://localhost:9443/devportal](https://localhost:9443/devportal).
    
        23.Select the **AccountandTransaction V3.1** API and locate **Subscriptions**. Then, click **Subscribe**. ![subscribe_api](../assets/img/get-started/subscribe-api.png)
    
        24.Select the application from the dropdown list and click **Subscribe**.

### Step 1: Generate application access token
1. Once you register the application, generate an application access token using the following command: 
```
curl -X POST \
https://localhost:8243/token \
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
"aud": "<<This is the audience that the ID token is intended for. For example, https://{APIM_HOST}:8243/token>>"
}
  
<signature: For DCR, the client assertion is signed by the private key of the signing certificate. Otherwise the private
signature of the application certificate is used.>
```

2. Upon successful token generation, you obtain a token as follows:
```
{
   "access_token":"aa8ce78b-d81e-3385-81b1-a9fdd1e71daf",
   "scope":"accounts payments  openid",
   "id_token":"eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiaHVBcS1GbzB0N2pFZmtiZ1A4TkJwdyIsImF1ZCI6WyJrYkxuSkpfdVFMMlllNjh1YUNSYlBJSk9SNFVhIiwiaHR0cDpcL1wvb3JnLndzbzIuYXBpbWd0XC9nYXRld2F5Il0sInN1YiI6ImFkbWluQHdzbzIuY29tQGNhcmJvbi5zdXBlciIsIm5iZiI6MTYwMTk5MzA5OCwiYXpwIjoia2JMbkpKX3VRTDJZZTY4dWFDUmJQSUpPUjRVYSIsImFtciI6WyJjbGllbnRfY3JlZGVudGlhbHMiXSwic2NvcGUiOlsiYW1fYXBwbGljYXRpb25fc2NvcGUiLCJvcGVuaWQiXSwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo4MjQzXC90b2tlbiIsImV4cCI6MTYwMTk5NjY5OCwiaWF0IjoxNjAxOTkzMDk4fQ.cGdQ-9qK5JvKW32lK_PqhyJZyRb3r_86UPRFI2hlgiScnLYD8RsXDBNalmmnHiAbfb06e69QHQnmEKa6pcSSFWor0OAuzisBb6C5V51E9vH0eCr4hIa_lBtmjvLmsSue7puRUaYcyptwiuUkwjLFb-3_cpeuzWH29Knwne6zVD8gav_FPi1ub4vkrkX8ktLZH_JQG20fim1Ai5j2Q7jcnaMIHShYnC9sLBP5usp3thFLdQEyH8KCHJK79yNKzaruUntkq9yqqO_MQvY7VevLlDEDPllniRVih0r4TICdGrgJ0Ibr4wh_xFksVhYqa2_6x71ed_K9SX3hG-6T6pBUVA",
   "token_type":"Bearer",
   "expires_in":3600
}
```

### Step 2: Initiate authorisation
The API consumer needs to initiate an authorization flow before accessing the account information of a customer. 

1. The API consumer creates a request to get the consent of the customer to access the accounts and its 
information from the bank. A sample request looks as follows:
```
curl -X POST \
https://localhost:8243/open-banking/v3.1/aisp/account-access-consents \
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
The response contains a Consent ID. A sample response looks as follows:
```
{
    "consentId": "3e31f726-b9ad-43a7-897d-fcdf5e6d8cd0",
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

2. The bank sends the request to the customer stating the accounts and information that the API 
consumer wishes to access. This request is in the format of a URL as follows: 
```

https://localhost:8243/authorize/?response_type=jwt&client_id=<CLIENT_ID>&scope=accounts%20openid&redir
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
- Change the value of the `<CLIENT_ID>` placeholder with the value you obtained in [application registration](../get-started/api-consumer-onboarding.md).

3. Upon successful authentication, the user is redirected to the consent authorize page. Use the login credentials of a user that has a `subscriber` role. 

5. You can view the list of bank accounts and the information that the API consumer wishes to access.

- Upon providing consent, an authorization code is generated on the web page of the `redirect_uri`.

### Step 3: Generate user access token
1. You can generate a user access token using the sample request given below:
```
curl -X POST \
https://<WSO2_OB_APIM_HOST>:8243/token \
-H 'Cache-Control: no-cache' \
-H 'Content-Type: application/x-www-form-urlencoded' \
--cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH> \
-d 'grant_type=authorization_code&scope=openid accounts&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:
jwt-bearer&client_assertion=<CLIENT_ASSERTION>&redirect_uri=www.wso2.com&code=<CODE_GENERATED>client_id=
<CLIENT_ID>'
```
- Make sure you update the `<CODE_GENERATED>` placeholder with the authorization code you generate in the previous step.
Update the value of the  `<CLIENT_ID>` with the value you obtained in [application registration](../get-started/api-consumer-onboarding.md).

- The response contains a user access token.

### Step 4: Invoke Accounts Information Service API
1. The first step for an API consumer is to call the `GET/ accounts` endpoint. A sample request looks as follows:
```
curl -X GET \
https://localhost:8243/open-banking/v3.1/aisp/accounts/' \
-H 'x-fapi-financial-id: open-bank' \
-H 'Authorization: Bearer <USER_ACCESS_TOKEN>' \
-H 'Accept: application/json' \
-H 'charset: UTF-8' \
-H 'Content-Type: application/json; charset=UTF-8'
--cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH> \

```
- In the response, the API consumer gets the full list of accounts that the customer has authorized the API consumer to 
access. A sample response looks as follows:
```
{
    "Meta": {
        "TotalPages": 1
    },
    "Links": {
        "Self": "https://api.alphabank.com/open-banking/v3.0/accounts"
    },
    "Data": {
        "Account": [
            {
                "Status": "Enabled",
                "StatusUpdateDateTime": "2020-04-16T06:06:06+00:00",
                "OpeningDate": "2020-01-16T06:06:06+00:00",
                "AccountId": "30080012343456",
                "Currency": "GBP",
                "MaturityDate": "2025-04-16T06:06:06+00:00",
                "AccountType": "Personal",
                "AccountSubType": "CurrentAccount",
                "Nickname": "Bills"
            },
            {
                "Status": "Enabled",
                "StatusUpdateDateTime": "2020-04-16T06:06:06+00:00",
                "OpeningDate": "2020-01-16T06:06:06+00:00",
                "AccountId": "30080098763459",
                "Currency": "GBP",
                "MaturityDate": "2025-04-16T06:06:06+00:00",
                "AccountType": "Personal",
                "AccountSubType": "CurrentAccount",
                "Nickname": "Bills"
            },
            {
                "Status": "Enabled",
                "StatusUpdateDateTime": "2020-04-16T06:06:06+00:00",
                "OpeningDate": "2020-01-16T06:06:06+00:00",
                "AccountId": "30080098971337",
                "Currency": "GBP",
                "MaturityDate": "2025-04-16T06:06:06+00:00",
                "AccountType": "Personal",
                "AccountSubType": "CurrentAccount",
                "Nickname": "Bills"
            }
        ]
    }
}
```

2. The API consumer is now able to retrieve the account information for a given `AccountId`. A sample request looks as follows:
```
curl -X GET \
https://localhost:8243/open-banking/v3.1/aisp/accounts/<ACCOUNT_ID> \
-H 'x-fapi-financial-id: open-bank' \
-H 'Authorization: Bearer <USER_ACCESS TOKEN>' \
-H 'Accept: application/json' \
-H 'charset: UTF-8' \
-H 'Content-Type: application/json; charset=UTF-8' \
--cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH>
```
- The request retrieves the account information for the Account ID you mentioned in the request. A sample response looks 
as follows:
```
{
    "Data": {
        "Account": [
            {
                "AccountId": "1234",
                "Status": "Enabled",
                "StatusUpdateDateTime": "2020-04-16T06:06:06+00:00",
                "Currency": "GBP",
                "AccountType": "Personal",
                "AccountSubType": "CurrentAccount",
                "Nickname": "Bills",
                "OpeningDate": "2020-01-16T06:06:06+00:00",
                "MaturityDate": "2025-04-16T06:06:06+00:00"
            }
        ]
    },
    "Links": {
        "Self": "https://api.alphabank.com/open-banking/v3.0/accounts/1234"
    },
    "Meta": {
        "TotalPages": 1
    }
}
```

This document provides step by step instructions to invoke the Accounts Information Service API.

!!! note 
    You need to deploy and subscribe an API before invoking it. For the testing purposes, you can use the sample AccountandTransaction 
    API we have included in the pack.
    
    ??? tip "Click here to see how to deploy and subscribe to the sample API..."
        1. Sign in to the API Publisher Portal at [https://localhost:9443/publisher](https://localhost:9443/publisher) with `creator/publisher` 
        privileges. 

        2. In the homepage, Go to **Create API** and click **Import Open API**. ![import_API](../assets/img/learn/dcr/dcr-try-out/step-2.png)

        3. Select **OpenAPI File/Archive**. ![select_API](../assets/img/learn/dcr/dcr-try-out/step-3.png)

        4. Click **Browse File to Upload** and select `<APIM_HOME>/<OB_APIM_ACCELERATOR
        _HOME>/repository/resources/apis/Accounts/account-info-swagger.yaml`.  

        5. Click **Next**.

        6. Leave the **Endpoint** field empty as it is and click **Create**. 

        7. Select **Subscriptions** from the left menu pane and set the business plan to **Unlimited: Allows unlimited 
        requests**.  
        
            ![select_subscriptions](../assets/img/learn/dcr/dcr-try-out/step-5-tryout.png)


        8. Click **Save**.
    
        9.Go to **Runtime** using the left menu pane.   
        
           ![select_runtime](../assets/img/get-started/quick-start-guide/select-runtime.png) 
    
    
        10.Click the edit button under **Request** -> **Message Mediation**. ![message_mediation](../assets/img/get-started/quick-start-guide/message-mediation.png) 
        
        11.Now, select the **Custom Policy** option. 
    
        12.Upload the 
        `<APIM_HOME>/<OB_APIM_ACCELERATOR_HOME>/repository/resources/apis/Accounts/accounts-dynamic-endpoint-insequence.xml` 
        file and click **SELECT**.
    
        13.Scroll down and click **SAVE**. 
        
        14.Go to **Endpoints** using the left menu pane and locate **Dynamic Endpoint** and click **Add**. ![set_endpoint](../assets/img/get-started/quick-start-guide/set-endpoint.png)
    
        15.Select the endpoint types; `Production Endpoint/Sandbox Endpoint` and click **Save**.  ![dynamic_endpoint](../assets/img/get-started/quick-start-guide/dynamic-endpoint.png)

        16.Go to **Deployments** using the left menu pane and click **Deploy New Revision**.
    
        17.Provide a description for the new revision.
    
        18.Select `localhost` from the dropdown list. 
    
        19.Click **Deploy**.
    
        20.Go to **Overview** using the left menu pane and click **Publish**. 
    
        21.Now that you have deployed the API, go to <https://localhost:9443/devportal>.
    
        22.Select the **AccountandTransaction V3.1** API and locate **Subscriptions**. 
        Then, click **Subscribe**. ![subscribe_api](../assets/img/get-started/quick-start-guide/subscribe-api.png)
    
        23.From the dropdown list, select the application you created using the DCR API and click **Subscribe**.

### Step 1: Generate application access token
1. Once you register the application, generate an application access token using the following command. For this sample 
flow, you can use the transport certificates available [here](../../assets/attachments/Transport_Certs.zip). 

    ```
    curl -X POST \
    https://localhost:9446/oauth2/token \
    --cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \
    -d 'grant_type=client_credentials&scope=accounts%20openid&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&client_assertion=<CLIENT_ASSERTION_JWT>&redirect_uri=www.wso2.com&client_id=<CLIENT_ID>'
    ```
   
    - The request payload contains a client assertion JWT:
    
    ``` jwt tab="Sample"
    eyJraWQiOiJEd01LZFdNbWo3UFdpbnZvcWZReVhWenlaNlEiLCJhbGciOiJQUzI1NiJ9.eyJzdWIiOiJTNnUySGU0anl3dnl5cFQ3ZkdZRXhMU3lwUVlhIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6OTQ0Ni9vYXV0aDIvdG9rZW4iLCJpc3MiOiJTNnUySGU0anl3dnl5cFQ3ZkdZRXhMU3lwUVlhIiwiZXhwIjoxNjg0MDk5ODEyLCJpYXQiOjE2MjA5Nzc1MzIsImp0aSI6IjE0In0.ng1msBveFsT2q7vhZcC-ijLkh1ISlNuo-oJzwKEebRtQnN6WHd0ITsu0SXPoeHsQkpPJoKOtfhdmD2mqfAkt4zP8gcc6gxxNJjCKDU0l5KJ9tZzyipbEEysbdyLtCnNmoylaj4H-X8Y3HqEaA_6D14TJn0MYFhOf5FEmjh6xLtSCHAlTf289udyATnSdGgofzim7poEf8MDwg-XJ8hsq88TkmwYsD4QCrDAb9IRSo2BrxMt1LPdHzHJAmnKmwlNuefSYMg59O3wan5VUnJSV4VA7M1oUgwURQ2qBNs8XWISjseNxB9zB028PjWERbXZidfFH2yjD-oMRNVhQ8NKyDQ
    ```
   
    ``` json tab="Format"
    {
    "alg": "<<The algorithm used for signing.>>",
    "kid": "<<The KID value of the signing jwk set>>",
    "typ": "JWT"
    }
      
    {
    "iss": "<<This is the issuer of the token. For example, client ID of your application>>",
    "sub": "<<This is the subject identifier of the issuer. For example, client ID of your application>>",
    "exp": <<This is epoch time of the token expiration date/time>>,
    "iat": <<This is epoch time of the token issuance date/time>>,
    "jti": "<<This is an incremental unique value>>",
    "aud": "<<This is the audience that the ID token is intended for. For example, https://<IS_HOST>:9446/oauth2/token>>"
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

### Step 2: Initiate a consent

In this step, the API consumer creates a request to get the consent of the customer to access the accounts and its 
information from the bank. 

A sample consent initiation request looks as follows. You can try out this sample flow with the transport certificates 
available [here](../../assets/attachments/Transport_Certs.zip):
```
curl -X POST \
https://localhost:8243/open-banking/v3.1/aisp/account-access-consents \
-H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>' \
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

### Step 3: Authorizing a consent

The API consumer application redirects the bank customer to authenticate and approve/deny application-provided consents.

1. Generate a request object by signing your JSON payload using the supported algorithms. 
    
    ???tip "Click here to see a sample request object..."
        - Given below is a sample request object in the JWT format:
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
    https://localhost:9446/oauth2/authorize?response_type=code%20id_token&client_id=LvbSjaOIUPmAWZT8jdzyvjqCqY8a&redirect_uri=https://wso2.com&scope=openid accounts&state=0pN0NBTHcv&nonce=jBXhOmOKCB&request=<REQUEST_OBJECT>
    ```
   
    ``` url tab="Format"
    https://<IS_HOST>:9446/oauth2/authorize?response_type=code%20id_token&client_id=<CLIENT_ID>&scope=accounts%20op
    enid&redirect_uri=<APPLICATION_REDIRECT_URI>&state=YWlzcDozMTQ2&request=<REQUEST_OBJECT>&prompt=login&nonce=<REQUEST_OBJECT_NONCE>
    ```
   
3. Run the URL in a browser to prompt the invocation of the authorize API.

4. Upon successful authentication, the user is redirected to the consent authorize page. Use the login credentials of a user that has a `subscriber` role. 

5. The page displays a list of bank accounts and the information that the API consumer wishes to access.
    ![select accounts](../assets/img/learn/consent-manager/consent-page-select-accounts.png)   
    
6. Data requested by the consent such as permissions, transaction period, and expiration date are displayed. Click 
 **Confirm** to grant these permissions.
    ![grant consent](../assets/img/learn/consent-manager/consent-page-confirm.png)  
    
7. Upon providing consent, an authorization code is generated on the web page of the `redirect_uri`. See the sample 
given below:

    The authorization code from the below URL is in the code parameter (`code=e61579c3-fe9c-3dfe-9af2-0d2f03b95775`).

    ```
    https://wso2.com/#code=e61579c3-fe9c-3dfe-9af2-0d2f03b95775&id_token=eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1
    NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5
    a4f936c74e2ca7f4250208aa42.sk_04ejciXBj6DnpALyYaw
    ```
   
### Step 4: Generate user access token

1. You can generate a user access token using the sample request given below:
    ```
    curl -X POST \
    https://localhost:9446/oauth2/token \
    -H 'Cache-Control: no-cache' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    --cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH> \
    -d 'grant_type=authorization_code&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&client_assertion=eyJraWQiOiJEd01LZFdNbWo3UFdpbnZvcWZReVhWenlaNlEiLCJ0eXAiOiJKV1QiLCJhbGciOiJQUzI1NiJ9.eyJzdWIiOiJMdmJTamFPSVVQbUFXWlQ4amR6eXZqcUNxWThhIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6OTQ0Ni9vYXV0aDIvdG9rZW4iLCJpc3MiOiJMdmJTamFPSVVQbUFXWlQ4amR6eXZqcUNxWThhIiwiZXhwIjoxOTU0NzA4NzEwLCJpYXQiOjE2MjIxMzA0MzAsImp0aSI6IjE2MjIxMzA0MzAifQ.BVPqL47dL0N1NjCuoNh-8lSbIfrk-LyMJ1dCGqR0JNgyPmQ0726NAbGtVYzz4BWApKlMxmfdTS3vu9OX-iSk5_s21l9oovTS2KCaRo215M1S3Px5O28Cru8aIKkWgOcaLHB32X8K8nL90ge18nCJQvQ3ZyG5n8hzbw1P7KzY-t2MbeTWbXitM0ydEQLH6Pt5A5iL4cAa5PphvflJI9XIsF16YHzBnj9-ySOXPXYS2g38tBRY5hurmG96tuV4qmlN64_q43XeuPga-dUBYPun3fwe4ICS1oinnIHwioqR6bEgYEFMAou0MkotpB0dWLKbdwvAPSsP3ruMixY_2F4pqg&code=4dc73435-eee5-3486-ba3b-29b49be04f21&scope=openid%20accounts&redirect_uri=https%3A%2F%2Fwso2.com'
    ```

2. Make sure you update the `code` value with the authorization code you generate in the previous step.

3. The response contains a user access token.

### Step 5: Invoke Accounts Information Service API

The API consumer can now invoke the `GET/ accounts/<ACCOUNT_ID>` endpoint available in the sample Account Information 
Service API.
 
- A sample request looks as follows:
```
curl -X GET \
https://localhost:8243/open-banking/v3.1/aisp/accounts/1' \
-H 'x-fapi-financial-id: open-bank' \
-H 'Authorization: Bearer <USER_ACCESS_TOKEN>' \
-H 'Accept: application/json' \
-H 'charset: UTF-8' \
-H 'Content-Type: application/json; charset=UTF-8'
--cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH> \
```
- The request retrieves the account information for the Account ID you mentioned in the request. 

    !!! note
        This is a sample response generated by the mock back end available in WSO2 Open Banking.

    
```
{
   "Data":{
      "Account":[
         {
            "AccountId":"1",
            "Status":"Enabled",
            "StatusUpdateDateTime":"2020-04-16T06:06:06+00:00",
            "Currency":"GBP",
            "AccountType":"Personal",
            "AccountSubType":"CurrentAccount",
            "Nickname":"Bills",
            "Account":[
               {
                  "SchemeName":"SortCodeAccountNumber",
                  "Identification":"1",
                  "Name":"Mr Kevin",
                  "SecondaryIdentification":"00021"
               }
            ]
         }
      ]
   },
   "Links":{
      "Self":"https://api.alphabank.com/open-banking/v3.0/accounts/1"
   },
   "Meta":{
      "TotalPages":1
   }
}
```
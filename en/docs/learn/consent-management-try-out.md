This document provides the instructions to try out consent initiation, retrieval, update, and deletion.

!!! tip "Prerequisites" 
    - Before you try out the consent flow, you need to do the following:
        - Register an application for the API consumer.
        - Deploy and subscribe to the relevant APIs to access banking information. For example, account and payment information.
        
        !!!note
            - For testing purposes, we have included the following sample APIs in WSO2 Open Banking API Manager Accelerator. 
                - Dynamic Client Registration API. See [Deploy DCR API](https://ob.docs.wso2.com/en/latest/get-started/api-consumer-onboarding/#step-1-deploy-the-dynamic-client-registrationdcr-api) for instructions.
                - Account Information Service API. See [Deploy and Subscribe sample Account and Transaction API](https://ob.docs.wso2.com/en/latest/get-started/try-out-flow/) for instructions.
                
### Consent Initiation
- In this step, the API consumer creates a request to get the consent of the customer to access the accounts and its 
information from the bank. A sample consent initiation request looks as follows:

    ```
    curl --location --request POST 'https://<APIM_HOST>:8243/open-banking/v3.1/aisp/account-access-consents' \
    --header 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>' \
    --header 'Content-Type: application/json' \
    --cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \
    --data-raw '{
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

    ``` json
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

### Authorize a consent

The bank sends the request to the customer stating the accounts and information that the API consumer wishes to access.
    
       
  1. Generate the request object by signing the following JSON payload using the supported algorithms. Given below is 
  a sample request object in the JWT format:
  
      ``` tab='Sample'
      eyJraWQiOiJfTG03VFVWNF8yS3dydWhJQzZUWTdtel82WTQxMlhabG54dHl5QXB6eEw4IiwiYWxnIjoiUFMyNTYiLCJ0eXAiOiJKV1QifQ.eyJtYXhfYWdlIjo4NjQwMCwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6OTQ0Ni9vYXV0aDIvdG9rZW4iLCJzY29wZSI6ImFjY291bnRzIG9wZW5pZCIsImlzcyI6IjRoWklMQVRmUHlYbExGcWtQM1owT0JZaG1Ed2EiLCJjbGFpbXMiOnsiaWRfdG9rZW4iOnsiYWNyIjp7InZhbHVlcyI6WyJ1cm46b3BlbmJhbmtpbmc6cHNkMjpzY2EiLCJ1cm46b3BlbmJhbmtpbmc6cHNkMjpjYSJdLCJlc3NlbnRpYWwiOnRydWV9LCJvcGVuYmFua2luZ19pbnRlbnRfaWQiOnsidmFsdWUiOiI4NmM4YTA4NS1hNDQ0LTQyZDUtYmU0My05NjhiMzY2YTU0NjciLCJlc3NlbnRpYWwiOnRydWV9fSwidXNlcmluZm8iOnsib3BlbmJhbmtpbmdfaW50ZW50X2lkIjp7InZhbHVlIjoiODZjOGEwODUtYTQ0NC00MmQ1LWJlNDMtOTY4YjM2NmE1NDY3IiwiZXNzZW50aWFsIjp0cnVlfX19LCJyZXNwb25zZV90eXBlIjoiY29kZSBpZF90b2tlbiIsInJlZGlyZWN0X3VyaSI6Imh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vIiwic3RhdGUiOiJZV2x6Y0Rvek1UUTIiLCJleHAiOjE2MzM1ODY0MDgsIm5vbmNlIjoibi0wUzZfV3pBMk1qIiwiY2xpZW50X2lkIjoiNGhaSUxBVGZQeVhsTEZxa1AzWjBPQllobUR3YSJ9.LytrdYnlos_hq5p21KVf8P0KkixetUseR1RnhMLtvQJOZow2vspm-XGltU5b4ciFdfdvkRvOh4qSjFozrYabMDToUnSDjoxyLTi5e5kBld81SyWeCt2XQwMV1qQdS4N-ISuTHHUsECox73-rF5kRmi_8RFfJSi2fUjtXkGZpo5JhQIJ1v37IQrOi3RlPhhH33kiVataXtWP1Dy5c28xAKXFaMkm7apRT5X6Rf1s34A9iouQuuxdVi6PCrwFutbYZnrNwy8EW7UMI7YNZsrkfhcXgJt0BMMsgNdIhYXdr7Ui3_q-ICi6zMRQuov0yTbVuHEkjsK2u81EIV3e2C_u_Jg
      ```
      
      ``` tab='Format'
      {
        "kid": "<The KID value of the signing jwk set>",
        "alg": "<SUPPORTED_ALGORITHM>",
        "typ": "JWT"
      }
      {
        "max_age": 86400,
            "aud": "<This is the audience that the ID token is intended for. Example: https://<IS_HOST>:9446/oauth2/token>",
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
      
  2. The request that the bank sends to the customer is in the format of a URL as follows: 
         
    ``` url tab="Sample"
    https://localhost:9446/oauth2/authorize?response_type=code%20id_token&client_id=LvbSjaOIUPmAWZT8jdzyvjqCqY8a&redirect_uri=https://wso2.com&scope=openid accounts&state=0pN0NBTHcv&nonce=jBXhOmOKCB&request=<REQUEST_OBJECT>
    ```
   
    ``` url tab="Format"
    https://<IS_HOST>:9446/oauth2/authorize?response_type=code%20id_token&client_id=<CLIENT_ID>&scope=accounts%20op
    enid&redirect_uri=<APPLICATION_REDIRECT_URI>&state=YWlzcDozMTQ2&request=<REQUEST_OBJECT>&prompt=login&nonce=<REQUEST_OBJECT_NONCE>
    ```
    
  3. Change the value of the `<CLIENT_ID>` placeholder with the value you obtained in the application registration.
    
  4. Upon successful authentication, the user is redirected to the consent authorize page. Use the login 
  credentials of a user that has a `subscriber` role. 
    
  5. You can view the list of bank accounts and the information that the API consumer wishes to access.
     ![select accounts](../assets/img/learn/consent-manager/consent-page-select-accounts.png)  
  
  6. Data requested by the consent such as permissions, transaction period, and expiration date are displayed. 
  Click **Confirm** to grant these permissions.
    ![grant consent](../assets/img/learn/consent-manager/consent-page-confirm.png) 
  
  7. Upon providing consent, an authorization code is generated on the URL of the web page defined in `redirect_uri`.
  See the sample given below:
  
    - The authorization code from the below URL is in the code parameter (`code=e61579c3-fe9c-3dfe-9af2-0d2f03b95775`).
  
      ```
      https://wso2.com/#code=e61579c3-fe9c-3dfe-9af2-0d2f03b95775&id_token=eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1
      NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5
      a4f936c74e2ca7f4250208aa42.sk_04ejciXBj6DnpALyYaw
      ```
 
### Retrieve a consent 
- An API consumer can retrieve a consent resource that they have created to check its status. In order to make this request, 
the API consumer must have an access token issued by the bank using the client credentials grant.

??? tip "Click here to find how to generate an application access token..."
    - Generate an application access token using the following command: 
      ```
      curl -X POST \
      https://<IS_HOST>:9446/oauth2/token \
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
      "alg": "<<The algorithm used for signing>>",
      "kid": "<<The KID value of the signing jwk set>>",
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
  https://<APIM_HOST>:8243/open-banking/v3.1/aisp/account-access-consents/<CONSENT_ID> \
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
        "Self": "https://<IS_HOST>:8243/open-banking/v3.1/aisp/account-access-consents/<CONSENT_ID>"
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
### Delete a consent
- If the customer revokes a consent to data access with the API consumer, the API consumer must delete the consent resource. 
In order to make this request, the API consumer must have an access token issued by the API consumer using the client 
credentials grant.

- A sample request to delete a consent looks as follows:
```
curl DELETE \
  https://<APIM_HOST>:8243/open-banking/v3.1/aisp/account-access-consents/<CONSENT_ID> \
  -H 'x-fapi-financial-id: open-bank' \
  -H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>' \
  -H 'Accept: application/json' \
  -H 'charset: UTF-8' \
  -H 'Content-Type: application/json; charset=UTF-8' \
  --cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH>
```
- If the deletion is successful you will get a `204 No Content` response.

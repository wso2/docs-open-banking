The API consumer needs to initiate an authorisation flow before accessing the financial information of a banking customer. 

!!!note
    This document provides requests and responses for the sample Account Information Service API packed in WSO2 Open 
    Banking Accelerator. 

1. The API consumer creates a request to get the consent of the customer to access the accounts and its 
information from the bank. A sample request looks as follows:
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

2. The customer is redirected to authenticate and approve/deny application-provided consents. Run the URL in a browser 
to prompt the invocation of the authorize API.
```

https://{APIM_HOST}:8243/authorize/?response_type=<RESPONSE_TYPE>&client_id=<APPLICATION_ID>&scope=accounts%20op
enid&redirect_uri=<APPLICATION_REDIRECT_URI>&state=YWlzcDozMTQ2&request=<REQUEST_OBJECT>&prompt=login&nonce=<REQUEST_OBJECT_NONCE>
```
- Make sure to update the placeholders with the appropriate values. 
    - Generate the request object by signing the following JSON payload using the supported algorithms. Given below is 
    a sample request object:
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
    - The format of the sample request object looks as follows:
    ```
    {
      "kid": "<CERTIFICATE_FINGERPRINT>",
      "alg": "<SUPPORTED_ALGORITHM>",
      "typ": "JWT"
    }
    {
      "max_age": 86400,
      "aud": "<This is the audience that the ID token is intended for. e.g., https://<WSO2_OB_APIM_HOST>:8243/token>",
      "scope": "accounts openid",
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

3. Upon successful authentication, the user red is redirected to the consent authorise page. Use the login credentials of a user that has a `subscriber` role. 

5. You can view the list of bank accounts and the information that the API consumer wishes to access.

- Upon providing consent, an authorization code is generated on the URL of the `redirect_uri`. See the sample given below:
    - The authorization code from the above URL is in the code parameter (code=e61579c3-fe9c-3dfe-9af2-0d2f03b95775).
```
https://wso2.com/#code=e61579c3-fe9c-3dfe-9af2-0d2f03b95775&id_token=eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1
NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5
HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9o
YXNoIjoiV0VQQnV2T2t2VTNNZnVqYlI0VFhaQSIsImF1ZCI6WyI0RWJRZmpSZFV2UVJxZThmNlJrMDlWb1Q5bFVhIiwiaHR0cDpcL1wvb3JnLndzbzIuYXBp
bWd0XC9nYXRld2F5Il0sInN1YiI6ImFkbWluQHdzbzIuY29tQGNhcmJvbi5zdXBlciIsImNfaGFzaCI6ImZGWjZjQUh4dUw4aWk5YzEzSXRKUUEiLCJvcGVu
YmFua2luZ19pbnRlbnRfaWQiOiIxMzlhMTdjNS00MTQ1LTQzMDgtYWQxZS02YTJjNjM3NDUyMzUiLCJzX2hhc2giOiIxY0hpV0ExU3Y2akpzS3pINEVueTVB
IiwiYXpwIjoiNEViUWZqUmRVdlFScWU4ZjZSazA5Vm9UOWxVYSIsImFtciI6WyJCYXNpY0F1dGhlbnRpY2F0b3IiXSwiaXNzIjoiaHR0cHM6XC9cL2xvY2Fs
aG9zdDo4MjQzXC90b2tlbiIsImV4cCI6MTYwMjI1NDE3MCwiaWF0IjoxNjAyMjUwNTcwLCJub25jZSI6Im4tMFM2X1d6QTJNaiJ9.Ros0CEkX7hzfft0rq7e
k1Ia-lLoSRT55DRy3nUri35IiQjHYOeY34y6HSHbdnDlW4Yw6mCkB6gZlw7O49zulKcyNUoZn7DdrnldKMhPC2z-mtGhr00x7s0dMNyfH05ZOCIr3cWU2Lqh
KqyCyhCVP6ZbNDNultPeYQ62NxlTPRnuOi-j7jTsmqQfeiGEuHDpFm431A_6a2XnO5Wt9Awg0nQRpDzEDFD1VL7Ec1ogT3myowbg8YNjm0lQ9f_MV5P7rocG
0RQB83hgijbjFYr9CNBuqPU0P_Oi42tWndbSbHqKgdgevuAH2A6_zk-gufJ3cvcFjoy6jFTov1VqIGpTUbA&state=YWlzcDozMTQ2&session_state=9ea
1eb6454c3b34a3d1708affde1c25e00f931a4f936c74e2ca7f4250208aa42.sk_04ejciXBj6DnpALyYaw
```
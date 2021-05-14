The initiated consent needs to be authorized by the bank customer for the API consumer to access their financial information.

!!!note
    This document provides requests and responses for the sample Account Information Service API available in WSO2 Open 
    Banking Accelerator. 

1. The API consumer requests the bank customer's consent to access the accounts and its information from the bank.
```
https://localhost:9446/oauth2/authorize?response_type={RESPONSE_TYPE}&client_id={APPLICATION_ID}&scope=accounts%20op
enid&redirect_uri={APPLICATION_REDIRECT_URI}&state=YWlzcDozMTQ2&request={REQUEST_OBJECT}&prompt=login&nonce={REQUEST_OBJECT_NONCE}
```

2. Make sure to update the placeholders with the appropriate values.
    - Run the URL in a browser to prompt the invocation of the authorize API.

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

3. Upon successful authentication, the user is redirected to the consent authorise page. Use the login credentials of a user that has a `subscriber` role. 

5. You can view the list of bank accounts and the information that the API consumer wishes to access.

- Upon providing consent, an authorization code is generated on the URL of the `redirect_uri`. See the sample given below:
    - The authorization code from the below URL is in the code parameter (code=e61579c3-fe9c-3dfe-9af2-0d2f03b95775).
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

The initiated consent needs to be authorized by the bank customer for the API consumer to access their financial information.

!!!note
    This document provides requests and responses for the sample Account Information Service API available in WSO2 Open 
    Banking Accelerator. 

1. The bank sends the request to the customer stating the accounts and information that the API consumer wishes to 
access. This request is in the format of a URL as follows:

    ``` url tab="Sample"
    https://localhost:9446/oauth2/authorize?response_type=code%20id_token&client_id=LvbSjaOIUPmAWZT8jdzyvjqCqY8a&redirect_uri=https://wso2.com&scope=openid accounts&state=0pN0NBTHcv&nonce=jBXhOmOKCB&request=eyJraWQiOiJEd01LZFdNbWo3UFdpbnZvcWZReVhWenlaNlEiLCJ0eXAiOiJKV1QiLCJhbGciOiJQUzI1NiJ9.eyJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo5NDQ2L29hdXRoMi90b2tlbiIsIm1heF9hZ2UiOjg2NDAwLCJjcml0IjpbImI2NCIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvaWF0IiwiaHR0cDovL29wZW5iYW5raW5nLm9yZy51ay9pc3MiLCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL3RhbiJdLCJzY29wZSI6ImFjY291bnRzIG9wZW5pZCIsImV4cCI6MTk1NDcwODcxMCwiY2xhaW1zIjp7ImlkX3Rva2VuIjp7ImFjciI6eyJ2YWx1ZXMiOlsidXJuOm9wZW5iYW5raW5nOnBzZDI6c2NhIiwidXJuOm9wZW5iYW5raW5nOnBzZDI6Y2EiXSwiZXNzZW50aWFsIjp0cnVlfSwib3BlbmJhbmtpbmdfaW50ZW50X2lkIjp7InZhbHVlIjoiYzZlMjUzYjEtMTE0OS00OTc0LWJjMWYtOTg0OTFiYWU3YmNjIiwiZXNzZW50aWFsIjp0cnVlfX0sInVzZXJpbmZvIjp7Im9wZW5iYW5raW5nX2ludGVudF9pZCI6eyJ2YWx1ZSI6ImM2ZTI1M2IxLTExNDktNDk3NC1iYzFmLTk4NDkxYmFlN2JjYyIsImVzc2VudGlhbCI6dHJ1ZX19fSwiaXNzIjoiTHZiU2phT0lVUG1BV1pUOGpkenl2anFDcVk4YSIsInJlc3BvbnNlX3R5cGUiOiJjb2RlIGlkX3Rva2VuIiwicmVkaXJlY3RfdXJpIjoiaHR0cHM6Ly93c28yLmNvbSIsInN0YXRlIjoiMHBOME5CVEhjdiIsIm5vbmNlIjoiakJYaE9tT0tDQiIsImNsaWVudF9pZCI6Ikx2YlNqYU9JVVBtQVdaVDhqZHp5dmpxQ3FZOGEifQ.ib-SS_3P9jT4ihedFQ55aeMMbMdPPs5yJf4qVPS0AMegSzN9bqHUTLVLG1nVEIbZuBYEldlSEB_UVk93eNVlDbl87nLSyp2tGEv8pQuglx10lHTQiWAB4ufV-BBQ8rKFC27TEktjpb9-Y-XVHyLUoSD59kn7wqzAzDYgkLVKGbqkTBZqGLfrIaM9xVRLPhT-0Ut1oMs4jPSV7dIqksOonRdgXZvZUTlByizz4skpaALUwm_x6sh13BEXADhayUB8t-6YR06MzBIc_ZOJH5nM7ahJkiq-uMQV6cc7me2g7FVt0Ym7U7kUQEx5chnTYe1jvpvl9P5wCd4qX7mbAk30TQ
    ```
   
    ``` url tab="Format"
    https://<IS_HOST>:9446/oauth2/authorize?response_type=code%20id_token&client_id=<CLIENT_ID>&scope=accounts%20op
    enid&redirect_uri=<APPLICATION_REDIRECT_URI>&state=YWlzcDozMTQ2&request=<REQUEST_OBJECT>&prompt=login&nonce=<REQUEST_OBJECT_NONCE>
    ```

2. Run the URL in a browser to prompt the invocation of the authorize API.

    ???tip "Click here to see how to generate a request object..."
        - Generate the request object by signing the following JSON payload using the supported algorithms. Given below is 
        a sample request object in the JWT format:
        
        ``` tab='Sample'
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



3. Upon successful authentication, the user is redirected to the consent authorise page. Use the login credentials of a user that has a `subscriber` role. 

4. You can view the list of bank accounts and the information that the API consumer wishes to access.
    ![select accounts](../assets/img/learn/consent-manager/consent-page-select-accounts.png)   
    
5. Data requested by the consent such as permissions, transaction period, and expiration date are displayed. Click 
 **Confirm** to grant these permissions.
    ![grant consent](../assets/img/learn/consent-manager/consent-page-confirm.png) 

6. Upon providing consent, an authorization code is generated on the URL of the `redirect_uri`. See the sample given below:
    - The authorization code from the below URL is in the code parameter (`code=e61579c3-fe9c-3dfe-9af2-0d2f03b95775`).
```
https://wso2.com/#code=e61579c3-fe9c-3dfe-9af2-0d2f03b95775&id_token=eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1
NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5
a4f936c74e2ca7f4250208aa42.sk_04ejciXBj6DnpALyYaw
```

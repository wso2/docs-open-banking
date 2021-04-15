The API consumer needs to initiate an authorisation flow before accessing the financial information of a banking customer. 

1. Therefore, the API consumer creates a request to get the consent of the customer to access the accounts and its 
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

2. The Bank sends the request to the customer stating the accounts and information that the API 
consumer wishes to access. This request is in the format of a URL as follows: 
```

https://{APIM_HOST}:8243/authorize/?response_type=jwt&client_id=<CLIENT_ID>&scope=accounts%20openid&redir
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
- Change the value of the `<CLIENT_ID>` placeholder with the value you obtained in [application registration](../advanced/dynamic-client-registration-try-out.md).

3. Upon successful authentication, the user red is redirected to the consent authorise page. Use the login credentials of a user that has a `subscriber` role. 

5. You can view the list of bank accounts and the information that the API consumer wishes to access.

- Upon providing consent, an authorization code is generated on the web page of the `redirect_uri`.
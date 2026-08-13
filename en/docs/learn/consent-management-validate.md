# Consent Validate Endpoint

The Consent Validate Endpoint performs validation when resource endpoints are invoked with a user access token. It validates the consent associated with the token against the requested resource path to ensure the request is authorized.

WSO2 Open Banking Accelerator provides extension points to customize these validations according to your requirements.

## Overview

The validate endpoint expects the following data to perform validations:

- Request path and HTTP method
- Consent details bound to the access token
- User and client information

![Consent_Validate](../assets/img/learn/consent-management/Consent-Validate.png)

## API Reference

### Validate Consent  

**`POST /validate/validate`**

**Sample Request:**

```bash
curl -X POST \
  https://<IS_HOSTNAME>:9446/api/fs/consent/validate/validate \
  -H 'Authorization: Basic <AUTH_HEADER_VALUE>' \
  -H 'x-wso2-client-id: <CLIENT_ID>' \
  -H 'Content-Type: application/jwt' \
  --cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \
  --data 'eyJ0eXAiOiJKV1QiLCJhbGciOiJQUzI1NiJ9.CgkJCXsKICAgICAgCQkJImhlYWRlcnMiOiB7CiAJCQkgIAkJIkF1dGhvcml6YXRpb24iOiAiQmFzaWMgYVhOZllXUnRhVzVBZDNOdk1pNWpiMjA2ZDNOdk1qRXlNdz09IiwKIAkJCSAJIAkiY29uc2VudC1pZCI6ICI0ODVlZTYzMi0xNDBiLTRkYzQtOTdjZi1iMjU1Y2RiMmY5YWIiLAogCQkJICAJCSJhY3Rpdml0eWlkIjogIjg2NjZhYTg0LWZjNWEtNDI1ZS05MWM5LTM3ZmEzMGE5NTc4NCIsCiAJCQkgIAkJIkNhY2hlLUNvbnRyb2wiOiAibm8tY2FjaGUiLAogCQkJICAJCSJDb25uZWN0aW9uIjogImtlZXAtYWxpdmUiLAogCQkgICAgICAJCSJVc2VyLUFnZW50IjogIlBvc3RtYW5SdW50aW1lLzcuMjguNCIsCiAJCQkgIAkJIkhvc3QiOiAibG9jYWxob3N0OjgyNDMiLAogCQkJICAJCSJQb3N0bWFuLVRva2VuIjogIjI0NGQxNWI2LWViMTgtNDA0NS1iYTg3LThlZTZjODMwYjg0YyIsCiAJCQkgIAkJIkFjY2VwdC1FbmNvZGluZyI6ICJnemlwLCBkZWZsYXRlLCBiciIsCiAJCQkgIAkJImFjY2VwdCI6ICJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04IgogCQkJICAJfSwKICAgICAgICAJCSJjb25zZW50SWQiOiAiNDg1ZWU2MzItMTQwYi00ZGM0LTk3Y2YtYjI1NWNkYjJmOWFiIiwKICAgICAgICAJCSJyZXNvdXJjZVBhcmFtcyI6IHsKCQkJCQkicmVzb3VyY2UiOiAiL2Fpc3AvYWNjb3VudHMiLAoJCQkJCSJjb250ZXh0IjogIi9vcGVuLWJhbmtpbmcvdjMuMS9haXNwIiwKCQkJCQkiaHR0cE1ldGhvZCI6ICJHRVQiCiAJCQkgCSB9LAogCQkJICAgICJ1c2VySWQiOiAicHN1QHdzbzIuY29tIiwKICAgICAJCSAJImVsZWN0ZWRSZXNvdXJjZSI6ICIvYWNjb3VudHMiLAoJCQkJImNsaWVudElkIjogImR3a3JzT3BrSTZLeDFhRXRtMFlnN0FUVldmY2EiCiAJCQl9CiAgICAJCQk.kZ_hmTcIZAxeh0mfMa7pR8pGTUHHQShBH3Bwv7JLmjjsWoIQEfTgpn_j7RIFX6UEuLt2Uuz5JCHtGK8Hw5XjWF3-c8FNnQOj9hmxrd96tn820dzms7tC1lUwpWo3_CFjmGE93zQWy40-5IVf2ruQOzH0vC_34yHSn4ro7w_yOqJuvbih_gjCLRlWpMqObrThyI3LYh6NZ5r6LoJuTv9rlZ2_NQ6Y8JnhzwBwoE0vQbGmjz7G3OICfDIcTCy0yMkO8uuxRinERiSxAWHgohNA0J1371baQ1Bbk_i4ASUqfNVbHeC-U_VBAoTLTQp-6OH-FaTQr2r9C8nGI2Ehl0PepA'    
```

!!! info "Request Payload Format"
    The payload of the validate endpoint is a signed JWT containing the validation request data.

??? tip "Click here to see the decoded format of the payload..."
    ```json
    {
      "typ": "JWT",
      "alg": "PS256"
    }
    {
      "headers": {
        "Authorization": "Basic aXNfYWRtaW5Ad3NvMi5jb206d3NvMjEyMw==",
        "consent-id": "485ee632-140b-4dc4-97cf-b255cdb2f9ab",
        "activityid": "8666aa84-fc5a-425e-91c9-37fa30a95784",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "User-Agent": "PostmanRuntime/7.28.4",
        "Host": "localhost:8243",
        "Postman-Token": "244d15b6-eb18-4045-ba87-8ee6c830b84c",
        "Accept-Encoding": "gzip, deflate, br",
        "accept": "application/json; charset=utf-8"
      },
      "consentId": "485ee632-140b-4dc4-97cf-b255cdb2f9ab",
      "resourceParams": {
        "resource": "/aisp/accounts",
        "context": "/open-banking/v3.1/aisp",
        "httpMethod": "GET"
      },
      "userId": "psu@wso2.com",
      "electedResource": "/accounts",
      "clientId": "dwkrsOpkI6Kx1aEtm0Yg7ATVWfca"
    }
    ```

**Sample Response:**

```json
{
  "isValid": true,
  "consentInformation": "eyJhbGciOiJSUzI1NiJ9.eyJjbGllbnRJZCI6ImR3a3JzT3BrSTZLeDFhRXRtMFlnN0FUVldmY2EiLCJjdXJyZW50U3RhdHVzIjoiQXV0aG9yaXNlZCIsImNyZWF0ZWRUaW1lc3RhbXAiOjE3NzYzMjE2NTYsInJlY3VycmluZ0luZGljYXRvciI6ZmFsc2UsImF1dGhvcml6YXRpb25SZXNvdXJjZXMiOlt7InVwZGF0ZWRUaW1lIjoxNzc2MzIxNjg0LCJjb25zZW50SWQiOiI0ODVlZTYzMi0xNDBiLTRkYzQtOTdjZi1iMjU1Y2RiMmY5YWIiLCJhdXRob3JpemF0aW9uSWQiOiIwZDlmYTE5My0yMTBmLTRlMDAtOGZhNS1hNWFhMDgxN2RiY2QiLCJhdXRob3JpemF0aW9uVHlwZSI6ImF1dGhvcmlzYXRpb24iLCJ1c2VySWQiOiJwc3VAd3NvMi5jb20iLCJhdXRob3JpemF0aW9uU3RhdHVzIjoiQXV0aG9yaXNlZCJ9XSwidXBkYXRlZFRpbWVzdGFtcCI6MTc3NjMyMTY4NCwiY29uc2VudF90eXBlIjoiYWNjb3VudHMiLCJ2YWxpZGl0eVBlcmlvZCI6MTc3Njc1MzY1NCwiY29uc2VudEF0dHJpYnV0ZXMiOnt9LCJjb25zZW50SWQiOiI0ODVlZTYzMi0xNDBiLTRkYzQtOTdjZi1iMjU1Y2RiMmY5YWIiLCJjb25zZW50TWFwcGluZ1Jlc291cmNlcyI6W3sibWFwcGluZ0lkIjoiNmE4MGNjYjYtMWRjYS00MDhkLTg2MjQtNzkyYWYwODE0NzJmIiwibWFwcGluZ1N0YXR1cyI6ImFjdGl2ZSIsImFjY291bnRfaWQiOiIzMDA4MDAxMjM0MzQ1NiIsImF1dGhvcml6YXRpb25JZCI6IjBkOWZhMTkzLTIxMGYtNGUwMC04ZmE1LWE1YWEwODE3ZGJjZCIsInBlcm1pc3Npb24iOiJwcmltYXJ5In1dLCJhZGRpdGlvbmFsQ29uc2VudEluZm8iOnt9LCJyZWNlaXB0Ijp7IlJpc2siOnt9LCJEYXRhIjp7IlRyYW5zYWN0aW9uVG9EYXRlVGltZSI6IjIwMjYtMDQtMTlUMTI6MTA6NTQuODk1NzYwKzA1OjMwIiwiRXhwaXJhdGlvbkRhdGVUaW1lIjoiMjAyNi0wNC0yMVQxMjoxMDo1NC44OTQ5OTQrMDU6MzAiLCJQZXJtaXNzaW9ucyI6WyJSZWFkQWNjb3VudHNCYXNpYyIsIlJlYWRBY2NvdW50c0RldGFpbCIsIlJlYWRCYWxhbmNlcyIsIlJlYWRUcmFuc2FjdGlvbnNEZXRhaWwiXSwiVHJhbnNhY3Rpb25Gcm9tRGF0ZVRpbWUiOiIyMDI2LTA0LTE2VDEyOjEwOjU0Ljg5NTY3NyswNTozMCJ9fSwiY29uc2VudEZyZXF1ZW5jeSI6MH0.TbKW6iduCDqmIP-4Gmxu6a6UlEId8dvYigwdI3DjqpZNpV-bL35E0FoNwuETuk49dq33Cq5xNAvCntbhXw0nRG3diWuIUcWXN0-ea6YGB93SP6WrhHkJoTXQvL-FGDoD5IfY1-Tdawg6ysyswzw9OXuMxjFdQj0l2kX5u5rsRO3Nt_UE_nAaIiyEn_lncbWEEZWRyr3mQ_xWXldU83zRXXDoBD3bczmusPYAn2_LK-invtEwIX_b4zm74JIcXWTQDGiAYtDbeSwYqz6kkffMJC8ozKOFDc7PnRKKaFdGHN05Xysxn6ifpODxNaDeDHnV_Fh1SyWGlsScjylPfikFvA"
}
```

!!! info "Response Payload Format"
    The validate endpoint returns the consent information as a signed JWT.

??? tip "Click here to see the decoded format of the consent information..."
    ```json
    {
      "clientId": "dwkrsOpkI6Kx1aEtm0Yg7ATVWfca",
      "currentStatus": "Authorised",
      "createdTimestamp": 1776321656,
      "recurringIndicator": false,
      "authorizationResources": [
        {
          "updatedTime": 1776321684,
          "consentId": "485ee632-140b-4dc4-97cf-b255cdb2f9ab",
          "authorizationId": "0d9fa193-210f-4e00-8fa5-a5aa0817dbcd",
          "authorizationType": "authorisation",
          "userId": "psu@wso2.com",
          "authorizationStatus": "Authorised"
        }
      ],
      "updatedTimestamp": 1776321684,
      "consent_type": "accounts",
      "validityPeriod": 1776753654,
      "consentAttributes": {},
      "consentId": "485ee632-140b-4dc4-97cf-b255cdb2f9ab",
      "consentMappingResources": [
        {
          "mappingId": "6a80ccb6-1dca-408d-8624-792af081472f",
          "mappingStatus": "active",
          "account_id": "30080012343456",
          "authorizationId": "0d9fa193-210f-4e00-8fa5-a5aa0817dbcd",
          "permission": "primary"
        }
      ],
      "additionalConsentInfo": {},
      "receipt": {
        "Risk": {},
        "Data": {
          "TransactionToDateTime": "2026-04-19T12:10:54.895760+05:30",
          "ExpirationDateTime": "2026-04-21T12:10:54.894994+05:30",
          "Permissions": [
            "ReadAccountsBasic",
            "ReadAccountsDetail",
            "ReadBalances",
            "ReadTransactionsDetail"
          ],
          "TransactionFromDateTime": "2026-04-16T12:10:54.895677+05:30"
        }
      },
      "consentFrequency": 0
    }
    ```

## Built-in Validations

The Consent Validate Endpoint performs the following built-in validations before invoking OpenAPI extensions:

- **JWT signature validation:** Ensures the JWT request payload is correctly signed
- **Consent ID validation:** Verifies that the consent ID bound to the token exists in the system
- **Consent payload validation:** Confirms that the payload associated with the consent is not null and is a valid JSON object
- **User ID validation:** Ensures that the user ID bound to the token matches the user ID in the consent
- **Client ID validation:** Ensures that the client ID bound to the token matches the client ID in the consent

After performing these validations, the endpoint invokes the `validate-consent-access` OpenAPI extension to execute toolkit-specific validations.

## Customization

WSO2 Open Banking IAM Accelerator 4.0.0 onwards supports OpenAPI-based extensions for consent management customizations. For more information, see [Open API Based Extensions for Consent Validate Endpoints](../develop/openapi/openapi-consent-management-validate.md).
API consumers obtain a user access token before invoking the APIs. Once they obtain a user access token, it is sent in the 
API invocation requests as a header parameter for the bank to authorize and allow accessing financial information of 
banking customers.

1. You can generate a user access token using the sample request given below:
```
curl -X POST \
https://<IS_HOST>:9446/oauth2/token \
-H 'Cache-Control: no-cache' \
-H 'Content-Type: application/x-www-form-urlencoded' \
--cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH> \
-d 'grant_type=authorization_code&scope=openid accounts&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:
jwt-bearer&client_assertion=<CLIENT_ASSERTION>&redirect_uri=www.wso2.com&code=<CODE_GENERATED>client_id=
<CLIENT_ID>'
```
- Make sure you update all the placeholders with the appropriate values.
    - Update the `<CODE_GENERATED>` placeholder with the authorization code you generate in the [Authorise a Consent](../authorization-flow.md) step.
    - Update the value of the  `<CLIENT_ID>` with the value you obtained in [application registration](../dynamic-client-registration-try-out.md).
- The response contains a user access token.

!!!tip
    The access tokens have an expiration period, once an access token expires, you need to regenerate it. Run the 
    following cURL command to generate a new access token:
    ```
    curl POST \
     https://<APIM_HOST>:8243/token \
     -H 'Content-Type: application/x-www-form-urlencoded' \
     -H 'cache-control: no-cache' \
     --cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH> \
     -d 'grant_type=refresh_token&refresh_token=<REFRESH_TOKEN>&client_id=4hZILATfPyXlLFqkP3Z0OBYhmDwa&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&client_assertion=<CLIENT_ASEERTION>'
    ```

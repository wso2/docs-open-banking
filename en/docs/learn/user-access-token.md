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
    -d 'grant_type=authorization_code&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&client_assertion=eyJraWQiOiJEd01LZFdNbWo3UFdpbnZvcWZReVhWenlaNlEiLCJ0eXAiOiJKV1QiLCJhbGciOiJQUzI1NiJ9.eyJzdWIiOiJMdmJTamFPSVVQbUFXWlQ4amR6eXZqcUNxWThhIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6OTQ0Ni9vYXV0aDIvdG9rZW4iLCJpc3MiOiJMdmJTamFPSVVQbUFXWlQ4amR6eXZqcUNxWThhIiwiZXhwIjoxOTU0NzA4NzEwLCJpYXQiOjE2MjIxMzA0MzAsImp0aSI6IjE2MjIxMzA0MzAifQ.BVPqL47dL0N1NjCuoNh-8lSbIfrk-LyMJ1dCGqR0JNgyPmQ0726NAbGtVYzz4BWApKlMxmfdTS3vu9OX-iSk5_s21l9oovTS2KCaRo215M1S3Px5O28Cru8aIKkWgOcaLHB32X8K8nL90ge18nCJQvQ3ZyG5n8hzbw1P7KzY-t2MbeTWbXitM0ydEQLH6Pt5A5iL4cAa5PphvflJI9XIsF16YHzBnj9-ySOXPXYS2g38tBRY5hurmG96tuV4qmlN64_q43XeuPga-dUBYPun3fwe4ICS1oinnIHwioqR6bEgYEFMAou0MkotpB0dWLKbdwvAPSsP3ruMixY_2F4pqg&code=4dc73435-eee5-3486-ba3b-29b49be04f21&scope=openid%20accounts&redirect_uri=https%3A%2F%2Fwso2.com'
    ```
- Make sure you update all the placeholders with the appropriate values.
    - Update the `code` value with the authorization code you generate in the [Authorise a Consent](../authorization-flow.md) step.
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

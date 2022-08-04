#Try Out Open Banking Regulatory Aggregator

This document explains how to try out WSO2 Open Banking Regulatory Aggregator. 

## Authorization Request

Before a third-party API consumer application accesses the customer's banking information, the API consumer sends an 
authorization request to get the customer's consent for it. The authorization request contains a request object. This 
request object is a self-contained JWT, which helps banks to validate the API consumer.

Given below are sample authorization requests for banks ABC and DBC.

``` tab="Bank ABC"
https://localhost:9446/oauth2/authorize?response_type=code%20id_token&client_id=x0Ui2Gi7a5B4juq7WpwdpWrN9lEa&redirect_uri=https://wso2.com&scope=accounts%20openid&state=af0ifjsldkj&nonce=n-0S6_WzA2Mj&request=eyJraWQiOiJHcWhLVlRBTm5MTVlwR0dmQXRKMU5oZGtnanciLCJ0eXAiOiJKV1QiLCJhbGciOiJQUzI1NiJ9.eyJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo5NDQ2L29hdXRoMi90b2tlbiIsIm1heF9hZ2UiOjg2NDAwLCJjcml0IjpbImI2NCIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvaWF0IiwiaHR0cDovL29wZW5iYW5raW5nLm9yZy51ay9pc3MiLCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL3RhbiJdLCJzY29wZSI6ImFjY291bnRzIG9wZW5pZCIsImV4cCI6MTk1NDcwODcxMCwiY2xhaW1zIjp7ImlkX3Rva2VuIjp7ImFjciI6eyJ2YWx1ZXMiOlsidXJuOm9wZW5iYW5raW5nOnBzZDI6Y2EiLCJ1cm46b3BlbmJhbmtpbmc6cHNkMjpzY2EiXSwiZXNzZW50aWFsIjp0cnVlfX19LCJpc3MiOiJ4MFVpMkdpN2E1QjRqdXE3V3B3ZHBXck45bEVhIiwicmVzcG9uc2VfdHlwZSI6ImNvZGUgaWRfdG9rZW4iLCJyZWRpcmVjdF91cmkiOiJodHRwczovL3dzbzIuY29tIiwic3RhdGUiOiIwcE4wTkJUSGN2Iiwibm9uY2UiOiJqQlhoT21PS0NCIiwiY2xpZW50X2lkIjoieDBVaTJHaTdhNUI0anVxN1dwd2RwV3JOOWxFYSIsImJhbmtfY29kZSI6IjAwMSIsImNvbnNlbnQiOnsiRGF0YSI6eyJQZXJtaXNzaW9ucyI6WyJSZWFkQWNjb3VudHNEZXRhaWwiLCJSZWFkQmFsYW5jZXMiLCJSZWFkVHJhbnNhY3Rpb25zRGV0YWlsIl0sIkV4cGlyYXRpb25EYXRlVGltZSI6IjIwMjItMTItMjJUMDY6MTk6MDguMzI2WiIsIlRyYW5zYWN0aW9uVG9EYXRlVGltZSI6IjIwMjEtMDMtMjJUMDY6MTk6MDguMzI2WiIsIlRyYW5zYWN0aW9uRnJvbURhdGVUaW1lIjoiMjAyMS0wMy0yMlQwNjoxOTowOC4zMjZaIn0sIlJpc2siOnt9fX0.Bd7ZN9aR53Qwfln3uqf2UR_QKXlA2-Yb75VCf3zTCYG_9pqLL_uOro4_iz5GKLwIkABoVpMlmWHz5ZwiiuAdoRPdsPUSCqoBfI5oEqhs6R6s9FwC8cnXWY6PVr-22RQx9bTlMPvx-y45JO3yhJgjwjfZHSwiEufzASJnr_3k3OS6dH2_ICIUAx86MwrReWg-AZFq9oQGFP0PghTAiSegV81sj0Cuxp0AkSSAXg7_2sY7FO6HfjPwx-n6JgF3sR8fjiikYpeh3NZCcivR-srwLKXBOZ4w_M27_EeMr0OTvDqzojXHm4_P_cHXOmX6GCBcpAqhTXRH0ew8mrNBJ1Bh_g
```

``` tab="Bank DBC"
https://localhost:9446/oauth2/authorize?response_type=code%20id_token&client_id=x0Ui2Gi7a5B4juq7WpwdpWrN9lEa&redirect_uri=https://wso2.com&scope=accounts%20openid&state=af0ifjsldkj&nonce=n-0S6_WzA2Mj&request=eyJraWQiOiJHcWhLVlRBTm5MTVlwR0dmQXRKMU5oZGtnanciLCJ0eXAiOiJKV1QiLCJhbGciOiJQUzI1NiJ9.eyJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo5NDQ2L29hdXRoMi90b2tlbiIsIm1heF9hZ2UiOjg2NDAwLCJjcml0IjpbImI2NCIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvaWF0IiwiaHR0cDovL29wZW5iYW5raW5nLm9yZy51ay9pc3MiLCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL3RhbiJdLCJzY29wZSI6ImFjY291bnRzIG9wZW5pZCIsImV4cCI6MTk1NDcwODcxMCwiY2xhaW1zIjp7ImlkX3Rva2VuIjp7ImFjciI6eyJ2YWx1ZXMiOlsidXJuOm9wZW5iYW5raW5nOnBzZDI6Y2EiLCJ1cm46b3BlbmJhbmtpbmc6cHNkMjpzY2EiXSwiZXNzZW50aWFsIjp0cnVlfX19LCJpc3MiOiJ4MFVpMkdpN2E1QjRqdXE3V3B3ZHBXck45bEVhIiwicmVzcG9uc2VfdHlwZSI6ImNvZGUgaWRfdG9rZW4iLCJyZWRpcmVjdF91cmkiOiJodHRwczovL3dzbzIuY29tIiwic3RhdGUiOiIwcE4wTkJUSGN2Iiwibm9uY2UiOiJqQlhoT21PS0NCIiwiY2xpZW50X2lkIjoieDBVaTJHaTdhNUI0anVxN1dwd2RwV3JOOWxFYSIsImJhbmtfY29kZSI6IjAwMiIsImNvbnNlbnQiOnsiRGF0YSI6eyJQZXJtaXNzaW9ucyI6WyJSZWFkQWNjb3VudHNEZXRhaWwiLCJSZWFkVHJhbnNhY3Rpb25zRGV0YWlsIl0sIkV4cGlyYXRpb25EYXRlVGltZSI6IjIwMjItMTItMjJUMDY6MTk6MDguMzI2WiIsIlRyYW5zYWN0aW9uVG9EYXRlVGltZSI6IjIwMjEtMDMtMjJUMDY6MTk6MDguMzI2WiIsIlRyYW5zYWN0aW9uRnJvbURhdGVUaW1lIjoiMjAyMS0wMy0yMlQwNjoxOTowOC4zMjZaIn0sIlJpc2siOnt9fX0.KAcHZ3HG1aV7q8Rp633a1aWaVqYXaIujkE9cXOqoVV4U36oDdzV81ZGMXW22EsqGWSUPURluxzO7lBJeB2Vv8w7-FNoz59QX32qh5LROepdtpay45iwz4wP3IR_ebOifv7Zd1OeaCP9KhsTgD_x-jc5KmIvXFm9Y9iDXUmjB9TynqtTwzGV1bD2_g_ye_ybuXzwtwpkAlwRUnpHoJqiqacmWvatDWdxzJUjrOcOWvD0aRbAvSJ2KoRi5bXncufH4eBiTxiHaztvReg-QjXSadFm6fc_BcNuezQQYENWJ8U__HKOufGSbEN9lWK5r9heFkGLGt7XaTixti0eVDDYEGg
```

??? "Click here to see a description of each parameter in the authorization request"
    |Parameter |Description |Parameter type |Sample Value|
    |--------- |------------|------------- | ------------|
    |response_type |OIDC Response Type value | Query | code id_token|
    |client_id |Client ID of the application registered via DCR |Query |x0Ui2Gi7a5B4juq7WpwdpWrN9lEa|
    |redirect_uri |Registered Callback URL |Query |https://wso2.com|
    |scope |OIDC scopes value | Query |accounts openid|
    |state |OIDC state value |Query |0pN0NBTHcv|
    |nonce |OIDC nonce object |Query |jBXhOmOKCB|
    |request |OIDC Request Object | Query |eyJraWQiOiJHcWhLVlRBTm5MTVlwR0dmQXRKMU5oZGtna…….TvDqzojXHm4_P_cHXOmX6GCBcpAqhTXRH0ew8mrNBJ1Bh_g|
    
The OIDC Request Object contains a header and a payload in the format below:

``` json  
{
  "kid": "GqhKVTANnLMYpGGfAtJ1Nhdkgjw",
  "typ": "JWT",
  "alg": "PS256"
}

{
  "aud": "https://localhost:9446/oauth2/token",
  "max_age": 86400,
  "crit": [
    "b64",
    "http://openbanking.org.uk/iat",
    "http://openbanking.org.uk/iss",
    "http://openbanking.org.uk/tan"
  ],
  "scope": "accounts openid",
  "exp": 1954708710,
  "claims": {
    "id_token": {
      "acr": {
        "values": [
          "urn:openbanking:psd2:ca",
          "urn:openbanking:psd2:sca"
        ],
        "essential": true
      }
    }
  },
  "iss": "x0Ui2Gi7a5B4juq7WpwdpWrN9lEa",
  "response_type": "code id_token",
  "redirect_uri": "https://wso2.com",
  "state": "0pN0NBTHcv",
  "nonce": "jBXhOmOKCB",
  "client_id": "x0Ui2Gi7a5B4juq7WpwdpWrN9lEa",
  "bank_code": "001",
  "consent": {
    "Data": {
      "Permissions": [
        "ReadAccountsDetail",
        "ReadBalances",
        "ReadTransactionsDetail"
      ],
      "ExpirationDateTime": "2022-12-22T06:19:08.326Z",
      "TransactionToDateTime": "2021-03-22T06:19:08.326Z",
      "TransactionFromDateTime": "2021-03-22T06:19:08.326Z"
    },
    "Risk": {}
  }
}
```

??? "Click here to see a description of each parameter in the OIDC Request Object"
    |Parameter |Description |
    |--------- |------------|
    |aud |Audience value. The `aud` value needs to match with the Audience value of the Identity Server’s Resident IDP|
    |scope |OIDC scopes value | 
    |iss |Issuer of the JWT Token. This value should be similar to the client ID of the requesting application|
    |response_type |OIDC Response Type value | 
    |redirect_uri |Registered Callback URL | 
    |state |OIDC state value |
    |nonce |OIDC nonce object |
    |client_id |Client ID of the application registered via DCR |
    |bank_code |Unique identifier for the bank. In this scenario, the bank code for ABC is `001` and DBC is `002`|
    |consent |Information about the requested consent|

## Consent Authorization

- Once you enter a properly constructed authorization request in your web browser, based on the `bank_code` in the 
  request object, you will be redirected to ABC bank or DCB Bank. 

- A bank customer needs to enter their credentials and sign in. 
    ![sign_in](../../assets/img/toolkit/regulatory-aggregator/sign-in.png)
- Then redirected to the Aggregator's Account selection page.
    ![account_selection](../../assets/img/toolkit/regulatory-aggregator/account-selection.png)
- Once the bank customer selects the accounts they want to share, the whole consent agreement is displayed.
    ![consent_agreement](../../assets/img/toolkit/regulatory-aggregator/consent-agreement.png)
- Once the bank customer approves this consent, the aggregator will redirect you to the registered callback URL with an 
  authorization code in the query parameters.
   ```
   https://wso2.com/#code=1390032d-622f-3977-a976-923505035571&id_token=eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkEiLCJraWQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZ19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJhdWQiOiJ4MFVpMkdpN2E1QjRqdXE3V3B3ZHBXck45bEVhIiwiY19oYXNoIjoiNXFNeEhhY0d2d2IxX2ZDT29GWmlNZyIsInN1YiI6ImFiY3VzZXJAY2FyYm9uLnN1cGVyIiwic19oYXNoIjoiOU9WMVpnRXVfWWExanFxU3hWelg1ZyIsImF6cCI6IngwVWkyR2k3YTVCNGp1cTdXcHdkcFdyTjlsRWEiLCJhbXIiOlsiQ3VzdG9tRmVkZXJhdGVkQXV0aGVudGljYXRvciJdLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDZcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2NTM0ODI2ODAsImlhdCI6MTY1MzQ3OTA4MCwibm9uY2UiOiJqQlhoT21PS0NCIiwic2lkIjoiZmRlODZlMzMtNjljYi00ZTIwLTgxZTMtOTFiMDJhYjlmMjM3In0.OQmAuO3yH-Ap3bPzb1NpbbFN628BdIuKYZ6kZqeDRJwLK2Z5GqtO5P2VZpEoMlRSPi15Z0eg_8Uxv1ns1Na8djpIs1UyK2zK20HzHCZh4flpXlW0AMbvoxUUbAsfDzaH8r0xpzweA471vD0HX9rja2Xio0AhsP6VPJasBxC3jnAt9H9wjqB_qXYw8-TQwVPjkFONNgEZHQ44eJFRxK7Um5TOv1fHb6Ivz4URc0R91vL1LEyaIRy8w7afGePNDQn5BHObbfzwX6O4hI_jsUVeOybG0M3-ofhEwYcvkMuiMPsLeF2Oqa849bNNr11P75TajKV7ozUBo1UJquTs7VfSnA&state=0pN0NBTHcv&session_state=13831b535eebb5527056f57766e0b5a1d66caea43afbe041f75d27adcdb954f1.PNSwGdfigyA_dxaCi45fPA 
   ```
   - The authorization code from the above URL is in the code parameter `1390032d-622f-3977-a976-923505035571`. 
   - Extract this code for the next step.

## User Access Token

We need to obtain an access token from the retrieved access token. For that we are using `authorization_code` grant type 
as follows:

!!! tip
    You must send the registered transport certificate along with the following HTTP Post request.

```
curl --location --request POST 'https://localhost:9446/oauth2/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'cache-control: no-cache' \
--data-urlencode 'grant_type=authorization_code' \
--data-urlencode 'code=ac15285e-17d7-3560-94ea-239b6c5b88bf' \
--data-urlencode 'scope=openid accounts' \
--data-urlencode 'redirect_uri=https://wso2.com' \
--data-urlencode 'client_id=x0Ui2Gi7a5B4juq7WpwdpWrN9lEa'
```

??? "Click here to see a description of each parameter in the request"
    |Parameter | Parameter Type | Description |Sample Value|
    |--------- | -------------- | ----------- |------------|
    |grant_type |HTTP Body - x-www-form-urlencoded |OIDC Grant Type |authorization_code|
    |code |HTTP Body - x-www-form-urlencoded |Obtained authorization code |1390032d-622f-3977-a976-923505035571|
    |scope |HTTP Body - x-www-form-urlencoded |Scopes that will be used (should be a subset of what sent during the authorization request)| openid accounts|
    |redirect_uri |HTTP Body - x-www-form-urlencoded | Registered callback URL| https://wso2.com|
    |client_id | HTTP Body - x-www-form-urlencoded | Client ID of the application (same value as the authorization request)| x0Ui2Gi7a5B4juq7WpwdpWrN9lEa|
    |content-type | header | Specify the content type |application/x-www-form-urlencoded|

!!! note
    In this request, we have used Transport Layer Security as the token authentication mechanism. In order to do that, 
    you should register your application with that authentication mechanism by specifying setting the
    `token_endpoint_auth_method` parameter to `tls_client_auth` in the DCR request. Otherwise, you need to use the 
    particular authentication mechanism you specified.

A successful request will generate an access token with a `200 OK`.

    ``` 
    {
      "access_token":"eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkEiLCJraWQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZ19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhYmN1c2VyQGNhcmJvbi5zdXBlciIsImF1dCI6IkFQUExJQ0FUSU9OX1VTRVIiLCJiYW5rX2NvZGUiOiIwMDEiLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDZcL29hdXRoMlwvdG9rZW4iLCJhY2Nlc3NfdG9rZW4iOiJiZTQzOGI1YS03NzQ3LTM1OGYtOWM5Yi1mNjU3YjJiZmFlZDUiLCJhdWQiOiIxcmhFamZpUFcxOW1Sd0dCZVpWYmxZdktuVGdhIiwibmJmIjoxNjUzNDgyNzkwLCJhenAiOiIxcmhFamZpUFcxOW1Sd0dCZVpWYmxZdktuVGdhIiwic2NvcGUiOiJhY2NvdW50cyBvcGVuaWQiLCJjbmYiOnsieDV0I1MyNTYiOiIyaHlmMEF0a2Q2Rmo0cnpuLXZzRDdHT244aUtnY2JiSEpVSlhMbG1yMUlzIn0sImV4cCI6MTY1MzQ4NjM5MCwiaWF0IjoxNjUzNDgyNzkwLCJqdGkiOiJhYzk5NTUxYy0wNWE4LTQzY2MtYTQ4MC05ODVkMmQxNjJlMWMiLCJjb25zZW50X2lkIjoiYzI2Mzk2OWEtMDlmNC00Y2MwLTlhMTctZjlkMWY2NGI2NWIwIn0.nLU8J1JrPbVmAs66zSAeThrRiiWnKBHYt_3dZwdgPSKxBtMAsM7-h8PeGSwi1uIwc4f7XqVjQeZjQtO6Uj0Us5iYqBb8CBmJHK8d2IZfJqWeq8N23yqj14Y43AMmJqy7pGSebaeNclwbwqdq22SJX-x4GdSPLffD8U2F5anCkUeyae4R4kq1JAs4BctSzjs5MXIjSf3_UsSFwDqOCoH0dagEFkAvYc2r1_NzJeKsXw3shTh8a1LXdHLT2Qq8mbgTIpcJlmzcwvSKWo1F6kT1FK1-jNmuiH9xYMkm1AZ8g0iTubnyuMZq7Wr_7s3vsmRDiklNTZjf60blm3KFAYdKiQ",
      "refresh_token":"b4da9c69-3f87-334b-adf3-bdef5d768ebe",
      "scope":"accounts openid",
      "id_token":"eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkEiLCJraWQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZ19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiS2hWal9oc3dGZDRTYVdQLVJiODBJQSIsInN1YiI6ImFiY3VzZXJAY2FyYm9uLnN1cGVyIiwiYmFua19jb2RlIjoiMDAxIiwiYW1yIjpbIkN1c3RvbUZlZGVyYXRlZEF1dGhlbnRpY2F0b3IiXSwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQ2XC9vYXV0aDJcL3Rva2VuIiwibm9uY2UiOiJqQlhoT21PS0NCIiwiYWNjZXNzX3Rva2VuIjoiYmU0MzhiNWEtNzc0Ny0zNThmLTljOWItZjY1N2IyYmZhZWQ1IiwiYXVkIjoiMXJoRWpmaVBXMTltUndHQmVaVmJsWXZLblRnYSIsImNfaGFzaCI6IlZhbS1CSlNJUE9jNHBrZXh6RjhEZkEiLCJuYmYiOjE2NTM0ODI3OTEsImF6cCI6IjFyaEVqZmlQVzE5bVJ3R0JlWlZibFl2S25UZ2EiLCJleHAiOjE2NTM0ODYzOTEsImlhdCI6MTY1MzQ4Mjc5MX0.GK4NYUZSXNnGTwpXd30pcTN04I9Nl15inQz-CM_cwaHA4e7hEqnBEbaA9UcbPvwm8fOL_xl6V-HTj3lHFIJRTShNQ_TPkVnOhvllwYABSP499AMW_6exBvJ33IZjMXIh3b2FJaA5CxEfQ9O86WQenc918vFd77Xy8bPJwBd5D_DKxE_rHsMfIt9uOg-i63gtjEO9JCqV9cFaPKdreN87j06i4A0hl1tyBzHPo145GVJ4_ykGlRzGxmEhDMvybEQm4BEQSA3PW7ML56Tkj-Jtkp_zvi8QuJ0Ddpb6qibHsJ-3Q11Uu5xhPah3iS2NJRk95smzBANMoca9CzEmnzGuRw",
      "token_type":"Bearer",
      "expires_in":3600
    }
    ```

## Open Banking API Calls

- Now you can invoke the aggregator gateway using the access token generated above.
- The aggregator should validate the access token and the consent to verify whether the consent allows the requested 
  resource. 
- Then this request is forwarded to the relevant bank (ABC Bank/DCB Bank) with a different access token that the 
  aggregator obtained during the authorization flow.
- A sample request is as follows:
    ```
    curl --location --request GET 'https://localhost:8243/open-banking/v3.1/aisp/accounts/1234' \
    --header 'Authorization: Bearer eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkEiLCJraWQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZ19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhYmN1c2VyQGNhcmJvbi5zdXBlciIsImF1dCI6IkFQUExJQ0FUSU9OX1VTRVIiLCJiYW5rX2NvZGUiOiIwMDEiLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDZcL29hdXRoMlwvdG9rZW4iLCJhY2Nlc3NfdG9rZW4iOiJiZTQzOGI1YS03NzQ3LTM1OGYtOWM5Yi1mNjU3YjJiZmFlZDUiLCJhdWQiOiIxcmhFamZpUFcxOW1Sd0dCZVpWYmxZdktuVGdhIiwibmJmIjoxNjUzNDgyNzkwLCJhenAiOiIxcmhFamZpUFcxOW1Sd0dCZVpWYmxZdktuVGdhIiwic2NvcGUiOiJhY2NvdW50cyBvcGVuaWQiLCJjbmYiOnsieDV0I1MyNTYiOiIyaHlmMEF0a2Q2Rmo0cnpuLXZzRDdHT244aUtnY2JiSEpVSlhMbG1yMUlzIn0sImV4cCI6MTY1MzQ4NjM5MCwiaWF0IjoxNjUzNDgyNzkwLCJqdGkiOiJhYzk5NTUxYy0wNWE4LTQzY2MtYTQ4MC05ODVkMmQxNjJlMWMiLCJjb25zZW50X2lkIjoiYzI2Mzk2OWEtMDlmNC00Y2MwLTlhMTctZjlkMWY2NGI2NWIwIn0.nLU8J1JrPbVmAs66zSAeThrRiiWnKBHYt_3dZwdgPSKxBtMAsM7-h8PeGSwi1uIwc4f7XqVjQeZjQtO6Uj0Us5iYqBb8CBmJHK8d2IZfJqWeq8N23yqj14Y43AMmJqy7pGSebaeNclwbwqdq22SJX-x4GdSPLffD8U2F5anCkUeyae4R4kq1JAs4BctSzjs5MXIjSf3_UsSFwDqOCoH0dagEFkAvYc2r1_NzJeKsXw3shTh8a1LXdHLT2Qq8mbgTIpcJlmzcwvSKWo1F6kT1FK1-jNmuiH9xYMkm1AZ8g0iTubnyuMZq7Wr_7s3vsmRDiklNTZjf60blm3KFAYdKiQ'
    ```
- If the access token is valid and the consent allows this request, the aggregator will send you a JSON response as follows.
  This response originated from a mock bank back end configured during [setting up the aggregator](regulatory-aggregator-try-out.md).
    ```
    {
       "Data":{
          "Account":[
             {
                "AccountId":"1234",
                "Status":"Enabled",
                "StatusUpdateDateTime":"2020-04-16T06:06:06+00:00",
                "Currency":"GBP",
                "AccountType":"Personal",
                "AccountSubType":"CurrentAccount",
                "Nickname":"Bills",
                "Account":[
                   {
                      "SchemeName":"SortCodeAccountNumber",
                      "Identification":"1234",
                      "Name":"Alex",
                      "SecondaryIdentification":"00021"
                   }
                ]
             }
          ]
       },
       "Links":{
          "Self":"https://api.alphabank.com/open-banking/v3.0/accounts/1234"
       },
       "Meta":{
          "TotalPages":1
       }
    }
    ```
  
## Wire Logs

- To understand this flow further, enable Wire Logs in the WSO2 API Manager by following the
[Gateway Wire Logs](https://apim.docs.wso2.com/en/4.0.0/administer/logging-and-monitoring/logging/configuring-logging/#gateway-wire-logs) documentation.
- You can see the request that the aggregator receives contain the access token you attached. 
- Then the request you sent is forwarded to the relevant bank (based on the bank code you used during authorization) 
  with an updated access token. See the screenshot below for Wire Logs:

    [ ![](../../assets/img/toolkit/regulatory-aggregator/wirelogs-small-1.png) ](../../assets/img/toolkit/regulatory-aggregator/wirelogs-1.png)
    [ ![](../../assets/img/toolkit/regulatory-aggregator/wirelogs-small-2.png) ](../../assets/img/toolkit/regulatory-aggregator/wirelogs-2.png)

The API consumer requests the consent of the bank customer to access their financial information in the bank. The bank 
sends a request to the customer stating the information that the API consumer application wishes to access. Upon the user 
approving/denying the access, a consent is created. Using the consent, the API consumer application is now eligible to 
access the details. 

1. A sample request looks as follows:
    - Make sure to update the placeholders with the relevant values. Use the [Application Access Token](../application-access-token.md) you obtained.
```
curl -X POST \
https://{APIM_HOST}:8243/open-banking/v3.1/aisp/account-access-consents \
-H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN> \
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
- The response contains a Consent ID. A sample response looks as follows:
```
{
    "consentId": "1631c501-474a-4335-829d-7de25ca6ecdb",
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
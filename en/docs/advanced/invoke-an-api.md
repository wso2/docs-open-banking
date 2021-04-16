!!!note
    This document provides requests and responses for the sample Account Information Service API available in WSO2 Open 
    Banking Accelerator. 

1. The API consists of a `GET/ accounts` endpoint. Given below is how you can invoke that endpoint to retrieve a list of accounts:
```
curl -X GET \
https://{APIM_HOST}:8243/open-banking/v3.1/aisp/accounts/' \
-H 'x-fapi-financial-id: open-bank' \
-H 'Authorization: Bearer <USER_ACCESS_TOKEN>' \
-H 'Accept: application/json' \
-H 'charset: UTF-8' \
-H 'Content-Type: application/json; charset=UTF-8'
--cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH> \

```
- In the response, the API consumer gets the full list of accounts that the customer has authorized the API consumer to 
access. A sample response looks as follows:
```
{
    "Meta": {
        "TotalPages": 1
    },
    "Links": {
        "Self": "https://api.alphabank.com/open-banking/v3.0/accounts"
    },
    "Data": {
        "Account": [
            {
                "Status": "Enabled",
                "StatusUpdateDateTime": "2020-04-16T06:06:06+00:00",
                "OpeningDate": "2020-01-16T06:06:06+00:00",
                "AccountId": "30080012343456",
                "Currency": "GBP",
                "MaturityDate": "2025-04-16T06:06:06+00:00",
                "AccountType": "Personal",
                "AccountSubType": "CurrentAccount",
                "Nickname": "Bills"
            },
            {
                "Status": "Enabled",
                "StatusUpdateDateTime": "2020-04-16T06:06:06+00:00",
                "OpeningDate": "2020-01-16T06:06:06+00:00",
                "AccountId": "30080098763459",
                "Currency": "GBP",
                "MaturityDate": "2025-04-16T06:06:06+00:00",
                "AccountType": "Personal",
                "AccountSubType": "CurrentAccount",
                "Nickname": "Bills"
            },
            {
                "Status": "Enabled",
                "StatusUpdateDateTime": "2020-04-16T06:06:06+00:00",
                "OpeningDate": "2020-01-16T06:06:06+00:00",
                "AccountId": "30080098971337",
                "Currency": "GBP",
                "MaturityDate": "2025-04-16T06:06:06+00:00",
                "AccountType": "Personal",
                "AccountSubType": "CurrentAccount",
                "Nickname": "Bills"
            }
        ]
    }
}
```

2. The API consumer is now able to retrieve the account information for a given `AccountId`. A sample request looks as follows:
```
curl -X GET \
https://{APIM_HOST}:8243/open-banking/v3.1/aisp/accounts/<ACCOUNT_ID> \
-H 'x-fapi-financial-id: open-bank' \
-H 'Authorization: Bearer <USER_ACCESS TOKEN>' \
-H 'Accept: application/json' \
-H 'charset: UTF-8' \
-H 'Content-Type: application/json; charset=UTF-8' \
--cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH>
```
- The request retrieves the account information for the Account ID you mentioned in the request. A sample response looks 
as follows:
```
{
    "Data": {
        "Account": [
            {
                "AccountId": "1234",
                "Status": "Enabled",
                "StatusUpdateDateTime": "2020-04-16T06:06:06+00:00",
                "Currency": "GBP",
                "AccountType": "Personal",
                "AccountSubType": "CurrentAccount",
                "Nickname": "Bills",
                "OpeningDate": "2020-01-16T06:06:06+00:00",
                "MaturityDate": "2025-04-16T06:06:06+00:00"
            }
        ]
    },
    "Links": {
        "Self": "https://api.alphabank.com/open-banking/v3.0/accounts/1234"
    },
    "Meta": {
        "TotalPages": 1
    }
}
```
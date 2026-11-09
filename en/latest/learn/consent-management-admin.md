# Consent Admin Endpoint

The Consent Admin Endpoint (`/admin`) provides a REST API for managing consents from administrative portals — such as a **Self-Care Portal**. It exposes operations for searching, revoking, auditing, and inspecting consents stored in the WSO2 Financial Services Accelerator consent core service.

## User Permission Model[​](#user-permission-model "Direct link to User Permission Model")

Two user roles interact with this API:

| Role                            | Scope                         | Access                                                                                                                      |
| ------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Customer Care Officer (CCO)** | `CUSTOMER_CARE_OFFICER_SCOPE` | Can search/revoke consents for **any** user                                                                                 |
| **Self-Care Portal User**       | Any other scope               | Can only search/revoke their **own** consents — the `userId` / `userIds` query parameter must match the token's `sub` claim |

> **Note:** The permission check applies only to `GET /admin/search` and `DELETE /admin/revoke`. All other endpoints do not enforce this user-level restriction.

## Endpoints[​](#endpoints "Direct link to Endpoints")

### Search Consents[​](#search-consents "Direct link to Search Consents")

Searches detailed consent records with optional filtering parameters.

**`GET /admin/search`**

#### Query Parameters[​](#query-parameters "Direct link to Query Parameters")

| Parameter         | Type      | Required  | Description                                                                             |
| ----------------- | --------- | --------- | --------------------------------------------------------------------------------------- |
| `consentIDs`      | `string`  | No        | Comma-separated list of consent IDs                                                     |
| `clientIDs`       | `string`  | No        | Comma-separated list of client application IDs                                          |
| `consentTypes`    | `string`  | No        | Comma-separated list of consent types (e.g., `accounts`, `payments`)                    |
| `consentStatuses` | `string`  | No        | Comma-separated list of consent statuses (e.g., `authorised`, `revoked`)                |
| `userIds`         | `string`  | **Yes**\* | Comma-separated list of user IDs. *Required for self-care portal users. CCOs may omit.* |
| `fromTime`        | `long`    | No        | Unix timestamp — filter consents created after this time                                |
| `toTime`          | `long`    | No        | Unix timestamp — filter consents created before this time                               |
| `limit`           | `integer` | No        | Maximum number of records to return                                                     |
| `offset`          | `integer` | No        | Number of records to skip (for pagination)                                              |
| `accountIDs`      | `string`  | No        | Filter results to consents mapped to specific account IDs                               |

#### Sample Request[​](#sample-request "Direct link to Sample Request")

```
curl -X GET \

  'https://<IS_HOSTNAME>:9446/api/fs/consent/admin/search?userIds=alice@carbon.super&consentStatuses=authorised&limit=10&offset=0' \

  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...'
```

#### Sample Response — 200 OK[​](#sample-response-200-ok "Direct link to Sample Response — 200 OK")

```
{

  "data": [

    {

      "consentID": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",

      "clientID": "YwqKLFEtG9f23zMAEHtaBC71bvAa",

      "consentType": "accounts",

      "currentStatus": "authorised",

      "createdTime": 1710000000,

      "updatedTime": 1710003600,

      "receipt": {

        "Data": {

          "Permissions": ["ReadAccountsDetail", "ReadBalances", "ReadTransactionsDetail"],

          "ExpirationDateTime": "2026-12-31T00:00:00Z"

        }

      },

      "consentAttributes": {

        "x-fapi-interaction-id": "93bac548-d2de-4546-b106-880a5018460d"

      },

      "authorizationResources": [

        {

          "authorizationID": "auth-001",

          "userID": "alice@carbon.super",

          "authorizationStatus": "authorised",

          "authorizationType": "primary_member"

        }

      ],

      "consentMappingResources": [

        {

          "mappingID": "map-001",

          "authorizationID": "auth-001",

          "accountID": "30080012343456",

          "permission": "primary_member",

          "mappingStatus": "active"

        }

      ]

    }

  ],

  "metadata": {

    "count": 1,

    "offset": 0,

    "limit": 10,

    "total": 1

  }

}
```

### Revoke Consent[​](#revoke-consent "Direct link to Revoke Consent")

Revokes an authorised consent. Optionally invokes a pre-process extension before revoking.

**`DELETE /admin/revoke`**

#### Query Parameters[​](#query-parameters_1 "Direct link to Query Parameters")

| Parameter   | Type     | Required  | Description                                                          |
| ----------- | -------- | --------- | -------------------------------------------------------------------- |
| `consentId` | `string` | **Yes**   | ID of the consent to revoke                                          |
| `userId`    | `string` | **Yes**\* | User ID of the consent owner. *Required for self-care portal users.* |

#### Sample Request — CCO Revoking Any Consent[​](#sample-request-cco-revoking-any-consent "Direct link to Sample Request — CCO Revoking Any Consent")

```
curl -X DELETE \

  'https://<IS_HOSTNAME>:9446/api/fs/consent/admin/revoke?consentId=a1b2c3d4-e5f6-7890-abcd-ef1234567890&userId=alice@carbon.super' \

  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...'
```

#### Sample Response — 204 No Content[​](#sample-response-204-no-content "Direct link to Sample Response — 204 No Content")

```
HTTP/1.1 204 No Content
```

### Search Consent Status Audit Records[​](#search-consent-status-audit-records "Direct link to Search Consent Status Audit Records")

Returns the status change audit trail for one or more consents.

**`GET /admin/search/consent-status-audit`**

#### Query Parameters[​](#query-parameters_2 "Direct link to Query Parameters")

| Parameter    | Type      | Required | Description                                |
| ------------ | --------- | -------- | ------------------------------------------ |
| `consentIDs` | `string`  | No       | Comma-separated list of consent IDs        |
| `limit`      | `integer` | No       | Maximum number of records to return        |
| `offset`     | `integer` | No       | Number of records to skip (for pagination) |

#### Sample Request[​](#sample-request_1 "Direct link to Sample Request")

```
curl -X GET \

  'https://<IS_HOSTNAME>:9446/api/fs/consent/admin/search/consent-status-audit?consentIDs=a1b2c3d4-e5f6-7890-abcd-ef1234567890&limit=5' \

  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...'
```

#### Sample Response — 200 OK[​](#sample-response-200-ok_1 "Direct link to Sample Response — 200 OK")

```
{

  "data": [

    {

      "statusAuditID": "audit-001",

      "consentID": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",

      "currentStatus": "authorised",

      "actionTime": 1710003600,

      "reason": "User authorised consent",

      "actionBy": "alice@carbon.super",

      "previousStatus": "awaitingAuthorisation"

    },

    {

      "statusAuditID": "audit-002",

      "consentID": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",

      "currentStatus": "awaitingAuthorisation",

      "actionTime": 1710000000,

      "reason": "Consent created",

      "actionBy": "YwqKLFEtG9f23zMAEHtaBC71bvAa",

      "previousStatus": null

    }

  ],

  "metadata": {

    "count": 2,

    "offset": null,

    "limit": 5,

    "total": 2

  }

}
```

### Search Consent File[​](#search-consent-file "Direct link to Search Consent File")

Retrieves the file content uploaded as part of a file-type consent (e.g., bulk payment files).

**`GET /admin/search/consent-file`**

#### Query Parameters[​](#query-parameters_3 "Direct link to Query Parameters")

| Parameter   | Type     | Required | Description                                     |
| ----------- | -------- | -------- | ----------------------------------------------- |
| `consentId` | `string` | **Yes**  | ID of the consent whose file is to be retrieved |

#### Sample Request[​](#sample-request_2 "Direct link to Sample Request")

```
curl -X GET \

  'https://<IS_HOSTNAME>:9446/api/fs/consent/admin/search/consent-file?consentId=a1b2c3d4-e5f6-7890-abcd-ef1234567890' \

  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...'
```

#### Sample Response — 200 OK[​](#sample-response-200-ok_2 "Direct link to Sample Response — 200 OK")

```
{

  "consentFile": "<pain.001.001.03 xmlns=\"urn:iso:std:iso:20022:...\">\n  <GrpHdr>...</GrpHdr>\n</pain.001.001.03>"

}
```

### Get Consent Amendment History[​](#get-consent-amendment-history "Direct link to Get Consent Amendment History")

Retrieves the full amendment history for a consent alongside its current state. Optionally enriched via the `ENRICH_CONSENT_SEARCH_RESPONSE` extension.

**`GET /admin/consent-amendment-history`**

#### Query Parameters[​](#query-parameters_4 "Direct link to Query Parameters")

| Parameter   | Type     | Required | Description                                                  |
| ----------- | -------- | -------- | ------------------------------------------------------------ |
| `consentId` | `string` | **Yes**  | ID of the consent whose amendment history is to be retrieved |

#### Sample Request[​](#sample-request_3 "Direct link to Sample Request")

```
curl -X GET \

  'https://<IS_HOSTNAME>:9446/api/fs/consent/admin/consent-amendment-history?consentId=a1b2c3d4-e5f6-7890-abcd-ef1234567890' \

  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...'
```

#### Sample Response — 200 OK[​](#sample-response-200-ok_3 "Direct link to Sample Response — 200 OK")

```
{

  "consentID": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",

  "currentConsent": {

    "consentID": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",

    "clientID": "YwqKLFEtG9f23zMAEHtaBC71bvAa",

    "consentType": "accounts",

    "currentStatus": "authorised",

    "createdTime": 1710000000,

    "updatedTime": 1712000000,

    "receipt": {

      "Data": {

        "Permissions": ["ReadAccountsDetail", "ReadBalances"],

        "ExpirationDateTime": "2027-01-01T00:00:00Z"

      }

    }

  },

  "amendmentHistory": [

    {

      "historyID": "hist-001",

      "amendedReason": "User extended expiry date",

      "amendedTime": 1712000000,

      "consentData": {

        "consentID": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",

        "currentStatus": "authorised",

        "receipt": {

          "Data": {

            "Permissions": ["ReadAccountsDetail", "ReadBalances"],

            "ExpirationDateTime": "2026-12-31T00:00:00Z"

          }

        }

      }

    }

  ],

  "metadata": {

    "amendmentCount": 1

  }

}
```

#### Flow With `ENRICH_CONSENT_SEARCH_RESPONSE` Extension Enabled[​](#flow-with-enrich_consent_search_response-extension-enabled "Direct link to flow-with-enrich_consent_search_response-extension-enabled")

The handler posts the raw `amendmentHistory` array to the external service with `searchType: "AMENDMENT_HISTORY"`. The enriched array returned by the service replaces the raw history in the response.

***

### Trigger Consent Expiry Job[​](#trigger-consent-expiry-job "Direct link to Trigger Consent Expiry Job")

Manually triggers the background job that marks expired consents as expired.

**`GET /admin/expire-consents`**

#### Sample Request[​](#sample-request_4 "Direct link to Sample Request")

```
curl -X GET \

  'https://<IS_HOSTNAME>:9446/api/fs/consent/admin/expire-consents' \

  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...'
```

#### Sample Response — 204 No Content[​](#sample-response-204-no-content_1 "Direct link to Sample Response — 204 No Content")

```
HTTP/1.1 204 No Content
```

### Search Consent Attributes[​](#search-consent-attributes "Direct link to Search Consent Attributes")

Searches consents by custom attribute key (and optionally by value). Useful for looking up consents tagged with domain-specific metadata.

**`GET /admin/search/consent-attributes`**

#### Query Parameters[​](#query-parameters_5 "Direct link to Query Parameters")

| Parameter | Type     | Required | Description                                                                               |
| --------- | -------- | -------- | ----------------------------------------------------------------------------------------- |
| `key`     | `string` | **Yes**  | Attribute key to search by                                                                |
| `value`   | `string` | No       | Attribute value to narrow the search. If omitted, returns all consents with the given key |

#### Sample Request — Search by Key and Value[​](#sample-request-search-by-key-and-value "Direct link to Sample Request — Search by Key and Value")

```
curl -X GET \

  'https://<IS_HOSTNAME>:9446/api/fs/consent/admin/search/consent-attributes?key=x-fapi-interaction-id&value=93bac548-d2de-4546-b106-880a5018460d' \

  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...'
```

#### Sample Response — 200 OK (key + value)[​](#sample-response-200-ok-key-value "Direct link to Sample Response — 200 OK (key + value)")

```
{

  "data": [

    {

      "consentID": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",

      "attributeKey": "x-fapi-interaction-id",

      "attributeValue": "93bac548-d2de-4546-b106-880a5018460d"

    }

  ]

}
```

#### Sample Request — Search by Key Only[​](#sample-request-search-by-key-only "Direct link to Sample Request — Search by Key Only")

```
curl -X GET \

  'https://<IS_HOSTNAME>:9446/api/fs/consent/admin/search/consent-attributes?key=x-fapi-interaction-id' \

  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...'
```

#### Sample Response — 200 OK (key only)[​](#sample-response-200-ok-key-only "Direct link to Sample Response — 200 OK (key only)")

```
{

  "data": [

    {

      "consentID": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",

      "attributeKey": "x-fapi-interaction-id",

      "attributeValue": "93bac548-d2de-4546-b106-880a5018460d"

    },

    {

      "consentID": "b9c8d7e6-f5a4-3210-bcde-fa0987654321",

      "attributeKey": "x-fapi-interaction-id",

      "attributeValue": "71adb321-1cbd-4329-a701-550a9014571e"

    }

  ]

}
```

## Service Extensions[​](#service-extensions "Direct link to Service Extensions")

Two service extension points can optionally delegate processing to an external HTTP service. They are activated via configuration:

| Extension Type                   | Triggered By                                                |
| -------------------------------- | ----------------------------------------------------------- |
| `ENRICH_CONSENT_SEARCH_RESPONSE` | `GET /admin/search`, `GET /admin/consent-amendment-history` |
| `PRE_PROCESS_CONSENT_REVOKE`     | `DELETE /admin/revoke`                                      |

## API Summary[​](#api-summary "Direct link to API Summary")

| Method   | Path                                 | Description                            | Permission Guard | Service Extension                |
| -------- | ------------------------------------ | -------------------------------------- | ---------------- | -------------------------------- |
| `GET`    | `/admin/search`                      | Search detailed consents               | Yes              | `ENRICH_CONSENT_SEARCH_RESPONSE` |
| `DELETE` | `/admin/revoke`                      | Revoke a consent                       | Yes              | `PRE_PROCESS_CONSENT_REVOKE`     |
| `GET`    | `/admin/search/consent-status-audit` | Search consent status audit records    | No               | N/A                              |
| `GET`    | `/admin/search/consent-file`         | Retrieve a consent's uploaded file     | No               | N/A                              |
| `GET`    | `/admin/consent-amendment-history`   | Get consent amendment history          | No               | `ENRICH_CONSENT_SEARCH_RESPONSE` |
| `GET`    | `/admin/expire-consents`             | Trigger consent expiry job             | No               | N/A                              |
| `GET`    | `/admin/search/consent-attributes`   | Search consents by attribute key/value | No               | N/A                              |

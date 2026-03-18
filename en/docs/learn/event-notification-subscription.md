#Event Subscription

The Event Subscription API facilitates the ability to subscribe to receive notifications about particular events of interest. Event Subscription endpoints are secured with basic authentication (admin username and password) and accept a JSON payload.

You can subscribe to receive notifications using this API for particular event types. WSO2 Open Banking Accelerator uses six API endpoints to manage event notification subscriptions.

- Event Subscription Creation

This API can be used to create event notification subscriptions tailored to user needs by selecting the events to be notified about.

- Event Subscription Retrieval
This API allows users to retrieve details of specific event notification subscriptions they previously created. This feature ensures that TPPs can access subscribed events and their configurations easily.

- All Event Subscriptions Retrieval
This API can be used to retrieve a comprehensive list of all event notification subscriptions.

- Event Subscriptions Retrieval by an Subscribed Event Type
The API enables the API users to retrieve event notification subscriptions that have subscribed to a particular event type. 

- Event Subscription Updation
This API allows users to update data and configurations of existing event notification subscriptions, enabling adaptation to changing requirements and preferences.

- Event Subscription Deletion
This API allows users to delete specific event notification subscriptions that are no longer required.

You can customize the Event Subscription Flow according to your requirements. For more information, see [Customizing Event Subscription](../develop/openapi-event-subscription.md).

Given below are sample Event Subscription request payloads and their responses:

- Create an Event Notification Subscription

```tab="Request"
curl --location 'https://localhost:9446/api/fs/event-notifications/subscription/' \
--header 'Authorization: Basic YWRtaW5Ad3NvMi5jb206d3NvMjEyMw==' \
--header 'x-wso2-client_id: L5Ao9g7ZgzBifPSDKyr8vDZlllca' \
--header 'Content-Type: application/json' \
--data '{
        "callbackUrl": "https://tpp.com/open-banking/v3.1/event-notifications",
        "eventTypes":[
            "urn_uk_org_openbanking_events_resource-update",
            "urn_uk_org_openbanking_events_consent-authorization-revoked",
            "urn:ietf:params:scim:event:create"
        ],
        "version": "3.1"
}'
```

```json tab="Response"
{
        "callbackUrl": "https://tpp.com/open-banking/v3.1/event-notifications",
        "subscriptionId": "77654c28-3c0f-4406-8ff3-7aa04efcbd33",
        "eventTypes": [
            "urn_uk_org_openbanking_events_resource-update",
            "urn_uk_org_openbanking_events_consent-authorization-revoked",
            "urn:ietf:params:scim:event:create"
        ],
        "version": "3.1"
}
```

- Retrieve an Event Notification Subscription

```tab="Request"
curl --location 'https://localhost:9446/api/fs/event-notifications/subscription/<SUBSCRIPTION_ID>' \
--header 'Authorization: Basic YWRtaW5Ad3NvMi5jb206d3NvMjEyMw==' \
--header 'x-wso2-client_id: L5Ao9g7ZgzBifPSDKyr8vDZlllca' \
--header 'Content-Type: application/json' \
--data '’
```

```json tab="Response"
{
   [
        {
            "callbackUrl": "updatedUrl",
            "subscriptionId": "e9125882-66ab-47d7-b9c0-3b55fe98ea84",
            "eventTypes": [
                "urn_uk_org_openbanking_events_resource-update",
                "urn_uk_org_openbanking_events_consent-authorization-revoked",
                "urn:ietf:params:scim:event:create"
            ],
            "version": "3.1"
        }
     ]
}
```

- Retrieve All Event Notification Subscriptions

```tab="Request"
curl --location 'https://localhost:9446/api/fs/event-notifications/subscription/' \
--header 'Authorization: Basic YWRtaW5Ad3NvMi5jb206d3NvMjEyMw==' \
--header 'x-wso2-client_id: L5Ao9g7ZgzBifPSDKyr8vDZlllca' \
--header 'Content-Type: application/json' \
--data ''
```

```json tab="Response"
{
   [
        {
            "callbackUrl": "updatedUrl",
            "subscriptionId": "e9125882-66ab-47d7-b9c0-3b55fe98ea84",
            "eventTypes": [
                "urn_uk_org_openbanking_events_resource-update",
                "urn_uk_org_openbanking_events_consent-authorization-revoked",
                "urn:ietf:params:scim:event:create"
            ],
            "version": "3.1"
        },
        {
            "callbackUrl": "updatedUrl",
            "subscriptionId": "e9125882-66ab-47d7-b9c0-3b55fe98ea84",
            "eventTypes": [
                "urn_uk_org_openbanking_events_resource-update",
                "urn_uk_org_openbanking_events_consent-authorization-revoked"
            ],
            "version": "3.1"
        }

    ]
}
```

- Retrieve Event Notification Subscriptions by an Subscribed Event Type

```tab="Request"
curl --location 'https://localhost:9446/api/fs/event-notifications/subscription/type/<SUBSCRIBED_EVENT_TYPE>' \
--header 'Authorization: Basic YWRtaW5Ad3NvMi5jb206d3NvMjEyMw==' \
--header 'x-wso2-client_id: L5Ao9g7ZgzBifPSDKyr8vDZlllca' \
--header 'Content-Type: application/json'
```

```json tab="Response"
{
   [
        {
            "callbackUrl": "updatedUrl",
            "subscriptionId": "e9125882-66ab-47d7-b9c0-3b55fe98ea84",
            "eventTypes": [
                "urn_uk_org_openbanking_events_consent-authorization-revoked",
                "urn:ietf:params:scim:event:create"
            ],
            "version": "3.1"
        },
        {
            "callbackUrl": "updatedUrl",
            "subscriptionId": "e9125882-66ab-47d7-b9c0-3b55fe98ea84",
            "eventTypes": [
                "urn_uk_org_openbanking_events_resource-update",
                "urn_uk_org_openbanking_events_consent-authorization-revoked"
            ],
            "version": "3.1"
        }

    ]
}
```

- Update an Event Notification Subscription

```tab="Request"
curl --location --request PUT 'https://localhost:9446/api/fs/event-notifications/subscription/<SUBSCRIPTION_ID>' \
--header 'Authorization: Basic YWRtaW5Ad3NvMi5jb206d3NvMjEyMw==' \
--header 'x-wso2-client_id: L5Ao9g7ZgzBifPSDKyr8vDZlllca' \
--header 'Content-Type: application/json' \
--data '{
        "test": "updatedValue",
        "eventTypes":[
            "urn_uk_org_openbanking_events_resource-update",
            "urn_uk_org_openbanking_events_consent-authorization-revoked"
        ]
}'
```

```json tab="Response"
{
        "callbackUrl": "updatedUrl",
        "subscriptionId": "e9125882-66ab-47d7-b9c0-3b55fe98ea84",
        "eventTypes": [
            "urn_uk_org_openbanking_events_resource-update",
             "urn_uk_org_openbanking_events_consent-authorization-revoked"
        ],
        "version": "3.1",
        "test": "updatedValue"
}
```

- Delete an Event Notification Subscription

```tab="Request"
curl --location --request DELETE 'https://localhost:9446/api/fs/event-notifications/subscription/<SUBSCRIPTION_ID>' \
--header 'Authorization: Basic YWRtaW5Ad3NvMi5jb206d3NvMjEyMw==' \
--header 'x-wso2-client_id: L5Ao9g7ZgzBifPSDKyr8vDZlllca' \
--header 'Content-Type: application/json' \
--data ''
```

```tab="Response"
204 No Content
```

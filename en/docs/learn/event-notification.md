#Event Notification

The Event Notification API in WSO2 Open Banking Accelerator provides a poll-based service. This API consists of three resources:

- Event Creation API
- Event Polling API
- Event Subscription API

The Event Notification API follows the **IETF Security Event Token (SET)** and the **Poll-Based Security Event Token (SET) Delivery Using HTTP**
specifications to serve general-purpose event notification creation and polling.

The Event Creation API allows storing event notification information as a JSON, which can be customized according to your
use case. The Event Polling API facilitates storing and retrieving event notifications according to the above specifications
without altering the information in the event information JSON.  The Event Subscription API facilitates the ability to subscribe to receive notifications about particular events of interest. All these endpoints are secured with basic authentication
(admin username and password) and accept base64 encoded JSON.

You can customize them according to your requirements. For more information, see [Customizing Event Notification](../develop/custom-event-notification.md).

### Event Creation

You can create a `create-event` resource using this API and persist information regarding an event. A sample Event
Creation request and response are as follows:

   ```tab="Request"
    curl --location --request POST 'https://localhost:9446/api/openbanking/event-notifications/create-events' \
    --header 'Authorization: Basic YWRtaW5Ad3NvMi5jb206d3NvMjEyMw==' \
    --header 'x-wso2-client_id: cli342efefvsgdsfv' \
    --header 'x-wso2-resource_id: vfjskenfksdnvfkkfdfd' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'request=ewogICAidXJuX3VrX29yZ19vcGVuYmFua2luZ19ldmVudHNfcmVzb3VyY2UtdXBkYXRlIjp7CiAgICAgICJrZXkxIjoidmFsdWUiLAogICAgICAia2V5MiI6InZhbHVlIiwKICAgICAgImtleTMiOiJ2YWx1ZSIKICAgfSwKICAgInVybl91a19vcmdfb3BlbmJhbmtpbmdfZXZlbnRzX2NvbnNlbnQtYXV0aG9yaXphdGlvbi1yZXZva2VkIjp7CiAgICAgICJrZXkxIjoidmFsdWUiLAogICAgICAia2V5MiI6InZhbHVlIiwKICAgICAgImtleTMiOiJ2YWx1ZSIKICAgfQp9'
   ```

   ```tab="Response"
   {
      "notificationsID":"5396b6c0-d974-4187-99d7-9e33ae916441"
   }
   ```

Given below is the decoded format of a sample request payload:

``` 
{
   "urn_uk_org_openbanking_events_resource-update":{
      "resourceID":"vfjskenfksdnvfkkfdfd'",
      "ref":"https://scim.example.com/Users/44f6142df96bd6ab61e7521d9"
   },
   "urn_uk_org_openbanking_events_consent-authorization-revoked":{
      "ref":"https://scim.example.com/Users/44f6142df96bd6ab61e7521d9",
      "attributes":[
         "id",
         "name",
         "userName",
         "password",
         "emails"
      ]
   },
   "urn:ietf:params:scim:event:create":{
      "ref":"https://scim.example.com/Users/44f6142df96bd6ab61e7521d9",
      "attributes":[
         "id",
         "name",
         "userName",
         "password",
         "emails"
      ],
      "resourceID":"9046c276-100f-40ed-b123-2d9f2bcb3e8e"
   }
}
```

### Event Polling

This endpoint allows applications to poll for, acknowledge, and receive event notifications. You can use this endpoint
when the API consumer applications communicate their polling parameters and event notification acknowledgements. Using this
endpoint the banks can respond accordingly; sending event notifications as indicated by the application's polling parameters.

Based on the request payloads, the Event Polling(`POST /events`) endpoint performs the following:

- Poll for events
- Acknowledge the received events
- Acknowledge error notifications
- Poll for new events and acknowledge the received events at once

A sample Event Polling request is as follows:

   ``` 
    curl --location --request POST 'https://localhost:9446/api/openbanking/event-notifications/events' \
    --header 'Authorization: Basic YWRtaW5Ad3NvMi5jb206d3NvMjEyMw==' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'request=eyAKICJyZXR1cm5JbW1lZGlhdGVseSI6IHRydWUsCiAibWF4RXZlbnRzIjogMCAKIH0='
   ```

!!! note
    The Event Polling(`/events`) endpoint supports the request payloads mentioned in the
    [Poll-Based Security Event Token (SET) Delivery Using HTTP](https://datatracker.ietf.org/doc/html/rfc8936) specification.

!!! tip
    The API consumer applications can send two polling parameters to indicate the polling behaviours:

      - `returnImmediately`: Indicates whether a bank should return a response immediately or provide a long poll. WSO2 
         Open Banking currently does not support Long Polling. Therefore, the value of `returnImmediately` is always `true`.
      - `maxEvents`: The maximum number of events to be returned. A value of 0 indicates the bank should not return events
         even if available. The upper bound value of the parameter depends on the size of the payload and the connection. 
         If the `maxEvents` value is not defined in the payload, the value will be set according to the `number_of_sets_to_return` 
         configuration in `<IS_HOME>/repository/conf/deployment.toml`.

Given below are sample Event Polling request payloads (in the decoded format) and their responses:

- When requesting a response immediately, only to make sure there are events available:

    ```json tab="Request"
    {
       "setErrs":{
          "65ac7453-13b0-4d2f-9946-dff6e6089a4f":{
             "err":"authentication_failed",
             "description":"The SET could not be authenticated"
          }
       },
       "returnImmediately":true,
       "maxEvents":0
    }
    ```

    ```json tab="Response"
    {
        "moreAvailable":true,
        "sets":{ }
    }
    ```

- When confirming that there are events. If there are 5 events available with the bank and the application
  wants to receive only 3 events:

    ```json tab="Request"
    {
       "returnImmediately":true,
       "maxEvents":3
    }
    ```

    ```json tab="Response"
    {
       "moreAvailable":true,
       "sets":{
          "a4a07198-5fec-448b-b7d0-c61e5fe122dc":"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJHZllacWhidFZYWjBVSldTR2JRbDZPd294b29hIiwiYXVkIjoiR2ZZWnFoYnRWWFowVUpXU0diUWw2T3dveG9vYSIsImlzcyI6Ind3dy5vcGVuYmFuay5jb20iLCJ0eG4iOiJiOWNlY2RmYi0wYWQwLTRiZmYtOTk2YS0zNjZkNjk0MWUyMjUiLCJ0b2UiOjE2NDY2NTYzODQwMDAsImlhdCI6MTY0NjcxMDA4MywianRpIjoiYTRhMDcxOTgtNWZlYy00NDhiLWI3ZDAtYzYxZTVmZTEyMmRjIiwiZXZlbnRzIjp7InVybl91a19vcmdfb3BlbmJhbmtpbmdfZXZlbnRzX3Jlc291cmNlLXVwZGF0ZSI6eyJrZXkyIjoidmFsdWUiLCJyZXNvdXJjZUlEIjoidmZqc2tlbmZrc2RudmZra2ZkZmQnIiwia2V5MyI6InZhbHVlIn0sInVybl91a19vcmdfb3BlbmJhbmtpbmdfZXZlbnRzX2NvbnNlbnQtYXV0aG9yaXphdGlvbi1yZXZva2VkIjp7ImtleTIiOiJ2YWx1ZSIsInJlc291cmNlSUQiOiJ2Zmpza2VuZmtzZG52ZmtrZmRmZCciLCJrZXkzIjoidmFsdWUifX19.ZGuLQEELC3RaQaBVDeK0eConHjWf5aw7QH60jHMkKwhFILNHs6Rn9sYIb-EORO1yGFrrEXaXOUAZLY23gADqGVCbNr3rGr-ye78hB0XAkNgY5Ur5ois43so6H1yvOOL1ddmXDwSOtOwxQM5UFNjNwSiutI1LDvTZ-T0_v9EsGsEeXLFd56sHhS9VAuKFhLHm9N8vsxc4dt6yx2e5KGIP7Mpx3PQZiPRWLObiPx5SEhDGSonskQurcXynBisOvjuvgI5BBAlSKOsOwWX1pC4PHTppHOv20xBu2b2lcFdl8TH1fKm_Btmd7cORTqj4TuXnQMKhKtOjyKoU81fCq3BySw",
          "44c27e45-063d-4ba6-82f1-5073d641fe25":"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJHZllacWhidFZYWjBVSldTR2JRbDZPd294b29hIiwiYXVkIjoiR2ZZWnFoYnRWWFowVUpXU0diUWw2T3dveG9vYSIsImlzcyI6Ind3dy5vcGVuYmFuay5jb20iLCJ0eG4iOiIwNzMzMDU2Ny1mZDAyLTQ5ODctYWUxMi1jMmZlYTdmZDY2OTEiLCJ0b2UiOjE2NDY2NTYzOTAwMDAsImlhdCI6MTY0NjcxMDA4MywianRpIjoiNDRjMjdlNDUtMDYzZC00YmE2LTgyZjEtNTA3M2Q2NDFmZTI1IiwiZXZlbnRzIjp7InVybl91a19vcmdfb3BlbmJhbmtpbmdfZXZlbnRzX3Jlc291cmNlLXVwZGF0ZSI6eyJrZXkyIjoidmFsdWUiLCJyZXNvdXJjZUlEIjoidmZqc2tlbmZrc2RudmZra2ZkZmQnIiwia2V5MyI6InZhbHVlIn0sInVybl91a19vcmdfb3BlbmJhbmtpbmdfZXZlbnRzX2NvbnNlbnQtYXV0aG9yaXphdGlvbi1yZXZva2VkIjp7ImtleTIiOiJ2YWx1ZSIsInJlc291cmNlSUQiOiJ2Zmpza2VuZmtzZG52ZmtrZmRmZCciLCJrZXkzIjoidmFsdWUifX19.hBczP5eyLl1bDyhPiuFBCUYM63C3mEq8Sx9Emkgdnz15K5pcEjYdLqDYjId8Pm2ev4-wxrXq4q1832dytDQriFTwR6rW5pYdeVWeRQSvVZ6YB9xbo1fRpqSTxgWuKKHBtiPRXff7Vcp6RGViSq7znCBLGjo1ban9-t2fR6CTlY__iMK-hjJmBQhHnPJzw0qUfAckqwkEEPUNeykQfhFS_07N5vFVw9ILuXlrJaxtsyS6mwEPNJK4cChUwuoKdN9HqmpvUzFBS3xrRXbwB5ASM6pZUCmmOncXUkYu9muCbtNNiHrev3gCjOvw9PDwlHxMscsQz4kZImOd48zGsYd-jg",
          "4b1dfb62-a08d-4704-9944-f05cc4cab43b":"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJHZllacWhidFZYWjBVSldTR2JRbDZPd294b29hIiwiYXVkIjoiR2ZZWnFoYnRWWFowVUpXU0diUWw2T3dveG9vYSIsImlzcyI6Ind3dy5vcGVuYmFuay5jb20iLCJ0eG4iOiI2YWMxYjdiYi03NGM1LTQ2YmUtYWUwMi04YjgzZWVkNGQ2Y2UiLCJ0b2UiOjE2NDY2NTYzOTUwMDAsImlhdCI6MTY0NjcxMDA4MywianRpIjoiNGIxZGZiNjItYTA4ZC00NzA0LTk5NDQtZjA1Y2M0Y2FiNDNiIiwiZXZlbnRzIjp7InVybl91a19vcmdfb3BlbmJhbmtpbmdfZXZlbnRzX3Jlc291cmNlLXVwZGF0ZSI6eyJrZXkyIjoidmFsdWUiLCJyZXNvdXJjZUlEIjoidmZqc2tlbmZrc2RudmZra2ZkZmQnIiwia2V5MyI6InZhbHVlIn0sInVybl91a19vcmdfb3BlbmJhbmtpbmdfZXZlbnRzX2NvbnNlbnQtYXV0aG9yaXphdGlvbi1yZXZva2VkIjp7ImtleTIiOiJ2YWx1ZSIsInJlc291cmNlSUQiOiJ2Zmpza2VuZmtzZG52ZmtrZmRmZCciLCJrZXkzIjoidmFsdWUifX19.WuCofwrejo7DJshARa2IRdZzXIoXqeX9EF8le3W2zWC1mvaFTA80iqa4PrUm416IkzogMd_yQHlioZ7Wkx9A1JOsrKetut3IVGTM7SgZoVmW1GMYP5JFV8XO8k5TyStNTrXSYTb7yADs17oe7Bn6oETStmGBUEJh4hul31ABF_P_hTwfPp9udAI_jHzpQBwhKkDE1--6ygRHjURCcj23WJDPKv6ZtHJpNxQm23x0L5Mr_tsNs8wRGQqEraNzuP964_fbtXXnF6EDGg6W0cRHSxxbSE3wx7uhYVdweWYYPrbGXXs9uxbeFoJryg4ydThzTGq9wnxvjxc3Kr_7EZW9Vg",
       }
    }    
    ```

- To acknowledge the received events (both positive and negative acknowledgments) while accepting more events.
  If there are more events available with the bank. The application continues requesting events until there are no more events.

    ```json  
    {
       "ack":[
          "1256db1c-8fda-4457-a755-bb5113dba717"
       ],
       "setErrs":{
          "65ac7453-13b0-4d2f-9946-dff6e6089a4f":{
             "err":"authentication_failed",
             "description":"The SET could not be authenticated"
          }
       },
       "returnImmediately":true
    }
    ```
    
    ### Event Subscription

You can subscribe to receive notifications using this API for particular event types. WSO2 Open Banking Accelerator uses six API endpoints to manage event notification subscriptions.

- Event Subscription Creation

API consumer applications can utilize this API to create event notification subscriptions tailored to their specific needs. By selecting the events they want to be notified about.

- Event Subscription Retrieval

The API allows API consumer applications to retrieve information about specific event notification subscriptions they have previously established. This feature ensures that TPPs have easy access to their subscribed events and their respective configurations.

- All Event Subscriptions Retrieval

API consumer applications can access a comprehensive list of all their event notification subscriptions..

- Event Subscriptions Retrieval by an Subscribed Event Type

The API enables the API users to retrieve event notification subscriptions that have subscribed to a particular event type. 

- Event Subscription Updation

API consumer applications have the flexibility to update the data and configurations of their existing event notification subscriptions. This feature allows them to adapt to changing requirements and preferences seamlessly.

- Event Subscription Deletion

The API allows API consumer applications to delete specific event notification subscriptions that are no longer required.

Given below are sample Event Subscription request payloads and their responses:

- Create an Event Notification Subscription

```tab="Request"
curl --location 'https://localhost:9446/api/openbanking/event-notifications/subscription/' \
--header 'Authorization: Basic YWRtaW5Ad3NvMi5jb206d3NvMjEyMw==' \
--header 'x-wso2-client_id: L5Ao9g7ZgzBifPSDKyr8vDZlllca' \
--header 'Content-Type: application/json' \
--data '{
        "callbackUrl": "https://tpp.com/open-banking/v3.1/event-notifications",
        "eventTypes":[
            "Consent-Authorization-Revoked",
            "Resource-Update",
            "Acount-Access-Consent-Linked-Account-Update"
        ],
        "test": "testValue"
}'
```

```json tab="Response"
{
        "callbackUrl": "https://tpp.com/open-banking/v3.1/event-notifications",
        "subscriptionId": "77654c28-3c0f-4406-8ff3-7aa04efcbd33",
        "eventTypes": [
            "Consent-Authorization-Revoked",
            "Resource-Update",
            "Acount-Access-Consent-Linked-Account-Update"
        ],
        "version": "3.1"
}
```

- Retrieve an Event Notification Subscription

```tab="Request"
curl --location 'https://localhost:9446/api/openbanking/event-notifications/subscription/<SUBSCRIPTION_ID>' \
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
                "Consent-Authorization-Revoked",
                "Resource-Update",
                "Acount-Access-Consent-Linked-Account-Update"
            ],
            "version": "3.1"
        }
     ]
}
```

- Retrieve All Event Notification Subscriptions

```tab="Request"
curl --location 'https://localhost:9446/api/openbanking/event-notifications/subscription/' \
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
                "Consent-Authorization-Revoked",
                "Resource-Update",
                "Acount-Access-Consent-Linked-Account-Update"
            ],
            "version": "3.1"
        },
       {
            "callbackUrl": "updatedUrl",
            "subscriptionId": "e9125882-66ab-47d7-b9c0-3b55fe98ea84",
            "eventTypes": [
                "Consent-Authorization-Revoked",
                "Resource-Update"
            ],
            "version": "3.1"
        }

    ]
}
```

- Retrieve Event Notification Subscriptions by an Subscribed Event Type

```tab="Request"
curl --location 'https://localhost:9446/api/openbanking/event-notifications/subscription/type/<SUBSCRIBED_EVENT_TYPE>' \
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
                "Resource-Update",
                "Acount-Access-Consent-Linked-Account-Update"
            ],
            "version": "3.1"
        },
       {
            "callbackUrl": "updatedUrl",
            "subscriptionId": "e9125882-66ab-47d7-b9c0-3b55fe98ea84",
            "eventTypes": [
                "Consent-Authorization-Revoked",
                "Resource-Update"
            ],
            "version": "3.1"
        }

    ]
}
```

- Update an Event Notification Subscription

```tab="Request"
curl --location --request PUT 'https://localhost:9446/api/openbanking/event-notifications/subscription/<SUBSCRIPTION_ID>' \
--header 'Authorization: Basic YWRtaW5Ad3NvMi5jb206d3NvMjEyMw==' \
--header 'x-wso2-client_id: L5Ao9g7ZgzBifPSDKyr8vDZlllca' \
--header 'Content-Type: application/json' \
--data '{
        "test": "updatedValue",
        "eventTypes":[
            "Consent-Authorization-Revoked",
            "Resource-Update"
        ]
}'
```

```json tab="Response"
{
        "callbackUrl": "updatedUrl",
        "subscriptionId": "e9125882-66ab-47d7-b9c0-3b55fe98ea84",
        "eventTypes": [
            "Consent-Authorization-Revoked",
             "Resource-Update"
        ],
        "version": "3.1"
}
```

- Delete an Event Notification Subscription

```tab="Request"
curl --location --request DELETE 'https://localhost:9446/api/openbanking/event-notifications/subscription/<SUBSCRIPTION_ID>' \
--header 'Authorization: Basic YWRtaW5Ad3NvMi5jb206d3NvMjEyMw==' \
--header 'x-wso2-client_id: L5Ao9g7ZgzBifPSDKyr8vDZlllca' \
--header 'Content-Type: application/json' \
--data ''
```

```tab="Response"
204 No Content
```

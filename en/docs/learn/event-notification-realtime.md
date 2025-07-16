#Real Time Event Notification

Real Time Event Notification is a method where banks will immediately notify the TPP about any events that occur, without waiting for a request from the TPP. This functionality ensures that TPPs stay informed about relevant events in real-time, enhancing their ability to effectively manage and utilize the consents.

To avail themselves of real time event notifications, TPPs are required to provide a callback URL during the subscription process for event notifications. Once the bank activates the Real time Event Notification feature, any relevant events pertaining to the TPP's consent resources trigger an HTTP POST request, which is subsequently sent to the callback URL specified by the TPP. Consequently, the TPP must establish a listening mechanism at the provided URL to capture and process these notifications effectively. 

You can customize the Real Time Event Notification Flow according to your requirements. For more information, see [Customizing Event Notification](../develop/custom-event-notification.md).

In order to enable Real Time Event Notification, TPPs must subscribe to receive event notifications using Event Subscription feature. TPPs must provide a callback URl which they have established to receive the event notifications. To create an Event Notification Subscription use the below request. 

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

To verify whther Real Time EVent Notification is working for the given callback URL, send an event with subscribed event types. A sample Event Creation request and response are as follows:

   ```
    curl --location --request POST 'https://localhost:9446/api/fs/event-notifications/create-events' \
    --header 'Authorization: Basic YWRtaW5Ad3NvMi5jb206d3NvMjEyMw==' \
    --header 'x-wso2-client_id: cli342efefvsgdsfv' \
    --header 'x-wso2-resource_id: vfjskenfksdnvfkkfdfd' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'request=ewogICAidXJuX3VrX29yZ19vcGVuYmFua2luZ19ldmVudHNfcmVzb3VyY2UtdXBkYXRlIjp7CiAgICAgICJrZXkxIjoidmFsdWUiLAogICAgICAia2V5MiI6InZhbHVlIiwKICAgICAgImtleTMiOiJ2YWx1ZSIKICAgfSwKICAgInVybl91a19vcmdfb3BlbmJhbmtpbmdfZXZlbnRzX2NvbnNlbnQtYXV0aG9yaXphdGlvbi1yZXZva2VkIjp7CiAgICAgICJrZXkxIjoidmFsdWUiLAogICAgICAia2V5MiI6InZhbHVlIiwKICAgICAgImtleTMiOiJ2YWx1ZSIKICAgfQp9'
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

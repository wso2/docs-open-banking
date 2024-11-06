#Event Creation

The Event Creation API allows storing event notification information as a JSON, which can be customized according to your use case. This endpoint are secured with basic authentication (admin username and password) and accept base64 encoded JSON. The Event Creation API follows the **IETF Security Event Token (SET)** specifications to serve general-purpose event notification creation.

Event Creation API expects a Base64 encoded object of events as the payload and it contains the event type as the key and the event details as the value. The format of the events are not mandated from Accelerator. It is the responsibilty of the toolkit developer to ensure the accuracy of the format of the events according to the regulatory specification they follow. 

You can customize the Event Creation Flow according to your requirements. For more information, see [Customizing Event Notification](../develop/custom-event-notification.md).


You can create a `create-event` resource using this API and persist information regarding an event. A sample Event Creation request and response are as follows:

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

Given below is the decoded format of a reference request payload (The JSON object inside the event type attribute can contain any information specific to the event, it doesn't have to be in the same format as below): 

   ```tab="Format"
   {
      <EVENT_TYPE>:{
         <EVENT_SPECIFIC_INFORMATION>
      },
      <EVENT_TYPE>:{
         <EVENT_SPECIFIC_INFORMATION>
      }
   }
   ```

   ```tab="Sample"
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

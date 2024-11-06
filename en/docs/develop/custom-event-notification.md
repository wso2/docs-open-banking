#Event Notification

Open Banking Specifications require banks to notify any changes related to consent to the Third Party Application Provider (TPP). To achieve this, the specifications includes an API called the Event Notification API, including the flows and common functionality to allow a TPP to receive event notifications. 

The Event Notification feature in WSO2 Open Banking Accelerator provides a realtime service and a poll-based service. WSO2 Open Banking Accelerator supports following features:

- Event Subscription
- Event Creation
- Event Polling
- Real Time Event Notification

You can customize the Event Notification feature using the extension points discussed in this page.

### Event Creation Service Handler

This interface provides methods to validate the event creation payload, invoke the event creation service, and modify
the final response for the event creation. You can implement custom validations or custom responses for the event
notification creation endpoint using this interface.

``` java
com.wso2.openbanking.accelerator.event.notifications.service.handler.EventCreationServiceHandler
```

#### publishOBEvent method

This method lets you store event-related data in the accelerator database (`openbank_openbankingdb`).
The event information is saved in the JSON format and you can customize this JSON according to your requirements.

``` java
/**
 * This method is used to publish OB events in the accelerator database. The method is a generic
 * method that is used to persist data into the OB_NOTIFICATION and OB_NOTIFICATION_EVENT tables.
 * @param notificationCreationDTO
 * @return For successful request the API will return a JSON with the notificationID
 */
EventCreationResponse publishOBEvent(NotificationCreationDTO notificationCreationDTO);
```

### Data 
The following table explains the data available in `NotificationCreationDTO`.

| Name      | Type                  | Description  |
| ----------|-----------------------| -------------|
| clientId      | String            | The client ID of the application that made the request. This application is bound to the request from the gateway insequence based on the token used. |
| resourceId    | String    | Unique identifier of the consent resource related to the event. |
| events      | Map<String, JSONObject>   | Map of events to be persisted. |

### Configuration 

To configure the Event Creation Service Handler, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
    
2. Locate the following tag and configure it with the customized component.
  ```xml 
  [open_banking.event.notifications]
  event_creation_handler = "com.wso2.openbanking.accelerator.event.notifications.service.handler.DefaultEventCreationServiceHandler"
  ```

### Event Polling Service Handler

This interface provides methods to validate the event polling payload, invoke the event polling service, and modify
the final response for event polling. You can implement any custom validations or custom responses for the event
polling response using this interface.

``` java
com.wso2.openbanking.accelerator.event.notifications.service.handler.EventPollingServiceHandler
```

#### pollEvents method

The method lets you provide both positive and negative event acknowledgements. You can use this method to update the
status of the event notification and poll for notifications in the `open` status. 

``` java
/**
 * This method follows the IETF Specification for SET delivery over HTTP.
 * The method supports event acknowledgements in both positive and negative.
 * Also, can be used to POLL for available OPEN notifications.
 * @param eventPollingRequest
 * @return EventPollingResponse to the polling endpoint.
 */
EventPollingResponse pollEvents(JSONObject eventPollingRequest);
```

#### mapPollingRequest method

This method lets you map `eventPollingRequest` to its data object (`EventPollingDTO`). The data object is used to invoke 
the polling service.

``` java
/**
 * This method is used to map the eventPollingRequest to EventPollingDTO
 * @param eventPollingRequest
 * @return eventPollingDTO with the request parameters.
 */
EventPollingDTO mapPollingRequest(JSONObject eventPollingRequest);
```

The following table explains the data available in `EventPollingDTO`.

| Name      | Type                  | Description  |
| ----------|-----------------------| -------------|
| clientId      | String            | The client ID of the application that made the request. This application is bound to the request from the gateway insequence based on the token used. |
| maxEvents      | int   | The maximum number of events to be transmitted. |
| returnImmediately      | Boolean   | Whether the bank should return a response immediately. Set to true by default as WSO2 Open Banking don't support long polling |
| ack    | List<String>    | List of event notification Ids that has been received and successfully processed |
| errors      | Map<String, NotificationError>   | Map of notification id and error details of the notifications that has been received but the TPP encountered an error in processing. |

The following table explains the data available in `NotificationError`.

| Name      | Type                  | Description  |
| ----------|-----------------------| -------------|
| notificationId | String | The Notification ID of the event notification. |
| errorCode      | int   | Error Code. |
| errorDescription | Boolean   | Error description |

### Configuration 

To configure the Event Polling Service Handler, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
    
2. Locate the following tag and configure it with the customized component.
  ```xml 
  [open_banking.event.notifications]
  event_polling_handler = "com.wso2.openbanking.accelerator.event.notifications.service.handler.DefaultEventPollingServiceHandler"
  ```

### Event Subscription Service Handler

This interface provides methods to validate the event subscription payload, invoke the event subscription service, and modify
the final response for the event subscription. You can implement custom validations or custom responses for the event notification
subscription endpoint using this interface.

``` java
com.wso2.openbanking.accelerator.event.notifications.service.handler.EventSubscriptionServiceHandler
```

#### createEventSubscription method

The method lets you create an event subscription to receive events tailored to your specific needs. By selecting the events they 
want to be notified about.

``` java
/**
 * This method is used to create event subscriptions in the accelerator database. The method is a generic
 * method that is used to persist data into the NOTIFICATION_SUBSCRIPTION and NOTIFICATION_SUBSCRIPTION_EVENT
 * tables.
 *
 * @param eventSubscriptionRequestDto The request DTO that contains the subscription details.
 * @return For successful request the API will return a JSON with the subscriptionId
 */
EventSubscriptionResponse createEventSubscription(EventSubscriptionDTO eventSubscriptionRequestDto);
```

#### getEventSubscription method

The method lets you retrieve information about specific event notification subscriptions you have previously established. 
This feature ensures that you have easy access to the subscribed events and the respective configurations.

``` java
/**
 * This method is used to retrieve an event subscription by its subscription ID.
 *
 * @param clientId The client ID of the subscription.
 * @param subscriptionId The subscription ID of the subscription.
 * @return For successful request the API will return a JSON with the retrieved Subscription.
 */
EventSubscriptionResponse getEventSubscription(String clientId, String subscriptionId);
```

#### getAllEventSubscriptions method

The method lets you access a comprehensive list of all their event notification subscriptions.

``` java
/**
 * This method is used to retrieve all event subscriptions of a client.
 *
 * @param clientId The client ID of the subscription.
 * @return For successful request the API will return a JSON with the retrieved Subscriptions.
 */
EventSubscriptionResponse getAllEventSubscriptions(String clientId);
```

#### getEventSubscriptionsByEventType method

The method lets you retrieve event notification subscriptions that have subscribed to a particular event type.

``` java
/**
 * This method is used to retrieve all event subscriptions by event type.
 *
 * @param clientId The client ID of the subscription.
 * @param eventType The event type that needs to be subscribed by the retrieving subscriptions.
 * @return For successful request the API will return a JSON with the retrieved Subscriptions.
 */
EventSubscriptionResponse getEventSubscriptionsByEventType(String clientId, String eventType);
```

#### updateEventSubscription method

The method lets you update the data and configurations of their existing event notification subscriptions. 
This feature allows them to adapt to changing requirements and preferences seamlessly.

``` java
/**
 * This method is used to update an event subscription.
 *
 * @param eventSubscriptionUpdateRequestDto The request DTO that contains the updating subscription details.
 * @return For successful request the API will return a JSON with the updated Subscription.
 */
EventSubscriptionResponse updateEventSubscription(EventSubscriptionDTO eventSubscriptionUpdateRequestDto);
```

#### deleteEventSubscription method

The method lets you delete specific event notification subscriptions that are no longer required.

``` java
/**
 * This method is used to delete an event subscription.
 *
 * @param clientId The client ID of the subscription.
 * @param subscriptionId The subscription ID of the subscription.
 * @return For successful request the API will an OK response.
 */
EventSubscriptionResponse deleteEventSubscription(String clientId, String subscriptionId);
```

The following table explains the data available in `EventSubscriptionDTO`.

| Name      | Type                  | Description  |
| ----------|-----------------------| -------------|
| clientId      | String            | The client ID of the application that made the request. This application is bound to the request from the gateway insequence based on the token used. |
| subscriptionId      | String   | The unique id of the subscription resource. |
| requestData      | JSONObject   | Request payload object. |

The following table explains the data available in `EventSubscriptionResponse`.

| Name      | Type                  | Description  |
| ----------|-----------------------| -------------|
| status | int | Https Status. |
| responseBody  | Object   | Response payload to return. |
| errorResponse | Object   | Error Response to return |

### Configuration 

To configure the Event Polling Service Handler, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
    
2. Locate the following tag and configure it with the customized component.
  ```xml 
  [open_banking.event.notifications]
   event_subscription_handler = "com.wso2.openbanking.accelerator.event.notifications.service.handler.DefaultEventSubscriptionServiceHandler"
  ```

### Event Notification Generator

This interface provides a method to customize the event notification JSON. For example, use this class to send additional 
claims in the notification. Furthermore, you can derive an event notification JSON body and generate the JWT.

``` java
com.wso2.openbanking.accelerator.event.notifications.service.service.EventNotificationGenerator
```

#### generateEventNotificationBody method

This method lets you generate the event notification body. You can use this method to modify the claim values in 
the event notification body

``` java
/**
  * This method is to generate event notification body. To generate custom values
  * for the body this method should be extended.
  * @param notificationDTO
  * @param notificationEventList
  * @return
  * @throws OBEventNotificationException
  */
Notification generateEventNotificationBody(NotificationDTO notificationDTO, List<NotificationEvent> notificationEventList) throws OBEventNotificationException;
```

The following table explains the data available in `NotificationDTO`.

| Name      | Type                  | Description  |
| ----------|-----------------------| -------------|
| notificationId      | String      | Unique identifier of the event notification. |
| clientId      | String            | The client ID of the application that made the request. This application is bound to the request from the gateway insequence based on the token used. |
| resourceId      | String            | Unique identifier of the consent resource related to the event. |
| status      | String   | Status of the event notification |
| updatedTimeStamp | Long   | Updated timestamp. |

The following table explains the data available in `NotificationEvent`.

| Name      | Type                  | Description  |
| ----------|-----------------------| -------------|
| eventId | Integer | Unique identifier of the event type. |
| notificationId  | String   | Unique identifier of the event notification. |
| eventType | String   | Event type. |
| eventInformation | JSONObject   | Additional information related to event type.|

The following table explains the data available in `Notification`.

| Name      | Type                  | Description  |
| ----------|-----------------------| -------------|
| iss | String | Unique identifier of the issuer publishing the SET. |
| iat | Long   | Value representing when the SET was issued. |
| jti | String   | Unique identifier for the SET. |
| sub | String   | Subject of the SET. |
| aud | String   | One or more audience identifiers for the SET.|
| txn | String   | Unique transaction identifier.|
| toe | Long   | Date and time at which the event occurred.|
| events | Map<String, JSONObject>   | Map of events.|

### Configuration 

To configure the Event Polling Service Handler, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
    
2. Locate the following tag and configure it with the customized component.
  ```xml 
  [open_banking.event.notifications]
   event_notification_generator = "com.wso2.openbanking.accelerator.event.notifications.service.service.DefaultEventNotificationGenerator"
  ```

### Real-time Event Notification Request Generator

Real-time Event Notification Request Generator can generate real-time event notification payload and get additional headers for the real-time event notification POST request. Following is the interface to generate real-time event notification requests

``` java
com.wso2.openbanking.accelerator.event.notifications.service.realtime.service.RealtimeEventNotificationRequestGenerator
```

#### getRealtimeEventNotificationPayload method

This method gets a NotificationDTO and an encoded event notification as parameters and returns a Stringified JSON. You can add any parameter to this notification body from the NotificationDTO.

``` java
/**
  * This method is to generate realtime event notification payload. To generate custom values
  * for the body this method should be extended.
  *
  * @return String payload
  */
String getRealtimeEventNotificationPayload(NotificationDTO notificationDTO, String eventSET);
```

#### getAdditionalHeaders methods

This method returns a Map<String, String> that contains the header name: header value type items to use as the headers for Apache HTTP POST requests made in the RealtimeEventNotificationSenderService. You can return any additional parameters from this method to attach to the HTTP POST requests sent to the Callback URLs

``` java
/**
  * This method is to generate realtime event notification request headers. To generate custom values
  * for the body this method should be extended.
  *
  * @return Map<String, String> headers
  */
Map<String, String> getAdditionalHeaders();
```

The following table explains the data available in `NotificationDTO`.

| Name      | Type                  | Description  |
| ----------|-----------------------| -------------|
| notificationId      | String      | Unique identifier of the event notification. |
| clientId      | String            | The client ID of the application that made the request. This application is bound to the request from the gateway insequence based on the token used. |
| resourceId      | String            | Unique identifier of the consent resource related to the event. |
| status      | String   | Status of the event notification |
| updatedTimeStamp | Long   | Updated timestamp. |

### Configuration 

To configure the Real Time Event Notification Request Generator, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
    
2. Locate the following tag and configure it with the customized component.
  ```xml 
  [open_banking.event.notifications]
  event_notification_request_generator = "com.wso2.openbanking.accelerator.event.notifications.service.realtime.service.DefaultRealtimeEventNotificationRequestGenerator"
  ```


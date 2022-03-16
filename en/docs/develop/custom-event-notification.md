#Event Notification

The Event Notification API in WSO2 Open Banking Accelerator provides a poll-based service. This API consists of the
Event Creation API and Event Polling API. You can customize the Event Notification feature using the extension
points discussed in this page.

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
  * @param notificationDAO
  * @param notificationEventList
  * @return
  * @throws OBEventNotificationException
  */
Notification generateEventNotificationBody(NotificationDAO notificationDAO, List<NotificationEvent>
         notificationEventList) throws OBEventNotificationException;
```

## Configuring Custom Event Notification Services

Once implemented, build JAR files for your custom Event Notification services:

1. To create Event Notification database tables:
     1. Go to the `<IS_HOME>/dbscripts/open-banking/event-notifications` directory.
     2. According to your database, execute the relevant script against the `openbank_openbankingdb` database.
2. Place the JAR files in the `<IS_HOME>/repository/components/dropins` directory.
3. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
4. Find the `resource.access_control` configurations and add the following tags to secure the Event Notification endpoints:
      ``` toml
       [[resource.access_control]]
       context = "(.)/api/openbanking/event-notifications/(.)"
       secure="true"
       http_method="all"
       permissions=["/permission/admin"]
       allowed_auth_handlers = ["BasicAuthentication"]
      ```
5. Add the following tags and configure the customized handlers and generator using their Fully Qualified Names (FQN):

    ??? tip "Click here to see the definitions of the configuration tags..."
         | Configuration | Description |
         | ------------- | ----------- |
         | `token_issuer` | The issuer of the notification JWT. For example, bank. |
         | `number_of_sets_to_return` | The maximum number of events to be returned. This is the default value for `maxEvents`, if the request payload has not defined a value. |
         | `event_creation_handler` | Configure your Event Creation Handler using its FQN.|
         | `event_polling_handler` | Configure your Event Polling Handler using its FQN.|
         | `event_notification_generator` | Configure your Event Notification Generator using its FQN. |
         | `set_sub_claim_included`, `set_txn_claim_included`, `set_toe_claim_included`| Configure the customized optional claims in event notification using these tags. They represent the subject, transaction, and time of event claims respectively. |espectively. |

      ``` toml 
       [open_banking.event.notifications]
        token_issuer = "www.wso2.com"
        number_of_sets_to_return = 5
        event_creation_handler = "com.wso2.openbanking.accelerator.event.notifications.service.handler.DefaultEventCreationServiceHandler"
        event_polling_handler = "com.wso2.openbanking.accelerator.event.notifications.service.handler.DefaultEventPollingServiceHandler"
        event_notification_generator = "com.wso2.openbanking.accelerator.event.notifications.service.service.DefaultEventNotificationGenerator"
        set_sub_claim_included = true
        set_txn_claim_included = true
        set_toe_claim_included = true
      ```



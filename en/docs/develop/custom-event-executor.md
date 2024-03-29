##Writing a Custom Event Executor

WSO2 Open Banking Accelerator contains an event executor that processes events taken from an event queue 
asynchronously. Relevant events are added to the event queue by WSO2 Open Banking Accelerator depending 
on the event triggering scenario. Currently, all the consent state-changing events are added to the event queue.

You can implement the interface provided in WSO2 Open Banking Accelerator and process the events according to your 
open banking requirements:

- To implement a custom Event Executor, extend the following class:

``` java
com.wso2.openbanking.accelerator.common.event.executor.OBEventExecutor
```

Given below is a brief explanation of the methods you need to implement.

###processEvent method

This method processes the events polled from the event queue. Given below is the method signature:

``` java
public void processEvent(OBEvent obEvent)
```

Input parameters

- `OBEvent obEvent` - contains an OBEvent object with event related details.

??? tip "Click here to see the `OBEvent` model class.."

      ``` java
          private String eventType;
          private Map<String, Object> eventData;
          
          public OBEvent(String eventType, Map<String, Object> eventData) {
          
             this.eventType = eventType;
             this.eventData = eventData;
          }
          
          public String getEventType() {
          
             return eventType;
          }
          
          public Map<String, Object> getEventData() {
          
             return eventData;
          }
      
      ```

!!! note
      `Map<String, Object> eventData` contains the following parameters with respective key-value pairs for a **consent 
      related state change**. 

Use the following values to perform business logic:

| Key | Value |
|---------|---------    |
|`ConsentId`|Consent ID|
|`UserId`|User ID|
|`PreviousConsentStatus`|The status of the consent before the status change event|
|`Reason`|Reason for the change of consent status|
|`ClientId`|Client ID|
|`ConsentDataMap`|A `Map<String, Object>` data map that contains additional details|

For example:

- Implement the `OBEventExecutor` class and override the `processEvent` method in your class as follows:

``` java
   @Override
   public void processEvent(OBEvent obEvent) {
   
      Map<String, Object> eventData = obEvent.getEventData();
   
      if (Boolean.parseBoolean(OpenBankingCDSConfigParser.getInstance().getConfiguration()
              .get(CDSConsentExtensionConstants.ENABLE_RECIPIENT_CONSENT_REVOCATION).toString())
              && ConsentCoreServiceConstants.CONSENT_REVOKE_FROM_DASHBOARD_REASON.equals(eventData.get(REASON))
              && REVOKED_STATE.equalsIgnoreCase(obEvent.getEventType())) {
   
          // call DR's arrangement revocation endpoint
          try {
              if (eventData.get(CLIENT_ID) != null && eventData.get(CONSENT_ID) != null) {
                  sendArrangementRevocationRequestToADR(eventData.get(CLIENT_ID).toString(),
                          eventData.get(CONSENT_ID).toString(), OpenBankingCDSConfigParser.getInstance()
                                  .getConfiguration().get(CDSConsentExtensionConstants.DATA_HOLDER_ID).toString());
              } else {
                  log.error("Consent ID/Client ID cannot be null");
              }
          } catch (OpenBankingException e) {
              log.error("Something went wrong when sending the arrangement revocation request to ADR", e);
          }
      }
   
   }

   protected void sendArrangementRevocationRequestToADR(String clientId, String consentId, String dataHolderId)
          throws OpenBankingException {
   
       // implementation logic
   }

```

##Configuring a Custom Event Executor

1. Once implemented, build a JAR file for your Custom Event Executor and place it in either or both
   `<IS_HOME>/repository/components/lib` directory and `<APIM_HOME>/repository/components/lib` directory based on your requirement.
2. Open the `<IS_HOME>/repository/conf/deployment.toml` file if you have placed the JAR file in the `<IS_HOME>/repository/components/lib` directory in step 1.
3. Find the `[open_banking.event]` tag and configure the queue size, the number of worker threads, and the event 
   executor using the Fully Qualified Name (FQN) of your custom event executor class. For example:

       ``` toml
       [open_banking.event]
       queue_size=32768
       worker_thread_count=10
       event_executor="com.wso2.openbanking.accelerator.common.event.executor.DefaultOBEventExecutor"

       ```

4. Save the above configurations and restart the Identity Server.
5. Repeat steps 2 and 3 for API Manager using the `<APIM_HOME>/repository/conf/deployment.toml` file if you have placed the JAR file in the `<APIM_HOME>/repository/components/lib` directory in step 1. 
6. Restart the API Manager server.

!!!note "Configuring a set of Custom Event Executors"

    You can use the `event_executor` configuration under the `[open_banking.event]` tag when there is only one custom event executor for the entire deployment. However, if you want to configure 
    multiple custom event executors in a defined order, add the configurations as follows:
    
    !!!info
        This is only available as a WSO2 Update from **WSO2 Open Banking IAM Accelerator Level 3.0.0.33** onwards. For more information on updating, see [Getting WSO2 Updates](../install-and-setup/setting-up-servers.md#getting-wso2-updates).

    1. Remove the `event_executor` configuration under the `[open_banking.event]` tag and include it under a `[[open_banking.event.event_executors]]` tag with the required priority order. For example:

         ``` toml
         [[open_banking.event.event_executors]]
         name = "com.wso2.openbanking.accelerator.common.event.executor.DefaultOBEventExecutor"
         priority = 1

         ```

    2. According to the number of custom executors you want to configure, add `[[open_banking.event.event_executors]]` tags after the `[open_banking.event]` tag. 

    3. Configure each Custom Event Executor using the Fully Qualified Name (FQN) of your custom event executor class with the decided priority order. For example:

         ``` toml
         [[open_banking.event.event_executors]]
         name = "com.wso2.openbanking.accelerator.common.event.executor.OBEventExecutor1"
         priority = 2

         [[open_banking.event.event_executors]]
         name = "com.wso2.openbanking.accelerator.common.event.executor.OBEventExecutor2"
         priority = 3
         ``` 

    
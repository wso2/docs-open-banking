##Publish from a custom component
You can publish any streams using the custom component. For example, Dynamic Client Registration.

1. Use a Data Publisher instance from the `getDataPublisherInstance()` utility method of the `OBDataPublisherUtil` class. 
This method returns a pooled instance of the configured data publishing protocol.

2. Perform data publishing using the `publish(String <streamName>, String <streamVersion>, Map<String, Object> analyticsData)` 
method of the `OpenBankingDataPublisher` interface.

3. Release the data publisher instance back to the pool in order to reuse. This can be done using the `releaseDataPublishingInstance(OpenBankingDataPublisher instance)` 
utility method of the `OBDataPublisherUtil` class.
    - Given below is the utility class of data publishing:
    ```java
    public class OBDataPublisherUtil {
    
      private static final Log log = LogFactory.getLog(OBDataPublisherUtil.class);
    
      public static OpenBankingDataPublisher getDataPublisherInstance() {
    
        DataPublisherPool < OpenBankingDataPublisher > pool =
          OBAnalyticsDataHolder.getInstance().getDataPublisherPool();
        try {
          return pool.borrowObject();
        } catch (Exception e) {
          log.error("Error while receiving Thrift Data Publisher from the pool.");
        }
        return null;
      }
    
      public static void releaseDataPublishingInstance(OpenBankingDataPublisher instance) {
    
        OBAnalyticsDataHolder.getInstance().getDataPublisherPool().returnObject(instance);
        log.debug("Data publishing instance released to the pool");
      }
    ```
    - See the sample given below:
    ```java
    // Get an instance from pool
    OpenBankingDataPublisher dataPublisher = OBDataPublisherUtil.getDataPublisherInstance();
    // Check whether an instance received
    if (dataPublisher != null) {
      Map < String, Object > data = new HashMap < > ();
      data.put("attribute1", "value1");
      data.put("attribute2", "value2");
      data.put("attribute3", "value3");
      dataPublisher.publish("SampleStreamName", "1.0.0", data);
      // Release publisher instance
      OBDataPublisherUtil.releaseDataPublishingInstance(dataPublisher);
    }
    ```


## Create a customized Siddhi App 
You can create a customized Siddhi app to publish your data using the instructions given [here](https://siddhi.io/en/v4.x/docs/quick-start/)

!!!tip
    For your reference, you can use the existing Siddhi apps in WSO2 Open Banking Business Intelligence Accelerator for API Invocation, 
    access token, and authentication by opening the `<WSO2_OB_BI_ACCELERATOR_HOME>/carbon-home/deployment/siddhi-files` 
    directory.

WSO2 Open Banking Accelerator has by default enabled data publishing in API gateway and authentication components. Additionally, 
you can publish any streams using a custom component. For example, in Dynamic Client Registration. 

Let's see how you can publish data using a custom component:

###publishData method
This method validates data in the map against the configuration you add and publish to WSO2 Open Banking Business Intelligence.

This method is included in the following class. 
```java
com.wso2.openbanking.accelerator.data.publisher.common.util.OBDataPublisherUtil.java
```

- Publish date using the `publishData(String streamName, String streamVersion, Map<String, Object> analyticsData)` 
method in the `OBDataPublisherUtil` class. Given below is the method signature:
```java
public static void publishData(String streamName, String streamVersion, Map<String, Object> analyticsData)
```

- For example, you can invoke the method as follows:
```java
OBDataPublisherUtil.publishData(API_LATENCY_INPUT_STREAM, API_LATENCY_STREAM_VERSION, analyticsData);
```

###Configuration
Once you have added the data elements that needs publish, let's configure those.

1. Open `<PRODUCT_HOME>/repository/conf/deployment.toml`. Select the instance (Identity Server or API Manager) accordingly.
2. Once you add the data elements that you need for data publishing, define the stream and their attributes with the priority 
   in `<IS_HOME>/repository/conf/deployment.toml` using the following format:
   ```toml
   [[open_banking.data_publishing.thrift.stream]]
   name="streamNamex"
   [[open_banking.data_publishing.thrift.stream.attributes]]
   name="attributeset1x"
   priority=3
   [[open_banking.data_publishing.thrift.stream.attributes]]
   name="attributeset2x"
   priority=1
   ```
   For example,
   ```toml
   [[open_banking.data_publishing.thrift.stream.attributes]]
   name="timestamp"
   priority=6
   required=true
   type="long"
   ```
   
       - The property, `required` is treated as `false` if not explicitly mentioned.
       - The property, `type` is treated as `string` if not explicitly mentioned.

## Create a custom Siddhi Application
You can create a customized Siddhi Application to publish your data using the instructions given [here](https://siddhi.io/en/v4.x/docs/quick-start/)

!!!tip
    You can refer to the existing Siddhi Applications in WSO2 Open Banking Business Intelligence Accelerator. They publish 
    data for the events of API Invocation, access token, and authentication. The default Siddhi Applications are available 
    in the `<OB_BI_ACCELERATOR_HOME>/carbon-home/deployment/siddhi-files` directory.
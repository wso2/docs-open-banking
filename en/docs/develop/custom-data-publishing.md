WSO2 Open Banking Accelerator supports publishing data in the API gateway and authentication components. Additionally, 
you can publish a new data stream via an executor in the gateway. This page explains how to publish any data stream using 
a custom executor:

## Write an executor for data publishing

Write a new gateway executor to publish data and configure it according to the 
[Custom Gateway Executor](custom-gateway-executor.md) documentation.

## Publish data

Use the `publishData` method to publish data. 

###publishData method
This method validates the data provided in the map against your configurations and publishes them to WSO2 Open Banking Business Intelligence.

The `publishData` method is available in the following class:

``` java
com.wso2.openbanking.accelerator.data.publisher.common.util.OBDataPublisherUtil;
```

The method signature is as follows:

``` java
public static void publishData(String streamName, String streamVersion, Map<String, Object> analyticsData)
```

Given below is a brief explanation of the input parameters:

- `String streamName`: The name of the data stream
- `String streamVersion`: The version of the stream.
- `Map<String, Object> analyticsData`: A map containing the data attributes (name and value) to be published

For example, you can invoke the method as follows:
```java
OBDataPublisherUtil.publishData(API_LATENCY_INPUT_STREAM, API_LATENCY_STREAM_VERSION, analyticsData);
```

##Configure data streams and attributes

To define the data stream and the set of attributes you want to publish, configure them as follows:

1. Open `<APIM_HOME>/repository/conf/deployment.toml`. 
2. Defining the name of the stream as follows:
    ``` toml
    [[open_banking.data_publishing.thrift.stream]]
    name="<Data Stream name>"
    ```
3. For each data attribute configure their name, data type, priority, and whether they are mandatory or optional:

    ``` toml tab="Format"
    [[open_banking.data_publishing.thrift.stream.attributes]]
    name=<attribute name>
    priority=<priority>
    required=<boolean>
    type=<attribute type>
    ```

    ```toml tab="Sample"
    [[open_banking.data_publishing.thrift.stream.attributes]]
    name="timestamp"
    priority=6
    required=true
    type="long"
    ```
   
    | Configuration | Data Type | Description |
    | ------------- | --------- | ----------- |
    | name | string | The name of the data attribute. |
    | priority | integer | Specifies the order of the attribute in the data stream. |
    | required | boolean | This is an optional value. <br/> If this is set to `true`, a validation will ensure before publishing data that this particular attribute is present in the data map and is not null. <br/> This is treated as `false`, if not explicitly mentioned. |
    | type  | string | This is an optional value. <br/> This validates whether the attribute in the data map is of the type configured. <br/> Allowed values are `string`, `int`, `double`, `long`, `boolean`, and `float`. <br/> This is treated as `string`, if not explicitly mentioned. |
    
## Create a custom Siddhi Application
You can create a customized Siddhi Application to publish your data using the instructions given [here](https://siddhi.io/en/v4.x/docs/quick-start/)

!!!tip
    You can refer to the existing Siddhi Applications in WSO2 Open Banking Business Intelligence Accelerator. They publish 
    data for the events of API Invocation, access token, and authentication. The default Siddhi Applications are available 
    in the `<OB_BI_ACCELERATOR_HOME>/carbon-home/deployment/siddhi-files` directory.
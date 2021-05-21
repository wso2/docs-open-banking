You can enable data publishing for Dynamic Client Registration (DCR) by following the steps given below:

To publish the data during DCR application creation, extend the following class:
```java
com.wso2.openbanking.accelerator.identity.listener.application.ApplicationUpdaterImpl
```

To extend the validation capabilities according to your requirements, override the relevant methods in this class. Given 
below is a brief description of each method:

###publishData method
This method publishes data when creating a DCR application. For example,
```java
public void publishData(Map < String, Object > spMetaData, OAuthConsumerAppDTO oAuthConsumerAppDTO)
throws OpenBankingException {
```

 - Inside this method, invoke the [`publishData` method](custom-data-publishing.md#publishdata-method) in the 
 `OBDataPublisherUtil` class to publish data. For more information, see [Custom Data Publishing](custom-data-publishing.md).

###doPostDeleteApplication method
This method publishes data when deleting the DCR application. For example,
```java
public void doPostDeleteApplication(ServiceProvider serviceProvider, String tenantDomain, String userName)
throws OpenBankingException {
```

##Configuration
1. Add the classes that you extended to enable data publishing for the DCR flow in `<IS_HOME>/repository/conf/deployment.toml` 
as follows:
```toml
[open_banking.dcr]
applicationupdater = "<FQN of the extended class>"
```

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
    
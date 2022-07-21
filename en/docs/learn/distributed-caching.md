# WSO2 Open Banking Distributed Cache

!!!info
    This is only available as a WSO2 Update from **WSO2 Open Banking API Manager Accelerator Level 3.0.0.25** and
    **WSO2 Open Banking Identity Server Accelerator Level 3.0.0.48** onwards. For more information on updating, 
    see [Getting WSO2 Updates](../install-and-setup/setting-up-servers.md#getting-wso2-updates).

WSO2 Open Banking Distributed Cache is a caching service that creates a clustered cache among one or more 
WSO2 API Manager or Identity Server instances. Distributed Cache is based on the Hazelcast IMDG library.
This cache can be used as a single instance cache as well.

There are two types of network configurations to recognize clustered members:

- TCP-IP
- Multicast

## Distributed Cache Configurations

Configure the `deployment.toml` file of the instance based on your caching requirements.

- `<IS_HOME>/repository/conf/deployment.toml` or
- `<APIM_HOME>/repository/conf/deployment.toml`

### Common configurations

``` toml
[open_banking.distributed_cache]
enabled=true
host_name="localhost"
port=5701
discovery_mechanism="Multicast"
```

|Configuration name |Type |Default Value |Description|
|-------------------|---------------|-----|-----------|
|enabled|boolean|false |Set this to `true` to enable distributed cache. Otherwise, distributed caching functionality is disabled.|
|host_name|string|"localhost"|The hostname of the cache instance. |
|port|integer|5701|The port on which the cluster is hosted. |
|discovery_mechanism|string|"Multicast"|This checks the discovery mechanism of the cache cluster. If it is set to “TCP” it will be `TCP-IP`, if it is set to “Multicast” discovery mechanism will be `Multicast`. If not configured, the default value is “Multicast”. |

### TCP configurations

If `open_banking.distributed_cache.discovery_mechanism` is set to `TCP`,

``` toml
[open_banking.distributed_cache]
discovery_mechanism="TCP"
members=["192.168.1.0-7", "localhost:5703"]
```

|Configuration name |Type |Default Value |Description|
|-------------------|---------------|-----|-----------|
|members |string array| null | Add the Public address (HostName: Port) of the members as a string array. Public addresses can be given in ranges (as the example above). If not configured, there won't be any default members.|

### Multicast configurations

If `open_banking.distributed_cache.discovery_mechanism` is set to `Multicast`,

``` toml
[open_banking.distributed_cache]
discovery_mechanism="Multicast"
multicast_group="224.2.2.3"
multicast_port=54321
trusted_interfaces=["192.168.1.*", "192.168.1.100-110"]
```

|Configuration name |Type |Default Value |Description|
|-------------------|---------------|-----|-----------|
|multicast_group|string|"224.2.2.3"|The multicast group of the cluster.|
|multicast_port|integer|54321|The multicast port.|
|trusted_interfaces|string array|null| The IP addresses of trusted members in a multicast. You can configure an IP range as well.|


### Hazelcast property Configurations

``` toml
[open_banking.distributed_cache.properties]
max_heartbeat=600
max_master_confirmation=900
merge_first_run_delay=60
merge_next_run_delay=30
logging_type="none"
```

|Configuration name |Type |Default Value |Description|
|-------------------|---------------|-----|-----------|
|max_heartbeat|integer|600|Time in seconds after which the clustered member assumes the client is dead and closes its connections with the client.|
|max_master_confirmation|integer|900|Max timeout of master confirmation from other nodes. This is calculated in seconds.|
|merge_first_run_delay|integer|60| The inital run delay of split brain/merge process in seconds.|
|merge_next_run_delay|integer|30|Run interval of split brain/merge process in seconds.|
|logging_type|string|“none”|Specify logging framework type to send logging events. For example, `“none”, “jdk”, “log4j”, “log4j2”, “slf4j”` |

## Distributed Caching for Consent Enforcement Executor

Open Banking Distributed Cache can create a cache for the 
[Consent Enforcement Executor](../develop/consent-enforcement-executor.md) in the gateway using two
executors to add and retrieve data from the cache. The functionality of Distributed Cache reduces the number of consent 
validation requests sent to the Identity Server for the same consent id and resource. It also stores the validation 
details of previously validated requests.

You can configure the cache expiry time using the `deployment.toml` file and WSO2 Open Banking Accelerator will handle  
consent expiration.

!!! tip "Before you begin:"
    Enable Distributed Cache by following the [section above](#distributed-cache-configurations).

### Add Executors

1. Open the `<APIM_HOME>/repository/conf/deployment.toml` file. 
2. Configure both `PreConsentEnforcementExecutor` and `PostConsentExecutor`. Configure their priority as follows:
     - Execute `PreConsentEnforcementExecutor` just before `ConsetEnforcementExecutor`
     - Execute `PostConsentExecutor` just after `ConsetEnforcementExecutor`
   For example:
     
``` toml
[[open_banking.gateway.openbanking_gateway_executors.type.executors]]
name = "com.wso2.openbanking.accelerator.gateway.executor.impl.consent.PreConsentEnforcementExecutor"
priority = 4
[[open_banking.gateway.openbanking_gateway_executors.type.executors]]
name = "com.wso2.openbanking.accelerator.gateway.executor.impl.consent.ConsentEnforcementExecutor"
priority = 5
[[open_banking.gateway.openbanking_gateway_executors.type.executors]]
name = "com.wso2.openbanking.accelerator.gateway.executor.impl.consent.PostConsentEnforcementExecutor"
priority = 6
```

### Configure Consent Enforcement Cache Time to live 

1. Open the `<APIM_HOME>/repository/conf/deployment.toml` file.
2. Configure the Cache Time to live (TTL) for the Consent Enforcement Cache.
   - Configuration time is in minutes
   - The default value is 60 minutes

``` toml 
[open_banking.gateway.cache.consent_enforcement_cache]
cache_time_to_live=60
```

### Disable Distributed Cache for Consent Enforcement Executor

1. Open the `<APIM_HOME>/repository/conf/deployment.toml` file.
2. Comment out the `PreConsentEnforcementExecutor` and `PostConsentExecutor` configurations as follows:

``` toml
#[[open_banking.gateway.openbanking_gateway_executors.type.executors]]
#name = "com.wso2.openbanking.accelerator.gateway.executor.impl.consent.PreConsentEnforcementExecutor"
#priority = 4
[[open_banking.gateway.openbanking_gateway_executors.type.executors]]
name = "com.wso2.openbanking.accelerator.gateway.executor.impl.consent.ConsentEnforcementExecutor"
priority = 5
#[[open_banking.gateway.openbanking_gateway_executors.type.executors]]
#name = "com.wso2.openbanking.accelerator.gateway.executor.impl.consent.PostConsentEnforcementExecutor"
#priority = 6
```

# WSO2 Open Banking Distributed Cache

info

This is only available as a WSO2 Update from **WSO2 Open Banking API Manager Accelerator Level 3.0.0.25** and **WSO2 Open Banking Identity Server Accelerator Level 3.0.0.48** onwards. For more information on updating, see [Getting WSO2 Updates](/en/4.0.0/install-and-setup/setting-up-servers/.md#getting-wso2-updates).

WSO2 Open Banking Distributed Cache is a caching service that creates a clustered cache among one or more WSO2 API Manager or Identity Server instances. Distributed Cache is based on the Hazelcast IMDG library. This cache can be used as a single instance cache as well.

There are two types of network configurations to recognize clustered members:

* TCP-IP
* Multicast

## Distributed Cache Configurations[​](#distributed-cache-configurations "Direct link to Distributed Cache Configurations")

Configure the `deployment.toml` file of the instance based on your caching requirements.

* `<IS_HOME>/repository/conf/deployment.toml` or
* `<APIM_HOME>/repository/conf/deployment.toml`

### Common configurations[​](#common-configurations "Direct link to Common configurations")

```
[open_banking.distributed_cache]

enabled=true

host_name="localhost"

port=5701

discovery_mechanism="Multicast"
```

| Configuration name   | Type    | Default Value | Description                                                                                                                                                                                                                    |
| -------------------- | ------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| enabled              | boolean | false         | Set this to `true` to enable distributed cache. Otherwise, distributed caching functionality is disabled.                                                                                                                      |
| host\_name           | string  | "localhost"   | The hostname of the cache instance.                                                                                                                                                                                            |
| port                 | integer | 5701          | The port on which the cluster is hosted.                                                                                                                                                                                       |
| discovery\_mechanism | string  | "Multicast"   | This checks the discovery mechanism of the cache cluster. If it is set to “TCP” it will be `TCP-IP`, if it is set to “Multicast” discovery mechanism will be `Multicast`. If not configured, the default value is “Multicast”. |

### TCP configurations[​](#tcp-configurations "Direct link to TCP configurations")

If `open_banking.distributed_cache.discovery_mechanism` is set to `TCP`, and if there are 2 API Manager nodes:

* APIM Node1
* APIM Node2

```
[open_banking.distributed_cache]

enabled=true

host_name="localhost"

port=5701

discovery_mechanism="TCP"

members=["192.168.1.0-7", "localhost:5703"]
```

```
[open_banking.distributed_cache]

enabled=true

host_name="localhost"

port=5703

discovery_mechanism="TCP"

members=["192.168.1.0-7", "localhost:5701"]
```

| Configuration name | Type         | Default Value | Description                                                                                                                                                                                      |
| ------------------ | ------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| members            | string array | null          | Add the Public address (HostName: Port) of the members as a string array. Public addresses can be given in ranges (as the example above). If not configured, there won't be any default members. |

### Multicast configurations[​](#multicast-configurations "Direct link to Multicast configurations")

If `open_banking.distributed_cache.discovery_mechanism` is set to `Multicast`,

In a containerized deployment:

You can avoid the `trusted_interfaces` configuration.

```
[open_banking.distributed_cache]

discovery_mechanism="Multicast"

multicast_group="224.2.2.3"

multicast_port=54321

trusted_interfaces=["192.168.1.*", "192.168.1.100-110"]
```

| Configuration name  | Type         | Default Value | Description                                                                                |
| ------------------- | ------------ | ------------- | ------------------------------------------------------------------------------------------ |
| multicast\_group    | string       | "224.2.2.3"   | The multicast group of the cluster.                                                        |
| multicast\_port     | integer      | 54321         | The multicast port.                                                                        |
| trusted\_interfaces | string array | null          | The IP addresses of trusted members in a multicast. You can configure an IP range as well. |

### Hazelcast property Configurations[​](#hazelcast-property-configurations "Direct link to Hazelcast property Configurations")

```
[open_banking.distributed_cache.properties]

max_heartbeat=600

max_master_confirmation=900

merge_first_run_delay=60

merge_next_run_delay=30

logging_type="none"
```

| Configuration name        | Type    | Default Value | Description                                                                                                             |
| ------------------------- | ------- | ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| max\_heartbeat            | integer | 600           | Time in seconds after which the clustered member assumes the client is dead and closes its connections with the client. |
| max\_master\_confirmation | integer | 900           | Max timeout of master confirmation from other nodes. This is calculated in seconds.                                     |
| merge\_first\_run\_delay  | integer | 60            | The initial run delay of split brain/merge process in seconds.                                                          |
| merge\_next\_run\_delay   | integer | 30            | Run interval of split brain/merge process in seconds.                                                                   |
| logging\_type             | string  | “none”        | Specify logging framework type to send logging events. For example, `“none”, “jdk”, “log4j”, “log4j2”, “slf4j”`         |

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

<!-- -->

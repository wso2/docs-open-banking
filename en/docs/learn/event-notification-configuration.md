#Event Notification Configurations

To enable the Event Notification feature in WSO2 Open Banking:

1. To create Event Notification database tables:
    1. Go to the `<IS_HOME>/dbscripts/financial-services/event-notifications` directory.
    2. According to your database, execute the relevant script against the `fs_consentdb` database.
2. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
3. Configure the following:

    ??? tip "Click here to see the definitions of the configuration tags..."
         | Configuration | Description |
         | ------------- | ----------- |
         | `token_issuer` | The issuer of the notification JWT. For example, bank. |
         | `number_of_sets_to_return` | The maximum number of events to be returned. This is the default value for `maxEvents`, if the request payload has not defined a value. |
         | `set_sub_claim_included`, `set_txn_claim_included`, `set_toe_claim_included`| Configure the customized optional claims in event notification using these tags. They represent the subject, transaction, and time of event claims respectively. |

      ``` toml
       [financial_services.event.notifications]
        token_issuer = "www.wso2.com"
        number_of_sets_to_return = 5
        set_sub_claim_included = true
        set_txn_claim_included = true
        set_toe_claim_included = true
      ```

5. To enable Real Time Event Notification config the following:

    ??? tip "Click here to see the definitions of the configuration tags..."
         | Configuration | Description |
         | ------------- | ----------- |
         | `enable` | To enable the Real-time event notification feature. |
         | `periodic_cron_expression` | The time period to trigger the real-time event notification consumer to consume notifications from the queue. |
         | `request_timeout` | Timeout for the HTTP client requests in seconds. |
         | `maximum_retry_count` |  The maximum number of retries for the retry policy. |
         | `initial_retry_waiting_time` | Waiting time between the initial try and the first retry in seconds. |
         | `retry_function` | this function decides the retry mechanism. <br/> EX: exponential function (nextWaitingTime = 2 x previousWaitingTime) <br/> LINEAR: linear function (nextWaitingTime = 2 x previousWaitingTime) <br/> CONSTANT: waiting time is constant (initial_retry_waiting_time) <br/> Any other function will return an error|
         | `circuit_breaker_open_timeout` | Retry mechanism will be terminated after passing this time from the initial HTTP request send time. Needs to provide this value in seconds. |
         | `thread_pool_size` | Thread pool size for the event notification consumer. |
         | `event_notification_request_generator` | Classpath of the real-time event notification request generator which is responsible for adding additional headers to the POST request and for preparing the notification payload. If you have not implemented a custom handler, configure the default handler by following the sample below. |

      ``` toml
       [financial_services.event.notifications.realtime]
        enable = true
        periodic_cron_expression = "0 0/1 0 ? * * *"
        request_timeout = 60
        maximum_retry_count = 5
        initial_retry_waiting_time = 5
        retry_function = "EX"
        circuit_breaker_open_timeout = 60
        thread_pool_size = 3
        event_notification_request_generator = "com.wso2.openbanking.accelerator.event.notifications.service.realtime.service.DefaultRealtimeEventNotificationRequestGenerator"
      ```

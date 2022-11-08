WSO2 Open Banking databases store data for different open banking requirements. As the volume of the data stored 
grows over time, It is highly recommended to perform data purging on servers to mitigate performance issues.

Based on the use cases the data in the database might grow fast sometimes and cleaning them up from the product 
itself becomes expensive. This page explains how to perform data purging by clearing **consent** and 
**event notification** related data using stored procedures. These offload the expensive data cleanups to the 
database server.

!!! tip
    It is recommended to run these steps when the server traffic is low. Especially, if you are running this 
    in a production environment for the first time, the data volume to be purged may be higher. However, 
    consider this as a housekeeping task that needs to be run at regular intervals.

1. Back up all running databases.
2. Set up the database dump in a test environment and test it for any issues.

    !!! note
        We recommend that you test the database dump before the cleanup task as the cleanup can take some time.

3. According to your database type, execute the store procedures in the
   `<IS_HOME>/carbon-home/dbscripts/stored-procedures` directory.

4. Once the cleanup is over, start WSO2 Servers by pointing them to the cleaned-up database dump and test thoroughly 
   for any issues.

## Consent Cleanup

Consent cleanup is performed via the `consent-cleanup.sql` script. For configurable attributes, see 
the [Common Configurable Attributes](#common-configurable-attributes) section.

!!! info 
    The `consent-cleanup.sql` script contains a batch-wise delete.  This procedure includes the cleanup of consents 
    from the following tables:

       - `OB_CONSENT`  
       - `OB_CONSENT_AUTH_RESOURCE` 
       - `OB_CONSENT_MAPPING` 
       - `OB_CONSENT_FILE` 
       - `OB_CONSENT_ATTRIBUTE` 
       - `OB_CONSENT_STATUS_AUDIT` 

1. According to your database type, compile the stored procedure in the
   `<IS_HOME>/carbon-home/dbscripts/stored-procedures/consent-purging-procedures/<DB-Type>/<DB-Type>-consent-cleanup-script.sql`
   file.

2. Execute the compiled store procedure.

3. Configure according to the following:

    ??? tip "Click here to see the Logical condition and configurations used for Consent data purging..."
    
        **Consent Data Purging Parameters**

        |Parameter| Description|
        |---------| -----------|
        |consentTypes| consent_types that are eligible for purging. For example, `accounts`, `payments`, to skip leave it empty|
        |clientIds| client_ids that are eligible for purging. To skip this, leave it empty.|
        |consentStatuses| consent_statuses that are eligible for purging. For example, `expired`,`revoked`|
        |purgeConsentsOlderThanXNumberOfDays| The time period to delete consents older than n days.|  
        |lastUpdatedTime|`last_updated_time` for purging. If the consent updated time is older than this value then it's eligible for purging <br/><br/> To purge consents with the last `updated_time` older than 31 days, configure the following value in days `purgeConsentsOlderThanXNumberOfDays = 31`. <br/><br/> To configure exact timestamp of the `lastUpdatedTime` rather than a time period, ignore configuring `purgeConsentsOlderThanXNumberOfDays = NULL` and only configure `lastUpdatedTime` with the exact unix timestamp. For example, `lastupdatedtime = 1660737878;` |
    
        **Other Parameters**

        |Parameter| Description|
        |---------| -----------|
        | backupTables | Enable the backup table to restore data at a later stage. <br/> <ul> <li> This backup tables is overwritten every time you run the cleanup script. </li> <li> This does not capture the consents that were created between the backup task and the cleanup iteration. Therefore, if consents are created after the backup task, you cannot restore them once they are deleted from the cleanup iteration. </li> </ul>  |
        | enableAudit | Set this parameter to `true` to log each deleted consents in the `auditlog_ob_consent_cleanup` table in order to track them in future. |

4. Once the stored procedure is compiled, execute the procedure with input parameters as follows:  

    ```sql tab="MySQL"
    WSO2_OB_CONSENT_CLEANUP_SP( consentTypes, clientIds, consentStatuses, purgeConsentsOlderThanXNumberOfDays, 
    lastUpdatedTime, backupTables, enableAudit, analyzeTables );

    mysql> call WSO2_OB_CONSENT_CLEANUP_SP('accounts,payments', 'clientId1,clientId2', 'expired,revoked', 31, NULL,
    TRUE, TRUE, TRUE);
    ```
   
5. For more information, see the `/stored-procedures/consent-purging-procedures/<DB-Type>/readme.MD` file for each
   database type.

## Event Notification Cleanup

Event Notification cleanup is performed via the `event-notification-cleanup.sql` script. For configurable attributes, 
see the [Common Configurable Attributes](#common-configurable-attributes) section.

!!! info
    The `event-notification-cleanup.sql` script contains a batch-wise delete.  This procedure includes the cleanup of event
    notification data from the following tables:

       - `OB_NOTIFICATION`
       - `OB_NOTIFICATION_EVENT`
       - `OB_NOTIFICATION_ERROR`

1. According to your database type, compile the stored procedure in the
   `<OB_IS_ACCELERATOR_HOME>/carbon-home/dbscripts/stored-procedures/event-notification-purging-procedures/<DB-Type>/<DB-Type>-event-notification-cleanup-script.sql`
   file.

2. Execute the compiled store procedure.

3. Configure according to the following:

    ??? tip "Click here to see the Logical condition and configurations used for Event Notification data purging..."

        **Event Notification Data Purging Parameters**

        |Parameter| Description|
        |---------| -----------|
        |eventStatuses| The event statuses that are eligible for purging. For example, `ACK`,`ERR`|
        |clientIds| client_ids that are eligible for purging. To skip this, leave it empty.|
        |purgeEventsOlderThanXNumberOfDays| The time period to delete event-notifications older than n days.|  
        |lastUpdatedTime|`last_updated_time` for purging. If the event-notification updated time is older than this value then it's eligible for purging |
        |purgeNonExistingResourceIds| The flag to enable purging of untraceable event notifications. If the `resource_id` of the `ob_notification` does not exist in the `ob_consent table` - `consent_id`, then it is untraceable and eligible for purging <br/> Set this to `true`, to purge the untraceable event notifications irrespective of other purging parameters. <br/><br/> To purge event-notifications with the last `updated_time` older than 31 days, configure the following value in days `purgeEventsOlderThanXNumberOfDays = 31`. <br/><br/> To configure exact timestamp of the `lastUpdatedTime` rather than a time period, ignore configuring `purgeEventsOlderThanXNumberOfDays = NULL` and only configure `lastUpdatedTime` with the exact unix timestamp. For example, `lastupdatedtime = 1660737878;` |

        **Other Parameters**
        
        |Parameter| Description|
        |---------| -----------|
        | backupTables | Enable the backup table to restore data at a later stage. <br/> <ul> <li> This backup tables is overwritten every time you run the cleanup script. </li> <li> This does not capture the event notifications that were created between the backup task and the cleanup iteration. Therefore, if event notifications are created after the backup task, you cannot restore them once they are deleted from the cleanup iteration. </li> </ul>  |
        | enableAudit | Set this parameter to `true` to log each deleted consents in the `auditlog_ob_event_notification_cleanup` table in order to track them in future. |

4. Once the stored procedure is compiled, execute the procedure with input parameters as follows:

    ```sql tab="MySQL"
    WSO2_OB_EVENT_NOTIFICATION_CLEANUP_SP( eventStatuses, clientIds, purgeEventsOlderThanXNumberOfDays, lastUpdatedTime,
    purgeNonExistingResourceIds, backupTables, enableAudit, analyzeTables );
   
    mysql> call WSO2_OB_EVENT_NOTIFICATION_CLEANUP_SP('ACK,ERR', 'clientId1,clientId2', 10, NULL, TRUE, TRUE, TRUE, TRUE);
    ```

5. For more information, see the `/stored-procedures/event-notification-purging-procedures/<DB-Type>/readme.MD` file for each
   database type.

## Common Configurable Attributes

You can configure the following important attributes in the script.

|Variable|Description|
|--------|-----------|
|batchSize|Defines how many records will be deleted per batch for one iteration.|
|chunkSize|If you have millions of data records, allows you to handle data chunk wise. <br/><br/>A chunk handles a larger set of data than a batch and a batch processes an entire chunk. For example, if you have 20 million data records in a particular table, the chunk will initially take half a million of data and provide it into a batch where 10000 records per batch are deleted. Once that chunk is complete, the other half million records and proceeded.|
|checkCount|If consents are expiring/revoking or eligible for purging when the cleanup script is running, the script will run in an endless loop. Therefore, this variable defines a safe margin for the cleanup script to complete its job if the consents eligible for deletion are less than `checkCount`. |
|sleepTime|Define the wait time for each iteration of the batch deletes to avoid table locks.|
|enableLog|To enable or disable logs.|
|logLevel|To set the log levels.|

|Function|Description|
|--------|-----------|
|BACKUP CONSENT TABLE| This section backs up all required tables in case of restoration is to be performed. |
|CREATING AUDITLOG TABLES FOR DELETING CONSENTS| This section creates the initial audit logs table for persisting the deleted consents.|
|CALCULATING CONSENTS IN OB_CONSENT TABLE| This section prints the breakdown of the consents to be deleted and retained.|
|BATCH DELETE TABLE| This section performs chunk and batch-wise deletion for consent data.|
|REBUILDING INDEXES| As an extra step to optimize the database, this can perform an index rebuilding task for improving the performance. <br/> It is **not recommended** to perform this on a live system unless you have downtime as this could lock down the whole table.|
|ANALYSING TABLES| As an extra step, analyze the tables to gather statistics related to the delete operation. This also improves the performance of the database. <br/> It is **not recommended**  to perform this on a live system unless you have downtime.|

## Restore Script for Consent and Event-Notification data

!!! warning 
    Before making any changes to the production environment, it is strongly advised to take a complete backup in case a 
    restoration is required.

- The `<DB>-consent-restore-script.sql` and `<DB>-event-notification-restore-script.sql` contain the stored procedures
  that are used to restore the purged consents and event notifications from the consent tables respectively.
- The restoration can only be performed if the `backupTables `property is set to `true` in the data purging procedures.
- This is only an immediate restoration script for the data purging procedures, therefore each execution of the 
  `WSO2_OB_CONSENT_CLEANUP_SP` and `WSO2_OB_EVENT_NOTIFICATION_CLEANUP_SP` procedures will replace the backup tables.
- You can schedule a cleanup task to automatically run after a given period of time, for example:

      ```sql tab="MySQL"
      USE 'WSO2_OB_CONSENT_DB';
      DROP EVENT IF EXISTS consent_cleanup;
      CREATE EVENT consent_cleanup
          ON SCHEDULE
              EVERY 1 WEEK STARTS '2015-01-01 00:00.00'
          DO
              CALL `WSO2_OB_CONSENT_DB`.WSO2_OB_CONSENT_CLEANUP_SP('accounts,payments', 'clientId1,clientId2', 'expired,revoked', 31, NULL, TRUE, TRUE, TRUE);
      
      -- 'Turn on the event_scheduler'
      SET GLOBAL event_scheduler = ON;
      ```
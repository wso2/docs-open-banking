!!!tip "Prerequisites"
    1. Set up WSO2 Open Banking Business Intelligence Accelerator as follows:
        - Copy and extract the accelerator zip file inside WSO2 Open Banking 3.0 in the root directory of WSO2 Streaming 
        Integrator.
        !!!note
            Hereafter,
            
            - `<SI_HOME>` refers to the root directory of WSO2 Streaming Integrator.
            - `<OB_BI_ACCELERATOR_HOME>` refers to the root directory of WSO2 Open Banking Business Intelligence Accelerator.

        - Run the `merge.sh` script in `<SI_HOME>/<OB_BI_ACCELERATOR_HOME>/bin`:
        ```
        ./merge.sh
        ```

###Configure
1. Make sure that API Manager analytics is enabled in `<APIM_HOME>/repository/conf/deployment.toml`:
```toml
[apim.analytics]
enable = true
```
2. Go to `<APIM_HOME>/repository/conf/deployment.toml` and `<IS_HOME>/repository/conf/deployment.toml` to configure the 
following attributes:
    - Enable open banking data publishing
    - Update the hostname of WSO2 Open Banking Business Intelligence Accelerator. 
    
A sample looks as follows:
```toml
open_banking.data_publishing]
enable = true
server_url = "{tcp://<WSO2_OB_BI_HOST>:7612}"
```

###Start servers
1. Go to `<SI_HOME>/bin` and run the following command to start the Streaming Integrator server:
```
./server.sh
```
2. Set up and start the Identity Server and API Manager Servers as instructed in [Setting up Servers](setting-up-servers.md).

###Try out
1. Register an API consumer application as instructed  in [Dynamic Client Registration Tryout](dynamic-client-registration-try-out.md). 

2. Try out the sample API flow using the instructions given in [Tryout Flow](publish-an-api.md).

Once you try out the sample API flow, you can notice that data is published to the tables of the `openbank_ob_reporting_statsdb` 
database. 

!!!tip "Prerequisites"
    Set up WSO2 Open Banking Business Intelligence Accelerator as follows:
    
    1. Copy and extract the accelerator zip file inside WSO2 Open Banking 3.0 in the root directory of WSO2 Streaming 
    Integrator.
        
        !!!note
            Hereafter,
            
            - `<SI_HOME>` refers to the root directory of WSO2 Streaming Integrator.
            - `<OB_BI_ACCELERATOR_HOME>` refers to the root directory of WSO2 Open Banking Business Intelligence Accelerator.

    2. Run the `merge.sh` script in `<SI_HOME>/<OB_BI_ACCELERATOR_HOME>/bin`:
    
        ```
        ./merge.sh
        ```
        
    3. Exchange the public certificates between servers. 
        
        ??? "Click here to see how it is done..."
    
            a. Go to the `<SI_HOME>/resources/security` directory and export the public certificate of the Streaming 
            Integrator:
           
            ``` shell
            keytool -export -alias wso2carbon -keystore wso2carbon.jks -file publickeySI.pem
            ```
            
            b. Go to the `<IS_HOME>/repository/resources/security` directory and import the public certificate of the 
            Streaming Integrator to the truststore of the Identity Server:
            
            ``` shell
            keytool -import -alias wso2 -file publickeySI.pem -keystore client-truststore.jks -storepass wso2carbon
            ```
            
            c. Go to the `<IS_HOME>/repository/resources/security` directory and export the public certificate of the 
            Identity Server:
            
            ``` shell
            keytool -export -alias wso2carbon -keystore wso2carbon.jks -file publickeyIAM.pem
            ```
            
            d. Go to the `<SI_HOME>/resources/security` directory and import the public certificate of the Identity 
            Server to the truststore of the Streaming Integrator:
            
            ``` shell
            keytool -import -alias wso2 -file publickeyIAM.pem -keystore client-truststore.jks -storepass wso2carbon
            ```
            
            e. Go to the `<APIM_HOME>/repository/resources/security` directory and repeat step b,c, and d.
            
###Configure
1. Make sure that API Manager analytics is enabled in `<APIM_HOME>/repository/conf/deployment.toml`:
```toml
[apim.analytics]
enable = true
```
2. Go to `<APIM_HOME>/repository/conf/deployment.toml` and `<IS_HOME>/repository/conf/deployment.toml` to configure the 
following attributes:
    - Enable open banking data publishing
    - Update the URLs with the hostname of WSO2 Streaming Integrator 
    
A sample looks as follows:
```toml
[open_banking.data_publishing]
enable = true
server_url = "{tcp://<SI_HOST>:7612}"
```

###Start servers
1. Go to `<SI_HOME>/bin` and run the following command to start the Streaming Integrator server:
```
./server.sh
```
2. Set up and start the Identity Server and API Manager Servers as instructed in [Setting up servers](../install-and-setup/setting-up-servers.md).

###Try out
1. Register an API consumer application as instructed  in [Dynamic Client Registration Tryout](dynamic-client-registration-try-out.md). 

2. Try out the sample API flow using the instructions given in [Tryout Flow](../get-started/try-out-flow.md).

3. Once you try out the sample API flow, you can notice that data is published to the tables of the `openbank_ob_reporting_statsdb` 
database. 

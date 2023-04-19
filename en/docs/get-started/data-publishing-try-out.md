!!!tip "Prerequisites"
    Set up WSO2 Open Banking Business Intelligence Accelerator as follows:
    
    1. Copy and extract the `wso2-obbi-accelerator-3.0.0.zip` accelerator file in the root directory of WSO2 Streaming 
    Integrator.
    
        !!!note
            Hereafter,
            
            - `<SI_HOME>` refers to the root directory of WSO2 Streaming Integrator.
            - `<OB_BI_ACCELERATOR_HOME>` refers to the root directory of WSO2 Open Banking Business Intelligence Accelerator.

    2. Run the `merge.sh` script in `<SI_HOME>/<OB_BI_ACCELERATOR_HOME>/bin`:
    ```
    ./merge.sh
    ```

    3. If you are using WSO2 Open Banking Business Intelligence at U2 level 3.0.0.1 or above, configure the `PRODUCT_CONF_PATH` 
    property according to the WSO2 Streaming Integrator version you are using.

        1. Open the `<SI_HOME>/<OB_BI_ACCELERATOR_HOME>/repository/conf/configure.properties` file.

        2. Locate the `PRODUCT_CONF_PATH` property.

        3. Specify the `deployment.yaml` file which contains the required configurations according to the WSO2 Streaming Integrator version you are using.

            ```toml tab='For WSO2 Streaming Integrator 4.0.0'
            PRODUCT_CONF_PATH=repository/resources/wso2si-4.0.0-deployment.yaml
            ```
            
            ```toml tab='For WSO2 Streaming Integrator 4.2.0'
            PRODUCT_CONF_PATH=repository/resources/wso2si-4.2.0-deployment.yaml 
            ```

    4. Run the configure.sh file in `<SI_HOME>/<OB_BI_ACCELERATOR_HOME>/bin`:

        ```
        ./configure.sh
        ```

    5. Exchange the public certificates between servers. 
        
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
2. Go to `<APIM_HOME>/repository/conf/deployment.toml` and `<IS_HOME>/repository/conf/deployment.toml` to enable open banking data 
publishing as follows:
```toml
[open_banking.data_publishing]
enable = true
```

###Start servers
1. Go to `<SI_HOME>/bin` and run the following command to start the Streaming Integrator server:
```
./server.sh
```
2. Set up and start the Identity Server and API Manager Servers as instructed in [Setting up servers](set-up-accelerators.md).

###Try out
1. Register an API consumer application as instructed  in [Dynamic Client Registration](dynamic-client-registration.md). 

2. Try out the sample API flow using the instructions given in [Tryout Flow](try-out-flow.md).

3. Once you try out the sample API flow, you can notice that data is published to the tables of the 
`openbank_ob_reporting_statsdb` database. 
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
    3. Run the configure.sh file in `<SI_HOME>/<OB_BI_ACCELERATOR_HOME>/bin`:
    ```
    ./configure.sh
    ```

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
2. Set up and start the Identity Server and API Manager Servers as instructed in [Set Up Accelerators](set-up-accelerators.md).

###Try out
1. Register an API consumer application as instructed  in [Dynamic Client Registration](dynamic-client-registation.md). 

2. Try out the sample API flow using the instructions given in [Tryout Flow](try-out-flow.md).

3. Once you try out the sample API flow, you can notice that data is published to the tables of the 
`openbank_ob_reporting_statsdb` database. 
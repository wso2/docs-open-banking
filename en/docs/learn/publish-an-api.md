This document provides instructions to publish and subscribe to an API.

!!!tip "Before you begin"
    - Register an application for the API consumer. 
        - For testing purposes, we have included a sample Dynamic Client Registration (DCR) 
        API in WSO2 Open Banking Accelerator. To register an application, see [Dynamic Client Registration](dynamic-client-registration-try-out.md).
   
!!!note
    This document provides tryout instructions for the sample Account Information Service API available in WSO2 Open 
    Banking Accelerator. 
    
1. Sign in to the API Publisher Portal at `https://<APIM_HOST>:9443/publisher` with `creator/publisher` privileges. 

2. In the homepage, go to **Create API** and click **Import Open API**. ![import_API](../assets/img/get-started/quick-start-guide/select-api.png)

3. Select **OpenAPI File/Archive**. 

4. Click **Browse File to Upload** and select `<APIM_HOME>/<OB_APIM_ACCELERATOR_HOME>/repository/resources/apis/Accounts/account-info-swagger.yaml`.

5. Click **Next**.

6. Leave the **Endpoint** field empty as it is and click **Create**. 

8. Select **Subscriptions** from the left menu pane and set the business plan to **Unlimited: Allows unlimited 
requests**.

9. Click **Save**.
    
10.Go to **Runtime** using the left menu pane.

![select_runtime](../assets/img/get-started/quick-start-guide/select-runtime.png)
    
11.Click the edit button under **Request** -> **Message Mediation**.
    
12.Now, select the **Custom Policy** option. 
    
13.Upload the `<APIM_HOME>/<OB_APIM_ACCELERATOR_HOME>/repository/resources/apis/Accounts/accounts-dynamic-endpoint-insequence.xml` 
file and click **SELECT**.
    
14.Scroll down and click **SAVE**. 
        
15.Go to **Endpoints** using the left menu pane and locate **Dynamic Endpoint** and click **Add**. ![set_endpoint](../assets/img/get-started/quick-start-guide/set-endpoint.png)
    
16.Select the endpoint types; **Production Endpoint/Sandbox Endpoint** and click **Save**.

17.Go to **Deployments** using the left menu pane and click **Deploy New Revision**.
    
18.Provide a description for the new revision.
    
19.Select `localhost` from the dropdown list. 
    
20.Click **Deploy**.
    
21.Go to **Overview** using the left menu pane and click **Publish**. 

22.Now that you have deployed the API, go to `https://<APIM_HOST>:9443/devportal`.
    
23.Select the **AccountandTransaction V3.1** API and locate **Subscriptions**. Then, click **Subscribe**. ![subscribe_api](../assets/img/get-started/quick-start-guide/subscribe-api.png)
    
!!!note
        The name of the sample Account Information Service API is **AccountandTransaction V3.1**. Select the relevant 
        API name according to the Swagger file you published.
                                                                                                  

24.Select the application from the dropdown list and click **Subscribe**.

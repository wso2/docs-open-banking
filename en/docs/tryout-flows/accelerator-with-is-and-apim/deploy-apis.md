This page explains how to deploy an Open Banking API.

Before publishing the APIs, need to create the consumer role in WSO2 API Manager. 

## Create Consumer Role APIM Console

1. Goto APIM Carbon Console:  `https://<APIM_HOSTNAME>:9443/carbon`

2. Log into APIM Carbon Console using APIM admin username and password.

3. Click on Main Tab → Users and Roles → Add

4. Click on Add New Role.
    ![am-add-new-role.png](../../assets/img/get-started/quick-start-guide/am-role-creation/am-add-new-role.png)

5. Enter role Details:
    ![am-add-role-details.png](../../assets/img/get-started/quick-start-guide/am-role-creation/am-add-role-details.png)

| Domain   | Role Name |
| -------- | --------- |
| INTERNAL | consumer  |


6. Click on Finish.

## Publish Accounts API

1. Sign in to the API Publisher Portal at `https://<APIM_HOSTNAME>:9443/publisher`. 

2. In the homepage, go to REST API and select Import Open API. 
    ![select-rest-api.png](../../assets/img/get-started/quick-start-guide/deploy-apis/select-rest-api.png)

3. Select OpenAPI File/Archive. 
    ![upload-swagger.png](../../assets/img/get-started/quick-start-guide/deploy-apis/upload-swagger.png)

4. Click Browse File to Upload and select [account-info-swagger.yaml](https://github.com/wso2/financial-services-accelerator/blob/4.0.0/financial-services-accelerator/accelerators/fs-apim/repository/resources/apis/Accounts/account-info-swagger.yaml).  

5. Click Next.

6. Set the Context value as follows:
    ```
    /open-banking/{version}/aisp
    ```

7. Leave the Endpoint field empty as it is, Select the Gateway Type and click Create.
    ![configure-api.png](../../assets/img/get-started/quick-start-guide/deploy-apis/configure-api.png)

8. Select Subscriptions from the left menu pane and uncheck all subscription plans.
    ![api-subscription.png](../../assets/img/get-started/quick-start-guide/deploy-apis/api-subscription.png)

9. Click Save.

10. Go to Runtime using the left menu pane.
    ![select-runtime.png](../../assets/img/get-started/quick-start-guide/deploy-apis/select-runtime.png)

11. Toggle the Schema Validation button to enable Schema Validation for all APIs except for the Dynamic Client Registration API.
    ![schema-validation.png](../../assets/img/get-started/quick-start-guide/deploy-apis/schema-validation.png)

12. Add [JWT claim based access validation](https://apim.docs.wso2.com/en/latest/design/api-policies/regular-gateway-policies/jwt-claim-based-access-validator/).

    Use aut as the Access verification claim name and value from below.

    | Token Type               | Claim Value      |
    | ------------------------ | ---------------  |
    | Client Credentials Grant | APPLICATION      |
    |Authorization Code Grant  | APPLICATION_USER |

13. Go to Endpoints using the left menu pane.
    ![select-runtime.png](../../assets/img/get-started/quick-start-guide/deploy-apis/select-runtime.png)

14. Select the endpoint types; `Dynamic Endpoints` and click Save.  
    ![dynamic-endpoint.png](../../assets/img/get-started/quick-start-guide/deploy-apis/dynamic-endpoint.png)

15. Select the API Gateway type, in this scenario, it is Default.

18. Click Deploy.

19. Go to Overview using the left menu pane.
    ![select-overview.png](../../assets/img/get-started/quick-start-guide/deploy-apis/select-overview.png)

20. click Publish. 
    ![publish-api.png](../../assets/img/get-started/quick-start-guide/deploy-apis/publish-api.png)

Once you deploy the APIs an API resource will be created along with the role mentioned in the swagger on the Identity Server side.

!!! note
    If you have created the users, assign the roles created while publishing the APIs to the users.

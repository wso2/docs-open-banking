# Deploy Open Banking APIs

This page explains how to deploy an Open Banking API.

Before publishing the APIs, you need to create the consumer role in WSO2 API Manager.

## Create Consumer Role APIM Console[​](#create-consumer-role-apim-console "Direct link to Create Consumer Role APIM Console")

1. Goto APIM Carbon Console: `https://<APIM_HOSTNAME>:9443/carbon`

2. Log into APIM Carbon Console using APIM admin username and password.

3. Click on Main Tab → Users and Roles → Add

4. Click on Add New Role. ![am-add-new-role.png](/en/latest/assets/images/am-add-new-role-6fe4421392cbadc3754e83cd1586a182.png)

5. Enter role Details:

   ![am-add-role-details.png](/en/latest/assets/images/am-add-role-details-1d503c6795f65b9605ff13151bcbe06f.png)

   | Domain   | Role Name |
   | -------- | --------- |
   | INTERNAL | consumer  |

6. Click on Finish.

## Publish Accounts API[​](#publish-accounts-api "Direct link to Publish Accounts API")

1. Sign in to the API Publisher Portal at `https://<APIM_HOSTNAME>:9443/publisher`.

2. In the homepage, go to REST API and select Import Open API.<br />![select-rest-api.png](/en/latest/assets/images/select-rest-api-80c4d7614b37c0e117e6a572ac12bb0d.png)

3. Select OpenAPI File/Archive.<br />![upload-swagger.png](/en/latest/assets/images/upload-swagger-031e20678d489f15e97f70ec0b591ca0.png)

4. Click Browse File to Upload and select [account-info-swagger.yaml](https://github.com/wso2/financial-services-accelerator/blob/4.0.0/financial-services-accelerator/accelerators/fs-apim/repository/resources/apis/Accounts/account-info-swagger.yaml).

5. Click Next.

6. Set the Context value as follows:

   ```
   /open-banking/{version}/aisp
   ```

7. Leave the Endpoint field empty as it is, Select the Gateway Type and click Create.<br />![configure-api.png](/en/latest/assets/images/configure-api-ba8167c4dc97b6f24ea0075d1b4e9896.png)

8. Select Subscriptions from the left menu pane and uncheck all subscription plans.<br />![api-subscription.png](/en/latest/assets/images/api-subscription-22998cbfc491d58e0b871ca2f185e293.png)

9. Click Save.

10. Go to Runtime using the left menu pane.<br />![select-runtime.png](/en/latest/assets/images/select-runtime-9e6f6f3c93e75c49ca3d31be0da9c629.png)

11. Toggle the Schema Validation button to enable Schema Validation for all APIs except for the Dynamic Client Registration API.<br />![schema-validation.png](/en/latest/assets/images/schema-validation-c61adf122279ce8cb5b2aa912be7430c.png)

12. Add [JWT claim based access validation](https://apim.docs.wso2.com/en/latest/design/api-policies/regular-gateway-policies/jwt-claim-based-access-validator/).

    Use aut as the Access verification claim name and value from below.

    | Token Type               | Claim Value       |
    | ------------------------ | ----------------- |
    | Client Credentials Grant | APPLICATION       |
    | Authorization Code Grant | APPLICATION\_USER |

13. Go to Endpoints using the left menu pane.<br />![select-endpoints.png](/en/latest/assets/images/select-endpoints-167a237b1d1125806e21098f966c2a6f.png)

14. Select the endpoint types; `Dynamic Endpoints` and click Save.<br />![dynamic-endpoint.png](/en/latest/assets/images/dynamic-endpoint-a76b3a39743ff4c35d65727b025ee97c.png)

15. Create and engage the required [Inbuilt Gateway Enforcements](/en/latest/learn/inbuilt-policies/.md)

    * Refer to the [Introduction to Policies](/en/latest/learn/policies/.md) for more details on Policies.
    * Refer to the [Create Policies](/en/latest/learn/create-policies/.md) for create new Policies.
    * Refer to the [Engage Policies](/en/latest/learn/engage-policies/.md) to learn how to engage policies to an API.

    Engage the following policies.

    * `MTLS Enforcement Policy`
    * `Consent Enforcement Policy`
    * `Dynamic Endpoint Policy`

16. Select the API Gateway type, in this scenario, it is Default.

17. Click Deploy.

18. Go to Overview using the left menu pane.<br />![select-overview.png](/en/latest/assets/images/select-overview-a5ce904a426813c5c8877cbdb8787018.png)

19. click Publish.<br />![publish-api.png](/en/latest/assets/images/publish-api-4cdc5546c7864335fd0d27fd60c14cd5.png)

Follow the same steps to publish Payments and COF API. Refer the below table for the OpenAPI files and context values of Payments and COF APIs.

| API Name               | OpenAPI File                                                                                                                                                                                                                           | Context Value                 |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| PaymentInitiationAPI   | [payment-initiation-openapi.yaml](https://github.com/wso2/financial-services-accelerator/blob/4.0.0/financial-services-accelerator/accelerators/fs-apim/repository/resources/apis/Payments/payment-initiation-openapi.yaml)            | /open-banking/{version}/pisp  |
| ConfirmationOfFundsAPI | [funds-confirmation-openapi.yaml](https://github.com/wso2/financial-services-accelerator/blob/4.0.0/financial-services-accelerator/accelerators/fs-apim/repository/resources/apis/ConfirmationOfFunds/funds-confirmation-openapi.yaml) | /open-banking/{version}/cbpii |

Once you deploy the APIs an API resource will be created along with the role mentioned in the swagger on the Identity Server side.

# Deploy Open Banking APIs

This page explains how to deploy an Open Banking API.

Before publishing the APIs, you need to create the consumer role in WSO2 API Manager.

## Create Consumer Role APIM Console[​](#create-consumer-role-apim-console "Direct link to Create Consumer Role APIM Console")

1. Goto APIM Carbon Console: `https://<APIM_HOSTNAME>:9443/carbon`

2. Log into APIM Carbon Console using APIM admin username and password.

3. Click on Main Tab → Users and Roles → Add

4. Click on Add New Role. ![am-add-new-role.png](/en/4.0.0/assets/images/am-add-new-role-6fe4421392cbadc3754e83cd1586a182.png)

5. Enter role Details: ![am-add-role-details.png](/en/4.0.0/assets/images/am-add-role-details-1d503c6795f65b9605ff13151bcbe06f.png)

   | Domain   | Role Name |
   | -------- | --------- |
   | INTERNAL | consumer  |

6. Click on Finish.

## Publish Open Banking APIs[​](#publish-open-banking-apis "Direct link to Publish Open Banking APIs")

note

WSO2 Open Banking Accelerator supports Accounts flow, Payments flow and Confirmation of Funds flow. Publish all three APIs before trying out the flows.

1. Sign in to the API Publisher Portal at `https://<APIM_HOSTNAME>:9443/publisher`.

2. In the homepage, go to REST API and select Import Open API. ![select-rest-api.png](/en/4.0.0/assets/images/select-rest-api-80c4d7614b37c0e117e6a572ac12bb0d.png)

3. Select OpenAPI File/Archive. ![upload-swagger.png](/en/4.0.0/assets/images/upload-swagger-031e20678d489f15e97f70ec0b591ca0.png)

4. Click Browse File to Upload and select the required yaml file.

   | API                   | Swagger File                                                                                                                                                                                                                           |
   | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Accounts              | [account-info-swagger.yaml](https://github.com/wso2/financial-services-accelerator/blob/4.0.0/financial-services-accelerator/accelerators/fs-apim/repository/resources/apis/Accounts/account-info-swagger.yaml)                        |
   | Payments              | [payment-initiation-openapi.yaml](https://github.com/wso2/financial-services-accelerator/blob/4.0.0/financial-services-accelerator/accelerators/fs-apim/repository/resources/apis/Payments/payment-initiation-openapi.yaml)            |
   | Confirmation of Funds | [funds-confirmation-openapi.yaml](https://github.com/wso2/financial-services-accelerator/blob/4.0.0/financial-services-accelerator/accelerators/fs-apim/repository/resources/apis/ConfirmationOfFunds/funds-confirmation-openapi.yaml) |

5. Click Next.

6. Set the Context value as follows:

   | API                   | Context Value                   |
   | --------------------- | ------------------------------- |
   | Accounts              | `/open-banking/{version}/aisp`  |
   | Payments              | `/open-banking/{version}/pisp`  |
   | Confirmation of Funds | `/open-banking/{version}/cbpii` |

7. Leave the Endpoint field empty as it is, Select the Gateway Type and click Create. ![configure-api.png](/en/4.0.0/assets/images/configure-api-ba8167c4dc97b6f24ea0075d1b4e9896.png)

8. Select Subscriptions from the left menu pane and uncheck all subscription plans. ![api-subscription.png](/en/4.0.0/assets/images/api-subscription-22998cbfc491d58e0b871ca2f185e293.png)

9. Click Save.

10. Go to Runtime using the left menu pane.<br />![select-runtime.png](/en/4.0.0/assets/images/select-runtime-9e6f6f3c93e75c49ca3d31be0da9c629.png)

11. Toggle the Schema Validation button to enable Schema Validation for all APIs except for the Dynamic Client Registration API. ![schema-validation.png](/en/4.0.0/assets/images/schema-validation-c61adf122279ce8cb5b2aa912be7430c.png)

12. Go to Endpoints using the left menu pane.<br />![select-endpoint.png](/en/4.0.0/assets/images/select-endpoints-167a237b1d1125806e21098f966c2a6f.png)

13. Select the endpoint types; **Dynamic Endpoints** and click Save.<br />![dynamic-endpoint.png](/en/4.0.0/assets/images/dynamic-endpoint-a76b3a39743ff4c35d65727b025ee97c.png)

14. Add [JWT claim based access validation](https://apim.docs.wso2.com/en/latest/design/api-policies/regular-gateway-policies/jwt-claim-based-access-validator/).

    Use **aut** as the Access verification claim name and value from below.

    | Token Type               | Claim Value       |
    | ------------------------ | ----------------- |
    | Client Credentials Grant | APPLICATION       |
    | Authorization Code Grant | APPLICATION\_USER |

15. Create and engage the required [Inbuilt Gateway Enforcements](/en/4.0.0/learn/inbuilt-policies/.md)

    * Refer to the [Introduction to Policies](/en/4.0.0/learn/policies/.md) for more details on Policies.
    * Refer to the [Create Policies](/en/4.0.0/learn/create-policies/.md) for create new Policies.
    * Refer to the [Engage Policies](/en/4.0.0/learn/engage-policies/.md) to learn how to engage policies to an API.

    Refer to the below table and engage the required policies for each API.

    | API                   | API Level Policies        | Operational Level Policies                                  |
    | --------------------- | ------------------------- | ----------------------------------------------------------- |
    | Accounts              | `MTLS Enforcement Policy` | `Consent Enforcement Policy`<br />`Dynamic Endpoint Policy` |
    | Payments              | `MTLS Enforcement Policy` | `Consent Enforcement Policy`<br />`Dynamic Endpoint Policy` |
    | Confirmation of Funds | `MTLS Enforcement Policy` | `Consent Enforcement Policy`<br />`Dynamic Endpoint Policy` |

16. Select the **API Gateway** type, in this scenario, it is **Default**.

17. Click Deploy.

18. Go to Overview using the left menu pane.<br />![select-overview.png](/en/4.0.0/assets/images/select-overview-a5ce904a426813c5c8877cbdb8787018.png)

19. click Publish. ![publish-api.png](/en/4.0.0/assets/images/publish-api-4cdc5546c7864335fd0d27fd60c14cd5.png)

Once you deploy the APIs an API resource will be created along with the role mentioned in the swagger on the Identity Server side.

note

If you have created the users, assign the roles created while publishing the APIs to the users.

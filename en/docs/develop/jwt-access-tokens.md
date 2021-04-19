JSON Web Token (JWT) is an open standard of transmitting information securely between two parties. As the tokens 
are digitally signed, the information is secured. The authentication and authorization process uses JWT access tokens. 
It is ideal to use JWT access tokens as API credentials because JWT access tokens can carry claims (data) that are used 
in order to authenticate and authorize requests.

WSO2 Open Banking Accelerator supports the use of JWT access tokens as API credentials. You can use custom claims in the 
JWT access token to cater to your requirements. In WSO2 Open Banking Accelerator, the JWT token contains the value of a 
consent ID as a custom claim. **consent ID** is a unique identifier for a granted consent. By default, the consent ID is 
available in the JWT token under the custom claim name;`consent_id`. To change this default claim name, follow the steps 
below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
2. Add the following tags and configure the value according to your claim.

    ``` toml
    [open_banking.identity]
    consent_id_claim_name=custom_claim_name
    ```

!!! note
    For more information, see the Identity Server documentation on [JWT token generation](https://is.docs.wso2.com/en/latest/learn/jwt-token-generation/#jwt-token-generation) 
    and [handling custom claims with JWT Bearer Grant Type](https://is.docs.wso2.com/en/latest/learn/handling-custom-claims-with-the-jwt-bearer-grant-type/#handling-custom-claims-with-the-jwt-bearer-grant-type).

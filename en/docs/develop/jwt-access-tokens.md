JSON Web Token (JWT) is an open standard of transmitting information securely between two parties. As the tokens 
are digitally signed, the information is secured. The authentication and authorization process uses JWT access tokens. 
It is ideal to use JWT access tokens as API credentials because JWT access tokens can carry claims (data) that are used 
in order to authenticate and authorize requests.

WSO2 Open Banking Accelerator supports the use of JWT formatted OAuth2.0 access tokens as API credentials. For more 
information on securing APIs using JWT Access Tokens, see 
[WSO2 API Manager documentation](https://apim.docs.wso2.com/en/latest/learn/api-security/oauth2/access-token-types/jwt-tokens/).

!!! note
    
    When reading the JWT claims, you can retrieve any claim and map it to the consent ID by following the given steps: 
    
    1. Open the `<APIM_HOME>/repository/conf/deployment.toml` file.
    2. Add the following tags and configure the value according to your claim.
    
        ``` toml
        [open_banking.identity]
        consent_id_claim_name=consent_id
        ```
    
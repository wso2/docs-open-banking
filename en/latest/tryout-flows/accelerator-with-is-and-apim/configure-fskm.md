# Configure WSO2 Financial Service Key Manager

## Configure IS as Key Manager[​](#configure-is-as-key-manager "Direct link to Configure IS as Key Manager")

### Configure WSO2 Identity Server 7.1.0[​](#configure-wso2-identity-server-710 "Direct link to Configure WSO2 Identity Server 7.1.0")

1. Add following configurations in the `<IS_HOME>/repository/conf/deployment.toml` file.

   ```
   [[event_listener]]

   id = "token_revocation"

   type = "org.wso2.carbon.identity.core.handler.AbstractIdentityHandler"

   name = "org.wso2.is.notification.ApimOauthEventInterceptor"

   order = 1



   [event_listener.properties]

   notification_endpoint = "https://<APIM_HOST>:<APIM_PORT>/internal/data/v1/notify"

   username = "${admin.username}"

   password = "${admin.password}"

   'header.X-WSO2-KEY-MANAGER' = "WSO2-IS"
   ```

2. Download [notification.event.handlers-2.0.5.jar](https://maven.wso2.org/nexus/content/repositories/releases/org/wso2/km/ext/wso2is/wso2is.notification.event.handlers/2.0.5/wso2is.notification.event.handlers-2.0.5.jar) and add it to `<IS_HOME>/repository/components/dropins` folder.

3. Restart the IS server

### Configure Key Manager in WSO2 API Manager[​](#configure-key-manager-in-wso2-api-manager "Direct link to Configure Key Manager in WSO2 API Manager")

1. Sign in to the Admin Portal of API Manager at `https://<APIM_HOSTNAME>:9443/admin` using admin credentials.

2. Go to Key Managers on the left main menu. Click on **Add Key Manager** button. ![add-key-manager](/en/latest/assets/images/add-key-manager-7af041047f9f9769e14fd3ffb3f19223.png)

3. Enter a Name and Display Name, and select **fsKeyManager** as the Key Manager Type. ![key-manager-basic-details](/en/latest/assets/images/key-manager-basic-details-c9bc5243ca0c1604713bc14c259ba47d.png)

4. Enter the **Well-known-url** and **Issuer** as below.

   | Field          | Value                                                                      |
   | -------------- | -------------------------------------------------------------------------- |
   | Well-known-url | `https://<IS_HOSTNAME>:9446/oauth2/token/.well-known/openid-configuration` |
   | Issuer         | `https://<IS_HOSTNAME>:9446/oauth2/token`                                  |

5. Under the **Key Manager Endpoints** section, provide the following values:

   note

   You can use `https://<IS_HOSTNAME>:9446/oauth2/token/.well-known/openid-configuration` as the Well-known URL, and click on Import to populate most of the fields mentioned below, Grant types, and the Certificates section.

   If the Import button is used, verify all the auto imported values with the ones mentioned below.

   | Configuration                | Values                                                             |
   | ---------------------------- | ------------------------------------------------------------------ |
   | Issuer                       | `https://<IS_HOSTNAME>:9446/oauth2/token`                          |
   | Client Registration Endpoint | `https://<IS_HOSTNAME>:9446/api/identity/oauth2/dcr/v1.1/register` |
   | Introspection Endpoint       | `https://<IS_HOSTNAME>:9446/oauth2/introspect`                     |
   | Token Endpoint               | `https://<IS_HOSTNAME>:9446/oauth2/token`                          |
   | Display Token Endpoint       | `https://<IS_HOSTNAME>:9446/oauth2/token`                          |
   | Revoke Endpoint              | `https://<IS_HOSTNAME>:9446/oauth2/revoke`                         |
   | Display Revoke Endpoint      | `https://<IS_HOSTNAME>:9446/oauth2/revoke`                         |
   | UserInfo Endpoint            | `https://<IS_HOSTNAME>:9446/scim2/Me`                              |
   | Authorize Endpoint           | `https://<IS_HOSTNAME>:9446/oauth2/authorize`                      |
   | Scope Management Endpoint    | `https://<IS_HOSTNAME>:9446/api/identity/oauth2/v1.0/scopes`       |

6. Under **Grant types**, provide all the following:

   * Client\_credentials
   * Refresh\_token
   * Authorization\_code
   * urn:ietf:params:oauth:grant-type
     <!-- -->
     :jwt-bearer

7. Under the **Certificates** section, select JWKS. Enter `https://<IS_HOSTNAME>:9446/oauth2/jwks` as the URL.

8. Under **Connector Configurations**, provide the following values:

   | Configuration                                           | Values                                                   |
   | ------------------------------------------------------- | -------------------------------------------------------- |
   | Username                                                | Authorization server admin username                      |
   | Password                                                | Authorization server admin password                      |
   | WSO2 Identity Server 7 API Resource Management Endpoint | `https://<IS_HOSTNAME>:9446/api/server/v1/api-resources` |
   | WSO2 Identity Server 7 Roles Endpoint                   | `https://<IS_HOSTNAME>:9446/scim2/v2/Roles`              |

9. Enable the Role creation is WSO2 Identity Server 7 as by ticking as below. ![enable-role-validation](/en/latest/assets/images/enable-role-validation-85b6757fe609918d43fe58135e97af1a.png)

10. Set **Key Manager Permission** to **Public**. ![km-permisiion](/en/latest/assets/images/km-permisiion-249ae3a3ea0394c0677af4a785598d14.png)

11. Under **Advanced Configuration**, provide the following values:

    | Configuration                     | Values            |
    | --------------------------------- | ----------------- |
    | Token Generation                  | Tick (Mandatory)  |
    | Out Of Band Provisioning          | Tick (Mandatory)  |
    | Oauth App Creation                | Tick (Mandatory)  |
    | Token Validation Method           | Self Validate JWT |
    | Token Handling Options (Optional) | JWT               |

12. Click on **Add** button to create the Key Manager. Key Manager will be displayed as below. ![km-both-enabled](/en/latest/assets/images/km-both-enabled-b2232bc928de7354e2bb7e9db936bf4e.png)

13. Disable the Resident Key Manager. ![km-display](/en/latest/assets/images/km-display-eca8d3a13611f9ac7f99ef9e5127b726.png)

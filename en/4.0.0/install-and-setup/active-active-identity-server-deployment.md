# Configuring Active-Active Identity Server Deployment with Accelerator

In the standard distributed deployment of the Identity Server, two instances operate behind a load balancer to ensure high availability and load distribution.

This document provides instructions on how to set up the financial services accelerator with distributed Identity Servers.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

* Configure the JAVA\_HOME environment variable to reference the directory where the Java Development Kit (JDK) is installed on the server. For more information, see [Setting up JAVA\_HOME](https://ob.docs.wso2.com/en/latest/install-and-setup/setting-up-servers/#setting-up-java_home).
* Ensure that all necessary ports are open on each server to facilitate successful data communication. For more information, see [Configuring ports](https://ob.docs.wso2.com/en/latest/install-and-setup/setting-up-servers/#configuring-ports).
* Download and configure 2 Identity Server Nodes.

## Configure Load Balancer to front with multiple IS servers[​](#configure-load-balancer-to-front-with-multiple-is-servers "Direct link to Configure Load Balancer to front with multiple IS servers")

To access the two WSO2 Identity Server nodes, you need to front the system with a load balancer. You can use any load balancer that is available to your system.

See [WSO2 Clusters with Nginx](/en/4.0.0/install-and-setup/wso2-clusters-with-nginx/.md) for instructions on how to set up the load balancer.

## Step 1: Setting Up WSO2 Financial Services IAM Accelerators[​](#step-1-setting-up-wso2-financial-services-iam-accelerators "Direct link to Step 1: Setting Up WSO2 Financial Services IAM Accelerators")

See [WSO2 Open Banking IAM Accelerator documentation](/en/4.0.0/install-and-setup/setting-up-servers-with-is/.md) for instructions on how to set up the WSO2 Open Banking IAM Accelerator.

Configure two nodes of the WSO2 Identity Server (IS) with the same configurations as described in the documentation. Ensure that both nodes are configured to use the same database.

### Configure WSO2 Identity Server[​](#configure-wso2-identity-server "Direct link to Configure WSO2 Identity Server")

1. For instructions on how to configure the deployment.toml file, see the following topics:

   * [Configuring Identity Server for open banking](/en/4.0.0/install-and-setup/configuring-identity-server-for-ob/.md)

   note

   Use the load balancer URL as the `<IS_HOST>` to configure the IS server in both deployment.toml file. Do not configure IS server port with the load balancer URL.

2. Disable create\_admin\_account in one of the IS servers.

   ```
   [super_admin]

   create_admin_account = false
   ```

3. Add the following reverse-proxy configuration to the deployment.toml file of both IS nodes:

   ```
   [transport.http.properties]

    proxyPort = 80

   [transport.https.properties]

    proxyPort = 443
   ```

4. Make sure to use the same client-truststore (client-truststore.p12) and keystore (wso2carbon.p12) in both IS servers.

5. Restart the IS server.

6. Add the hostname ip mappings to the server’s /etc/hosts file.

7. Access the IS carbon console using `https://<load_balancer_url>`.

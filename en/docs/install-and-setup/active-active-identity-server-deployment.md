In the standard distributed deployment of the Identity Server, two instances operate behind a load balancer to ensure high availability and load distribution.

This document provides instructions on how to set up the financial services accelerator with distributed Identity Servers.

## Prerequisites

- Configure the JAVA_HOME environment variable to reference the directory where the Java Development Kit (JDK) is installed on the server.
  For more information, see [Setting up JAVA_HOME](https://ob.docs.wso2.com/en/latest/install-and-setup/setting-up-servers/#setting-up-java_home).
- Ensure that all necessary ports are open on each server to facilitate successful data communication.
  For more information, see [Configuring ports](https://ob.docs.wso2.com/en/latest/install-and-setup/setting-up-servers/#configuring-ports).
- Download and configure 2 Identity Server Nodes.

## Configure Load Balancer to front with multiple IS servers

To access the two WSO2 Identity Server nodes, you need to front the system with a load balancer. You can use any load balancer that is available to your system.

See [WSO2 Clusters with Nginx](wso2-clusters-with-nginx.md) for instructions on how to set up the load balancer.

## Step 1: Setting Up WSO2 Financial Services IAM Accelerators

See [WSO2 Open Banking IAM Accelerator documentation](setting-up-servers-with-is.md)
for instructions on how to set up the WSO2 Open Banking IAM Accelerator.

Configure two nodes of the WSO2 Identity Server (IS) with the same configurations as described in the documentation.
Ensure that both nodes are configured to use the same database.

### Configure WSO2 Identity Server

1. For instructions on how to configure the deployment.toml file, see the following topics:
    - [Configuring Identity Server for open banking](configuring-identity-server-for-ob.md)
   
    !!!Note
        Use the load balancer URL as the `<IS_HOST>` to configure the IS server in both deployment.toml file.
        Do not configure IS server port with the load balancer URL.

2. Disable create_admin_account in one of the IS servers.
   ``` toml
   [super_admin]
   create_admin_account = false
    ```

3. Add the following reverse-proxy configuration to the deployment.toml file of both IS nodes:
   ``` toml
   [transport.http.properties]
    proxyPort = 80
   [transport.https.properties]
    proxyPort = 443
   ```
4. Make sure to use the same client-truststore (client-truststore.p12) and keystore (wso2carbon.p12) in both IS servers.
5. Restart the IS server.
6. Add the hostname ip mappings to the server’s /etc/hosts file.
7. Access the IS carbon console using `https://<load_balancer_url>`.

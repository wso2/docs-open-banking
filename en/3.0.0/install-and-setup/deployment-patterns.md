# Deployment Patterns

The base products for WSO2 Open Banking Accelerator are WSO2 API Manager and WSO2 Identity Server.

* The Identity Server can be deployed in clustered setup for high availability (HA) and is recommended for production deployment environments. You can run multiple nodes of WSO2 Identity Server in a cluster mode for seamless request handling and balanced traffic handling.

* The API Manager can have an [All-in-One Deployment](https://apim.docs.wso2.com/en/latest/install-and-setup/setup/single-node/all-in-one-deployment-overview/#!) as well as a [Distributed Deployment](https://apim.docs.wso2.com/en/latest/install-and-setup/setup/distributed-deployment/understanding-the-distributed-deployment-of-wso2-api-m/) where the server nodes separately run the [API Manager profiles](https://apim.docs.wso2.com/en/latest/install-and-setup/setup/distributed-deployment/understanding-the-distributed-deployment-of-wso2-api-m/#api-m-profiles). Typically, when you get started with the API Manager in a development environment, you deploy it as a single instance with all its components on a single server. In a production deployment, the components are deployed in a distributed manner for HA. Therefore, you can create a distributed deployment of the main components.

This page describes the recommended patterns for a HA deployment of WSO2 Open Banking Accelerator and its base products.

## Deployment Patterns[​](#deployment-patterns "Direct link to Deployment Patterns")

### Pattern 1[​](#pattern-1 "Direct link to Pattern 1")

Single node (All-in-one) deployment with API Manager and Identity Server.

![pattern-1](/en/3.0.0/assets/images/pattern-1-6e1df49aad63f237214e8cd4591e3c25.png)

### Pattern 2[​](#pattern-2 "Direct link to Pattern 2")

Multi-node deployment with 2 API Manager instances and an Identity Server.

![pattern-2](/en/3.0.0/assets/images/pattern-2-48d69a12025f1d510e0996f3c83c6488.png)

### Pattern 3[​](#pattern-3 "Direct link to Pattern 3")

Single node (All-in-one) deployment with API Manager and 2 Identity Server instances.

![pattern-3](/en/3.0.0/assets/images/pattern-3-096292e11280c4b89931a94fabe586ee.png)

### Pattern 4[​](#pattern-4 "Direct link to Pattern 4")

Multi-node deployment with API Manager, Identity Server, and Streaming Integrator.

![pattern-4](/en/3.0.0/assets/images/pattern-4-43c2400108ff8ff28a1066be089d6161.png)

## Setting up deployment[​](#setting-up-deployment "Direct link to Setting up deployment")

Set up WSO2 Open Banking Accelerator and its base products by following the [Install and Setup](/en/3.0.0/install-and-setup/setting-up-servers/.md) section.

### Identity Server HA Deployment[​](#identity-server-ha-deployment "Direct link to Identity Server HA Deployment")

tip

Set the hostname of the Identity Server node as `obiam`.

* Configure WSO2 Identity Server in a clustered setup by following [Set up WSO2 IS clusters with Nginx](https://is.docs.wso2.com/en/5.11.0/setup/deployment-guide/#fronting-with-a-load-balancer?).

note

Follow the Nginx configuration that exposes `/oauth2`, `/commonauth`, and other endpoints.

### API Manager HA Deployment[​](#api-manager-ha-deployment "Direct link to API Manager HA Deployment")

warning

WSO2 Open Banking Accelerator does not support the multi-tenancy capabilities in WSO2 API Manager

* Configure the [Proxy Server and the Load Balancer](https://apim.docs.wso2.com/en/latest/install-and-setup/setup/setting-up-proxy-server-and-the-load-balancer/configuring-the-proxy-server-and-the-load-balancer/#step-2-configure-the-load-balancerreverse-proxy-server) for WSO2 API Manager. Follow the configurations available under the **HA for Gateway** section.

* To learn more about API Manager Deployment Patterns, see [WSO2 API Manager Deployment](https://apim.docs.wso2.com/en/latest/install-and-setup/setup/deployment-overview/).

### Open ports[​](#open-ports "Direct link to Open ports")

| Product              | Port      | Usage                                                                |
| -------------------- | --------- | -------------------------------------------------------------------- |
| WSO2 API Manager     | 9763      | HTTP servlet port                                                    |
|                      | 9443      | HTTPS servlet port                                                   |
|                      | 8280,8243 | NIO/PT transport ports                                               |
| WSO2 Identity Server | 9766      | HTTP servlet port                                                    |
|                      | 9446      | HTTPS servlet port                                                   |
|                      | 4000      | Ports to be opened with respect to clustering membership scheme used |

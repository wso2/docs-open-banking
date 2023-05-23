This page explains two methods of deploying the solution in Docker containers. 

!!! tip "Before you begin:"
    1. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git),
       [Docker](https://www.docker.com/products/docker-desktop/), and
       [Docker Compose](https://docs.docker.com/compose/install/#install-compose) to get started.

    2. Clone the [wso2/docker-open-banking](https://github.com/wso2/docker-open-banking.git) repository. This document 
       refers to the file path of the cloned directory as `<OB_DOCKER_HOME>`.

    3. Download and extract the WSO2 IS Connector according to the API Manager version that you are using. See the 
    [Installing base products](https://ob.docs.wso2.com/en/latest/get-started/quick-start-guide/#installing-base-products) 
    documentation to learn about the respective WSO2 IS Connector according to the API Manager version.

!!! note
    In order to use WSO2 Open Banking Docker Images, you need an active WSO2 Open Banking subscription. If you don't
    have a WSO2 Open Banking subscription, [contact us](https://wso2.com/solutions/financial/open-banking/#contact)
    for more information.

  - If you are looking for a Quick Start Guide and deploy the solution, follow 
  [Deploy WSO2 Open Banking with Docker Compose](#deploy-wso2-open-banking-with-docker-compose).

  - If you want to deploy each Open Banking component in separate containers, follow 
  [Deploy WSO2 Open Banking with Docker](#deploy-wso2-open-banking-with-docker).

  - To learn how to download WSO2 Updates for your Open Banking Images, see [Download WSO2 Updates](#download-wso2-updates).

## Deploy WSO2 Open Banking with Docker Compose

This section explains how to deploy the solution using Docker Compose. 

!!! note 
    This is a Quick Start Guide to set up the solution in your local environment.

1. Go to the `docker-compose` directory inside the `<OB_DOCKER_HOME>` directory.

    ```shell
    cd <OB_DOCKER_HOME>/docker-compose
    ```

2. Select the `docker-compose` setup that you wish to use and navigate into it.

    ```shell 
    cd obam-with-obiam
    ```       
   
    !!! note
        Hereafter, the above-mentioned directory will be referred to as `<DOCKER_COMPOSE_HOME>`.    

3. By default, `docker-compose` is configured for the Docker images of the WSO2 Open Banking Accelerator which are based 
   on WSO2 API Manager 4.2.0 and WSO2 Identity Server 6.0.0. 
   Follow the additional instructions below only if you are using Docker images of WSO2 Open Banking solution with any other base product versions:

    1. Open the `docker-compose.yml` file in the `<DOCKER_COMPOSE_HOME>` directory.
    2. Change the base product versions of `image` names.
    3. Go to `services` > `mysql` > `volumes`.
    4. Change the SQL script according to your base product versions. You can find the respective SQL script 
    according to your base product version [here](https://github.com/wso2/docker-open-banking/tree/master/docker-compose/mysql/scripts).

5. Follow the steps below only if you wish to run the Docker Compose setup using WSO2 UK Toolkit Docker Images or locally-built Docker images:

    1. Build Docker images using Docker resources available [here](https://github.com/wso2/docker-open-banking/tree/master/dockerfiles).
    2. Remove the `docker.wso2.com/` prefix from the `image` name in the `docker-compose.yml` and change the image name to the image name of the locally-built image.

6. Volume mount the IS connector on the `obiam` container.

    1. Go to the `volumes` section of the `obiam` service in the `docker-compose.yml` in the `<DOCKER_COMPOSE_HOME>` directory.
    2. Change the root directory path of the extracted WSO2 IS Connector with `<IS_CONNECTOR_HOME>`.

7. Deploy the solution by executing the following command:

    ```shell
    docker-compose up
    ```

## Deploy WSO2 Open Banking with Docker

This section explains how to set up the solution using WSO2 Open Banking Docker images.

### Set up Network

- Create a network.
    
    ```shell
    docker network create -d bridge ob-network
    ```

### Set up Database Container

1. Pull the MySQL image.

    ```shell
    docker pull mysql:8.0.32
    ```
   
2. Run the MySQL Docker container.

    ```shell 
    docker run --network ob-network --name mysql -e MYSQL_ROOT_PASSWORD=root  -d mysql:8.0.32
    ```

3. Choose the SQL script according to your base product versions and copy that SQL script to the MySQL container.

    ```shell 
    docker cp <OB_DOCKER_HOME>/docker-compose/mysql/scripts/setup-apim4.2.0-IS6.0.0.sql  mysql:/setup.sql
    ``` 

4. If you wish to use WSO2 Open Banking Business Intelligence Accelerator, copy the `setup-reporting-databases.sql` to the MySQL container.

    ```shell 
    docker cp <OB_DOCKER_HOME>/docker-compose/mysql/scripts/setup-reporting-databases.sql  mysql:/setup-reporting-databases.sql
    ``` 

5. Log in to the MySQL container.

    ```shell 
    docker exec -it mysql mysql -uroot -proot
    ``` 

6. Source the copied SQL script.

    ```  
    mysql> source setup.sql;
   
    mysql> source setup-reporting-databases.sql;
    ``` 

7. Update the MySQL connection limit.

    ```  
    mysql> set global max_connections = 1000;
    ``` 

8. Update the `USER` and `openbank_apimgtdb.SP_METADATA` tables:

    ``` 
    mysql> ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
   
    mysql> ALTER TABLE openbank_apimgtdb.SP_METADATA MODIFY VALUE VARCHAR(7500);
    ```

### Set up Open Banking Identity Server with Docker

1. Pull the Open Banking Identity Server image from [WSO2 Docker Repositories](https://docker.wso2.com/tags.php?repo=wso2-obiam).

    ```shell
    docker pull docker.wso2.com/wso2-obiam:3.0.0.0-is6.0.0.0
    ```

2. Deploy the Identity Server image.

    ```shell
    docker run -it -p 9446:9446 --network ob-network --name obiam -v <IS_CONNECTOR_HOME>/dropins:/home/wso2carbon/wso2-artifact-volume/repository/components/dropins/ -v <IS_CONNECTOR_HOME>/webapps:/home/wso2carbon/wso2-artifact-volume/repository/deployment/server/webapps/ wso2-obiam:3.0.0.0-is6.0.0.0
    ```

    !!! note
        Here, `<IS_CONNECTOR_HOME>` refers to the root directory path of the extracted WSO2 IS Connector.

### Set up Open Banking API Manager with Docker

1. Pull the Open Banking API Manager image from [WSO2 Docker Repositories](https://docker.wso2.com/tags.php?repo=wso2-obam).

    ```shell 
    docker pull docker.wso2.com/wso2-obam:3.0.0.0-am4.2.0.0
    ```

2. Deploy the Open Banking API Manager image.

    ```shell
    docker run -p 9443:9443 -p 8243:8243 -p 8280:8280 --network ob-network --name obam docker.wso2.com/wso2-obam:3.0.0.0-am4.2.0.0
    ```

### Set up Open Banking Business Intelligence with Docker

1. Pull the Open Banking Business Intelligence image from [WSO2 Docker Repositories](https://docker.wso2.com/tags.php?repo=wso2-obiam).

    ```shell
    docker pull docker.wso2.com/wso2-obbi:3.0.0.0-si4.2.0.0
    ```

2. Deploy the Open Banking Business Intelligence image.

    ```shell
    docker run -it -p 9712:9712 -p 9612:9612 -p 7712:7712 -p 7612:7612 -p 9092:9092 -p 9444:9444 --network ob-network --name obbi wso2-obbi:3.0.0.0-si4.2.0.0
    ```

### Configure the WSO2 Open Banking solution

1. Copy the `deployment.toml` files of the Identity Server and API Manager from the containers to a desired location in the host machine.

    ```shell
    docker cp obiam:/home/wso2carbon/wso2is-6.0.0/repository/conf/deployment.toml <DESIRED_LOCATION_OF_IS_DEPLOYMENT>
   
    docker cp obam:/home/wso2carbon/wso2am-4.2.0/repository/conf/deployment.toml <DESIRED_LOCATION_OF_APIM_DEPLOYMENT>
    ```

2. Go to the location where you copied the `deployment.toml` of the Identity Server and update the copied file as follows:

    1. Change the `jwks_url_sandbox` and `jwks_url_production` URLs with the respective JWKS URLs of your certs.
   
    2. If you are using WSO2 Identity Server 6.0.0, add the below configuration to enable the application role validation:

        ```toml
        [application_mgt]
        enable_role_validation = true
        ```

3. If you are using WSO2 API Manager 4.2.0, go to the location where you copied the `deployment.toml` of the API Manager and update the copied file as follows:

    1. Locate the `[open_banking.dcr.apim_rest_endpoints]` tag. By default, this configuration is commented out.
   
    2. Uncomment the configuration and update as shown below:
   
        ```toml
        [open_banking.dcr.apim_rest_endpoints]
        app_creation = "api/am/devportal/v3/applications"
        key_generation = "api/am/devportal/v3/applications/application-id/map-keys"
        api_retrieve = "api/am/devportal/v3/apis"
        api_subscribe = "api/am/devportal/v3/subscriptions/multiple"
        retrieve_subscribe="api/am/devportal/v3/subscriptions"
        ```

4. If you are using WSO2 Open Banking Business Intelligence Docker Image, please follow the steps below.

    1. Make sure that API Manager analytics is enabled in the `deployment.toml` file of the API Manager.
   
        ```toml
        [apim.analytics]
        enable = true
        ```

    2. Go to the `deployment.toml`  files of the API Manager and Identity Server to enable open banking data publishing as follows:

        ```toml
        [open_banking.data_publishing]
        enable = true
        ```
       
5. Place the modified `deployment.toml` files in the containers:

    ```shell
    docker cp <DESIRED_LOCATION_OF_IS_DEPLOYMENT>/deployment.toml obiam:/home/wso2carbon/wso2is-6.0.0/repository/conf/deployment.toml
    
    docker cp <DESIRED_LOCATION_OF_APIM_DEPLOYMENT>/deployment.toml obam:/home/wso2carbon/wso2am-4.2.0/repository/conf/deployment.toml
    ```
   
6. Restart the containers to apply the changes:

    ```shell
    docker restart obiam obam
    ```
   
7. Add the below entry mappings into the `/etc/hosts` file of your host machine.

    - `127.0.0.1 mysql`
    - `127.0.0.1 obam`
    - `127.0.0.1 obiam`

8. You can access the WSO2 Open Banking API Manager using a web browser via the following URLs:

    - `https://obam:9443/publisher`
    - `https://obam:9443/devportal`
    - `https://obam:9443/admin`
    - `https://obam:9443/carbon`

9. The API Gateway will be available on the following ports:

    - `https://obam:8243`
    - `http://obam:8280`

10. You can access the WSO2 Open Banking Identity Server using a web browser via the following URL:

    - `https://obiam:9446/carbon`

### Deploy APIs and Configure IS as Key manager

1. If you are using HTTP/REST Endpoints when publishing the APIs, update the hostname of the endpoint as `obiam`. For example,

    ```
    https://obiam:9446/api/openbanking/dynamic-client-registration
    ```

2. If you are using insequence files when publishing the APIs, replace the hostname in the insequence file as follows:

    - `obam:9443`
    - `obiam:9446`

3. When configuring the Key Manager, set the value of `IS_HOST` as `obiam`. For an example,

    ```
    https://obiam:9446/keymanager-operations/dcr/register
    ```

## Download WSO2 Updates

This section explains how to download the WSO2 updates for Open Banking Identity Server and API Manager. For each 
container you want to update, follow the steps below:

1. Start the container and log in to the container as the root user.

    ```shell
    sudo docker exec -u 0 -it obiam /bin/bash
    ```

2. Update the `<WSO2_IS_HOME>/updates/config.json` file with the relevant `username` and `backup-dir`.

3. Do the same changes to the `<WSO2_IS_HOME>/<WSO2_IAM_ACCELERATOR_HOME>/updates/config.json` file.

4. Go to the `<WSO2_IS_HOME>/bin` directory and update the product.

      ```shell 
      ./wso2update_linux 
      ```

5. Run the `merge.sh` script.

     ```shell 
     ./merge.sh
     ```

6. Log out and stop the container.

7. Restart the `obiam` container.

8. Repeat the same steps for the API Manager (`obam`) container.
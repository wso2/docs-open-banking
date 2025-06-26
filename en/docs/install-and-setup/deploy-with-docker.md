This page explains two methods of deploying the solution in Docker containers. 

!!! tip "Before you begin:"
    1. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git),
       [Docker](https://www.docker.com/products/docker-desktop/), and
       [Docker Compose](https://docs.docker.com/compose/install/#install-compose) to get started.

    2. Clone the [wso2/docker-open-banking](https://github.com/wso2/docker-open-banking.git) repository. This document 
       refers to the file path of the cloned directory as `<OB_DOCKER_HOME>`.

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
    cd fsiam
    ```       
   
    !!! note
        Hereafter, the above-mentioned directory will be referred to as `<DOCKER_COMPOSE_HOME>`.    

3. By default, `docker-compose` is configured for the Docker images of the WSO2 Open Banking Accelerator which are based on WSO2 API Manager 4.5.0 and WSO2 Identity Server 7.1.0. 
   Follow the additional instructions below only if you are using Docker images of WSO2 Open Banking solution with any other base product versions:

    1. Open the `docker-compose.yml` file in the `<DOCKER_COMPOSE_HOME>` directory.
    2. Change the base product versions of `image` names.
    3. Go to `services` > `mysql` > `volumes`.
    4. Change the SQL script according to your base product versions. You can find the respective SQL script 
    according to your base product version [here](https://github.com/wso2/docker-open-banking/tree/master/docker-compose/mysql/scripts).

4. Follow the steps below only if you wish to run the Docker Compose setup using WSO2 Toolkit Docker Images or locally-built Docker images:

    1. Build Docker images using Docker resources available [here](https://github.com/wso2/docker-open-banking/tree/master/dockerfiles).
    2. Remove the `docker.wso2.com/` prefix from the `image` name in the `docker-compose.yml` and change the image name to the image name of the locally-built image.

5. Deploy the solution by executing the following command:

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

3. Choose the SQL script according to your base product versions and copy that SQL script to the MySQL container. For example, execute the below script if you are using WSO2 API Manager 4.2.0 and WSO2 Identity Server 6.0.0 as base products.

    ```shell 
    docker cp <OB_DOCKER_HOME>/docker-compose/mysql/scripts/setup-IS-7.1.0.sql  mysql:/setup.sql
    ``` 

4. Log in to the MySQL container.

    ```shell 
    docker exec -it mysql mysql -uroot -proot
    ``` 

5. Source the copied SQL script.

    ```  
    mysql> source setup.sql;
   
    mysql> source setup-reporting-databases.sql;
    ``` 

6. Update the MySQL connection limit.

    ```  
    mysql> set global max_connections = 1000;
    ``` 

7. Update the `USER` and `fs_identitydb.SP_METADATA` tables:

    ``` 
    mysql> ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
   
    mysql> ALTER TABLE fs_identitydb.SP_METADATA MODIFY VALUE VARCHAR(7500);
    ```


### Set up Open Banking Identity Server with Docker

1. Pull the Open Banking Identity Server image from [WSO2 Docker Repositories](https://docker.wso2.com/tags.php?repo=wso2-obiam).

    ```shell
    docker pull docker.wso2.com/wso2-obiam:4.0.0.0-is7.1.0.0
    ```

## Configure the WSO2 Open Banking solution

1. Copy the `deployment.toml` files of the Identity Server and API Manager from the containers to a desired location in the host machine.

    ```shell
    docker cp obiam:/home/wso2carbon/wso2is-7.1.0/repository/conf/deployment.toml <DESIRED_LOCATION_OF_IS_DEPLOYMENT>

    ```

2. Go to the location where you copied the `deployment.toml` of the Identity Server and update the copied file as follows:

    1. Change the `jwks_url_sandbox` and `jwks_url_production` URLs with the respective JWKS URLs of your certs.
       
3. Place the modified `deployment.toml` files in the containers:

    ```shell
    docker cp <DESIRED_LOCATION_OF_IS_DEPLOYMENT>/deployment.toml obiam:/home/wso2carbon/wso2is-7.1.0/repository/conf/deployment.toml
    ```
   
4. Restart the containers to apply the changes:

    ```shell
    docker restart obiam
    ```
   
5. Add the below entry mappings into the `/etc/hosts` file of your host machine.

    - `127.0.0.1 mysql`
    - `127.0.0.1 fsiam`

6. You can access the WSO2 Open Banking Identity Server using a web browser via the following URL:

    - `https://fsiam:9446/carbon`

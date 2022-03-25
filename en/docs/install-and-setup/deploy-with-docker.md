#Deploy WSO2 Open Banking with Docker

This page explains how to set up the solution using WSO2 Open Banking Docker Images.

!!! tip "Before you begin:"
    Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), 
    [Docker](https://www.docker.com/products/docker-desktop/), and 
    [Docker Compose](https://docs.docker.com/compose/install/#install-compose) to get started. 

1. Clone the [wso2/docker-open-banking](https://github.com/wso2/docker-open-banking.git) repository. This document 
   refers to the file path of the cloned directory as `<OB_DOCKER_HOME>`.
2. Download Open Banking 3.0 Docker resources from [here]. This document refers to the file path of the Docker 
   resources directory as `<OB_DOCKER_RESOURCES>`.
3. Download the following WSO2 Open Banking Docker images from [here](https://hub.docker.com/u/wso2/).
    - wso2-obam:3.0.0.tar
    - wso2-obiam:3.0.0.tar

    !!! note
        In order to use WSO2 Open Banking Docker images, you need an active WSO2 Open Banking subscription. If you don't
        have a WSO2 Open Banking subscription, [contact us](https://wso2.com/solutions/financial/open-banking/#contact)
        for more information.

## Deploy Open Banking Identity Server

1. Load the downloaded Docker image.

    ```shell
    docker load -i wso2-obiam_3.0.0.tar
    ```

2. Create a network.

    ```shell
    docker network create -d bridge ob-network
    ```

3. Pull the MySQL image.

    ```shell
    docker pull mysql:8.0.27
    ```
   
4. Set up the MySQL DB container:

    a. Run the MySQL Docker container.
    
       ``` 
       docker run --network ob-network --name mysql -e MYSQL_ROOT_PASSWORD=root  -d mysql:8.0.27
       ```
   
    b. Copy the `setup.sql` script to the container.

       ```  
       docker cp <OB_DOCKER_HOME>/docker-compose/obam-with-obiam/mysql/scripts/setup.sql  <mysql-container-id>:/setup.sql
       ```
   
    c. Login to the MySQL container

       ```  
       docker exec -it mysql mysql -uroot -proot
       ```
   
    d. Source the copied SQL script.

       ``` 
       mysql> source setup.sql;
       ```
   
    e. Update the MySQL connection limit.

       ``` 
       mysql> show variables like 'max_connections';
       mysql> set global max_connections = 1000;
       mysql> ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
       mysql> ALTER TABLE openbank_apimgtdb.SP_METADATA MODIFY VALUE VARCHAR(7500);
       ```
   
5. Go to the `<OB_DOCKER_RESOURCES>` directory and update the `deployment.toml` files located there.

   - Change the `jwks_url_sandbox` and `jwks_url_production` URLs with the respective JWKS URLs of your certs.
   - Change the hostnames of `login_url`, `retry_url`, `oauth2_consent_page`, and `oidc_consent_page` 
     with the respective hostnames of the containers.

6. Start the Open Banking Identity Server:

    ``` 
    sudo docker run -p 9446:9446 --network ob-network --volume <OB_DOCKER_RESOURCES>/deployment.toml:/home/wso2carbon/wso2is-5.11.0/repository/conf/deployment.toml --name obiam wso2-obiam:3.0.0
    ```

## Deploy Open Banking API Manager

1. Load the downloaded Docker image.

    ```shell
    docker load -i wso2-obam_3.0.0.tar
    ```

2. Create a network.

    ```shell
    docker network create -d bridge ob-network
    ```

3. Start the Open Banking Identity Server:

    ``` 
    sudo docker run -p 9443:9443 --network ob-network --name obam 
    ```

## Download U2 Updates

This section explains how to download U2 updates for WSO2 Open Banking Identity Server and API Manager. Follow the steps
below for each container you want to update:

1. Start the container and log in to the container as the root user.

    ```
    sudo docker exec -u 0 -it obiam /bin/bash
    ```

2. Update the `<WSO2_IS_HOME>/updates/config.json` file with the relevant username and backup-dir.
3. Do the same changes to the `<WSO2_IS_HOME>/<WSO2_IAM_ACCELERATOR_HOME>/updates/config.json` file.
4. Go to the `<WSO2_IS_HOME>/bin` directory and update the product.

      ``` 
      ./wso2update_linux 
      ```

5. Run the `merge.sh` script.

     ``` shell 
     ./merge.sh
     ```

6. Log out and stop the container.

7. Restart the `obiam` container.

8. Repeat the same steps for the API Manager (`obam`) container.

 




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

##Deploy WSO2 Open Banking with Docker Compose

This section explains how to deploy the solution using Docker Compose. 

!!! note 
    This is a Quick Start Guide to set up the solution in your local environment.

1. Go to the `obam-with-obiam` directory inside `<OB_DOCKER_HOME>`.

    ``` 
    cd <OB_DOCKER_HOME>/docker-compose/obam-with-obiam
    ```

2. Deploy the solution by executing the following:

    ``` 
    docker-compose up
    ```

3. Obtain the container Id of the Identity Server by executing the command below:

    ``` 
    docker ps
    ```

4. Copy the `deployment.toml` file of the Identity Server from the container to a desired location in the host machine.

    ``` 
    docker cp <IS_CONTAINER_ID>:/home/wso2carbon/wso2is-5.11.0/repository/conf/deployment.toml <DESIRED_LOCATION>
    ```
   
6. Go to the location where you copied the `deployment.toml` and update the copied file as follows:

    - Change the `jwks_url_sandbox` and `jwks_url_production` URLs with the respective JWKS URLs of your certs.
    - Change the hostnames of `login_url`, `retry_url`, `oauth2_consent_page`, and `oidc_consent_page`
     with the respective hostnames of the containers.

7. Place the modified  `deployment.toml` file in the container:

    !!! note
        You can use the same command and copy any existing `deployment.toml` file to the container.

    ``` 
    docker cp <DESIRED_LOCATION>/deployment.toml <CONTAINER_ID>:/home/wso2carbon/wso2is-5.11.0/repository/conf/deployment.toml
    ```

8. Restart the container to apply the changes:

    ``` 
    docker restart obiam
    ``` 
   
9. Obtain the container Id of the API Manager by executing the command below:

    ``` 
    docker ps
    ```

10. Copy the `deployment.toml` file of the API Manager from the container to a desired location in the host machine.

     ``` 
     docker cp <CONTAINER_ID>:/home/wso2carbon/wso2am-4.0.0/repository/conf/deployment.toml <DESIRED_LOCATION>
     ```

11. Go to the location where you copied the `deployment.toml` and update the copied file as follows:

    - Change the following URLs according to the sample given below:

       ``` toml
       [apim.key_manager]
       service_url = "https://obiam:9446${carbon.context}services/"
       
       [apim.key_manager.configuration]
       ServerURL = "https://obiam:9446${carbon.context}services/"
       TokenURL = "https://obam:${https.nio.port}/token"
       RevokeURL = "https://obam:${https.nio.port}/revoke"
       ```

    - Add the following tags:

      ``` toml
      [oauth.endpoints]
      oauth2_token_url = "https://obiam:9446/oauth2/token"
      oauth2_jwks_url = "https://obiam:9446/oauth2/jwks"
   
      [open_banking.gateway.consent.validation]
      endpoint = "https://obiam:9446/api/openbanking/consent/validate"
      ```

12. Place the modified  `deployment.toml` file in the container:

    !!! note
        You can use the same command and copy any existing `deployment.toml` file to the container.

    ``` 
    docker cp <DESIRED_LOCATION>/deployment.toml <CONTAINER_ID>:/home/wso2carbon/wso2am-4.0.0/repository/conf/deployment.toml
    ```

13. Restart the container to apply the changes:

     ``` 
     docker restart obam
     ```
   
14. Log in to the Management Console at `https://obiam:9446/carbon/`.

15. Go to **Identity Providers > Resident > Inbound Authentication Configuration > OAuth2/OpenID connect Configuration**.

16. Set **Identity Provider Entity ID** as `https://obiam:9446/oauth2/token`.

17. When publishing the Dynamic Client Registration (DCR) API, provide the hostname as `obiam`. For example,

     ```
     https://obiam:9446/api/openbanking/dynamic-client-registration
     ```

18. When configuring the Key Manager, set the value of `IS_HOST` as `obiam`. For example,

     ``` 
     https://obiam:9446/keymanager-operations/dcr/register
     ```

19. You can access the WSO2 Open Banking API Manager using a web browser via the following URLs:

      - `https://obam:9443/publisher`
      - `https://obam:9443/devportal`
      - `https://obam:9443/admin`
      - `https://obam:9443/carbon`

20. The API Gateway will be available on the following ports:
   
     - `https://localhost:8243`
     - `http://localhost:8280`

!!! note "To see separate logs for `obam` and `obiam`"
     Execute the following commands in  separate terminals:

      ```
      $ docker logs -f obiam
      ```

      ```shell
      $ docker logs -f obam
      ```

##Deploy WSO2 Open Banking with Docker

 This section explains how to set up the solution using WSO2 Open Banking Docker Images.

### Set up Database Container

1. Create a network.

    ```shell
    docker network create -d bridge ob-network
    ```

2. Pull the MySQL Image.

    ```shell
    docker pull mysql:8.0.27
    ```
   
3. Run the MySQL Docker container.

       ``` 
       docker run --network ob-network --name mysql -e MYSQL_ROOT_PASSWORD=root  -d mysql:8.0.27
       ```

4. Copy the `setup.sql` script to the container.

       ```  
       docker cp <OB_DOCKER_HOME>/docker-compose/obam-with-obiam/mysql/scripts/setup.sql  <mysql-container-id>:/setup.sql
       ```

5. Login to the MySQL container

       ```  
       docker exec -it mysql mysql -uroot -proot
       ```

6. Source the copied SQL script.

       ``` 
       mysql> source setup.sql;
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

1. Pull the Open Banking Identity Server Image from [WSO2 Docker Repositories](https://docker.wso2.com/tags.php?repo=wso2-obiam).

    ```shell
    docker pull docker.wso2.com/wso2-obiam
    ```

2. Deploy the Identity Server Image.

    ```
    docker run -p 9446:9446 --network ob-network --name obiam docker.wso2.com/wso2-obiam
    ```
   
3. Obtain the container Id by executing the command below: 

    ``` 
    docker ps
    ```

4. Copy the `deployment.toml` file from the container to a desired location in the host machine.

    ``` 
    docker cp <CONTAINER_ID>:/home/wso2carbon/wso2is-5.11.0/repository/conf/deployment.toml <DESIRED_LOCATION>
    ```

5. Go to the location where you copied the `deployment.toml` and update the copied file as follows:

   - Change the `jwks_url_sandbox` and `jwks_url_production` URLs with the respective JWKS URLs of your certs.
   - Change the hostnames of `login_url`, `retry_url`, `oauth2_consent_page`, and `oidc_consent_page` 
     with the respective hostnames of the containers.

6. Place the modified  `deployment.toml` file in the container:

    !!! note
        You can use the same command and copy any existing `deployment.toml` file to the container.

    ``` 
    docker cp <DESIRED_LOCATION>/deployment.toml <CONTAINER_ID>:/home/wso2carbon/wso2is-5.11.0/repository/conf/deployment.toml
    ```
   
7. Restart the container to apply the changes:

    ``` 
    docker restart obiam
    ``` 

9. Log in to the Management Console at `https://obiam:9446/carbon/`.

10. Go to **Identity Providers > Resident > Inbound Authentication Configuration > OAuth2/OpenID connect Configuration**.

11. Set **Identity Provider Entity ID** as `https://obiam:9446/oauth2/token`.

12. When publishing the Dynamic Client Registration (DCR) API, provide the hostname as `obiam`. For example,

     ```
     https://obiam:9446/api/openbanking/dynamic-client-registration
     ```

13. When configuring the Key Manager, set the value of `IS_HOST` as `obiam`. For example,

     ``` 
     https://obiam:9446/keymanager-operations/dcr/register
     ```

### Set up Open Banking API Manager with Docker

1. Pull the Open Banking API Manager Image from [WSO2 Docker Repositories](https://docker.wso2.com/tags.php?repo=wso2-obam).

    ``` 
    docker pull docker.wso2.com/wso2-obam
    ```

2. Deploy the API Manager Image.

    ```
    docker run -p 9443:9443 -p 8243:8243 -p 8280:8280 --network ob-network --name obam docker.wso2.com/wso2-obam
    ```

3. Obtain the container Id by executing the command below:

    ``` 
    docker ps
    ```

4. Copy the `deployment.toml` file from the container to a desired location in the host machine.

    ``` 
    docker cp <CONTAINER_ID>:/home/wso2carbon/wso2am-4.0.0/repository/conf/deployment.toml <DESIRED_LOCATION>
    ```

5. Go to the location where you copied the `deployment.toml` and update the copied file as follows:

    - Change the following URLs according to the sample below:  
   
        ``` toml
        [apim.key_manager]
        service_url = "https://obiam:9446${carbon.context}services/"
       
        [apim.key_manager.configuration]
        ServerURL = "https://obiam:9446${carbon.context}services/"
        TokenURL = "https://obam:${https.nio.port}/token"
        RevokeURL = "https://obam:${https.nio.port}/revoke"
        ```
  
    - Add the following tags:

        ``` toml
        [oauth.endpoints]
        oauth2_token_url = "https://obiam:9446/oauth2/token"
        oauth2_jwks_url = "https://obiam:9446/oauth2/jwks"
   
        [open_banking.gateway.consent.validation]
        endpoint = "https://obiam:9446/api/openbanking/consent/validate"
        ```

6. Place the modified  `deployment.toml` file in the container:

    !!! note
        You can use the same command and copy any existing `deployment.toml` file to the container.

    ``` 
    docker cp <DESIRED_LOCATION>/deployment.toml <CONTAINER_ID>:/home/wso2carbon/wso2am-4.0.0/repository/conf/deployment.toml
    ```

7. Restart the container to apply the changes:

    ``` 
    docker restart obam
    ``` 
   
## Download WSO2 Updates

This section explains how to download the WSO2 updates for Open Banking Identity Server and API Manager. For each 
container you want to update, follow the steps below:

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

 




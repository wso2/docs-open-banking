The Docker images for WSO2 Open Banking Accelerators contain the extracted Accelerator modules with the latest update levels. These images are not standalone runtime images. Instead, they are designed to be used as base components for building container images of:

- WSO2 API Manager with the Financial Services API Management Accelerator Module
- WSO2 Identity Server with the Financial Services Identity & Access Management Accelerator Module

## Supporting Resources

In addition to the Accelerator Docker images, users can refer to the following resources provided as guides for building and deploying containerized images. All resources can be downloaded from the [Open Banking Docker GitHub Repository](https://github.com/wso2/docker-open-banking/tree/master/samples).

### Sample Dockerfiles

Use these as references to:

- Deploy the WSO2 Open Banking API Manager Accelerator Module on top of WSO2 API Manager
- Deploy the WSO2 Open Banking Identity & Access Management Accelerator Module on top of WSO2 Identity Server

The sample Dockerfiles help you build generic Docker images for deploying the respective product servers in containerized environments. Each image includes the JDK, the relevant product distribution, and a set of utility libraries, configurations, custom JDBC drivers, extensions, and other deployable artifacts.

### Docker Compose Resources

Docker Compose resources are available to help you quickly evaluate the Open Banking setup by deploying:

- WSO2 Open Banking Accelerator installed WSO2 Open Banking API Manager, together with
- WSO2 Open Banking Accelerator installed WSO2 Open Banking Identity & Access Management

These resources have been created based on the most common WSO2 Open Banking deployment profiles, allowing users to evaluate product capabilities against their organization’s Open Banking requirements. The Compose setup utilizes the Docker images built using Dockerfiles mentioned in [Sample Dockerfiles](#sample-dockerfiles).

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

## Build Container Docker Images

### Prerequisites

1. Zip archive file of the Open Banking root and issuer certificates. 
    - Download the root and issuer [certificates](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/252018873/OB+Root+and+Issuing+Certificates+for+Sandbox).
    - Rename the `OB_SandBox_PP_Root.cer` as `root.cer`.
    - Rename the `OB_SandBox_PP_Issuing.cer` as `issuer.cer`.
    - Zip the root.cer and issuer.cer in one zip archive file.

2. [Keystores](https://github.com/wso2/docker-open-banking/raw/v4.0.0.3/samples/keystores) directory of wso2 server certs of WSO2 Open Banking Docker Images. 

3. DB driver file matching to the DB type and version you are going to use with WSO2 API Manager.

4. Host the downloaded artifacts locally or on a remote location. The hosted locations of artifacts will be passed as the build arguments when building the Docker image.
    - `OB_TRUSTED_CERTS_URL` - Zip archive location of the certificates of WSO2 Open Banking root and issuer
    - `WSO2_OB_KEYSTORES_URL` - Location of keystores folder of wso2 server certs
    - `RESOURCE_URL` - Location of the DB driver file and [Custom Error Formatter XML](https://github.com/wso2/financial-services-apim-mediation-policies/blob/main/common/custom-error-formatter/customErrorFormatter.xml)

### Update the Dockerfile.

1. Setup Databases for WSO2 API Manager and WSO2 Open Banking Identity Server.
    - Follow the instructions provided in [Setting up Databases](https://ob.docs.wso2.com/en/latest/install-and-setup/setting-up-databases/) to setup the databases.
2. Update database details in the Dockerfiles inside `<OB_DOCKER_HOME>/samples/wso2is_with_obiam` and `<OB_DOCKER_HOME>/samples/wso2am_with_obam`.

### Build container image for WSO2 Identity Server

This steps builds the container image for WSO2 Identity Server with WSO2 Open Banking Identity and Access Management Accelerator Module

1. Navigate to `<OB_DOCKER_HOME>/samples/wso2is_with_obiam` directory.
2. Execute `docker build` command as shown below.

    ```tab='Sample'
    docker build --build-arg BASE_PRODUCT_VERSION=<IS_VERSION> --build-arg OB_TRUSTED_CERTS_URL=<URL_OF_THE_HOSTED_LOCATION/FILENAME> --build-arg WSO2_OB_KEYSTORES_URL=<URL_OF_THE_HOSTED_LOCATION/FILENAME> --build-arg RESOURCE_URL=<URL_OF_THE_HOSTED_LOCATION/FILENAME> -t wso2is-ob:4.0.0 .
    ```
    
    ```tab='Hosted locally'
    docker build --build-arg BASE_PRODUCT_VERSION=7.1.0 --build-arg OB_TRUSTED_CERTS_URL=http://localhost:8000/trusted-certs.zip --build-arg WSO2_OB_KEYSTORES_URL=http://localhost:8000/docker-open-banking/samples/keystores/ --build-arg RESOURCE_URL=http://localhost:8000 -t wso2is-ob:4.0.0 .
    ```
    
    ```tab='Hosted remotely'
    docker build --build-arg BASE_PRODUCT_VERSION=7.1.0 --build-arg OB_TRUSTED_CERTS_URL=http://<public_ip:port>/trusted-certs.zip --build-arg WSO2_OB_KEYSTORES_URL=http://<public_ip:port>/docker-open-banking/samples/keystores/ --build-arg RESOURCE_URL=http://<public_ip:port> -t wso2is-ob:4.0.0 .
    ```
    
### Build container image for WSO2 API Manager

This step builds container image for WSO2 API Manager with WSO2 Open Banking API Management Accelerator Module

1. Navigate to `<OB_DOCKER_HOME>/samples/wso2am_with_obam` directory.
2. Execute `docker build` command as shown below.

     ```tab='Sample'
    docker build --build-arg BASE_PRODUCT_VERSION=<APIM_VERSION> --build-arg OB_TRUSTED_CERTS_URL=<URL_OF_THE_HOSTED_LOCATION/FILENAME> --build-arg WSO2_OB_KEYSTORES_URL=<URL_OF_THE_HOSTED_LOCATION/FILENAME> --build-arg RESOURCE_URL=<URL_OF_THE_HOSTED_LOCATION/FILENAME> -t wso2am-ob:4.0.0 .
    ```
    
    ```tab='Hosted locally'
    docker build --build-arg BASE_PRODUCT_VERSION=4.5.0 --build-arg OB_TRUSTED_CERTS_URL=http://localhost:8000/trusted-certs.zip --build-arg WSO2_OB_KEYSTORES_URL=http://localhost:8000/docker-open-banking/samples/keystores/ --build-arg RESOURCE_URL=http://localhost:8000 -t wso2am-ob:4.0.0 .
    ```
    
    ```tab='Hosted remotely'
    docker build --build-arg BASE_PRODUCT_VERSION=4.5.0 --build-arg OB_TRUSTED_CERTS_URL=http://<public_ip:port>/trusted-certs.zip --build-arg WSO2_OB_KEYSTORES_URL=http://<public_ip:port>/docker-open-banking/samples/keystores/ --build-arg RESOURCE_URL=http://<public_ip:port> -t wso2am-ob:4.0.0 .
    ```
    
If you are looking for a Quick Start Guide and deploy the solution, follow 
[Deploy WSO2 Open Banking with Docker Compose](#deploy-wso2-open-banking-with-docker-compose).

If you want to deploy each Open Banking component in separate containers, follow 
[Deploy WSO2 Open Banking with Docker](#deploy-wso2-open-banking-with-docker).

To learn how to download WSO2 Updates for your Open Banking Images, see [Download WSO2 Updates](#download-wso2-updates).

## Deploy WSO2 Open Banking with Docker Compose

This section explains how to deploy the solution using Docker Compose. 

!!! note 
    This is a Quick Start Guide to set up the solution in your local environment.

!!! tip "Before you begin:"
    Build the Container docker images for WSO2 IS with WSO2 OBIAM Accelerator and WSO2 AM with WSO2 OBAM Accelerator as mentioned in [Build Container Docker Images](#build-container-docker-images) Section.

1. Go to the `samples/docker-compose/wso2am-with-wso2is` directory inside the `<OB_DOCKER_HOME>` directory.

    ```shell
    cd <OB_DOCKER_HOME>/samples/docker-compose/wso2am-with-wso2is
    ```

2. Deploy the solution by executing the following command:

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

### Set up Open Banking Identity Server with Docker

1. Run the container image for WSO2 Identity Server with WSO2 Open Banking Identity and Access Management Accelerator Module.

    ```shell
    docker run -it -p 9446:9446 --network ob-network --name obiam wso2is-ob:4.0.0
    ```

### Set up Open Banking API Manager with Docker

1. Run the container image for WSO2 API Manager with WSO2 Open Banking API Management Accelerator Module.

    ```shell
    docker run -p 9443:9443 -p 8243:8243 -p 8280:8280 --network ob-network --name obam wso2am-ob:4.0.0
    ```
    
## Accessing the Servers

7. Add the below entry mappings into the `/etc/hosts` file of your host machine.

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


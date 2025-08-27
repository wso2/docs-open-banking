Before creating policies, need to build the policy artifacts from the source.

## Building from the source

If you want to build the Financial Services APIM Mediation Policies from the source code:

1. Install Java 11 or above.

2. Install [Apache Maven 3.0.5](https://maven.apache.org/download.cgi) or above.

3. Get the Financial Services APIM Mediation Policies from [this repository](https://github.com/wso2/financial-services-apim-mediation-policies.git) by **cloning** or **downloading** the repository as a zip.
    * To **clone the solution**, copy the URL and execute the following command in a command prompt.
      `git clone <the copiedURL>`. After cloning, checkout to the **main** branch.
    * To **download the repository**, select the **main** branch first, then click **Download ZIP** and unzip the downloaded file.
    
4. Navigate to the cloned/downloaded repository using a command prompt and run the relevant Maven command:

| Command | Description      |
|---------|--------------------|
| ```mvn install```  | This starts building the repository without cleaning the folders. |
| ```mvn clean install``` | This cleans the folders and starts building the repository from scratch.  |

### How to use mediation artifacts 

1. Once the maven build is successful, navigate to the **fs-apim-mediation-artifacts/target** folder to get the zip file containing all the mediation policies,custom sequences and class mediators & handlers to copy in to WSO2 API Manager.

2. Extract the zip 'fs-apim-mediation-artifacts-1.0.0.zip' and you will notice the following folder structure.
    - Policy .j2 files - The mediation policy files which need to upload in API Publisher UI and engage to APIs. Below mediation policies are available in this repository.
    - Custom sequences- Synapse based custom sequence files which need to copy in to `<APIM_Home>/repository/deployment/synapse-cofngis/default/sequences` folder.
    - lib - This folder contains the jars need to copy in to `<APIM_Home>/repository/lib` folder. It contains jars of the class mediator implementations refer from the policies and custom synapse handler implementations.
        
3. Restart the API Manager Server.
   

## Creating a Common Policy

1. Sign in to the API Publisher Portal at `https://<APIM_HOSTNAME>:9443/publisher`. 

2. Click on the Policies tab on the left side tab panel.
    ![select-policies-tab](../assets/img/learn/policies/select-policies-tab.png)

3. Click on Add New Policy.
    ![add-new-policy](../assets/img/learn/policies/add-new-policy.png)

## Creating an API Policy

1. Sign in to the API Publisher Portal at `https://<APIM_HOSTNAME>:9443/publisher`. 

2. Click on the API that you want to create the policy.
    ![select-api](../assets/img/learn/policies/select-api.png)

3. Click on the Policies tab under API Configurations on left side tab panel.
    ![select-api-policies](../assets/img/learn/policies/select-api-policies.png)

4. Click on Add New Policy button to add a new policy.
    ![add-new-api-policy](../assets/img/learn/policies/add-new-api-policy.png)

## Defining the policy config

Follow the following steps to define the policy in either type.

1. Enter the basic details of the policy.
    ![policy-general-details](../assets/img/learn/policies/policy-general-details.png)

    | Field | Description |
    | ----- | ----------- |
    | Name | Name of the Policy |
    | Version | Version of the Policy |
    | Description | Description of the Policy |
    | Applicable Flows | Which flow the policy should be applied. |
    | Supported API Types | Which API Type the policy should be applied. |

2. Upload the policy file from the relevant place.
    ![upload-policy-file](../assets/img/learn/policies/upload-policy-file.png)

3. Add policy attributes if there are any attributes for the policy.
    - Click on Add Policy Attribute button.
        ![add-policy-attribute](../assets/img/learn/policies/add-policy-attribute.png)

    - Add the attribute Name and Display Name.
        ![add-policy-name](../assets/img/learn/policies/add-policy-name.png)

    - If the attribute is required mark it as below.
        ![required-attribute](../assets/img/learn/policies/required-attribute.png)

    - Click on the **Description** box to add a description to the attribute.
        ![policy-description](../assets/img/learn/policies/policy-description.png)

    - Add the description of the attribute.
        ![enter-policy-description](../assets/img/learn/policies/enter-policy-description.png)

    - Click on the **Value Properties** box.
        ![select-policy-sttribute-details](../assets/img/learn/policies/select-policy-sttribute-details.png)

    - Add the attribute value properties.
        ![add-policy-attribute-details](../assets/img/learn/policies/add-policy-attribute-details.png)

4. Add then click on Save.

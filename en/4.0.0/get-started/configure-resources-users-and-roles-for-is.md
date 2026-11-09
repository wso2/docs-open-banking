# Configure API Resources, Users and Roles

Now you have started the servers, let’s create the API resources, users and define their permissions and roles.

## Sign in to the Identity Server[​](#sign-in-to-the-identity-server "Direct link to Sign in to the Identity Server")

1. Sign in to the Management Console of WSO2 Identity Server at <https://localhost:9446/console>

2. Use the default super admin credentials as follows:

   * Username: <is_admin@wso2.com>
   * Password: wso2123

   note

   The above login credentials are for testing purposes only. It is recommended to change the login credentials in a production environment.

## Create API resources[​](#create-api-resources "Direct link to Create API resources")

WSO2 Identity Server provides comprehensive capabilities for managing and securing API resources, particularly in the context of authorization and access control. You need to create below API resources in order to successfully invoke Open Banking APIs.

| API Resource                                                                 | Identifier                   | Display Names                | Scopes                                         |
| ---------------------------------------------------------------------------- | ---------------------------- | ---------------------------- | ---------------------------------------------- |
| API Resource for access scopes attached to customer facing Open Banking APIs | User-defined-oauth2-resource | User-defined-oauth2-resource | accounts<br />payments<br />fundsconfirmations |
| API resource to acccess internal Open Banking APIs provided by WSO2          | OB-internal-api-resource     | OB-internal-api-resource     | ob-internal-api-access                         |

Follow the below steps to create the above API Resources.

1. Go to the **Api Resources** tab in the left pane.

2. Click **New API Resource**.

   ![create-api-resource.png](/en/4.0.0/assets/images/create-api-resource-a7ab742324c02f04cb7afcbc1cd0d7ea.png)

3. Enter **Identifier** and **Display Names**.

   | Text Field    | Value                        |
   | ------------- | ---------------------------- |
   | Identifier    | User-defined-oauth2-resource |
   | Display Names | User-defined-oauth2-resource |

   ![api\_resource\_basic\_detail\_page.png](/en/4.0.0/assets/images/api_resource_basic_detail_page-a8fceca7e0dc2531dffa630d783695c5.png)

4. Click **Next**.

5. Add the following scopes one at a time: **accounts**, **payments**, and **fundsconfirmations**. For each scope, enter the Scope and Display Name as shown below. ![api\_resource\_scopes\_page.png](/en/4.0.0/assets/images/api_resource_scopes_page-56b16e4fd05a2d03483518263ad7f229.png)

6. Once all scopes have been added, they will be displayed as shown below. ![api\_resource\_scopes\_added\_page.png](/en/4.0.0/assets/images/api_resource_scopes_added_page-78aadffb7099935866cb74371bf232bc.png)

7. Click **Next**.

8. Click **Create**.

   ![api\_resource\_authorisation\_page.png](/en/4.0.0/assets/images/api_resource_authorisation_page-9130d5243d93257959d7ebe65ac864f6.png)

9. Create **OB-internal-api-resource** by flowing the above steps.

## Create new user roles[​](#create-new-user-roles "Direct link to Create new user roles")

1. Go to the **User Management** tab in the left pane and select **Roles**. ![add\_user\_roles](/en/4.0.0/assets/images/go-to-add-user-roles-7e18ecccbc641e2e76fd59e482794d78.png)

2. Click **+ New Role**.

3. Create the following user role:

   | Role Name               | Role audience | Permissions                  | Description                                                                                     |
   | ----------------------- | ------------- | ---------------------------- | ----------------------------------------------------------------------------------------------- |
   | consumer                | Organization  | User-defined-oauth2-resource | Users must have the `Consumer` role to proceed with the authorization flow.                     |
   | OBInternalApiAccessRole | Organization  | OB-internal-api-resource     | Users must have the `OBInternalApiAccessRole` role to access internal OB APIs provided by WSO2. |

   i. Creating **consumer role**:

   * Enter the role name as **consumer** and select the role audience as **Organization**:

     ![enter\_basic\_role\_details\_for\_consumer.png](/en/4.0.0/assets/images/enter_basic_role_details_for_consumer-e805295478be4c7a42e5ec893a1c62d0.png)

   * Click **Next**.

   * Select the API Resource `User-defined-oauth2-resource` created in [Create API resources](#create-api-resources).

   * Select all three permissions of the `User-defined-oauth2-resource` resource.

     ![select-permissions.png](/en/4.0.0/assets/images/select-permissions-6d711b9eb5cfe30f2c07750d8a3a3348.png)

   * Click **Finish**.

   ii. Creating **OBInternalApiAccessRole role**:

   * Enter the role name as **OBInternalApiAccessRole** and select the role audience as **Organization**:

     ![enter\_basic\_role\_details\_for\_consumer.png](/en/4.0.0/assets/images/enter_basic_role_details_for_internal_api-1deaab3d2528090453dc065595bef38b.png)

   * Click **Next**.

   * Select the API Resource `OB-internal-api-resource` created in [Create API resources](#create-api-resources).

   * Select all permissions of the `OB-internal-api-resource` resource.

     ![select-permissions.png](/en/4.0.0/assets/images/select-permissions_for_internal_api-1f3327408047aff7d4c2159adf2f6109.png)

   * Click **Finish**.

## Create new users[​](#create-new-users "Direct link to Create new users")

1. Go to the **User Management** tab in the left pane and select **Users**. ![create\_user\_navigation\_page.png](/en/4.0.0/assets/images/create_user_navigation_page-edf1dab19ca1c6bb9dfc04398b383279.png)

2. Click **Add User** → **Single User**.

3. Enter the basic details of the user and set a password. Select `PRIMARY` user store.

   ![create\_consumer\_user\_basic\_details.png](/en/4.0.0/assets/images/create_consumer_user_basic_details-8fdd60e12e1b7a5e008349ebe867a099.png)

4. Click **Next**.

   note

   Select the admin group, If you want to add the user to the admin group. Otherwise, continue without selecting the Admin group.

5. Click **Save and Continue**. ![create\_consumer\_user\_group.png](/en/4.0.0/assets/images/create_consumer_user_group-1519d9ee0fa4dee8e97ce59c1bcd1303.png)

6. Click **Close**.

## Assign roles to the user[​](#assign-roles-to-the-user "Direct link to Assign roles to the user")

1. Go to the **User Management** tab in the left pane and select **Roles**. ![add\_user\_roles](/en/4.0.0/assets/images/go-to-add-user-roles-7e18ecccbc641e2e76fd59e482794d78.png)

2. Click on the **consumer** role created in [Create new user roles](#create-new-user-roles) ![navigate\_to\_consumer\_role\_edit\_page.png](/en/4.0.0/assets/images/navigate_to_consumer_role_edit_page-95b00c35cbb5a15e276e20493bdcc25b.png)

3. Go to **Users** tab.

4. Click **Assign Users**. ![assign\_users\_to\_consumer\_role.png](/en/4.0.0/assets/images/assign_users_to_consumer_role-6782c73305d8a6b1889810eab9fd0cfe.png)

5. Click **Assign User** drop-down → select user from the drop-down. ![assign\_user\_to\_consumer\_role.png](/en/4.0.0/assets/images/assign_user_to_consumer_role-0b5aa10dc1f3de2f4b4f2fbc93f529ba.png)

6. Click **Update**.

7. Similarly assign **OBInternalApiAccessRole** to the admin user in your system.

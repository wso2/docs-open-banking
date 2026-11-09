# Configure Users and Roles

Now you have started the servers, let’s create the users and define their permissions and roles.

## Sign in to the Identity Server[​](#sign-in-to-the-identity-server "Direct link to Sign in to the Identity Server")

1. Sign in to the Management Console of WSO2 Identity Server at <https://localhost:9446/carbon>

2. Use the default super admin credentials as follows:

   * Username: <admin@wso2.com>
   * Password: wso2123

   note

   The above login credentials are for testing purposes only. It is recommended to change the login credentials in a production environment.

## Create new user roles[​](#create-new-user-roles "Direct link to Create new user roles")

1. Go to the Main tab on the left top corner and select **Identity** -> **Users and Roles** -> **Add**. ![add\_user\_roles](/en/3.0.0/assets/images/go-to-add-user-roles-b0af4429ed2062c9037f57226300e263.png)

2. Click **Add New Role**.

3. Create the following user roles:

   | Domain   | Role                    | Permissions             | Description                                                                       |
   | -------- | ----------------------- | ----------------------- | --------------------------------------------------------------------------------- |
   | Internal | approverRole            | Admin permissions       | To approve applications when you register applications using the signup workflow. |
   | Internal | CustomerCareOfficerRole | No permissions required | To log in to the Consent Manager portal as a customer care officer.               |

   i. Creating **approverRole**:

   * Select the **INTERNAL** domain and enter the role name as **approverRole**:

     ![enter\_approver\_role\_details](/en/3.0.0/assets/images/enter-role-details-approver-role-9ad9a64398a480c219d1d601e1dc71e2.png)

   * Click **Next >**.

   * Select the check box next to **Admin Permissions**.

     ![select\_approver\_permissoions](/en/3.0.0/assets/images/select-permissions-be461d5032383d75a93e117440706c1e.png)

   * Scroll down and click **Finish**.

   ii. Creating **CustomerCareOfficerRole**:

   * Select the **INTERNAL** domain and enter the role name as **CustomerCareOfficerRole**:

     ![enter\_customercareofficer\_role\_details](/en/3.0.0/assets/images/enter-role-details-customercareofficer_role-672a5537ccffecb6f80d10f24360819e.png)

   * Click **Finish**.

## Create new users and assign roles[​](#create-new-users-and-assign-roles "Direct link to Create new users and assign roles")

1. Go to the Main tab on the left top corner and select **Identity** -> **Users and Roles** -> **Add**.

2. Click **Add New User**.

3. Create the following users:

   | Domain  | User            | Permissions                          |
   | ------- | --------------- | ------------------------------------ |
   | Primary | <mark@gold.com> | Internal/creator, Internal/publisher |
   | Primary | <ann@gold.com>  | Internal/CustomerCareOfficer         |
   | Primary | <tom@gold.com>  | Internal/approverRole                |

   i. Enter user details and click **Next >**.

   ![add\_new\_user](/en/3.0.0/assets/images/add-new-user-a741ad485d62588a181f50e92688164a.png)

   ii. Select user roles for each user as per the table above:

   ![set\_new\_user\_roles](/en/3.0.0/assets/images/set-new-user-roles-e19dfc511480fcaa9b4f0d9580327527.png)

   iii. Click **Finish**.

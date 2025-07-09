Now you have started the servers, let’s create the API resources, users and define their permissions and roles.
 
## Sign in to the Identity Server
 
1. Sign in to the Management Console of WSO2 Identity Server at [https://localhost:9446/console](https://localhost:9446/console)

2. Use the default super admin credentials as follows:
    - Username: is_admin@wso2.com
    - Password: wso2123
    
    !!!note
        The above login credentials are for testing purposes only. It is recommended to change the login credentials in 
        a production environment.
 
## Create new users

1. Go to the **User Management** tab in the left pane and select **Users**.
   ![create_user_navigation_page.png](../assets/img/get-started/quick-start-guide/create_user_navigation_page.png)

2. Click **Add User** --> **Single User**.
3. Enter the basic details of the user and set a password. Select `PRIMARY` user store.

    ![create_consumer_user_basic_details.png](../assets/img/get-started/quick-start-guide/create_consumer_user_basic_details.png)

4. Click **Next**.

    !!!note 
           Select the admin group, If you want to add the user to the admin group. Otherwise, continue without selecting the Admin group.

5. Click **Save and Continue**.
    ![create_consumer_user_group.png](../assets/img/get-started/quick-start-guide/create_consumer_user_group.png)

6. Click **Close**.

## Assign roles to the user
1. Go to the **User Management** tab in the left pane and select **Roles**.
   ![add_user_roles](../assets/img/get-started/quick-start-guide/go-to-add-user-roles.png)

2. Click on the **consumer** role.
    ![navigate_to_consumer_role_edit_page.png](../assets/img/get-started/quick-start-guide/navigate_to_consumer_role_edit_page.png)

3. Go to **Users** tab.
4. Click **Assign Users**.
    ![assign_users_to_consumer_role.png](../assets/img/get-started/quick-start-guide/assign_users_to_consumer_role.png)

5. Click **Assign User** drop-down --> select user from the drop-down.
    ![assign_user_to_consumer_role.png](../assets/img/get-started/quick-start-guide/assign_user_to_consumer_role.png)

6. Click **Update**.


 Now you have started the servers, let’s create the users and define their permissions and  roles...
 
 1. Sign in to the management console of WSO2 Identity Server at [https://localhost:9446/carbon](https://localhost:9446/carbon)
 2. Use the default super admin credentials as follows:
    - Username: admin@wso2.com
    - Password: wso2123
    !!!note
        The above login credentials are for testing purposes only. It is recommended to change the login credentials in 
        a production environment.
    
 3. Go to the Main tab on the left top corner and select **Identity** -> **Users and Roles** -> **Add** -> **Add New Role**.
 4. Create the following user roles:   
  
    | Domain | Role| Permissions|
    |--------|--------|--------|
    |Internal|aispRole|No permissions required.|
    |Internal|pispRole|No permissions required.|
    |Internal|piispRole|No permissions required.|
    |Internal|approveRole|Admin permissions|
    |Internal|CustomerCareOfficerRole|No permissions required.|
 
 5. Click **Finish**.
 6. Go to the Main tab on the left top corner and select **Identity** -> **Users and Roles** -> **Add** -> **Add New User**.
 7. Create the following users:
 
    | Domain | User| Permissions|
    |--------|--------|--------|
    |Primary|mark@gold.com|Internal/creator, Internal/publisher|
    |Pimary|ann@gold.com|Internal/CustomerCareOfficer|
    |Pimary|tom@gold.com|Internal/approverRole|
    
 8. Click *Finish*.
 
 

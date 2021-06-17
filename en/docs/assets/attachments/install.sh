WSO2_OB_APIM_HOME=$1



# set product home
if [ "${WSO2_OB_APIM_HOME}" == "" ];
  then
    
    WSO2_OB_APIM_HOME=$(pwd)
    echo "Product home is: ${WSO2_OB_APIM_HOME}"
fi

# validate product home
if [ ! -d "${WSO2_OB_APIM_HOME}/repository/components" ]; then
  echo -e "\n\aERROR:specified product path is not a valid carbon product path\n";
  exit 2;
else
  echo -e "\nValid carbon product path.\n";
fi

find "${WSO2_OB_APIM_HOME}"/repository/components/dropins -name "com.wso2.*" -exec mvn org.apache.maven.plugins:maven-install-plugin:2.5.2:install-file -Dfile={} \;
find "${WSO2_OB_APIM_HOME}"/repository/components/lib -name "com.wso2.*" -exec mvn org.apache.maven.plugins:maven-install-plugin:2.5.2:install-file -Dfile={} \;
find "${WSO2_OB_APIM_HOME}"/repository/components/plugins -name "com.wso2.*" -exec mvn org.apache.maven.plugins:maven-install-plugin:2.5.2:install-file -Dfile={} \;

find "${WSO2_OB_APIM_HOME}"/repository/components/dropins -name "org.wso2.*" -exec mvn org.apache.maven.plugins:maven-install-plugin:2.5.2:install-file -Dfile={} \;
find "${WSO2_OB_APIM_HOME}"/repository/components/lib -name "org.wso2.*" -exec mvn org.apache.maven.plugins:maven-install-plugin:2.5.2:install-file -Dfile={} \;
find "${WSO2_OB_APIM_HOME}"/repository/components/plugins -name "org.wso2.*" -exec mvn org.apache.maven.plugins:maven-install-plugin:2.5.2:install-file -Dfile={} \;

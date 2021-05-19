# Open Banking - Identity Server Config Catalog Generator Tool

This is a tool to generate the markdown file of the Identity Server configuration catalog by using a JSON file as 
the source.

## Instructions

1. Clone the `docs-open-banking` repo.
2. Navigate to the `docs-open-banking/en/tools/config-catalog-generator-is` directory.
3. Run the following command:

    ```
    npm install
    ```

4. Open the `data/config.json` file and add your content.
5. For each `toml` configuration set, create a sample `.toml` file in the `data` directory. Link the `exampleFile` 
parameter in `config.json` with the relevant file.
6. The `docs-open-banking/en/tools/config-catalog-generator-is/templates/index.njk` file contains the intro paragraph.
7. Come back to the `docs-open-banking/en/tools/config-catalog-generator-is` directory and run the following command:

    ```
    npm run build
    ```

8. Go to the `dist/` folder: A markdown file named `config-catalog.md` is created.
9. Copy the `config-catalog.md` file to the `docs-open-banking/en/docs/references` directory.
10. This `config-catalog.md` will be the Identity Server's Configuration Catalog for WSO2 Open Banking Accelerator.


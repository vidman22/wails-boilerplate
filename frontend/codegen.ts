import { CodegenConfig } from '@graphql-codegen/cli';


interface UrlSchemaOptions {
    /**
     * @description HTTP headers you wish to add to the HTTP request sent by codegen to fetch your GraphQL remote schema.
     */
    headers?: {
        [headerName: string]: string;
    };
    /**
     * @description Specify a Node module name, or a custom file, to be used instead of standard `fetch`
     */
    customFetch?: string;
    /**
     * @description HTTP Method to use, either POST (default) or GET.
     */
    method?: string;
    /**
     * @description Handling the response as SDL will allow you to load schema from remote server that doesn't return a JSON introspection.
     */
    handleAsSDL?: boolean;
}

interface UrlSchemaWithOptions {
    [url: string]: UrlSchemaOptions;
}

const dotenv = require('dotenv');
dotenv.config();

const config: CodegenConfig = {
    schema: [
        {
            [`${process.env.GRAPH_ENDPOINT}`]: {
                headers: {
                    'x-hasura-admin-secret': process.env.GRAPH_ADMIN_SECRET,
                },
            },
        } as UrlSchemaWithOptions,
        'client-schema.graphql',
    ],
    documents: ['./src/backend/!(*.generated).{ts,tsx}'],
    overwrite: true,
    generates: {
        './src/generated_types.ts': {
            plugins: [
              'typescript',
              'typescript-operations',
              'typescript-react-apollo'
            //   {
            //     add: {
            //       content: '/* eslint-disable */',
            //       placement: 'prepend',
            //     },
            //   },
            ],
            config: {
              dedupeFragments: false,
              skipTypename: false,
              withHooks: true,
              withHOC: false,
              withComponent: false,
              namingConvention: {
                transformUnderscore: true,
              },
            },
          },
    }
};


module.exports = config;

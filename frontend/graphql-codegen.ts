
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: "src/**/*.tsx",
  generates: {
    "src/types": {
      preset: "graphql.types.ts",
      plugins: ['typescript']
    }
  }
};

export default config;

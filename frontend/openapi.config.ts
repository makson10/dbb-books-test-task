import dotenv from 'dotenv';
import type { ConfigFile } from '@rtk-query/codegen-openapi';

dotenv.config();

const config: ConfigFile = {
	schemaFile: `${process.env.VITE_SERVER_BASE_URL}/api/schema.yaml`,
	apiFile: './src/stores/api/emptyApi.ts',
	apiImport: 'emptyApi',
	outputFile: './src/stores/api/baseApi.ts',
	exportName: 'baseApi',
	hooks: true,
	tag: true,
};

export default config;

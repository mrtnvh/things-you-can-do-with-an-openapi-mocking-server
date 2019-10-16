/* eslint-disable import/no-extraneous-dependencies, no-param-reassign  */
const getHttpOperations = require("@stoplight/prism-cli/dist/util/getHttpOperations")
	.default;
const path = require("path");
const { createServer } = require("@stoplight/prism-http-server");
const { createLogger } = require("@stoplight/prism-core");

const addHooks = require("./hooks");

const host = "localhost";
const port = 3001;
const schemaPath = path.resolve(process.cwd(), "data/petstore.yml");

const config = { cors: true, mock: { dynamic: true } };
const components = { logger: createLogger("MOCK SERVER") };

module.exports = async () => {
	const operations = await getHttpOperations(schemaPath);
	const instance = createServer(operations, { config, components });

	await addHooks(instance.fastify);

	instance.listen(port, host).then(() => {
		// eslint-disable-next-line no-console
		console.log(`🤖 - OpenAPI mocking server enabled on port ${port}`);
	});
};

/* eslint-disable import/no-extraneous-dependencies, no-param-reassign  */
const getHttpOperations = require("@stoplight/prism-cli/dist/util/getHttpOperations")
	.default;
const path = require("path");
const { createServer } = require("@stoplight/prism-http-server");
const { createLogger } = require("@stoplight/prism-core");
const cors = require("cors")();

const withHooks = require("./hooks");

const host = "localhost";
const port = 4010;
const schemaPath = path.resolve(process.cwd(), "data/petstore.yml");

const config = { cors: true, mock: { dynamic: true } };
const components = { logger: createLogger("MOCK SERVER") };

module.exports = async () => {
	const operations = await getHttpOperations(schemaPath);
	const instance = createServer(operations, { config, components });

	instance.fastify.use(cors);
	await withHooks(instance.fastify);

	instance.listen(port, host).then(() => {
		// eslint-disable-next-line no-console
		console.log(`🤖 - OpenAPI mocking server enabled on port ${port}`);
	});
};

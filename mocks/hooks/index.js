/* eslint-disable global-require,import/no-dynamic-require, consistent-return */
const glob = require("../../utils/globAsync");

const getModuleFiles = async () => glob(`${__dirname}/**/!(index).js`);

module.exports = async server => {
	// Get all module files from hooks folder
	const modules = await getModuleFiles();

	modules
		// Import files
		.map(modulePath => require(modulePath))

		// Add the handler from the imported file to a Fastify server hook
		.forEach(({ type, path, handler }) =>
			server.addHook(type, async (request, reply, payload) => {
				// Check if the path iq equal to the required hook path
				if (!path.test(request.params["*"])) return;

				// Pass the payload as argument to the handler if it's a string
				return typeof payload === "string"
					? handler(request, reply, payload)
					: handler(request, reply);
			}),
		);
};

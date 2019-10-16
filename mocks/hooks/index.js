/* eslint-disable global-require,import/no-dynamic-require, consistent-return */
const glob = require("../../utils/globAsync");

const getModuleFiles = async () => glob(`${__dirname}/**/!(index).js`);

module.exports = async server => {
	const modules = await getModuleFiles();

	modules
		.map(modulePath => require(modulePath))
		.forEach(({ type, path, handler }) =>
			server.addHook(type, async (request, reply, payload) => {
				if (!path.test(request.params["*"])) return;
				return typeof payload === "string"
					? handler(request, reply, payload)
					: handler(request, reply);
			}),
		);
};

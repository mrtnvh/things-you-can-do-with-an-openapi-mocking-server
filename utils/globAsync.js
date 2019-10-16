/* eslint-disable import/no-extraneous-dependencies */
const Glob = require("glob");

module.exports = (pattern, options) => {
	return new Promise((resolve, reject) => {
		const g = new Glob(pattern, options);
		g.once("end", resolve);
		g.once("error", reject);
	});
};

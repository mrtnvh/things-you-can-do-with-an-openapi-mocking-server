const fs = require("fs");
const path = require("path");
const { minify: htmlMinifier } = require("html-minifier");

module.exports = {
	type: "onSend",
	path: /\/pets\//,
	handler: async (request, reply, payload) => {
		const oldPayload = payload ? JSON.parse(payload) : {};
		const newPayload = { ...oldPayload };
		const htmlPath = path.resolve(__dirname, "../data/pets.html");
		const html = fs.readFileSync(htmlPath, "utf8");
		newPayload.content = htmlMinifier(html, {
			collapseWhitespace: true,
			preserveLineBreaks: false,
		});
		return JSON.stringify(newPayload);
	},
};

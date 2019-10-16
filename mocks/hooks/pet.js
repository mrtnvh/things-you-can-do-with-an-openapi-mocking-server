const fs = require("fs");
const path = require("path");
const { minify: htmlMinifier } = require("html-minifier");

module.exports = {
	type: "onSend",
	path: /\/pets\/?(?!.+)/,
	handler: async (request, reply, payload) => {
		const oldPayload = payload ? JSON.parse(payload) : [];
		const newPayloadList = [...oldPayload];
		const htmlPath = path.resolve(__dirname, "../data/pets.html");
		const html = fs.readFileSync(htmlPath, "utf8");

		return JSON.stringify(
			newPayloadList.map(newPayload => ({
				...newPayload,
				content: htmlMinifier(html, {
					collapseWhitespace: true,
					preserveLineBreaks: false,
				}),
				image: "https://source.unsplash.com/random/800x600",
			})),
		);
	},
};

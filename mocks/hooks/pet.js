const fs = require("fs");
const path = require("path");
const { minify: htmlMinifier } = require("html-minifier");

module.exports = {
	// Which event in the Fastify request lifecycle? https://www.fastify.io/docs/latest/Hooks/#requestreply-hooks
	type: "onSend",
	// Path regex
	path: /\/pets\/?(?!.+)/,
	// The acutal middleware
	handler: async (request, reply, payload) => {
		// Parse the old payload
		const oldPayload = payload ? JSON.parse(payload) : [];
		// Clone to an immutable array;
		const newPayloadList = [...oldPayload];
		// Read the HTML example file
		const htmlPath = path.resolve(__dirname, "../data/pets.html");
		const html = fs.readFileSync(htmlPath, "utf8");

		// Return a stringified object as new payload
		return JSON.stringify(
			newPayloadList.map(newPayload => ({
				...newPayload,
				// Overwrite the content property with the HTML content
				content: htmlMinifier(html, {
					collapseWhitespace: true,
					preserveLineBreaks: false,
				}),
				// Overwrite the image property with an image URL.
				image: "https://source.unsplash.com/random/800x600",
			})),
		);
	},
};

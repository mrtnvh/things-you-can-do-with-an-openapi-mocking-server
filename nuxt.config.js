module.exports = {
	srcDir: "src/",
	mode: "spa",
	css: ["normalize.css"],
	modules: ["@nuxtjs/axios"],
	axios: {
		baseURL: "http://localhost:4010",
	},
};

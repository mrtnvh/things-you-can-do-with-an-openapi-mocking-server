export default {
	srcDir: "src/",
	mode: "spa",
	css: ["normalize.css"],
	modules: ["@nuxtjs/axios"],
	axios: {
		baseURL: "http://127.0.0.1:4010",
	},
};

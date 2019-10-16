const { Nuxt, Builder } = require("nuxt");
const cypress = require("cypress");
const config = require("../nuxt.config.js");
const initMockingServer = require("../mocks/createPrismInstance");

const initApplication = async () => {
	const nuxt = new Nuxt({ ...config, dev: true });
	await new Builder(nuxt).build();
	await nuxt.listen(3000, "localhost");
};

(async () => {
	await Promise.all([initApplication(), initMockingServer()]);
	await cypress.run();
	process.exit(0);
})();

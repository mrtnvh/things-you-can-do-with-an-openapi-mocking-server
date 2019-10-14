describe("Pets", () => {
	it("renders the list of pets", () => {
		cy.server();
		cy.route({
			method: "GET",
			url: "/pets",
		}).as("getPets");

		cy.visit("/");

		cy.wait("@getPets").then(xhr => {

			xhr.response.body.forEach((pet, index) => {
				cy.queryByText('pet')
				cy.queryByTestId(`img[src="${pet.image}"]`)
			});
			assert.isNotNull(, "1st API call has data");
		});
	});
});

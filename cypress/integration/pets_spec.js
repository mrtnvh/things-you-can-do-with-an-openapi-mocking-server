describe("Pets", () => {
	it("renders the list of pets", () => {
		cy.server();
		cy.route({
			method: "GET",
			url: "/pets",
		}).as("getPets");

		cy.visit("/");

		cy.wait("@getPets").then(xhr => {
			cy.get(`[data-testId="pet"`).each(($pet, index) => {
				const apiPet = xhr.response.body[index];
				cy.wrap($pet)
					.find("[data-testId='pet-image']")
					.should("have.attr", "src", apiPet.image);

				cy.wrap($pet)
					.find("[data-testId='pet-title']")
					.contains(apiPet.name);
			});
		});
	});
});

const request = require("supertest");

describe("Task 1", () => {
  describe("POST /parse", () => {
    const getTask1 = async (inputStr) => {
      return await request("http://localhost:8080")
        .post("/parse")
        .send({ input: inputStr });
    };

    it("example1", async () => {
      const response = await getTask1("Riz@z RISO00tto!");
      expect(response.body).toStrictEqual({ msg: "Rizz Risotto" });
    });

    it("example2", async () => {
      const response = await getTask1("alpHa-alFRedo");
      expect(response.body).toStrictEqual({ msg: "Alpha Alfredo" });
    });

    it("example3", async () => {
      const response = await getTask1("alpHa-alF      Redo");
      expect(response.body).toStrictEqual({ msg: "Alpha Alf Redo" });
    });
    it("example4", async () => {
      const response = await getTask1("alpHa_-__alF_     ReDo");
      expect(response.body).toStrictEqual({ msg: "Alpha Alf Redo" });
    });
    it("example5", async () => {
      const response = await getTask1(
        "alpHa_-__a@@@@@!!!^&^&&*^*&^lF_  \n\n\n   ReDo       \n"
      );
      expect(response.body).toStrictEqual({ msg: "Alpha Alf Redo" });
    });

    it("error case", async () => {
      const response = await getTask1("");
      expect(response.status).toBe(400);
    });
  });
});

describe("Task 2", () => {
  describe("POST /entry", () => {
    const putTask2 = async (data) => {
      return await request("http://localhost:8080").post("/entry").send(data);
    };

    it("Add Ingredients", async () => {
      const entries = [
        { type: "ingredient", name: "Egg", cookTime: 6 },
        { type: "ingredient", name: "Lettuce", cookTime: 1 },
      ];
      for (const entry of entries) {
        const resp = await putTask2(entry);
        expect(resp.status).toBe(200);
        expect(resp.body).toStrictEqual({});
      }
    });

    it("Add Recipe", async () => {
      const meatball = {
        type: "recipe",
        name: "Meatball",
        requiredItems: [{ name: "Beef", quantity: 1 }],
      };
      const resp1 = await putTask2(meatball);
      expect(resp1.status).toBe(200);
    });

    it("Congratulations u burnt the pan pt2", async () => {
      const resp = await putTask2({
        type: "ingredient",
        name: "beef",
        cookTime: -1,
      });
      expect(resp.status).toBe(400);
    });

    it("Congratulations u burnt the pan pt3", async () => {
      const resp = await putTask2({
        type: "pan",
        name: "pan",
        cookTime: 20,
      });
      expect(resp.status).toBe(400);
    });

    it("Unique names", async () => {
      const resp = await putTask2({
        type: "ingredient",
        name: "Beef",
        cookTime: 10,
      });
      expect(resp.status).toBe(200);

      const resp2 = await putTask2({
        type: "ingredient",
        name: "Beef",
        cookTime: 8,
      });
      expect(resp2.status).toBe(400);

      const resp3 = await putTask2({
        type: "recipe",
        name: "Beef",
        cookTime: 8,
      });
      expect(resp3.status).toBe(400);
    });
    it("Add Ingredient with Zero CookTime", async () => {
      const resp = await putTask2({
        type: "ingredient",
        name: "Tomato",
        cookTime: 0,
      });
      expect(resp.status).toBe(200);
    });

    it("Add Ingredient with Missing CookTime", async () => {
      const resp = await putTask2({
        type: "ingredient",
        name: "Carrot",
      });
      expect(resp.status).toBe(400);
    });

    it("Add Ingredient with Missing Name", async () => {
      const resp = await putTask2({
        type: "ingredient",
        cookTime: 5,
      });
      expect(resp.status).toBe(400);
    });

    it("Add Recipe with Missing Required Items", async () => {
      const resp = await putTask2({
        type: "recipe",
        name: "Soup",
      });
      expect(resp.status).toBe(400);
    });

    it("Add Recipe with Invalid Required Item Quantity", async () => {
      const resp = await putTask2({
        type: "recipe",
        name: "Stew",
        requiredItems: [{ name: "Potato", quantity: -1 }],
      });
      expect(resp.status).toBe(400);
    });

    it("Add Recipe with Missing Name", async () => {
      const resp = await putTask2({
        type: "recipe",
        requiredItems: [{ name: "Salt", quantity: 1 }],
      });
      expect(resp.status).toBe(400);
    });

    it("Check Response Format for Ingredient", async () => {
      const resp = await putTask2({
        type: "ingredient",
        name: "Cucumber",
        cookTime: 3,
      });
      expect(resp.status).toBe(200);
      expect(resp.body).toEqual({});
    });

    it("Check Response Format for Recipe", async () => {
      const resp = await putTask2({
        type: "recipe",
        name: "Salad",
        requiredItems: [{ name: "Cucumber", quantity: 2 }],
      });
      expect(resp.status).toBe(200);
      expect(resp.body).toEqual({});
    });

    it("Check Response Format for requiredItems", async () => {
      const resp = await putTask2({
        type: "recipe",
        name: "Salad",
        requiredItems: { name: "Cucumber", quantity: 2 },
      });
      expect(resp.status).toBe(400);
      expect(resp.body).toEqual({});
    });

    it("Ensure CookTime Validation for Ingredients", async () => {
      const resp = await putTask2({
        type: "ingredient",
        name: "Apple",
        cookTime: "string",
      });
      expect(resp.status).toBe(400);
    });

    it("Ensure Quantity Validation for Recipe Items", async () => {
      const resp = await putTask2({
        type: "recipe",
        name: "Pasta",
        requiredItems: [{ name: "Spaghetti", quantity: "string" }],
      });
      expect(resp.status).toBe(400);
    });
  });
});

describe("Task 3", () => {
  describe("GET /summary", () => {
    const postEntry = async (data) => {
      return await request("http://localhost:8080").post("/entry").send(data);
    };

    const getTask3 = async (name) => {
      return await request("http://localhost:8080").get(
        `/summary?name=${name}`
      );
    };

    it("What is bro doing - Get empty cookbook", async () => {
      const resp = await getTask3("nothing");
      expect(resp.status).toBe(400);
    });

    it("What is bro doing - Get ingredient", async () => {
      const resp = await postEntry({
        type: "ingredient",
        name: "beef",
        cookTime: 2,
      });
      expect(resp.status).toBe(200);

      const resp2 = await getTask3("beef");
      expect(resp2.status).toBe(400);
    });

    it("Unknown missing item", async () => {
      const cheese = {
        type: "recipe",
        name: "Cheese",
        requiredItems: [{ name: "Not Real", quantity: 1 }],
      };
      const resp1 = await postEntry(cheese);
      expect(resp1.status).toBe(200);

      const resp2 = await getTask3("Cheese");
      expect(resp2.status).toBe(400);
    });

    it("Bro cooked", async () => {
      const meatball = {
        type: "recipe",
        name: "Skibidi",
        requiredItems: [{ name: "Bruh", quantity: 1 }],
      };
      const resp1 = await postEntry(meatball);
      expect(resp1.status).toBe(200);

      const resp2 = await postEntry({
        type: "ingredient",
        name: "Bruh",
        cookTime: 2,
      });
      expect(resp2.status).toBe(200);

      const resp3 = await getTask3("Skibidi");
      expect(resp3.status).toBe(200);
    });

    it("Bro cooked 2", async () => {
      const entries = [
        {
          type: "recipe",
          name: "Skibidi Spaghetti1",
          requiredItems: [
            { name: "Meatball1", quantity: 3 },
            { name: "Pasta1", quantity: 1 },
            { name: "Tomato1", quantity: 2 },
          ],
        },
        {
          type: "recipe",
          name: "Meatball1",
          requiredItems: [
            { name: "Beef1", quantity: 2 },
            { name: "Egg1", quantity: 1 },
          ],
        },
        {
          type: "recipe",
          name: "Pasta1",
          requiredItems: [
            { name: "Flour1", quantity: 3 },
            { name: "Egg1", quantity: 1 },
          ],
        },
        { type: "ingredient", name: "Beef1", cookTime: 5 },
        { type: "ingredient", name: "Egg1", cookTime: 3 },
        { type: "ingredient", name: "Flour1", cookTime: 0 },
        { type: "ingredient", name: "Tomato1", cookTime: 2 },
      ];

      for (const entry of entries) {
        const resp = await postEntry(entry);
        expect(resp.status).toBe(200);
      }

      const resp3 = await getTask3("Skibidi Spaghetti1");
      expect(resp3.status).toBe(200);

      expect(resp3.body).toEqual({
        name: "Skibidi Spaghetti1",
        cookTime: 46,
        ingredients: expect.arrayContaining([
          { name: "Beef1", quantity: 6 },
          { name: "Flour1", quantity: 3 },
          { name: "Egg1", quantity: 4 },
          { name: "Tomato1", quantity: 2 },
        ]),
      });
    });

    it("Bro cooked the entire recipe tree with many ingredients and recursive recipes", async () => {
      const entries = [
        {
          type: "recipe",
          name: "Mega Feast2",
          requiredItems: [
            { name: "Big Meatball2", quantity: 4 }, // 356
            { name: "Super Pasta2", quantity: 3 },
            { name: "Tomato Sauce2", quantity: 6 },
            { name: "Veggie Salad2", quantity: 2 },
          ],
        },
        {
          type: "recipe",
          name: "Big Meatball2", // 89 cooktime
          requiredItems: [
            { name: "Ground Beef2", quantity: 5 },
            { name: "Egg2", quantity: 3 },
            { name: "Breadcrumbs2", quantity: 6 },
            { name: "Spices2", quantity: 2 },
          ],
        },
        {
          type: "recipe",
          name: "Super Pasta2",
          requiredItems: [
            { name: "Flour2", quantity: 10 },
            { name: "Egg2", quantity: 5 },
            { name: "Olive Oil2", quantity: 3 },
            { name: "Garlic2", quantity: 4 },
          ],
        },
        {
          type: "recipe",
          name: "Tomato Sauce2",
          requiredItems: [
            { name: "Tomatoes2", quantity: 8 },
            { name: "Garlic2", quantity: 3 },
            { name: "Onion2", quantity: 2 },
            { name: "Olive Oil2", quantity: 2 },
          ],
        },
        {
          type: "recipe",
          name: "Veggie Salad2",
          requiredItems: [
            { name: "Lettuce2", quantity: 2 },
            { name: "Cucumber2", quantity: 3 },
            { name: "Tomato2", quantity: 4 },
            { name: "Olive Oil2", quantity: 1 },
          ],
        },
        { type: "ingredient", name: "Ground Beef2", cookTime: 10 },
        { type: "ingredient", name: "Egg2", cookTime: 3 },
        { type: "ingredient", name: "Breadcrumbs2", cookTime: 5 },
        { type: "ingredient", name: "Spices2", cookTime: 0 },
        { type: "ingredient", name: "Flour2", cookTime: 0 },
        { type: "ingredient", name: "Olive Oil2", cookTime: 2 },
        { type: "ingredient", name: "Garlic2", cookTime: 1 },
        { type: "ingredient", name: "Tomatoes2", cookTime: 4 },
        { type: "ingredient", name: "Onion2", cookTime: 3 },
        { type: "ingredient", name: "Lettuce2", cookTime: 1 },
        { type: "ingredient", name: "Cucumber2", cookTime: 2 },
        { type: "ingredient", name: "Tomato2", cookTime: 2 },
      ];

      for (const entry of entries) {
        const resp6 = await postEntry(entry);
        expect(resp6.status).toBe(200);
      }

      const resp3 = await getTask3("Mega Feast2");
      expect(resp3.status).toBe(200);

      expect(resp3.body).toEqual({
        name: "Mega Feast2",
        cookTime: 737, // Sum of all cook times
        ingredients: expect.arrayContaining([
          { name: "Ground Beef2", quantity: 20 }, // 5 * 4 (Big Meatball x4)
          { name: "Egg2", quantity: 27 }, // (3 * 4 for Big Meatball) + (5 * 3 for Super Pasta)
          { name: "Breadcrumbs2", quantity: 24 }, // 6 * 4 (Big Meatball x4)
          { name: "Spices2", quantity: 8 }, // 2 * 4 (Big Meatball x4)
          { name: "Flour2", quantity: 30 }, // 10 * 3 (Super Pasta x3)
          { name: "Olive Oil2", quantity: 23 }, // (3 * 3 for Super Pasta) + (2 * 6 for Tomato Sauce) + (1 * 2 for Veggie Salad)
          { name: "Garlic2", quantity: 30 }, // (4 * 3 for Super Pasta) + (3 * 2 for Tomato Sauce)
          { name: "Tomatoes2", quantity: 48 }, // 8 * 6 (Tomato Sauce x3)
          { name: "Onion2", quantity: 12 }, // 2 * 6 (Tomato Sauce x3)
          { name: "Lettuce2", quantity: 4 }, // Veggie Salad 2x2
          { name: "Cucumber2", quantity: 6 }, // Veggie Salad x2
          { name: "Tomato2", quantity: 8 }, // (4 * 2 for Veggie Salad)
        ]),
      });
    });
  });
});

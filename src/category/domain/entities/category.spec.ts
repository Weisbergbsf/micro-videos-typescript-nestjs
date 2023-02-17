import { Category } from "./category";

describe("Category Tests", () => {
    test("construtor of category", () => {
        const category: Category = new Category("Movie");
        expect(category.name).toBe("Movie")
    })
});
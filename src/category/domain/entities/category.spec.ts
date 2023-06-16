import { omit } from "lodash";
import { validate as uuidValidate } from "uuid";
import { Category, CategoryPros } from "./category";

describe("Category Tests", () => {
    test("construtor of category", () => {
        let category: Category = new Category({ name: "Movie" });
        let props = omit(category.props, 'created_at')

        expect(props).toStrictEqual({
            name: "Movie",
            description: null,
            is_active: true,
        });
        expect(category.props.created_at).toBeInstanceOf(Date);

        category = new Category({
            name: "Movie",
            description: "some descrption",
            is_active: false,
        });
        let created_at = new Date
        expect(category.props).toStrictEqual({
            name: "Movie",
            description: "some descrption",
            is_active: false,
            created_at
        });

        category = new Category({
            name: "Movie",
            description: "other descrption",
        });
        expect(category.props).toMatchObject({
            name: "Movie",
            description: "other descrption",
        });

        created_at = new Date()
        category = new Category({
            name: "Movie",
            created_at,
        });
        expect(category.props).toMatchObject({
            name: "Movie",
            created_at,
        });
    })

    test('id field', () => {
        type CategoryData = { props: CategoryPros, id?: string; }
        const data: CategoryData[] = [
            { props: { name: 'Movie' } },
            { props: { name: 'Movie' }, id: null },
            { props: { name: 'Movie' }, id: undefined },
            { props: { name: 'Movie' }, id: 'f42ab27c-b3b6-46c0-be32-cc0442f73293' },
        ];

        data.forEach(i => {
            const category = new Category(i.props, i.id);
            expect(category.id).not.toBeNull();
            expect(uuidValidate(category.id)).toBeTruthy();
        });
    });

    test('getter of name prop', () => {
        const category: Category = new Category({ name: "Movie" });
        expect(category.name).toBe('Movie');
    });

    test('getter and setter of description prop', () => {
        let category: Category = new Category({ name: "Movie" });
        expect(category.description).toBeNull();

        category = new Category({ name: "Movie", description: "some description" });
        expect(category.description).toBe('some description');

        category = new Category({ name: "Movie" });
        category["description"] = "other description"
        expect(category.description).toBe('other description');

        category["description"] = undefined
        expect(category.description).toBeNull();

        category["description"] = null
        expect(category.description).toBeNull();
    });

    test('getter and setter of is_active prop', () => {
        let category: Category = new Category({ name: "Movie" });
        expect(category.is_active).toBeTruthy()

        category = new Category({ name: "Movie", is_active: true });
        expect(category.is_active).toBeTruthy()

        category = new Category({ name: "Movie", is_active: false });
        expect(category.is_active).toBeFalsy()

        category["is_active"] = undefined;
        expect(category.is_active).toBeTruthy();

        category["is_active"] = true;
        expect(category.is_active).toBeTruthy();
    });

    test('getter of created_at prop', () => {
        let category: Category = new Category({ name: "Movie" });
        expect(category.created_at).toBeInstanceOf(Date);

        let created_at = new Date();
        category = new Category({ name: "Movie", created_at });

        expect(category.created_at).toBe(created_at);
    })
});
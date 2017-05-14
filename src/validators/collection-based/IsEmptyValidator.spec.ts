import {IsEmptyValidator} from "./IsEmptyValidator";

describe("IsEmptyValidator", () => {
    let validator: IsEmptyValidator;

    beforeEach(() => {
        validator = new IsEmptyValidator();
    });

    describe("isValid()", () => {
        it("should return false if collection is undefined", () => {
            let undefinedArray: string[];

            const result = validator.isValid(undefinedArray);

            expect(result).toBe(false);
        });

        it("should return false if collection is null", () => {
            let nullArray: string[] = null;

            const result = validator.isValid(nullArray);

            expect(result).toBe(false);
        });
    });

    describe("Array", () => {
        let anArray: string[];

        beforeEach(() => {
            anArray = [];
        });

        describe("isValid()", () => {
            it("should return true if collection is empty", () => {
                const result = validator.isValid(anArray);

                expect(result).toBe(true);
            });

            it("should return false if collection is not empty", () => {
                anArray.push("foo");
                anArray.push("bar");

                const result = validator.isValid(anArray);

                expect(result).toBe(false);
            });
        });
    });

    describe("Set", () => {
        let aSet: Set<string>;

        beforeEach(() => {
            aSet = new Set();
        });

        describe("isValid()", () => {
            it("should return true if collection is empty", () => {
                const result = validator.isValid(aSet);

                expect(result).toBe(true);
            });

            it("should return false if collection is not empty", () => {
                aSet.add("foo");
                aSet.add("bar");

                const result = validator.isValid(aSet);

                expect(result).toBe(false);
            });
        });
    });

    describe("Map", () => {
        let aMap: Map<string, string>;

        beforeEach(() => {
            aMap = new Map();
        });

        describe("isValid()", () => {
            it("should return true if collection is empty", () => {
                const result = validator.isValid(aMap);

                expect(result).toBe(true);
            });

            it("should return false if collection is not empty", () => {
                aMap.set("key1", "foo");
                aMap.set("key2", "bar");

                const result = validator.isValid(aMap);

                expect(result).toBe(false);
            });
        });
    });
});

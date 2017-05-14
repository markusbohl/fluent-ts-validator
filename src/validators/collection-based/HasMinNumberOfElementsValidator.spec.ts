import {HasMinNumberOfElementsValidator} from "./HasMinNumberOfElementsValidator";

describe("HasMinNumberOfElementsValidator", () => {
    let validator: HasMinNumberOfElementsValidator;

    beforeEach(() => {
        validator = new HasMinNumberOfElementsValidator(2);
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
            it("should return false if collection has too few elements", () => {
                const result = validator.isValid(anArray);

                expect(result).toBe(false);
            });

            it("should return true if collection has expected minimum number of elements", () => {
                anArray.push("foo");
                anArray.push("bar");

                const result = validator.isValid(anArray);

                expect(result).toBe(true);
            });

            it("should return true if collection has more than minimum number of elements", () => {
                anArray.push("foo");
                anArray.push("bar");
                anArray.push("foobar");

                const result = validator.isValid(anArray);

                expect(result).toBe(true);
            });
        });
    });

    describe("Set", () => {
        let aSet: Set<string>;

        beforeEach(() => {
            aSet = new Set();
        });

        describe("isValid()", () => {
            it("should return false if collection has too few elements", () => {
                const result = validator.isValid(aSet);

                expect(result).toBe(false);
            });

            it("should return true if collection has expected minimum number of elements", () => {
                aSet.add("foo");
                aSet.add("bar");

                const result = validator.isValid(aSet);

                expect(result).toBe(true);
            });

            it("should return true if collection has more than minimum number of elements", () => {
                aSet.add("foo");
                aSet.add("bar");
                aSet.add("foobar");

                const result = validator.isValid(aSet);

                expect(result).toBe(true);
            });
        });
    });

    describe("Map", () => {
        let aMap: Map<string, string>;

        beforeEach(() => {
            aMap = new Map();
        });

        describe("isValid()", () => {
            it("should return false if collection has too few elements", () => {
                const result = validator.isValid(aMap);

                expect(result).toBe(false);
            });

            it("should return true if collection has expected minimum number of elements", () => {
                aMap.set("key1", "foo");
                aMap.set("key2", "bar");

                const result = validator.isValid(aMap);

                expect(result).toBe(true);
            });

            it("should return true if collection has more than minimum number of elements", () => {
                aMap.set("key1", "foo");
                aMap.set("key2", "bar");
                aMap.set("key3", "foobar");

                const result = validator.isValid(aMap);

                expect(result).toBe(true);
            });
        });
    });
});

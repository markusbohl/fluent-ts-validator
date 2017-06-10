import {HasMinMaxNumberOfElementsValidator} from "./HasMinMaxNumberOfElementsValidator";

describe("HasMinMaxNumberOfElementsValidator", () => {
    let validator: HasMinMaxNumberOfElementsValidator;

    beforeEach(() => {
        validator = new HasMinMaxNumberOfElementsValidator(2, 4);
    });

    describe("isValid()", () => {
        it("should return false if collection is undefined", () => {
            const result = validator.isValid(undefined);

            expect(result).toBe(false);
        });
    });

    describe("Array", () => {
        let anArray: string[];

        beforeEach(() => {
            anArray = [];
        });

        describe("isValid()", () => {
            it("should return false if collection has less than minimum number of elements", () => {
                const result = validator.isValid(anArray);

                expect(result).toBe(false);
            });

            it("should return true if collection has expected minimum number of elements", () => {
                anArray.push("foo");
                anArray.push("bar");

                const result = validator.isValid(anArray);

                expect(result).toBe(true);
            });

            it("should return true if collection has between min and max number of elements", () => {
                anArray.push("foo");
                anArray.push("bar");
                anArray.push("foobar");

                const result = validator.isValid(anArray);

                expect(result).toBe(true);
            });

            it("should return true if collection has expected max number of elements", () => {
                anArray.push("foo");
                anArray.push("bar");
                anArray.push("foobar");
                anArray.push("barfoo");

                const result = validator.isValid(anArray);

                expect(result).toBe(true);
            });

            it("should return false if collection has more than max number of elements", () => {
                anArray.push("foo");
                anArray.push("bar");
                anArray.push("foobar");
                anArray.push("barfoo");
                anArray.push("boofar");

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
            it("should return false if collection has less than minimum number of elements", () => {
                const result = validator.isValid(aSet);

                expect(result).toBe(false);
            });

            it("should return true if collection has expected minimum number of elements", () => {
                aSet.add("foo");
                aSet.add("bar");

                const result = validator.isValid(aSet);

                expect(result).toBe(true);
            });

            it("should return true if collection has between min and max number of elements", () => {
                aSet.add("foo");
                aSet.add("bar");
                aSet.add("foobar");

                const result = validator.isValid(aSet);

                expect(result).toBe(true);
            });

            it("should return true if collection has expected max number of elements", () => {
                aSet.add("foo");
                aSet.add("bar");
                aSet.add("foobar");
                aSet.add("barfoo");

                const result = validator.isValid(aSet);

                expect(result).toBe(true);
            });

            it("should return false if collection has more than max number of elements", () => {
                aSet.add("foo");
                aSet.add("bar");
                aSet.add("foobar");
                aSet.add("barfoo");
                aSet.add("boofar");

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
            it("should return false if collection has less than minimum number of elements", () => {
                const result = validator.isValid(aMap);

                expect(result).toBe(false);
            });

            it("should return true if collection has expected minimum number of elements", () => {
                aMap.set("key1", "foo");
                aMap.set("key2", "bar");

                const result = validator.isValid(aMap);

                expect(result).toBe(true);
            });

            it("should return true if collection has between min and max number of elements", () => {
                aMap.set("key1", "foo");
                aMap.set("key2", "bar");
                aMap.set("key3", "foobar");

                const result = validator.isValid(aMap);

                expect(result).toBe(true);
            });

            it("should return true if collection has expected max number of elements", () => {
                aMap.set("key1", "foo");
                aMap.set("key2", "bar");
                aMap.set("key3", "foobar");
                aMap.set("key4", "barfoo");

                const result = validator.isValid(aMap);

                expect(result).toBe(true);
            });

            it("should return false if collection has more than max number of elements", () => {
                aMap.set("key1", "foo");
                aMap.set("key2", "bar");
                aMap.set("key3", "foobar");
                aMap.set("key4", "barfoo");
                aMap.set("key5", "boofar");

                const result = validator.isValid(aMap);

                expect(result).toBe(false);
            });
        });
    });
});

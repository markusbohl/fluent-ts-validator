import {IsBetweenValidator} from "./IsBetweenValidator";

describe("IsBetweenValidator", () => {
    const lowerDate = new Date(2016, 0, 1, 0, 0, 0, 0);
    const upperDate = new Date(2016, 11, 31, 23, 59, 59, 999);

    describe("isValid()", () => {
        describe("default to exclusion", () => {
            let validator: IsBetweenValidator;

            beforeEach(() => {
                validator = new IsBetweenValidator(lowerDate, upperDate);
            });

            it("should return true if given date lies between lower and upper boundary", () => {
                let date = new Date(2016, 5, 1, 0, 0, 0, 0);

                let result = validator.isValid(date);

                expect(result).toBeTruthy();
            });

            it("should return false if given date lies before lower boundary", () => {
                let date = new Date(2015, 5, 1, 0, 0, 0, 0);

                let result = validator.isValid(date);

                expect(result).toBeFalsy();
            });

            it("should return false if given date lies after upper boundary", () => {
                let date = new Date(2017, 5, 1, 0, 0, 0, 0);

                let result = validator.isValid(date);

                expect(result).toBeFalsy();
            });

            it("should return false if given date is equal to lower boundary", () => {
                let result = validator.isValid(lowerDate);

                expect(result).toBeFalsy();
            });

            it("should return false if given date is equal to upper boundary", () => {
                let result = validator.isValid(upperDate);

                expect(result).toBeFalsy();
            });

            it("should return false if input is undefined", () => {
                let result = validator.isValid(undefined);

                expect(result).toBeFalsy();
            });

            it("should return false if input is null", () => {
                let result = validator.isValid(null);

                expect(result).toBeFalsy();
            });
        });

        describe("include both boundaries", () => {
            let validator: IsBetweenValidator;

            beforeEach(() => {
                validator = new IsBetweenValidator(lowerDate, upperDate, "[", "]");
            });

            it("should return true if given date is equal to lower boundary", () => {
                let result = validator.isValid(lowerDate);

                expect(result).toBeTruthy();
            });

            it("should return true if given date is equal to upper boundary", () => {
                let result = validator.isValid(upperDate);

                expect(result).toBeTruthy();
            });

        });

        describe("include lower boundary and exlude upper boundary", () => {
            let validator: IsBetweenValidator;

            beforeEach(() => {
                validator = new IsBetweenValidator(lowerDate, upperDate, "[", ")");
            });

            it("should return true if given date is equal to lower boundary", () => {
                let result = validator.isValid(lowerDate);

                expect(result).toBeTruthy();
            });

            it("should return false if given date is equal to upper boundary", () => {
                let result = validator.isValid(upperDate);

                expect(result).toBeFalsy();
            });
        });

        describe("exclude lower boundary and include upper boundary", () => {
            let validator: IsBetweenValidator;

            beforeEach(() => {
                validator = new IsBetweenValidator(lowerDate, upperDate, "(", "]");
            });

            it("should return false if given date is equal to lower boundary", () => {
                let result = validator.isValid(lowerDate);

                expect(result).toBeFalsy();
            });

            it("should return true if given date is equal to upper boundary", () => {
                let result = validator.isValid(upperDate);

                expect(result).toBeTruthy();
            });
        });
    });
});
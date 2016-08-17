import * as reducers from "./reducers";

describe('Reducers', () => {
    describe('todos', () => {
        describe('items reducer', () => {

            const item1 = {id: 1, text: "item 1"};
            const item2 = {id: 2, text: "item 2"};
            const item3 = {id: 1, text: "item 3"};


            it("should not change state on default", () => {
                expect(reducers.todosItems([item1], {type: "NONEXISTENT_ACTION"})).to.eql([item1]);
            });

            it("should add push action to list", () => {
                expect(reducers.todosItems([item2], {type: "PUSH_TODO", payload: item1})).to.eql([item2, item1]);
            });

            it("should replace all items with fetch payload", () => {
                expect(reducers.todosItems([item2], {type: "FETCH_TODO_SUCCESS", payload: [item1]})).to.eql([item1]);
            });

            it("should add new save item to list", () => {
                expect(reducers.todosItems([item1], {
                    type: "SAVE_TODO_SUCCESS",
                    payload: item2
                })).to.eql([item1, item2]);
            });

            it("should overwrite changed save item with same id in state", () => {
                expect(reducers.todosItems([item1, item2], {
                    type: "SAVE_TODO_SUCCESS",
                    payload: item3
                })).to.eql([item3, item2])
            });


        });

        describe("error reducer", () => {
            it("should give null on success or load", () => {
                expect(reducers.todosError(new Error("Foo"), {type: "SAVE_TODO_SUCCESS"})).to.be.equal(null);
            });
            const error = new Error("FOO");
            it("should return error on error", () => {
                expect(reducers.todosError(null, {type: "SAVE_TODO_ERROR", payload: error})).to.be.equal(error);
            });
            it("should not change state on default", () => {
                expect(reducers.todosError(error, {type: "NONEXISTENT_ACTION"})).to.be.equal(error);
            })
        });

        describe("loading reducer", () => {
            it("should be true when loading", () => {
                expect(reducers.todosLoading(false, {type: "FETCH_TODO_LOADING"})).to.be.equal(true);
            });
            it("should be false when finished", () => {
                expect(reducers.todosLoading(true, {type: "FETCH_TODO_ERROR"})).to.be.equal(false);
            });
            it("should not change state on default", () => {
                const spy = sinon.spy();
                expect(reducers.todosLoading(spy, {type: "NONEXISTENT_ACTION"})).to.be.equal(spy);
            });
        })
    })
});
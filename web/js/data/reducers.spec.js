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



        })
    })
});
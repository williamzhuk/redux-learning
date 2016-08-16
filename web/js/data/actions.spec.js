import * as actions from "./actions";

// describe('Actions', ()=>{
//     describe('todos', ()=>{
//         it('should return proper actions', ()=>{
//             expect(actions.editTodo().type).to.be.equal('EDIT_TODO');
//         });
//         it('async test', (done)=> {
//             done();
//             //done(new Error('foo'))
//             //throw new Error('ffffff')
//         });
//         it('async test', ()=> {
//             return Promise.resolve('xxx');
//         });
//         it('spy test', ()=>{
//
//             function TestSubject(cb){
//                 this.num = cb(24);
//             }
//
//             const cb = sinon.stub().returns(42);
//
//             const spy = sinon.spy(cb);
//
//             const subj = new TestSubject(spy);
//
//             expect(spy).to.have.been.called.once;
//             expect(spy).to.have.been.calledWith(24);
//             expect(subj.num).to.be.equal(42);
//
//         });
//     })
// });

describe('Actions', () => {
    describe('todos', () => {
        it('should return proper actions', ()=> {
            expect(actions.editTodo().type).to.be.equal('EDIT_TODO');
            expect(actions.cancelEditTodo().type).to.be.equal('CANCEL_EDIT_TODO');
            //expect(actions.fetchTodo().type).to.be.equal('FETCH_TODO_API');
            //expect(actions.saveTodo().type).to.be.equal('SAVE_TODO_API');
            expect(actions.pushTodo().type).to.be.equal('PUSH_TODO');
        });
        it('should hold correct payload', () => {
            const spy = sinon.spy();

            expect(actions.editTodo(spy).todo).to.be.equal(spy);
            expect(actions.cancelEditTodo(spy).todo).to.be.equal(spy);
            expect(actions.pushTodo(spy).payload).to.be.equal(spy);

            //TODO: saveTodo and fetchTodo both use api. How to test? Check for correct API call?

        })
    });
    describe('check', () => {
        it('should return proper action', () => {
            expect(actions.check().type).to.be.equal('CHECK');
        });
        it('should hold correct payload', () => {
            expect(actions.check(true).checked).to.be.equal(true);
            expect(actions.check(false).checked).to.be.equal(false);
        })
    });

    describe('grid', () => {
        it('should return proper actions', ()=> {
            expect(actions.setRoleId().type).to.be.equal('SET_ROLE_ID');
            expect(actions.setFilter().type).to.be.equal('SET_FILTER');
            expect(actions.setSort().type).to.be.equal('SET_SORT');
            expect(actions.setPage().type).to.be.equal('SET_PAGE');
            expect(actions.setPerPage().type).to.be.equal('SET_PER_PAGE');
        });
        it('should hold correct payload', () => {
            const spy = sinon.spy();

            expect(actions.setRoleId(spy).payload).to.be.equal(spy);
            expect(actions.setFilter(spy).payload).to.be.equal(spy);
            expect(actions.setSort('foo', true).payload).to.be.eql({by: 'foo', reverse: true});
            expect(actions.setPage(spy).payload).to.be.equal(spy);
            expect(actions.setPerPage(spy).payload).to.be.equal(spy);


        })
    })
});
import * as actions from "./actions";

describe('Actions', ()=>{
    describe('todos', ()=>{
        it('should return proper actions', ()=>{
            expect(actions.editTodo().type).to.be.equal('EDIT_TODO');
        });
        it('async test', (done)=> {
            done();
            //done(new Error('foo'))
            //throw new Error('ffffff')
        });
        it('async test', ()=> {
            return Promise.resolve('xxx');
        });
        it('spy test', ()=>{

            function TestSubject(cb){
                this.num = cb(24);
            }

            const cb = sinon.stub().returns(42);

            const spy = sinon.spy(cb);

            const subj = new TestSubject(spy);

            expect(spy).to.have.been.called.once;
            expect(spy).to.have.been.calledWith(24);
            expect(subj.num).to.be.equal(42);

        });
    })
});
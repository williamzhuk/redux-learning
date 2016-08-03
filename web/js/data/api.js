import {v4} from 'node-uuid';
import TinyEmitter from "tiny-emitter";


let fakeStoreInit = {'/api/todo': {}};

function getFakeStore() {
    try {
        return localStorage['fakeStore']
            ? JSON.parse(localStorage['fakeStore'])
            : fakeStoreInit;
    } catch (e) {
        return fakeStoreInit;
    }
}

function setFakeStore(fakeStore) {
    localStorage['fakeStore'] = JSON.stringify(fakeStore);
}

export function save(prefix) {
    return (body) => {
        let isNew = false;
        if (!body.id) {
            body.id = v4(); //This should be done on server
            isNew = true;
        }
        body.completed = !!body.completed;
        body.text = body.text || '';
        let url = isNew ? '' : `/${body.id}`;
        //return fetch(`${prefix}${url}`, {body: body, method: isNew ? 'POST' : 'PUT'})
        let fakeStore = getFakeStore();
        fakeStore[prefix][body.id] = body;
        setFakeStore(fakeStore);
        return new Promise((resolve, reject)=> {
            setTimeout(()=> {
                resolve(body);
            }, 200);
        })
    }
}

export function list(prefix) {
    let fakeStore = getFakeStore();
    let array = Object.keys(fakeStore[prefix]).map(index => fakeStore[prefix][index]);
    //return Promise.resolve(array);
    return new Promise((resolve, reject)=> {
        setTimeout(()=> {
            resolve(array);
        }, 500);
    });
}

let emitter = new TinyEmitter();

export function onPush(cb) {
    emitter.on('push', cb);
}

window.emulatePush = function(text){
    let fakeStore = getFakeStore();
    let newTodo = {
        id: v4(),
        text: text,
        completed: false
    };
    fakeStore['/api/todo'][newTodo.id] = newTodo;
    emitter.emit('push', {
        type: 'newTodo',
        payload: newTodo
    });
};
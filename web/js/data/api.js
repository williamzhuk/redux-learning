import {v4} from 'node-uuid';

let fakeStore = {
    '/api/todo': {
        "45c54404-91ba-4e43-bb38-d60df0b6f645": {
            "id": "45c54404-91ba-4e43-bb38-d60df0b6f645",
            "text": "sadf",
            "completed": false
        },
        "a28b6068-eb50-4ff2-bf9e-5d0cd185d890": {
            "id": "a28b6068-eb50-4ff2-bf9e-5d0cd185d890",
            "text": "asdfa",
            "completed": false
        },
        "4fb163e4-b4df-4073-b891-8e61f4161e6a": {
            "id": "4fb163e4-b4df-4073-b891-8e61f4161e6a",
            "text": "asdfsadf",
            "completed": true
        }
    }
};

export function save(prefix) {
    return (body) => {
        let isNew = false;
        if (!body.id) {
            body.id = v4(); //This should be done on server
            isNew = true;
        }
        let url = isNew ? '' : `/${body.id}`;
        //return fetch(`${prefix}${url}`, {body: body, method: isNew ? 'POST' : 'PUT'})
        fakeStore[prefix][body.id] = body;
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve(body);
            },5000);
        })
    }
}

export function list(prefix) {
    let array = Object.keys(fakeStore[prefix]).map(index => fakeStore[prefix][index]);
    //return Promise.resolve(array);
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(array);
        },5000);
    });
}
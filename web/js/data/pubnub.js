import PUBNUB from 'pubnub/modern/pubnub';

let pubnub;

export const getPubnub = () => {
    return pubnub;
};

export const destroy = () => {
    //pubnub.destroy();
};

export const init = () => {
    pubnub = PUBNUB.init({
        publish_key: process.env.PUBNUB_PUBLISH_KEY,
        subscribe_key: process.env.PUBNUB_SUBSCRIBE_KEY,
        ssl: (location.protocol.toLowerCase() === 'https:'), // encrypt the channel
    });
};

export const subscribe = (cb) => {
    //TODO throw something if no Pubnub
    pubnub.subscribe({
        channel: 'ReactChat',
        message: cb
    });
};

export const publish = (message) => {
    pubnub.publish({
        channel: 'ReactChat',
        message
    })
};
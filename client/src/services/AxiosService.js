import axios from "axios";

const get = async (url, config) => {
    try {
        return await axios.get(url, config);
    } catch (e) {
        console.error(e);
        return e;
    }
}

const post = async (url, data, config) => {
    try {
        return await axios.post(url, data, config);
    } catch (e) {
        console.error(e);
        return e;
    }
}

const put = async (url, data, config) => {
    try {
        return await axios.put(url, data, config);
    } catch (e) {
        console.error(e);
        return e;
    }
}

const del = async (url, config) => {
    try {
        return await axios.delete(url, config);
    } catch (e) {
        console.error(e);
        return e;
    }
}

export {get, post, put, del}
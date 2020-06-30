import axios from "axios";

const service = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});


function errorHandler(error) {
    if (error.response.data) {
        console.log(error.response && error.response.data);
        throw error;
    }
    throw error;
}

function get(endPoint) {
    return service.get(endPoint);
}

function patch(endPoint) {
    return service.patch(endPoint);
}

function post(endPoint) {
    return service.post(endPoint);
}

export default {
    service,
    get,
    patch,
    post,

    register(user) {
        return service
            .post("/user/register", user)
            .then((res) => res.data)
            .catch(errorHandler);
    },

    login(user) {
        return service
            .post("/user/login", user)
            .then((res) =>res.data)
            .catch(errorHandler);
    },

    logout() {
        return service
            .get("/user/logout")
            .then((res) => res.data)
            .catch(errorHandler);
    },

    isAuthenticated() {
        return service
            .get("/user/authenticated")
            .then((res) => res.data)
            .catch(errorHandler);
    },
};
import axios from "axios";

/**
 * {actionName}.js
 *
 */
module.exports = {

    /**
     * {actionName}.getAll() 
     * get all {name} from DB
     */
    getAll: function (token, callback) {
        return dispatch => {
            var config = {
                headers: { Authorization: "bearer " + token }
            };
            axios
                .get("/{name}", config)
                .then(function (response) {
                    dispatch({
                        type: "GET_ALL_{actionType}",
                        payload: {
                            getAll{name}: response.data
                        }
                    })
                    callback()
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
    },

    /**
     * {actionName}.getOne()
     *  get one {name} from DB
     */
    getOne: function (token, id, callback) {
        var config = {
            headers: { 'Authorization': "bearer " + token }
        };
        return (dispatch) => {
            axios.get('/{name}/' + id, config)
                .then(function (response) {
                    dispatch({
                        type: "GET_ONE_{actionType}",
                        payload: {
                            getOne{name}: response.data
                        }
                    })
                    callback(response.data, false)

                })
                .catch(function (error) {
                    if (error.response) {
                        callback(null, error.response)
                    }
                });
        }

    },

    /**
     * {actionName}.post()
     *  post {name} to DB
     */
    post: function (token, id, {name}, callback) {
        var config = {
            headers: { 'Authorization': "bearer " + token }
        };
        var url = "";
        var action = "post"
        if (id) {
            url = id
            action = "put"
        }
        return (dispatch) => {
            axios[action]('/{name}/' + url, {name}, config)
                .then(function (response) {
                    var msg = "{name} successfully created."
                    if (action == "put") {
                        msg = "{name} " + id + " successfully updated."
                    }
                    callback()
                })
                .catch(function (error) {
                    console.log(error)
                    console.log(error.response)
                })
        }

    },

    /**
     * {actionName}.deleteOne()
     *  deleteOne {name} from DB
     */

    deleteOne: function (token, id, callback) {
        var config = {
            headers: { 'Authorization': "bearer " + token }
        };
        var url = id;
        var action = "delete"
        return (dispatch) => {
            axios[action]('/{name}/' + url, config)
                .then(function (response) {
                    var msg = "{name} " + id + " successfully deleted."
                    callback()
                })
                .catch(function (error) {
                    console.log(error)
                    console.log(error.response)
                })
        }

    }
}

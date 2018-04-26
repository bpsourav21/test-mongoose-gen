import axios from "axios";

/**
 * {actionName}.js
 *
 */
module.exports = {

    /**
     * {actionName}.getAll() 
     * get all {actionName} from DB
     */
    getAll: function (token, callback) {
        return dispatch => {
            var config = {
                headers: { Authorization: "bearer " + token }
            };
            axios
                .get("/{actionName}", config)
                .then(function (response) {
                    dispatch({
                        type: "GET_ALL_{actionType}",
                        payload: {
                            getAll{ actionName }: response.data
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
     *  get one {actionName} from DB
     */
    getOne: function (token, id, callback) {
        var config = {
            headers: { 'Authorization': "bearer " + token }
        };
        return (dispatch) => {
            axios.get('/{actionName}/' + id, config)
                .then(function (response) {
                    dispatch({
                        type: "GET_ONE_{actionType}",
                        payload: {
                            getOne{ actionName }: response.data
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
     *  post {actionName} to DB
     */
    post: function (token, id, { name }, callback) {
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
            axios[action]('/{actionName}/' + url, { name }, config)
                .then(function (response) {
                    var msg = "{actionName} successfully created."
                    if (action == "put") {
                        msg = "{actionName} " + id + " successfully updated."
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
     *  deleteOne {actionName} from DB
     */

    deleteOne: function (token, id, callback) {
        var config = {
            headers: { 'Authorization': "bearer " + token }
        };
        var url = id;
        var action = "delete"
        return (dispatch) => {
            axios[action]('/{actionName}/' + url, config)
                .then(function (response) {
                    var msg = "{actionName} " + id + " successfully deleted."
                    callback()
                })
                .catch(function (error) {
                    console.log(error)
                    console.log(error.response)
                })
        }

    }
}

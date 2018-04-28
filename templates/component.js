//import library files here
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
//import action files here
import { getAll{name}, getOne{name}, post{name}, deleteOne{name} } from './{componentName}'
//import action others files here
import './{name}.css';

class {name} extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }
    render() {
        return (
            <div className="">
                <h1> This is {name} Page</h1>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
    };
};

export default withRouter(connect(mapStateToProps)({name}))
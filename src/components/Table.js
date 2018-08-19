import React, { Component } from "react";
import { connect } from "react-redux";

import {getList} from "../actions/dataList";

class Table extends Component {
    componentDidMount(){
        this.props.getData();
    }
    render() {
        const data = this.props.data;
        const tags = this.props.tags;
        return (
            <div>ss</div>
        )
    }
}

export default connect(
    state => ({
        data: state.data,
    }),
    dispatch => ({
        getData: () => {
            dispatch(getList());
        },
    })
)(Table);
import React, { Component } from "react";
import { connect } from "react-redux";

import { getList } from "../actions/dataList";

class Table extends Component {
  componentDidMount() {
    this.props.getData();
  }
  render() {
    const data = this.props.data;
    console.log(data);
    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>URL</th>
            <th>Created</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map(data => (
              <tr key={data.objectID}>
                <td>{data.title}</td>
                <td>{data.url}</td>
                <td>{data.created_at}</td>
                <td>{data.author}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

export default connect(
  state => ({
    data: state.dataList
  }),
  dispatch => ({
    getData: () => {
      dispatch(getList());
    }
  })
)(Table);

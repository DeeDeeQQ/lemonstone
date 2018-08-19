import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "react-emotion";
import Modal from "react-modal";
import JSONPreety from "react-json-pretty";

import { getList } from "../actions/dataList";

Modal.setAppElement(document.getElementById("root"));

class Table extends Component {
  constructor() {
    super();
    this.state = {};

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    var self = this;
    this.props.getData();

    setInterval(function() {
      self.props.getData();
    }, 20000);
  }

  handleOpenModal(id) {
    this.setState({ [id]: true });
  }

  afterOpenModal(id) {
    // mb later
  }

  handleCloseModal(id) {
    this.setState({ [id]: false });
  }

  render() {
    const data = this.props.data;
    console.log(data);
    return (
      <StyledTable>
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
              <tr
                key={data.objectID}
                onClick={() => this.handleOpenModal(data.objectID)}
              >
                <Modal
                  isOpen={this.state[`${data.objectID}`]}
                  onAfterOpen={this.afterOpenModal}
                  shouldCloseOnOverlayClick={true}
                  onRequestClose={e => {
                    this.handleCloseModal(data.objectID);
                    e.stopPropagation();
                  }}
                  contentLabel=""
                >
                  <JSONPreety json={data} />
                </Modal>
                <td>{data.title}</td>
                <td>{data.url}</td>
                <td>{data.created_at}</td>
                <td>{data.author}</td>
              </tr>
            ))}
        </tbody>
      </StyledTable>
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

const StyledTable = styled("table")`
  & tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  min-width: 100%;

  & tr:hover {
    background-color: #99ccff;
  }
`;

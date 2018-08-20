import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "react-emotion";
import Modal from "react-modal";
import JSONPreety from "react-json-pretty";

import { getList } from "../actions/dataList";
import { Filter } from "./Filter";

Modal.setAppElement(document.getElementById("root"));

class Table extends Component {
  constructor() {
    super();
    this.state = {
      filterTitle: null
    };

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

  handleKeyPress = e => {
    console.log(e);
    this.setState({ filterTitle: e });
  };

  handleClear = () => {
    this.setState({ filterTitle: null });
  };

  render() {
    const data = this.props.data;
    console.log(data);
    return (
      <div>
        <Filter
          list={data}
          handleKeyPress={this.handleKeyPress}
          handleClear={this.handleClear}
          value={this.state.filterTitle}
        />
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
              data.map(
                data =>
                  (!this.state.filterTitle ||
                    this.state.filterTitle === data.title) && (
                    <tr
                      key={data.objectID}
                      onClick={() => this.handleOpenModal(data.objectID)}
                    >
                      <Modal
                        isOpen={this.state[`${data.objectID}`]}
                        onAfterOpen={this.afterOpenModal}
                        shouldCloseOnOverlayClick={true}
                        style={{ overflow: "visible" }}
                        onRequestClose={e => {
                          this.handleCloseModal(data.objectID);
                          e.stopPropagation();
                        }}
                        contentLabel="JSON Raw"
                      >
                        <CloseModal
                          onClick={e => {
                            this.handleCloseModal(data.objectID);
                            e.stopPropagation();
                          }}
                        />
                        <JSONPreety json={data} />
                      </Modal>
                      <td>{data.title}</td>
                      <td>{data.url}</td>
                      <td>{data.created_at}</td>
                      <td>{data.author}</td>
                    </tr>
                  )
              )}
          </tbody>
        </StyledTable>
      </div>
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

const CloseModal = styled("div")`
  position: fixed;
  right: 32px;
  top: 32px;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: red;
  &:after {
    content: "";
    height: 17px;
    border-left: 2px solid #fff;
    position: absolute;
    transform: rotate(45deg);
    left: 8px;
  }

  &:before {
    content: "";
    height: 17px;
    border-left: 2px solid #fff;
    position: absolute;
    transform: rotate(-45deg);
    left: 8px;
  }
`;

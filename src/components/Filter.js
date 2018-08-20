import React from "react";
import { Form, Field } from "react-final-form";
import styled from "react-emotion";

import DownshiftInput from "./DownshiftInput";

const onSubmit = value => {};

export const Filter = props => {
  const { list, handleKeyPress, handleClear, value } = props;
  return (
    <Form
      onSubmit={onSubmit}
      render={({ reset }) => (
        <FilterDiv>
          <Field
            name="filter"
            items={list}
            component={DownshiftInput}
            placeholder="Title"
            handleKeyPress={handleKeyPress}
            value={value}
          />
          <button
            onClick={() => {
              handleClear();
              reset();
            }}
          >
            Clear
          </button>
        </FilterDiv>
      )}
    />
  );
};

const FilterDiv = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

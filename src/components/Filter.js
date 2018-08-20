import React from "react";
import { Form, Field } from "react-final-form";
import styled from "react-emotion";

import DownshiftInput from "./DownshiftInput";

const onSubmit = value => {};

export const Filter = props => {
  const { list, handleKeyPress } = props;
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <FilterDiv>
          <Field
            name="hashTag"
            items={list}
            component={DownshiftInput}
            placeholder="Title"
            onKeyDown={handleKeyPress}
          />
        </FilterDiv>
      )}
    />
  );
};

const FilterDiv = styled("div")`
  display: flex;
  flex-direction: row;
  flex-basis: 100%;
  justify-content: space-around;
`;

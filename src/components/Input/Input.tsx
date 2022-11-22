import React from "react";
import styled from "styled-components";

type Props = {} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const StyledInput = styled.input`
  font-size: 16px;
  border: solid 2px #efefef;
  transition: border-color 200ms;
  padding: 4px 8px;
  width: 100%;
  font-weight: 600;

  &:active,
  &:focus {
    outline: none;
  }

  &:focus {
    border-color: #c1bdb1;
    transition: border-color 200ms;
  }

  &::placeholder {
    color: #cacaca;
  }
`;

export const Input: React.FC<Props> = ({ ref, ...rest }) => {
  return <StyledInput {...rest} />;
};

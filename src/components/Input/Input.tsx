import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/theme";

type Props = {} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const StyledInput = styled.input`
  display: inline-block;
  font-size: 16px;
  border: solid 1px ${colors.gray100};
  transition: border-color 200ms;
  padding: 4px 16px;
  width: 100%;
  font-weight: 500;
  border-radius: 4px;

  &:active,
  &:focus {
    outline: none;
  }

  &:focus {
    border-color: ${colors.gray200};
  }

  &::placeholder {
    color: ${colors.gray300};
  }
`;

export const Input: React.FC<Props> = ({ ref, ...rest }) => {
  return <StyledInput {...rest} />;
};

import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/theme";

type Props = {} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const StyledButton = styled.button`
  display: inline-block;
  font-size: 16px;
  background-color: ${colors.gray100};
  padding: 8px 18px;
  border-radius: 4px;

  font-weight: 600;
  white-space: nowrap;

  transition: background-color 200ms;
  &:hover {
    background-color: ${colors.gray200};
  }

  &:active {
    background-color: ${colors.gray300};
  }
`;

export const Button: React.FC<Props> = ({ ref, ...rest }) => {
  return <StyledButton {...rest} />;
};

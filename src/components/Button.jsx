import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: ${({ isDisabled, isLoading }) =>
    isDisabled || isLoading ? "not-allowed" : "pointer"};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: min-content;
  padding: 10px 24px;
  background: ${({ type, theme }) =>
    type === "secondary" ? theme.secondary : theme.primary};

  ${({ isDisabled, isLoading }) =>
    (isDisabled || isLoading) &&
    `
    opacity: 0.4;
  `}

  ${({ isLoading }) =>
    isLoading &&
    `
    opacity: 0.8;
  `}
`;

const Button = ({
  text,
  isLoading,
  isDisabled,
  rightIcon,
  leftIcon,
  type,
  onClick,
  flex,
}) => {
  return (
    <StyledButton
      onClick={() => !isDisabled && !isLoading && onClick()}
      isDisabled={isDisabled}
      isLoading={isLoading}
      type={type}
      flex={flex}
    >
      {isLoading && (
        <CircularProgress
          style={{ width: "18px", height: "18px", color: "inherit" }}
        />
      )}
      {leftIcon}
      {text}
      {isLoading && <> . . .</>}
      {rightIcon}
    </StyledButton>
  );
};

export default Button;

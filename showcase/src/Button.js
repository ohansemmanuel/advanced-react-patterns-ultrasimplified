import React from 'react'
import styled from 'styled-components'
import { LIGHT_PURPLE, DARK_GREY } from './utils/constants'

export const StyledButton = styled.button`
  background: ${({ primary }) => (primary ? LIGHT_PURPLE : DARK_GREY)};
  border: 0;
  outline: 0;
  color: #fff;
  text-align: center;
  width: 24vw;
  font-size: 1rem;
  font-family: 'Avenir';
  font-weight: 400;
  padding: 18px 0;
  border-radius: 30px;
  cursor: pointer;

  &:active {
    border: 1px solid #fff;
  }

  > span {
    padding-left: 6px;
  }

  > svg {
    position: relative;
    top: 3px;
  }
`

const Button = ({ Icon, text, primary }) => (
  <StyledButton primary={primary}>
    {Icon || null}
    <span>{text}</span>
  </StyledButton>
)

export default Button

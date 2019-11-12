import React from 'react'
import styled from 'styled-components'
import { LIGHT_PURPLE, DARK_GREY } from './utils/constants'
import { media } from './content/StyledContent'

export const StyledButton = styled.button`
  background: ${({ primary }) => (primary ? LIGHT_PURPLE : DARK_GREY)};
  width: 100%;
  font-size: 0.85rem;
  border-radius: 10px;
  padding: 9px 0;

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

  ${media.md`
    width: 24vw;
    font-size: 1rem;
    border-radius: 30px;
    padding: 18px 0;
  `}
`

const Button = ({ Icon, text, primary }) => (
  <StyledButton primary={primary}>
    {Icon || null}
    <span>{text}</span>
  </StyledButton>
)

export default Button

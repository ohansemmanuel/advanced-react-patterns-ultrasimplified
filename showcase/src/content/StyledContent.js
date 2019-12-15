import React from 'react'
import styled, { css } from 'styled-components'
import ArrowRed from '../assets/arrow_red.svg'
import ArrowBlue from '../assets/arrow_blue.svg'

import {
  HEADER_ALLOWANCE,
  SIDEBAR_LEFT_PADDING,
  COLUMN_WIDTH,
  ASH,
  LIGHT_ASH,
  PALE_BLUE,
  OX,
  PALE_RED
} from '../utils/constants'

export const SCREEN_SIZES = {
  sm: 576,
  md: 720,
  lg: 960,
  xl: 1140
}

export const media = Object.keys(SCREEN_SIZES).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = SCREEN_SIZES[label] / 16
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)};
    }
  `
  return accumulator
}, {})

export const StyledFloatingBtn = styled.button`
  background: ${() => PALE_RED};
  width: 71px;
  height: 71px;
  border-radius: 50%;
  position: fixed;
  bottom: 15px;
  right: 15px;
  font-size: 2.5rem;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);
  font-family: Avenir, Nunito, sans-serif;
  font-weight: 300;
  cursor: pointer;
  text-align: center;
  border: 0;
  outline: 0;
  color: #fff;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${() => `${SIDEBAR_LEFT_PADDING}vw`};
`

export const StyledInfoContainer = styled.aside`
  overflow: hidden;
  padding: 5px;
  z-index: 10;
  position: fixed;
  top: initial;
  bottom: 0;
  right: 0;
  left: 0;
  border: 0;
  background: #191921;
  border-top: 1px solid white;

  ${media.md`
    position: absolute;
    top: 20px;
    bottom: initial;
    right: initial;
    left: initial;
    border: 1px solid white;
`}
`

export const StyledContentContainer = styled.div`
  padding: ${() => `${HEADER_ALLOWANCE}vh ${SIDEBAR_LEFT_PADDING}vw`};

  ${media.md`
    padding: ${() => `${HEADER_ALLOWANCE}vh ${SIDEBAR_LEFT_PADDING}vw 0`};
  `}
`

export const H1 = styled.h1`
  font-size: 1.2rem;
  color: ${() => `${ASH}`};
  padding: 0;
  margin: 0;
`

export const Columns = styled.div`
  display: flex;
  flex-direction: column;

  ${media.md`
    display: flex;
    flex-direction: row;
  `}
`

export const Column = styled.div`
  ${media.md` 
    width: ${() => `${COLUMN_WIDTH}vw`}
    margin-left: ${({ leftGap }) =>
      leftGap ? `${SIDEBAR_LEFT_PADDING}vw` : 'initial'};
  `}
`

export const DisplayBox = styled.div`
  position: relative;
  width: 100%;
  min-height: 360px;
  max-height: 360px;
  overflow-y: scroll;
  padding: ${() => `${SIDEBAR_LEFT_PADDING}vw`};
  margin: ${({ m }) => m};
  border-radius: 16px;
  background-color: ${() => `${LIGHT_ASH}`};
  text-align: center;

  > svg {
    position: relative;
    top: -13px;
    left: -7px;
  }
  > aside {
    text-align: center;
  }

  button {
    max-width: 70%;
    display: inline-block;
  }

  pre {
    max-width: ${() => `${COLUMN_WIDTH - 2}vw`};
  }
`

const TaglineContainer = styled.div`
  text-align: right;

  > svg {
    position: relative;
    top: -6px;
    left: 5px;
  }

  ${media.md`
    text-align: left;
    > svg {
      left: 0; 
      top: -13px;
    }
  `};
`

const TagLine = styled.p`
  padding: 0;
  margin: 0;
  font-family: 'Kalam';
  font-weight: 300;
  transform: rotateZ(-2.75deg) translateY(6px) translateX(-15px);
  color: ${({ isPrimary }) => (isPrimary ? OX : PALE_BLUE)};

  ${media.md`
    transform: rotateZ(-4.75deg) translateY(-15px);
  `}
`

const Center = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  min-height: 25vh;
`

export const Box = ({ isPrimary, children, note, m }) => {
  return (
    <DisplayBox m={m}>
      <TaglineContainer>
        <TagLine isPrimary={isPrimary}>
          {isPrimary ? 'Before' : 'After'}
        </TagLine>
        {isPrimary ? (
          <ArrowRed style={{ width: '80px' }} />
        ) : (
          <ArrowBlue style={{ width: '80px' }} />
        )}
      </TaglineContainer>
      <Center>{children}</Center>
      {note && <aside>{note}</aside>}
    </DisplayBox>
  )
}

export const CTAContainer = styled.div`
  display: flex;
  margin-top: ${({ mtop }) => mtop || `${HEADER_ALLOWANCE / 1.5}vh`};

  > button {
    margin-left: ${({ alignRight }) => (alignRight ? 'auto' : 'initial')};
  }
`

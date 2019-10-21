import React from 'react'
import styled from 'styled-components'
import ArrowRed from '../assets/arrow_red.svg'
import ArrowBlue from '../assets/arrow_blue.svg'

import {
  HEADER_ALLOWANCE,
  SIDEBAR_LEFT_PADDING,
  ASH,
  LIGHT_ASH,
  PALE_BLUE,
  OX
} from '../utils/constants'

export const StyledContentContainer = styled.div`
  padding: ${() => `${HEADER_ALLOWANCE}vh ${SIDEBAR_LEFT_PADDING}vw 0`};
`

export const H1 = styled.h1`
  font-size: 1.2rem;
  color: ${() => `${ASH}`};
  padding: 0;
  margin: 0;
  margin-bottom: ${() => `${SIDEBAR_LEFT_PADDING}vw`};
`

export const Columns = styled.div`
  display: flex;
`

export const Column = styled.div`
  width: 31.88vw;
  margin-left: ${({ leftGap }) =>
    leftGap ? `${SIDEBAR_LEFT_PADDING}vw` : 'initial'};
`

export const DisplayBox = styled.div`
  width: 100%;
  min-height: 47vh;
  padding: ${() => `${SIDEBAR_LEFT_PADDING}vw`};
  border-radius: 16px;
  background-color: ${() => `${LIGHT_ASH}`};

  > svg {
    position: relative;
    top: -13px;
    left: -7px;
  }
`

const TagLine = styled.p`
  padding: 0;
  margin: 0;
  font-family: 'Kalam';
  font-weight: 300;
  transform: rotateZ(-4.75deg) translateY(-15px);
  color: ${({ isPrimary }) => (isPrimary ? OX : PALE_BLUE)};
`
export const Box = ({ isPrimary }) => {
  return (
    <DisplayBox>
      <TagLine isPrimary={isPrimary}>{isPrimary ? 'Before' : 'After'}</TagLine>
      {isPrimary ? (
        <ArrowRed style={{ width: '80px' }} />
      ) : (
        <ArrowBlue style={{ width: '80px' }} />
      )}
    </DisplayBox>
  )
}

export const CTAContainer = styled.div`
  display: flex;
  margin-top: ${() => `${HEADER_ALLOWANCE / 1.5}vh`};

  > button {
    margin-left: ${({ alignRight }) => (alignRight ? 'auto' : 'initial')};
  }
`

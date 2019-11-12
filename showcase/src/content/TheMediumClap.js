import React from 'react'
import { useMediaQuery } from 'react-responsive'

import {
  StyledContentContainer,
  H1,
  Columns,
  Column,
  Box,
  CTAContainer,
  SCREEN_SIZES
} from './StyledContent'
import GithubLogo from '../assets/github_logo.svg'
import Button from '../Button'
import Usage from '../patterns/01'
import Usage2 from '../patterns/02'

export const TheMediumClap = () => {
  const isMediumOrLarger = useMediaQuery({ minWidth: SCREEN_SIZES.md })

  return (
    <StyledContentContainer>
      <H1>The Medium Clap</H1>

      <Columns>
        <Column>
          <Box isPrimary note='Animated via an HOC'>
            <Usage />
          </Box>
          {isMediumOrLarger && (
            <CTAContainer alignRight>
              <Button text='Why medium clap?' primary />
            </CTAContainer>
          )}
        </Column>
        <Column leftGap>
          <Box
            note='Animated via a hook 💪'
            m={!isMediumOrLarger && '15px 0 0 0'}
          >
            <Usage2 />
          </Box>
          {!isMediumOrLarger && (
            <CTAContainer>
              <Button text='Why medium clap?' primary />
            </CTAContainer>
          )}
          <CTAContainer mtop={!isMediumOrLarger && '10px'}>
            <Button
              text='Code Implementation'
              Icon={<GithubLogo style={{ width: '18px' }} />}
            />
          </CTAContainer>
        </Column>
      </Columns>
    </StyledContentContainer>
  )
}

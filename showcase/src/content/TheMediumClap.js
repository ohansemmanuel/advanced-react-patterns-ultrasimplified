import React from 'react'
import {
  StyledContentContainer,
  H1,
  Columns,
  Column,
  Box,
  CTAContainer
} from './StyledContent'
import GithubLogo from '../assets/github_logo.svg'
import Button from '../Button'
import Usage from '../patterns/01'
import Usage2 from '../patterns/02'

export const TheMediumClap = () => (
  <StyledContentContainer>
    <H1>The Medium Clap</H1>

    <Columns>
      <Column>
        <Box isPrimary note='Animated via an HOC'>
          <Usage />
        </Box>
        <CTAContainer alignRight>
          <Button text='Why medium clap?' primary />
        </CTAContainer>
      </Column>
      <Column leftGap>
        <Box note='Animated via a hook 💪'>
          <Usage2 />
        </Box>
        <CTAContainer>
          <Button
            text='Code Implementation'
            Icon={<GithubLogo style={{ width: '18px' }} />}
          />
        </CTAContainer>
      </Column>
    </Columns>
  </StyledContentContainer>
)

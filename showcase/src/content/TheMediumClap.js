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

export const TheMediumClap = () => (
  <StyledContentContainer>
    <H1>The Medium Clap</H1>

    <Columns>
      <Column>
        <Box isPrimary />
        <CTAContainer alignRight>
          <Button text='Why medium clap?' primary />
        </CTAContainer>
      </Column>
      <Column leftGap>
        <Box />
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

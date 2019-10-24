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
import Usage3 from '../patterns/03'
import Usage4 from '../patterns/04'

export const ReusableStyles = () => (
  <StyledContentContainer>
    <H1>Reusable Styles </H1>

    <Columns>
      <Column>
        <Box isPrimary>
          <Usage3 />
        </Box>
        <CTAContainer alignRight>
          <Button text='Why medium clap?' primary />
        </CTAContainer>
      </Column>
      <Column leftGap>
        <Box>
          <Usage4 />
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

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
import Usage2 from '../patterns/02'
import Usage3 from '../patterns/03'

export const CompoundComponents = () => (
  <StyledContentContainer>
    <H1>Compound Components</H1>

    <Columns>
      <Column>
        <Box isPrimary>
          <Usage2 />
        </Box>
        <CTAContainer alignRight>
          <Button text='Why compound components?' primary />
        </CTAContainer>
      </Column>
      <Column leftGap>
        <Box>
          <Usage3 />
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

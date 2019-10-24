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
import Usage6 from '../patterns/06'
import Usage7 from '../patterns/07'

export const PropsCollection = () => (
  <StyledContentContainer>
    <H1>Props Collection </H1>

    <Columns>
      <Column>
        <Box isPrimary>
          <Usage6 />
        </Box>
        <CTAContainer alignRight>
          <Button text='Why props collection?' primary />
        </CTAContainer>
      </Column>
      <Column leftGap>
        <Box>
          <Usage7 />
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

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
import Usage5 from '../patterns/05'
import Usage6 from '../patterns/06'

export const CustomHooks = () => (
  <StyledContentContainer>
    <H1>Custom Hooks</H1>

    <Columns>
      <Column>
        <Box isPrimary>
          <Usage5 />
        </Box>
        <CTAContainer alignRight>
          <Button text='Why custom hooks?' primary />
        </CTAContainer>
      </Column>
      <Column leftGap>
        <Box>
          <Usage6 />
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

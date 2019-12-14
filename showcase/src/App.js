import React, { useState } from 'react'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'

import Sidebar from './Sidebar'
import Body from './Body'
import { SCREEN_SIZES, media } from './content/StyledContent'

const StyledContainer = styled.div`
  display: grid;
  min-height: 100vh;

  ${media.md`
    grid:
      'sidebar body'
      1fr /24% 1fr;
  `}
`

const App = () => {
  const isMediumOrLarger = useMediaQuery({ minWidth: SCREEN_SIZES.md })

  // toggle sidebar display
  const [showSidebar, setShowSidebar] = useState(false)
  const isSidebarShown = isMediumOrLarger || (!isMediumOrLarger && showSidebar)

  return (
    <StyledContainer>
      {isSidebarShown && <Sidebar setShowSidebar={setShowSidebar} />}
      <Body
        setShowSidebar={setShowSidebar}
        isMediumOrLarger={isMediumOrLarger}
      />
    </StyledContainer>
  )
}

export default hot(module)(App)

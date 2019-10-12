import React from 'react'
import styled from 'styled-components'

const StyledPage = styled.main`
    align-items: center;
    display: flex;
    height: 50vh;
    width: 100vw;
`

const Page = ({ children }) => <StyledPage>{children}</StyledPage>

export default Page

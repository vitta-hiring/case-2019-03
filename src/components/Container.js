import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.section`
    background: #ffff;
    border-radius: 5px;
    display: flex;
    padding: 10px;
`

const Container = ({ children }) => {
    return <StyledContainer>{children}</StyledContainer>
}

export default Container

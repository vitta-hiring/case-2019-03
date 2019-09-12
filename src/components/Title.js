import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.h1`
    margin-top: 20px;
    margin-bottom: 40px;
    color: #21b2d5;
    font-size: 30px;
`

const Title = ({ children }) => {
    return <StyledTitle>{children}</StyledTitle>
}

export default Title

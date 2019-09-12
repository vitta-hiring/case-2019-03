import React from 'react'
import styled from 'styled-components'

const StyledBox = styled.div`
    background: #fdfdfd;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.2);
    opacity: 0.85;
    width: 500px;
    padding: 2.2rem 1.75rem;
`

const Box = ({ children }) => <StyledBox>{children}</StyledBox>

export default Box

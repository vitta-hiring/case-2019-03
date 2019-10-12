import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    background: #21b2d5;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-size: 20px;
    padding: 10px;
    width: 200px;
`

const Button = ({ children, onClick, style }) => {
    return (
        <StyledButton style={style} onClick={onClick}>
            {children}
        </StyledButton>
    )
}

export default Button

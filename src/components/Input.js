import React from 'react'
import styled from 'styled-components'

const StyledBox = styled.div`
    display: flex;
    font-size: 1.125rem;
    margin-bottom: 2rem;
    padding-top: 1.5rem;
    position: relative;
    width: 100%;

    *:focus {
        outline: none;
    }
`

const StyledLabel = styled.label`
    color: #ccc;
    cursor: text;
    position: absolute;
    text-transform: uppercase;
    top: 2rem;
    transition: all 200ms;
`

const StyledInput = styled.input`
    border: 0;
    border-bottom: 0.0875rem solid #000;
    font-size: 1.125rem;
    outline: 0;
    padding: 0.3125rem ${({ type }) => (type === 'password' ? '5rem' : '0')} 0.3125rem 0;
    width: 100%;

    &:focus + ${StyledLabel} {
        font-size: 75%;
        transform: translate3d(0, -150%, 0);
    }

    &:valid + ${StyledLabel} {
        font-size: 75%;
        transform: translate3d(0, -150%, 0);
    }
`

const Input = ({ id, onChange, placeholder }) => {
    return (
        <StyledBox>
            <StyledInput
                autoComplete="off"
                id={id}
                onChange={({ target }) => onChange(target.value)}
                required
                role="presentation"
            />
            <StyledLabel htmlFor={id}> {placeholder} </StyledLabel>
        </StyledBox>
    )
}

export default Input

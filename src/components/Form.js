import React from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
    align-items: center;
    display: flex;
    flex-direction: column;
`

const Form = ({ children, onSubmit }) => (
    <StyledForm onSubmit={onSubmit}>{children}</StyledForm>
)

export default Form

import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

export const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`

export const StyledLink = styled(Link)`
    > img {
        height: 120px;
        width: 20vh;
    }
`

const Brand = () => {
    return (
        <Container>
            <StyledLink to="/">
                <img src={logo} alt="logo clinicweb" />
            </StyledLink>
        </Container>
    )
}
export default Brand

import React from 'react'
import { MdSearch } from 'react-icons/md'
import styled from 'styled-components'

const Container = styled.header`
    align-items: center;
    background: #21b2d5;
    display: flex;
    grid-area: header;
    height: 120px;
    padding-left: 40px;
`

const InputContainer = styled.div`
    align-items: center;
    display: flex;
    margin-left: 40px;
    position: relative;
    width: 60vw;
`

const Input = styled.input`
    display: flex;
    flex: 1;
    border: none;
    border-radius: 50px;
    padding: 13px;
    width: 60%;
`

const Icon = styled(MdSearch)`
    position: absolute;
    right: 10px;
`

const Header = () => {
    return (
        <Container>
            <InputContainer>
                <Input placeholder="Search" />
                <Icon size={20} color="#ccc" />
            </InputContainer>
        </Container>
    )
}

export default Header

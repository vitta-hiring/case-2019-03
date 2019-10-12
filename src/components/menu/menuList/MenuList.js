import React from 'react'
import styled from 'styled-components'
import {
    MdFavoriteBorder,
    MdAssignment,
    MdPeople,
    MdEnhancedEncryption
} from 'react-icons/md'
import { Link } from 'react-router-dom'

const Container = styled.ul`
    list-style: none;
    width: 100%;
`

const MenuLink = styled(Link)`
    align-items: center;
    cursor: pointer;
    color: #000;
    display: flex;
    text-decoration: none;
    padding: 10px;
    padding-top: 10px;
    transition: background 0.4s;

    &:hover {
        background: linear-gradient(
            to right,
            rgba(41, 209, 255, 0.7) 0%,
            rgba(15, 219, 255, 0.11) 100%
        );
    }
`

const MenuList = () => {
    return (
        <Container>
            <MenuLink to="/list-doctors">
                <MdFavoriteBorder color="#000" size={20} />
                <li>Doctors</li>
            </MenuLink>
            <MenuLink to="/list-medicines">
                <MdEnhancedEncryption color="#000" size={20} />
                <li>Medicines</li>
            </MenuLink>
            <MenuLink to="/list-patients">
                <MdPeople color="#000" size={20} />
                <li>Patients</li>
            </MenuLink>
            <MenuLink to="/list-prescriptions">
                <MdAssignment color="#000" size={20} />
                <li>Prescriptions</li>
            </MenuLink>
        </Container>
    )
}

export default MenuList

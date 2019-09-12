import React from 'react'
import styled from 'styled-components'

import MenuList from './menuList/MenuList'

const Container = styled.div`
    display: flex;
    align-items: center;
`

const Menu = () => {
    return (
        <Container>
            <MenuList />
        </Container>
    )
}

export default Menu

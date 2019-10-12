import React from 'react'
import styled from 'styled-components'

import Brand from './Logo'
import Menu from './menu/Menu'

const Container = styled.div`
    grid-area: sidebar;
    background: #fff;
    box-shadow: 5px 0px 20px 0 rgba(0, 0, 0, 0.33);
    z-index: 1;
`

const Sidebar = () => {
    return (
        <Container>
            <Brand />
            <Menu />
        </Container>
    )
}

export default Sidebar

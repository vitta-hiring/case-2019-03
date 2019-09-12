import React from 'react'
import styled from 'styled-components'

const StyledContent = styled.section`
    background: #f1f1f1;
`

const Container = styled.div`
    grid-area: content;
    margin: 0 auto;
    width: 1100px;
`

const Content = ({ children }) => {
    return (
        <StyledContent>
            <Container>{children}</Container>
        </StyledContent>
    )
}

export default Content

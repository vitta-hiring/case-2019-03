import React from 'react'
import styled from 'styled-components'

export const StyledThead = styled.thead`
    margin: 0;
    color: #fff;
    background: #4f81c7;
`

const Thead = ({ pacientes, head }) => {
    const keys = Object.keys(pacientes[0])
    return (
        <StyledThead>
            <tr>
                {keys.map(key => (
                    <th key={key}>{head[key] || key}</th>
                ))}
            </tr>
        </StyledThead>
    )
}

export default Thead

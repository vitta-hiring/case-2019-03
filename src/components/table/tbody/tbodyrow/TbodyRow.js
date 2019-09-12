import React from 'react'
import styled from 'styled-components'

const StyledTr = styled.tr`
    align-items: center;

    p {
        overflow: hidden;
        margin: 0;
        max-width: 200px;
        padding: 0;
        text-overflow: ellipsis;
    }
`

const TbodyRow = ({ data }) => {
    const keys = Object.keys(data)
    return (
        <StyledTr key={data.id}>
            {keys.map(key => (
                <td key={key}>
                    <p>{data[key]}</p>
                </td>
            ))}
        </StyledTr>
    )
}

export default TbodyRow

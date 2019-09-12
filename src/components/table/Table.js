import React from 'react'
import styled from 'styled-components'

import Tbody from './tbody/Tbody'
import Thead from './thead/Thead'

export const StyledTable = styled.table`
    border: 1px solid #000;
    border-collapse: collapse;
    box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 0;
    margin-bottom: 20px;
    width: 700px;
`

const Table = ({ pacientes, head }) => {
    return (
        <StyledTable>
            <Thead pacientes={pacientes} head={head} />
            <Tbody pacientes={pacientes} />
        </StyledTable>
    )
}

export default Table

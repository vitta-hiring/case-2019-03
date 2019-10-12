import React from 'react'

import TbodyRow from './tbodyrow/TbodyRow'

const Tbody = ({ pacientes }) => {
    return (
        <tbody>
            {pacientes.map(data => (
                <TbodyRow data={data} />
            ))}
        </tbody>
    )
}

export default Tbody

import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { pacientes, head } from '../../../_config/data'

import Title from '../../../components/Title'
import Button from '../../../components/Button'
import Content from '../../../components/Content'

import Table from '../../../components/table/Table'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    display: flex;
    padding: 10px;
    width: 100%;
`

const ListMedicines = () => {
    return (
        <Content>
            <Title>
                <h1>Medicines</h1>
            </Title>
            <Container>
                <Table pacientes={pacientes} head={head} />
                <div>
                    <Link to="/create-medicine">
                        <Button style={{ marginRight: 10 }}>Create</Button>
                    </Link>
                    <Button>Edit</Button>
                </div>
            </Container>
        </Content>
    )
}

export default ListMedicines

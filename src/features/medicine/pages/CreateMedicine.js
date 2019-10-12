import React from 'react'
import styled from 'styled-components'

import Input from '../../../components/Input'
import Button from '../../../components/Button'
import Form from '../../../components/Form'
import Title from '../../../components/Title'
import FormBox from '../../../components/formBox/FormBox'
import Content from '../../../components/Content'

const Container = styled.div`
    display: flex;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
`

const CreateMedicine = () => {
    return (
        <Content>
            <Title>
                <h1>Create Medicine</h1>
            </Title>
            <Container>
                <FormBox>
                    <Form>
                        <Input id="name" placeholder="Medicine Name" type="text" />
                        <Input id="dosage" placeholder="dosage" type="text" />
                        <Input
                            id="routes of administration"
                            placeholder="routes of administration"
                            type="text"
                        />
                        <Input
                            id="routes of administration"
                            placeholder="routes of administration"
                            type="text"
                        />
                        <Button>Create</Button>
                    </Form>
                </FormBox>
            </Container>
        </Content>
    )
}

export default CreateMedicine

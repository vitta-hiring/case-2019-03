import React from 'react'
import styled from 'styled-components'

import Input from '../../../components/Input'
import Button from '../../../components/Button'
import Form from '../../../components/Form'
import Title from '../../../components/Title'
import FormBox from '../../../components/prescriptionFormBox/FormBox'
import Content from '../../../components/Content'

const Container = styled.div`
    display: flex;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
`

const CreatePrescription = () => {
    return (
        <Content>
            <Title>
                <h1>Create Prescription</h1>
            </Title>
            <Container>
                <FormBox>
                    <Form>
                        <Input id="name" placeholder="Patient" type="text" />
                        <Input id="doctor" placeholder="Doctor" type="text" />
                        <Input id="medicine" placeholder="Medicine" type="text" />
                        <Input id="dosage" placeholder="dosage" type="text" />
                        <Input id="days" placeholder="days" type="text" />
                        <Button>Create</Button>
                    </Form>
                </FormBox>
            </Container>
        </Content>
    )
}

export default CreatePrescription

import React from 'react'
import { MdNoteAdd, MdPeopleOutline, MdPlaylistAddCheck } from 'react-icons/md'

import { Container, Box } from './styles'

import Content from '../../components/Content'
import Title from '../../components/Title'

const Home = () => {
    return (
        <Content>
            <Title>Home</Title>
            <Container>
                <h3>
                    Tudo que você procura em um Software Médico em uma só plataforma
                    on-line: <span>ClinicWeb</span>
                </h3>
                <Box>
                    <div>
                        <MdPlaylistAddCheck size={50} color="#527db9" />
                        <p>Mais de 200 mil agendamentos ao mês</p>
                    </div>
                    <div>
                        <MdPeopleOutline size={50} color="#527db9" />
                        <p>Mais de 5 milhões de pacientes cadastrados</p>
                    </div>
                    <div>
                        <MdNoteAdd size={50} color="#527db9" />
                        <p>
                            Mais de 500 mil resultados de exames laboratoriais integrados
                        </p>
                    </div>
                </Box>
            </Container>
        </Content>
    )
}

export default Home

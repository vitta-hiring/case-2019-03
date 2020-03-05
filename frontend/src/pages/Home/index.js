import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '~/services/api';
import { Container, Content } from './styles';
import './styles.css';

export default function Home() {
    const [medicamentos, setMedicamentos] = useState([]);
    useEffect(() => {
        async function loadMedicamentos() {
            const response = await api.get('medicamento');
            setMedicamentos(response.data);
        }
        loadMedicamentos();
    }, []);
    return (
        <Container>
            <Content>
                <ul className="medicamento-list">
                    {medicamentos.map(medicamento => (
                        <li key={medicamento._id}>
                            <strong>{medicamento.nome}</strong>
                            <span>{medicamento.label}</span>
                        </li>
                    ))}
                </ul>
                <Link to="/new">
                    <button className="btn"> Criar novo medicamento</button>
                </Link>
                <Link to="/newinteration">
                    <button className="btn"> Criar nova interação</button>
                </Link>
            </Content>
        </Container>
    );
}

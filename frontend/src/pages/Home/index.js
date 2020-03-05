import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '~/services/api';
import { Container, Content } from './styles';
import './styles.css';

export default function Home({ history }) {
    const [medicamentos, setMedicamentos] = useState([]);
    const profile = useSelector(state => state.user.profile);

    useEffect(() => {
        if (profile.type === 'patient') {
            history.push('/consultas');
        }
        async function loadMedicamentos() {
            const response = await api.get('medicamento');
            setMedicamentos(response.data);
        }
        loadMedicamentos();
    }, [history, profile.type]);
    return (
        <Container>
            {profile.type === 'medico' ? (
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
            ) : null}
        </Container>
    );
}

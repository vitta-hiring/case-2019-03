import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '~/services/api';
import { Container, Content } from './styles';
import './styles.css';

export default function Interacoes() {
    const [interacaomedicamentoss, setInteracaomedicamentoss] = useState([]);
    useEffect(() => {
        async function loadInteracaomedicamentoss() {
            const response = await api.get('interacaomedicamentos');
            setInteracaomedicamentoss(response.data);
        }
        loadInteracaomedicamentoss();
    }, []);
    return (
        <Container>
            <Content>
                <ul className="interacaomedicamentos-list">
                    {interacaomedicamentoss.map(interacaomedicamentos => (
                        <li key={interacaomedicamentos._id}>
                            <strong>
                                {interacaomedicamentos.farmaco1} e{' '}
                                {interacaomedicamentos.farmaco2} -{' '}
                                {interacaomedicamentos.nome}
                            </strong>
                            <span>{interacaomedicamentos.descricao}</span>
                        </li>
                    ))}
                </ul>
                <Link to="/newinteration">
                    <button className="btn"> Criar nova interação</button>
                </Link>
            </Content>
        </Container>
    );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '~/services/api';
import { Container, Content } from './styles';
import './styles.css';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

export default function Consulta({ history }) {
    const [consultas, setConsultas] = useState([]);
    const profile = useSelector(state => state.user.profile);
    function formatMedicamentos(medicamentos) {
        let medicamentosStr = 'Medicamentos: ';
        for (const medicamento of medicamentos) {
            medicamentosStr += `${medicamento.nome} `;
        }
        return medicamentosStr;
    }
    useEffect(() => {
        async function loadConsultas() {
            let query = '';
            if (profile.type === 'patient') {
                query = `consulta/my/${profile._id}/type/paciente`;
            } else {
                query = `consulta/my/${profile._id}/type/medico`;
            }
            const response = await api.get(query);
            const data = response.data.map(consulta => ({
                ...consulta,
                timeDistance: formatDistance(
                    parseISO(consulta.creationDate),
                    new Date(),
                    { addSuffix: true, locale: pt }
                ),
                medicamentosStr: formatMedicamentos(consulta.medicamentos),
            }));
            setConsultas(data);
        }
        loadConsultas();
    }, [history, profile._id, profile.type]);
    return (
        <Container>
            <Content>
                <ul className="consulta-list">
                    {consultas.map(consulta => (
                        <li key={consulta._id}>
                            {profile.type === 'medico' ? (
                                <>
                                    <strong>
                                        Paciente: {consulta.paciente.name}
                                    </strong>
                                    <span>{consulta.medicamentosStr}</span>
                                    <span>{consulta.timeDistance}</span>
                                </>
                            ) : (
                                <>
                                    <strong>
                                        Médico: {consulta.medico.name}
                                    </strong>
                                    <span>{consulta.medicamentosStr}</span>
                                    <span>{consulta.timeDistance}</span>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
                {profile.type === 'medico' ? (
                    <Link to="/newconsulta">
                        <button className="btn"> Criar nova consulta</button>
                    </Link>
                ) : null}
            </Content>
        </Container>
    );
}

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';
import { Container, Badge, Scroll, ConsultaList, Consulta } from './styles';

export default function Consultas() {
    const [visible, setVisible] = useState(false);
    const [consultas, setConsultas] = useState([]);
    const profile = useSelector(state => state.user.profile);
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
    }, [profile._id, profile.type]);

    function handleToggleVisible() {
        setVisible(!visible);
    }
    function formatMedicamentos(medicamentos) {
        let medicamentosStr = 'Medicamentos: ';
        for (const medicamento of medicamentos) {
            medicamentosStr += `${medicamento.nome} `;
        }
        return medicamentosStr;
    }
    return (
        <Container>
            <Badge onClick={handleToggleVisible}>
                <MdNotifications color="#7159c1" size={20} />
            </Badge>
            <ConsultaList visible={visible}>
                <Scroll>
                    {consultas.map(consulta => (
                        <Consulta key={consulta._id}>
                            {profile.type === 'medico' ? (
                                <p>Paciente: {consulta.paciente.name}</p>
                            ) : (
                                <p>Médico: {consulta.medico.name}</p>
                            )}
                            <p>{consulta.medicamentosStr}</p>
                            <time>{consulta.timeDistance}</time>
                        </Consulta>
                    ))}
                </Scroll>
            </ConsultaList>
        </Container>
    );
}

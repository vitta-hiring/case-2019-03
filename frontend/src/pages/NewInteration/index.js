import React, { useState } from 'react';
import '../Home/styles.css';
import { toast } from 'react-toastify';
import { Content } from '../Home/styles';
import { Container } from './styles';
// import { Container } from './styles';
import api from '~/services/api';

export default function NewInteration({ history }) {
    const [nome, setNome] = useState('');
    const [medicamentos1, setMedicamentos1] = useState([]);
    const [medicamentos2, setMedicamentos2] = useState([]);
    const [farmaco1, setFarmaco1] = useState('');
    const [farmaco2, setFarmaco2] = useState('');
    const [descricao, setDescricao] = useState('');
    async function buscaPorFarmaco() {
        try {
            const response = await api.get(
                `/medicamento/byFarmaco/${encodeURIComponent(farmaco1)}`
            );
            const med1 = response.data.map(elm => ({
                id_medicamento: elm._id,
                nome: elm.nome,
            }));
            if (med1.length === 0) {
                toast.error(
                    `Nenhum medicamento com o farmaco ${farmaco2} foi encontrado`
                );
            }
            setMedicamentos1(med1);
        } catch (e) {
            toast.error(
                `Nenhum medicamento com o farmaco ${farmaco1} foi encontrado`
            );
        }
        try {
            const response = await api.get(
                `/medicamento/byFarmaco/${encodeURIComponent(farmaco2)}`
            );
            const med2 = response.data.map(elm => ({
                id_medicamento: elm._id,
                nome: elm.nome,
            }));
            if (med2.length === 0) {
                toast.error(
                    `Nenhum medicamento com o farmaco ${farmaco2} foi encontrado`
                );
            }
            setMedicamentos2(med2);
        } catch (e) {
            toast.error(
                `Nenhum medicamento com o farmaco ${farmaco2} foi encontrado`
            );
        }
    }
    async function handleSubmit() {
        await buscaPorFarmaco();
        const objMedicamento = {
            nome,
            farmaco1,
            farmaco2,
            descricao,
            medicamentos1,
            medicamentos2,
        };
        try {
            await api.post('/interacaomedicamentos', objMedicamento);
            history.push('/home');
        } catch (e) {
            toast.error('Falha ao inserir interação, verifique os dados');
        }
    }

    return (
        <Container>
            <Content>
                <form>
                    <label htmlFor="nome">NOME *</label>
                    <input
                        id="nome"
                        placeholder="Nome do medicamento"
                        value={nome}
                        onChange={event => setNome(event.target.value)}
                    />

                    <label htmlFor="farmaco1">FARMACO1 *</label>
                    <input
                        id="farmaco1"
                        placeholder="Qual é o farmaco1?"
                        value={farmaco1}
                        onChange={event => setFarmaco1(event.target.value)}
                    />
                    <label htmlFor="farmaco2">FARMACO2 *</label>
                    <input
                        id="farmaco2"
                        placeholder="Qual é o farmaco2?"
                        value={farmaco2}
                        onChange={event => setFarmaco2(event.target.value)}
                    />
                    <label htmlFor="descricao">DESCRIÇÃO *</label>
                    <input
                        id="descricao"
                        placeholder="Qual é a descricao?"
                        value={descricao}
                        onChange={event => setDescricao(event.target.value)}
                    />
                </form>
                <button onClick={handleSubmit} className="btn">
                    Cadastrar
                </button>
            </Content>
        </Container>
    );
}

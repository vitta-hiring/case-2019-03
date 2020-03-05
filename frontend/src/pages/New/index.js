import React, { useState } from 'react';
import '../Home/styles.css';
import { toast } from 'react-toastify';
import { Content } from '../Home/styles';
import { Container } from './styles';
// import { Container } from './styles';
import api from '~/services/api';

export default function New({ history }) {
    const [nome, setNome] = useState('');
    const [farmacos, setFarmacos] = useState('');
    const [concentracao, setConcentracao] = useState('');
    const [unidade, setUnidade] = useState('');
    const [tipoMedicamento, setTipoMedicamento] = useState('');
    const [formaFarmaceutica, setFormaFarmaceutica] = useState('');
    const [viaAdministracao, setViaAdministracao] = useState('');
    const [codigoATC, setCodigoATC] = useState('');
    const [bula, setBula] = useState('');
    const [portaria344, setPortaria344] = useState('');
    const [tiss, setTiss] = useState('');
    const [label, setLabel] = useState('');
    const [mip, setMip] = useState(false);
    const [usoInterno, setUsoInterno] = useState(false);
    const [antimicrobiano, setAntimicrobiano] = useState(false);
    const [controleEspecial, setControleEspecial] = useState(false);
    async function handleSubmit() {
        const farmacosArray = [];
        const arrayAux = farmacos.split(',');
        for (const f of arrayAux) {
            const objFarmaco = { nome: f };
            farmacosArray.push(objFarmaco);
        }
        const objMedicamento = {
            nome,
            farmacos: farmacosArray,
            unidade,
            concentracao,
            tipoMedicamento,
            usoInterno,
            label,
            formaFarmaceutica,
            viaAdministracao,
            codigoATC,
            bula,
            portaria344,
            tiss,
            mip,
            antimicrobiano,
            controleEspecial,
        };
        try {
            const response = await api.post('/medicamento', objMedicamento);
            if (response.status === 200) {
                toast.success('Medicamento inserido com sucesso');
            }
            history.push('/home');
        } catch (e) {
            toast.error('Falha ao inserir medicamento, verifique os dados');
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
                    <label htmlFor="farmacos">FARMACOS *</label>
                    <input
                        id="farmacos"
                        placeholder="Quais farmacos o medicamentos possui?"
                        value={farmacos}
                        onChange={event => setFarmacos(event.target.value)}
                    />
                    <label htmlFor="concentracao">CONCENTRAÇÃO *</label>
                    <input
                        id="concentracao"
                        placeholder="Qual é a concentração?"
                        value={concentracao}
                        onChange={event => setConcentracao(event.target.value)}
                    />
                    <label htmlFor="unidade">UNIDADE *</label>
                    <input
                        id="unidade"
                        placeholder="Qual é a unidade?"
                        value={unidade}
                        onChange={event => setUnidade(event.target.value)}
                    />
                    <label htmlFor="tipoMedicamento">
                        TIPO DE MEDICAMENTO *
                    </label>
                    <input
                        id="tipoMedicamento"
                        placeholder="Qual é o tipo de medicamento?"
                        value={tipoMedicamento}
                        onChange={event =>
                            setTipoMedicamento(event.target.value)
                        }
                    />
                    <label htmlFor="formaFarmaceutica">
                        FORMA FARMACÊUTICA *
                    </label>
                    <input
                        id="formaFarmaceutica"
                        placeholder="Qual é a forma farmacêutica?"
                        value={formaFarmaceutica}
                        onChange={event =>
                            setFormaFarmaceutica(event.target.value)
                        }
                    />
                    <label htmlFor="viaAdministracao">
                        VIA ADMINISTRAÇÃO *
                    </label>
                    <input
                        id="viaAdministracao"
                        placeholder="Qual é a via admnistração?"
                        value={viaAdministracao}
                        onChange={event =>
                            setViaAdministracao(event.target.value)
                        }
                    />
                    <label htmlFor="codigoATC">CÓDIGO ATC *</label>
                    <input
                        id="codigoATC"
                        placeholder="Qual é o código ATC?"
                        value={codigoATC}
                        onChange={event => setCodigoATC(event.target.value)}
                    />
                    <label htmlFor="bula">BULA *</label>
                    <input
                        id="bula"
                        placeholder="Qual é a bula?"
                        value={bula}
                        onChange={event => setBula(event.target.value)}
                    />
                    <label htmlFor="portaria344">PORTARIA 344 *</label>
                    <input
                        id="portaria344"
                        placeholder="Qual é a portaria344?"
                        value={portaria344}
                        onChange={event => setPortaria344(event.target.value)}
                    />
                    <label htmlFor="tiss">TISS *</label>
                    <input
                        id="tiss"
                        placeholder="Qual é o TISS?"
                        value={tiss}
                        onChange={event => setTiss(event.target.value)}
                    />
                    <label htmlFor="label">LABEL *</label>
                    <input
                        id="label"
                        placeholder="Qual é a label?"
                        value={label}
                        onChange={event => setLabel(event.target.value)}
                    />
                    <div id="checkboxs">
                        <label htmlFor="mip">MIP</label>
                        <input
                            id="mip"
                            type="checkbox"
                            value={mip}
                            onChange={event => setMip(event.target.checked)}
                        />{' '}
                        <label htmlFor="usoInterno">USO INTERNO</label>
                        <input
                            id="usoInterno"
                            type="checkbox"
                            value={usoInterno}
                            onChange={event =>
                                setUsoInterno(event.target.checked)
                            }
                        />
                        <label htmlFor="antimicrobiano">ANTI MICROBIANO</label>
                        <input
                            id="antimicrobiano"
                            type="checkbox"
                            value={antimicrobiano}
                            onChange={event =>
                                setAntimicrobiano(event.target.checked)
                            }
                        />
                        <label htmlFor="controleEspecial">
                            CONTROLE ESPECIAL
                        </label>
                        <input
                            id="controleEspecial"
                            type="checkbox"
                            value={controleEspecial}
                            onChange={event =>
                                setControleEspecial(event.target.checked)
                            }
                        />
                    </div>
                </form>
                <button onClick={handleSubmit} className="btn">
                    Cadastrar
                </button>
            </Content>
        </Container>
    );
}

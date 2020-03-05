import React, { useState, useEffect } from 'react';
import '../Home/styles.css';
import { toast } from 'react-toastify';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { useSelector } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import { Content } from '../Home/styles';
import { Container } from './styles';
// import { Container } from './styles';
import api from '~/services/api';

export default function NewConsulta({ history }) {
    const profile = useSelector(state => state.user.profile);

    const [medicamentosSelected, setMedicamentosSelected] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = event => {
        setPaciente(event.target.value);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleChangeMultiple = event => {
        setMedicamentosSelected(event.target.value);
    };
    useEffect(() => {
        async function loadMedicamentos() {
            const response = await api.get('medicamento');
            setMedicamentos(response.data);
        }
        async function loadPacientes() {
            const response = await api.get('user/patients');
            setPacientes(response.data);
        }
        loadMedicamentos();
        loadPacientes();
    }, []);
    async function handleSubmit() {
        const objConsulta = {
            paciente,
            medico: profile._id,
            medicamentos: medicamentosSelected.map(elm => ({
                id_medicamento: elm._id,
                nome: elm.nome,
            })),
            dataConsulta: new Date(),
        };
        try {
            await api.post('/consulta', objConsulta);
            history.push('/consultas');
        } catch (e) {
            toast.error('Falha ao criar consulta, verifique os dados');
        }
    }

    return (
        <Container>
            <Content>
                <form>
                    <InputLabel id="demo-mutiple-chip-label">
                        Medicamentos
                    </InputLabel>
                    <Select
                        labelId="demo-mutiple-chip-label"
                        id="demo-mutiple-chip"
                        multiple
                        style={{ marginBottom: 20 }}
                        value={medicamentosSelected}
                        onChange={handleChangeMultiple}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={selected => (
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {selected.map(value => (
                                    <Chip
                                        key={value._id}
                                        label={value.nome}
                                        style={{ margin: 2 }}
                                    />
                                ))}
                            </div>
                        )}
                    >
                        {medicamentos.map(medicamento => (
                            <MenuItem key={medicamento._id} value={medicamento}>
                                {medicamento.nome}
                            </MenuItem>
                        ))}
                    </Select>
                    <InputLabel id="demo-controlled-open-select-label">
                        Paciente
                    </InputLabel>
                    <Select
                        style={{ marginBottom: 20 }}
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={paciente}
                        onChange={handleChange}
                    >
                        {pacientes.map(patient => (
                            <MenuItem key={patient._id} value={patient._id}>
                                {patient.name}
                            </MenuItem>
                        ))}
                    </Select>
                </form>
                <button onClick={handleSubmit} className="btn">
                    Marcar consulta
                </button>
            </Content>
        </Container>
    );
}

import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { rgba } from 'polished';
import { signUpRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
    name: Yup.string().required('O name é obrigatório'),
    email: Yup.string()
        .email('Insira um email válido')
        .required('O email é obrigatório'),
    password: Yup.string()
        .min(6, 'No mínimo 6 caracteres')
        .required('A password é obrigatória'),
    passwordConfirmation: Yup.string()
        .min(6, 'No mínimo 6 caracteres')
        .required('A password é obrigatória'),
});
export default function SignUp() {
    const dispatch = useDispatch();
    const [type, setType] = React.useState('patient');
    const [open, setOpen] = React.useState(false);
    function handleSubmit({ name, email, password, passwordConfirmation }) {
        dispatch(
            signUpRequest(name, email, password, passwordConfirmation, type)
        );
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = event => {
        setType(event.target.value);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <>
            <img src={logo} alt="GoMedic" />
            <Form schema={schema} onSubmit={handleSubmit}>
                <Select
                    style={{
                        color: 'white',
                        background: rgba(0, 0, 0, 0.1),
                        marginBottom: 10,
                        borderRadius: 4,
                        border: 'none',
                    }}
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={type}
                    onChange={handleChange}
                >
                    <MenuItem value="medico">Médico</MenuItem>
                    <MenuItem value="patient">Paciente</MenuItem>
                </Select>
                <Input name="name" placeholder="Seu nome" />
                <Input name="email" type="email" placeholder="Seu email" />
                <Input
                    name="password"
                    type="password"
                    placeholder="Sua password"
                />
                <Input
                    name="passwordConfirmation"
                    type="password"
                    placeholder="Confirme a password"
                />
                <button type="submit">Criar conta</button>
                <Link to="/">Já tenho login</Link>
            </Form>
        </>
    );
}

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Insira um email válido')
        .required('O email é obrigatório'),
    password: Yup.string().required('A password é obrigatória'),
});
// import { Container } from './styles';
export default function SignIn() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);
    function handleSubmit({ email, password }) {
        dispatch(signInRequest(email, password, password));
    }
    return (
        <>
            <img src={logo} alt="GoMedic" />
            <Form schema={schema} onSubmit={handleSubmit}>
                <Input name="email" type="email" placeholder="Seu email" />
                <Input name="password" type="password" placeholder="Sua password" />
                <button type="submit">
                    {loading ? 'Carregando...' : 'Acessar'}
                </button>
                <Link to="/register">
                    Ainda não tem conta? Clique aqui para criar
                </Link>
            </Form>
        </>
    );
}

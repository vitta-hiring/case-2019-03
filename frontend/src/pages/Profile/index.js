import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { Container } from './styles';
import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

export default function Profile() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile);
    const [email, setEmail] = React.useState(profile.email);
    function handleSubmit(data) {
        dispatch(updateProfileRequest(data));
    }
    function handleSignOut() {
        dispatch(signOut());
    }
    const handleChangeEmail = event => {
        setEmail(email);
    };
    return (
        <Container>
            <Form initialData={profile} onSubmit={handleSubmit}>
                <Input name="name" placeholder="Nome completo" />
                <Input
                    name="email"
                    type="email"
                    value={email}
                    onChange={e => handleChangeEmail(e)}
                    placeholder="Seu endereço de email"
                />
                <hr />
                <Input
                    type="password"
                    name="oldPassword"
                    placeholder="Sua password"
                />
                <Input type="password" name="password" placeholder="Nova password" />
                <Input
                    type="password"
                    name="passwordConfirmation"
                    placeholder="Confirme a nova password"
                />
                <button type="submit">Atualizar perfil</button>
            </Form>
            <button onClick={handleSignOut} type="button">
                Sair
            </button>
        </Container>
    );
}

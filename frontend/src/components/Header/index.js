import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Content, Profile } from './styles';
import Consultas from '~/components/Consultas';
import logo from '~/assets/logo.svg';

export default function Header() {
    const profile = useSelector(state => state.user.profile);
    return (
        <Container>
            <Content>
                <nav>
                    <img height={30} src={logo} alt="goMedic" />
                    <Link to="/home">MEDICAMENTOS</Link>
                    <Link to="/home">INTERAÇÕES</Link>
                </nav>
                <aside>
                    <Consultas />
                    <Profile>
                        <div>
                            <strong>{profile.name}</strong>
                            <Link to="/profile">Meu Perfil</Link>
                        </div>
                    </Profile>
                </aside>
            </Content>
        </Container>
    );
}

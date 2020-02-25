import React, { useEffect } from "react";
import { Layout, Menu, Breadcrumb, Icon, Button } from "antd";
import Link from "next/link";
import "./style.scss";
import SubMenu from "antd/lib/menu/SubMenu";
import Title from "antd/lib/typography/Title";
import { AppState } from "../../store/ducks/rootReducer";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import LandingPage from "../LandingPage";
import { logout } from "../../utils/auth";
import { AuthTypes } from "../../store/ducks/auth/types";
import Router from "next/router";

const { Header, Content, Footer } = Layout;
// type Props = {
//   errors: {
//     hasError: boolean;
//     message: string | boolean;
//   };
//   theme?: Theme;
// };

const MainLayout = props => {
  //   const classes = useStyle(props.theme);
  const authState = useSelector((state: AppState) => state.auth, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authState.appIsLoading) {
      if (
        !authState.isLogged &&
        Router.pathname !== "/" &&
        Router.pathname !== "/signin" &&
        Router.pathname !== "/signup"
      ) {
        Router.replace("/");
      } else if (
        Router.pathname == "/" ||
        Router.pathname == "/signin" ||
        Router.pathname == "/signup"
      ) {
        Router.replace("/app");
      }
    }
  }, [authState.isLogged]);

  const handleLogout = e => {
    e.preventDefault();
    dispatch({
      type: AuthTypes.LOGOUT_REQUEST
    });
    logout();
  };

  return (
    <Layout style={{ height: "100vh" }}>
      {authState.isLogged && (
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            display: "flex"
          }}
        >
          <Title
            level={4}
            style={{
              color: "white",
              margin: 0,
              display: "flex",
              alignItems: "center"
            }}
          >
            SAFE PRESCRIPTIONS
          </Title>
          <Menu
            theme="dark"
            mode="horizontal"
            // defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key={1}>
              <Link href="/app/prescriptions">
                <span>
                  <Icon type="book" />
                  Receita
                </span>
              </Link>
            </Menu.Item>
            <SubMenu
              title={
                <span className="submenu-title-wrapper">
                  <Icon type="setting" />
                  Cadastro de Remédios
                </span>
              }
            >
              <Menu.Item key="setting:1">
                <Link href="/app/medicines">
                  <a>Remédios</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="setting:2">
                <Link href="/app/drugs">
                  <a>Farmacos</a>
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key={3}>
              <Link href="/app/drugsinteractions">
                <span>
                  <Icon type="interaction" />
                  Interações Medicamentosas
                </span>
              </Link>
            </Menu.Item>
          </Menu>
          <div style={{ marginRight: "auto" }} />
          <Menu
            theme="dark"
            mode="horizontal"
            // defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px" }}
          >
            <SubMenu
              title={
                <span className="submenu-title-wrapper">
                  <Icon type="user" />
                  {authState.data.firstName}
                </span>
              }
            >
              <Menu.Item key="setting:1">
                <a onClick={handleLogout}>Sair</a>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Header>
      )}
      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div
          style={{
            background: authState.isLogged && "#fff",
            height: !authState.isLogged && "100%",
            padding: 24,
            minHeight: 380,
            margin: "16px 0"
          }}
        >
          {authState.isLogged ? props.children : <LandingPage {...props} />}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Safe Prescriptions ©2020 Created by Lucas Ferreira
      </Footer>
    </Layout>
  );
};

export default MainLayout;

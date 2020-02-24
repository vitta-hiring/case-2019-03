import React from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import Link from "next/link";
import "./style.scss";
import SubMenu from "antd/lib/menu/SubMenu";

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
  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          // defaultSelectedKeys={["1"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key={1}>
            <Link href="/prescriptions">
              <span>
                <Icon type="setting" />
                Receita
              </span>
            </Link>
          </Menu.Item>
          <SubMenu
            title={
              <span className="submenu-title-wrapper">
                <Icon type="setting" />
                Remédios
              </span>
            }
          >
            <Menu.Item key="setting:1">
              <Link href="/medicines">
                <a>Remédios</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="setting:2">
              <Link href="/drugs">
                <a>Farmacos</a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key={3}>
            <Link href="/drugsinteractions">
              <span>
                <Icon type="setting" />
                Interações Medicamentosas
              </span>
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div
          style={{
            background: "#fff",
            padding: 24,
            minHeight: 380,
            margin: "16px 0"
          }}
        >
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Safe Prescriptions ©2020 Created by Lucas Ferreira
      </Footer>
    </Layout>
  );
};

export default MainLayout;

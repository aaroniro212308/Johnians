import React, { useState } from "react";
import { Button, Layout } from "antd";
import MenuList from "../components/MenuList";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Logo from "../components/Logo";
import PageContent from "../../Routes/PageContent";

const { Sider, Content } = Layout;
//main
const MainDashboard = () => {
  const [collapsed, setColllapsed] = useState(false);

  return (
    <>
      <Layout className="container">
        <Layout>
          <Sider
            collapsed={collapsed}
            collapsible
            trigger={null}
            className="sidebar"
          >
            <Logo />
            <MenuList className="menu-item" />
          </Sider>

          <Layout className="layout-container">
            <Button
              style={{ margin: "10px" }}
              type="text"
              className="toggle"
              onClick={() => {
                setColllapsed(!collapsed);
              }}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />

            <Content className="content">
              <PageContent />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default MainDashboard;

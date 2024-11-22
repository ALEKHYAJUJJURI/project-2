import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Layout, Menu, Input, Button, Row, Col } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import axios from "axios";

const { Header } = Layout;

export function LoadingPage() {
  
   
  
  return (
    <div className="container-fluid" style={{ height: "100vh", backgroundSize: "cover" }}>
      <Row>
        <Col span={24}>
          <Header
            className="bg-body-tertiary"
            style={{
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 16px",
            }}
          >
            <div className="logo">
              <h2 >Shopping.</h2>
            </div>
            <Menu
              mode="horizontal"
              style={{
                flexGrow: 1,
                marginLeft: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
              selectable={false}
            >
              <Menu.Item key="search" style={{ flex: 1, marginRight: 10 }}>
                <Input
                  placeholder="Search here..."
                  suffix={<SearchOutlined style={{ color: "#f0ad4e" }} />}
                  style={{ width: "100%" }}
                />
              </Menu.Item>
              <Menu.Item key="signup" style={{ marginRight: 10 }}>
                <Link to="/signup">
                  <Button type="primary" style={{ width: "100%" }}>
                    Signup
                  </Button>
                </Link>
              </Menu.Item>


              <Menu.Item key="login" style={{ marginRight: 10 }}>
                <Link to="/login">
                  <Button
                    type="default"
                    style={{ backgroundColor: "#f0ad4e", color: "#fff", width: "100%" }}
                  >
                    Login
                  </Button>
                </Link>
              </Menu.Item>
              <Menu.Item key="profile">
                <Button shape="circle" icon={<UserOutlined />} />
              </Menu.Item>
            </Menu>
          </Header>
        </Col>
      </Row>

      <Row justify="center" align="middle" style={{ height: "calc(100vh - 80px)" }}>
        <Col>
          <h2 className="h5">Load the components...</h2>
        </Col>
      </Row>
    </div>
  );
}

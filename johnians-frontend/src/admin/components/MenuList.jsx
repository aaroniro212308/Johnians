import React from "react";
import { Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import { FaUsers } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MenuList = () => {
  const navigate = useNavigate();
  //menu Items start
  const menuItems = [
    { key: "johnians", icon: <FaUsers />, text: "Johnians" },
    { key: "payments", icon: <MdPayment />, text: "Payments" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/admin", { replace: true });
    window.location.reload();
  };

  //menu Items end
  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        className="menu-bar"
        defaultSelectedKeys={["johnians"]}
        onClick={(item) => {
          navigate(item.key);
        }}
      >
        {menuItems.map((item) => (
          <Menu.Item className="menu-item" key={item.key} icon={item.icon}>
            {item.text}
          </Menu.Item>
        ))}
        <div className="logout-button">
          <LogoutOutlined onClick={handleLogout} />
        </div>
      </Menu>
    </>
  );
};

export default MenuList;

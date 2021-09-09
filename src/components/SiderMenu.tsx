import { Button, Layout, Menu } from 'antd'
import React, { useState } from 'react'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { menuItem, menuStyle, navLink, sider } from './Styled';
import { NavLink } from 'react-router-dom';
import { useRouteType } from 'utils';

const { Sider } = Layout

export const SiderMenu = ({ menuList }: { menuList: any }) => {
  const routeType = useRouteType();
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      width={160}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      theme="light"
      style={sider}
      collapsedWidth={60}
      trigger={<Button type="link" onClick={onCollapse} style={{ marginBottom: 16 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, { className: "trigger" })}
      </Button>}
    >
      <Menu selectedKeys={[routeType]} style={menuStyle}>
        {
          menuList?.map((item: any) => (
            <Menu.Item key={item.url} style={menuItem} icon={<item.icon />}>
              <NavLink to={item.url.replace('/', '')} style={navLink}>{item.name}</NavLink>
            </Menu.Item>
          ))
        }
      </Menu>
    </Sider>
  )
}
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from '../images/logo.svg';
import { logout } from '../../auth/helper-methods';
import { useAdminMenu } from "../hooks/useAdminMenu";

export const AdminLayout = () => {
    const location = useLocation();

    const menu = useAdminMenu();

    const menuItemRender = (item: any, dom: any) => (item && item.path)
        ? <Link to={item.path}> {dom} </Link>
        : dom;
 
    return <ProLayout
        logo={<img src={logo} alt="logo" />}
        title="Boilerplate Admin"
        layout="mix"
        location={location}
        siderMenuType='sub'
        menuItemRender={menuItemRender}
        route={menu}
        avatarProps={{
            icon: <UserOutlined />,
            style: { backgroundColor: '#87d068' },
            render: (_props, dom) => (
                <Dropdown
                    menu={{
                        onClick: (e) => {
                            if (e.key === 'logout') {
                                logout();
                            }
                        },
                        items: [
                            {
                                key: 'logout',
                                label: 'Logout',
                                icon: <LogoutOutlined />,
                            }
                        ]
                    }}>
                    { dom }
                </Dropdown>
            )
        }}
    >
        <Outlet />
    </ProLayout>;
}

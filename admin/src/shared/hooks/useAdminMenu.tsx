import { DashboardOutlined, ShopOutlined } from "@ant-design/icons"

export const useAdminMenu = () => {
    // you can filter items by current user role etc.

    const menu = {
        path: '/admin',
        routes: [
            {  
                path: '/admin/dashboard',
                icon: <DashboardOutlined />,
                key: 'dashboard',
                name: 'Dashboard',
            },
            {
                path: '/admin/properties',
                icon: <ShopOutlined />,
                key: 'properties',
                name: 'Properties',
                routes: [
                    {
                        path: 'create',
                        hideInMenu: true,
                        name: 'Create Property'
                    },
                    {
                        path: 'edit/:id',
                        hideInMenu: true,
                        name: 'Update Property'
                    },
                ]
            }
        ]
    }

    return menu;
}
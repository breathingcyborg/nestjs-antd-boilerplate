import { PageContainer, PageContainerProps, ProBreadcrumb } from '@ant-design/pro-components';
import { ItemType } from 'antd/lib/breadcrumb/Breadcrumb';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const getBreadcrumbName = (route: ItemType, params: any): string | null => {
    if (!route.breadcrumbName) {
        return null;
    }

    var paramsKeys = Object.keys(params).join('|');
    var name = route.breadcrumbName.replace(new RegExp(":(".concat(paramsKeys, ")"), 'g'), function (replacement, key) {
        return params[key] || replacement;
    });
    return name;
}

/**
 * Ant design breadcrumbs that work with react router
 */
export const AntBreadCrumb: FC = () => {
    return <ProBreadcrumb itemRender={(route, params, routes, path) => {
        const isLastItem = routes.indexOf(route) === routes.length - 1;
        const name = getBreadcrumbName(route, params);
        return isLastItem
            ? <span>{name}</span>
            : (
                <Link to={
                    // @ts-ignore
                    route.linkPath || ''}>
                    {name}
                </Link>
            )
    }} />
}

/**
 * 
 * Identical to ant design pro page container
 * except breadcrumbs work with react router.
 * 
 */
export const AntPageContainer: FC<PageContainerProps> = ({ children, ...rest }) => {
    return <PageContainer breadcrumbRender={() => <AntBreadCrumb />} {...rest}>
        {children}
    </PageContainer>
}
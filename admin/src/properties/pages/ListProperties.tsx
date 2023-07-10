import { EditOutlined, PlusOutlined } from "@ant-design/icons"
import { ProTable, ProTableProps } from "@ant-design/pro-components"
import { Button } from "antd"
import { Link } from "react-router-dom"
import { AntPageContainer } from "../../shared/components/AntPageContainer"
import { getPaginationParams } from "../../shared/utils/common"
import { getUserSelectLabel } from "../../users/utils"
import propertiesApi from "../api"
import { propertyTypeLabels, listingTypeLabels } from "../enum-labels"
import { ListPropertyRequest, ListPropertySortFields, Property } from "../types"
import { formatArea } from "../utils"

export const ListProperties = () => {

    const fetchProperties : ProTableProps<Property, ListPropertyRequest>['request'] = async (params, sort, _) => {

        const request : ListPropertyRequest = {
            title: params.title,
            listingType: params.listingType,
            propertyType: params.propertyType,
            sortField: ListPropertySortFields.CreatedAt,
            sortOrder: 'ascend',
            ...getPaginationParams(params),
        };

        if (sort?.createdAt) {
            params.sortField = ListPropertySortFields.CreatedAt
            params.sortOrder = sort.createdAt
        }

        if (sort?.updatedAt) {
            params.sortField = ListPropertySortFields.UpdatedAt
            params.sortOrder = sort.updatedAt
        }

        return propertiesApi.index(request)
    }

    return <AntPageContainer>
        <ProTable<Property, ListPropertyRequest>
            request={fetchProperties}
            form={{ syncToUrl: true }}
            rowSelection={{  }}
            toolBarRender={(action, rows)=> [
                <Link to='create'>
                    <Button icon={<PlusOutlined/>} type='primary'>
                        Create
                    </Button>
                </Link>,
                <Button
                    danger 
                    onClick={() => alert(JSON.stringify(rows.selectedRowKeys, null, 4))}>
                    Bulk Action
                </Button>
            ]}
            rowKey='id'
            columns={[
                {
                    key: 'id',
                    hideInTable: true,
                    title: 'ID',
                },
                {
                    key: 'title',
                    title: 'Title',
                    dataIndex: 'title',
                },
                {
                    key: 'user',
                    title: 'Posted By',
                    dataIndex: 'user',
                    render: (_, property) => {
                        return getUserSelectLabel(property.user);
                    },
                    hideInSearch: true,
                },
                {
                    key: 'propertyType',
                    title: 'Type',
                    dataIndex: 'propertyType',
                    valueEnum: propertyTypeLabels,
                },
                {
                    key: 'area',
                    title: 'Area',
                    render: (_, entity) => {
                        return formatArea(entity);
                    },
                    hideInSearch: true,
                },
                {
                    key: 'listingType',
                    title: 'Listing Type',
                    dataIndex: 'listingType',
                    valueEnum: listingTypeLabels
                },
                {
                    key: 'createdAt',
                    dataIndex: 'createdAt',
                    title: 'Created At',
                    sorter: true,
                    valueType: 'dateTime',
                    hideInSearch: true,
                },
                {
                    key: 'updatedAt',
                    dataIndex: 'updatedAt',
                    title: 'Updated At',
                    sorter: true,
                    valueType: 'dateTime',
                    hideInSearch: true,
                },
                {
                    key: 'actions',
                    valueType: 'option',
                    title: 'Actions',
                    render: (dom, row, index) => [
                        <Link to={`edit/${row.id}`}>
                            <EditOutlined />
                        </Link>
                    ]
                }
            ]}
        />
    </AntPageContainer>
}
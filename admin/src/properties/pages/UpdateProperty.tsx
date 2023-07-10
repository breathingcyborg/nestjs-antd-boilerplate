import { ProCard, ProForm } from "@ant-design/pro-components";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { AntPageContainer } from "../../shared/components/AntPageContainer";
import propertiesApi from "../api";
import { PropertyFormFields } from "../components/field-groups/PropertyFormFields";
import { toApiRequest, toFormState, UpdatePropertyFormState } from "../form-state/update-property-form-state";


export const UpdateProperty = () => {
    const { id } = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    return <AntPageContainer>
        { contextHolder }
        <ProCard>
            <ProForm<UpdatePropertyFormState>
                grid
                onFinish={async (data) => {
                    const request = toApiRequest(data);

                    await propertiesApi.update(id!, request);

                    messageApi.success("updated");
                    navigate(-1);
                }}
                request={() => propertiesApi.findOne(id!).then(toFormState)}
            >
                <PropertyFormFields/>
            </ProForm>
        </ProCard>
    </AntPageContainer>
}
import { ProCard, ProForm } from "@ant-design/pro-components"
import { AntPageContainer } from "../../shared/components/AntPageContainer"
import { ListingType, PropertyType } from "../enums"
import { PropertyFormFields } from "../components/field-groups/PropertyFormFields"
import { message } from "antd"
import { useNavigate } from "react-router-dom"
import propertiesApi from "../api"
import { CreatePropertyFormState, toApiRequest } from "../form-state/create-property-form-state"


export const CreateProperty = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate();

    return <AntPageContainer>
        { contextHolder }
        <ProCard>
            <ProForm<CreatePropertyFormState>
                grid
                onFinish={async (data) => {
                    const request = toApiRequest(data);
                    await propertiesApi.create(request);

                    messageApi.success("Created");
                    navigate(-1);
                }}
                initialValues={{
                    propertyType: PropertyType.Apartment,
                    listingType: ListingType.Rent,
                }}
            >
                <PropertyFormFields />
            </ProForm>
        </ProCard>
    </AntPageContainer>
}

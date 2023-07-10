import { ProFormDigit, ProFormGroup, ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { UserSearchInput } from "../../../users/components/UserSearchInput";
import { areaUnitLabels } from "../../enum-labels";

export const GeneralFields = () => {
    return <ProFormGroup title='General' collapsible>

        <UserSearchInput
            colProps={{ span: 'auto' }}
            name='user'
            label='Posted By'
            rules={[
                { required: true, message: 'required' },
            ]}
        />

        <ProFormText
            colProps={{ span: 'auto' }}
            name="title"
            label="Title"
            rules={[
                { required: true, message: 'required' },
            ]} />

        <ProFormTextArea
            name="description"
            label="Description"
            rules={[
                { required: true, message: 'required' },
            ]} />

        <ProFormGroup>
            <ProFormDigit
                colProps={{ span: 'auto' }}
                name="area"
                label="Area"
                min={1}
                width='sm'
                rules={[
                    { required: true, message: 'required' },
                ]} />

            <ProFormSelect
                colProps={{ span: 'auto' }}
                width='xs'
                name="areaUnit"
                label="Area Unit"
                valueEnum={areaUnitLabels}
                rules={[
                    { required: true, message: 'required' },
                ]} />
        </ProFormGroup>
    </ProFormGroup>;
};

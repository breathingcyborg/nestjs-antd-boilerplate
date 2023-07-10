import { ProFormDependency, ProFormGroup, ProFormRadio } from "@ant-design/pro-components";
import { landUseLabels } from "../../enum-labels";
import { PropertyType } from "../../enums";

export const LandFields = () => {
    return <ProFormDependency name={['propertyType']}>
        {({ propertyType }) => {
            if (propertyType !== PropertyType.Land) {
                return null;
            }
            return <ProFormGroup title="Land" collapsible>
                <ProFormRadio.Group
                    name='landUse'
                    label='Land Use'
                    valueEnum={landUseLabels}
                    rules={[
                        { required: true, message: 'required' },
                    ]} />
            </ProFormGroup>;
        }}
    </ProFormDependency>;
};

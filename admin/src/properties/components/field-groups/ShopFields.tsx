import { ProFormDependency, ProFormDigit, ProFormGroup } from "@ant-design/pro-components";
import { areaUnitLabels } from "../../enum-labels";
import { AreaUnit, PropertyType } from "../../enums";

export const ShopFields = () => {
    return <ProFormDependency name={['propertyType']}>
        {({ propertyType }) => {
            if (propertyType !== PropertyType.Shop) {
                return null;
            }
            return <ProFormGroup title="Shop" collapsible>
                <ProFormDigit
                    colProps={{ span: 'auto' }}
                    label='Frontage Area'
                    name='frontage'
                    fieldProps={{
                        addonAfter: areaUnitLabels[AreaUnit.Sqft],
                    }}
                    rules={[
                        { required: true, message: 'required' },
                    ]}
                    min={1} />
            </ProFormGroup>;
        }}
    </ProFormDependency>;
};

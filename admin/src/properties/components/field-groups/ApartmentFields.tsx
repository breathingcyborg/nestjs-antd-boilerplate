import { ProFormDependency, ProFormDigit, ProFormGroup } from "@ant-design/pro-components";
import { PropertyType } from "../../enums";

export const ApartmentFields = () => {
    return <ProFormDependency name={['propertyType']}>
        {({ propertyType }) => {
            if (propertyType !== PropertyType.Apartment) {
                return null;
            }
            return <ProFormGroup
                style={{ marginBottom: 32 }}
                labelLayout="twoLine"
                title='Appartment'
                collapsible
            >
                <ProFormDigit
                    colProps={{ span: 'auto' }}
                    name='floor'
                    label="Floor"
                    min={1}
                    rules={[
                        { required: true, message: 'required' },
                    ]} />
                <ProFormDependency name={['floor']}>
                    {({ floor }) => (
                        <ProFormDigit
                            colProps={{ span: 'auto' }}
                            name='totalFloors'
                            label="Total Floors"
                            min={floor}
                            rules={[
                                { required: true, message: 'required' },
                            ]} />
                    )}
                </ProFormDependency>
                <ProFormDigit
                    colProps={{ span: 'auto' }}
                    name='bhk'
                    label="Bhk"
                    fieldProps={{
                        addonAfter: 'BHK'
                    }}
                    rules={[
                        { required: true, message: 'required' },
                    ]}
                    min={1} />
            </ProFormGroup>;
        }}
    </ProFormDependency>;
};

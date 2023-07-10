import { ProForm } from "@ant-design/pro-components";
import { LatLngInput } from "../../../shared/components/form-inputs/LatLngInput";

export const LocationFields = () => {
    return <ProForm.Item style={{ width: '100%' }} label="Location" name="coordinates">
        {/* @ts-ignore */}
        <LatLngInput placeholder="Property Location" />
    </ProForm.Item>;
};

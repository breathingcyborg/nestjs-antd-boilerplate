import { ProFormSegmented } from "@ant-design/pro-components";
import { listingTypeLabels, propertyTypeLabels } from "../../enum-labels";
import { ApartmentFields } from "./ApartmentFields";
import { GeneralFields } from "./GeneralFields";
import { LandFields } from "./LandFields";
import { LocationFields } from "./LocationFields";
import { ShopFields } from "./ShopFields";

export const PropertyFormFields = () => {
    return (
        <>
            <ProFormSegmented
                colProps={{ span: 'auto' }}
                name="listingType"
                label="Listing Type"
                valueEnum={listingTypeLabels}
                rules={[
                    { required: true, message: 'required' },
                ]}
            />

            <ProFormSegmented
                name="propertyType"
                label="Property Type"
                valueEnum={propertyTypeLabels}
                rules={[
                    { required: true, message: 'required' },
                ]} 
            />
            <LocationFields />
            <GeneralFields />
            <ApartmentFields />
            <LandFields />
            <ShopFields />

        </>
    );
};


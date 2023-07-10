import { Col, InputNumber, Row } from "antd";
import { CSSProperties, useState } from "react";
import { theme } from 'antd';
import { Autocomplete, GoogleMap,  MarkerF } from "@react-google-maps/api";
import { geocodeByPlaceId, getLatLng } from "../../utils/maps";

const mapContainerStyle : CSSProperties = { 
  width: '100%', 
  height: '300px',
  borderRadius: 8,
}

export interface LatLngInputProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  placeholder?: string,
}

export const LatLngInput = ({
  value,
  onChange,
  placeholder,
}: LatLngInputProps) => {
  
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const lat = value && value.length === 2 ? value[0] : 0;
  const lng = value && value.length === 2 ? value[1] : 0;
  const latLngObject = { lat, lng }

  const { token } = theme.useToken();

  const onPlaceChanged = async () => {
    if (autocomplete == null) {
      return
    }
    const placeResult = autocomplete.getPlace();
    if (!placeResult || !placeResult.place_id) {
      return;
    }
    const geocodeResults = await geocodeByPlaceId(placeResult.place_id);
    if (!geocodeResults || geocodeResults.length <= 0) {
      return;
    }
    const coords = await getLatLng(geocodeResults[0]);
    onChange([coords.lat, coords.lng]);
  }


  return <div>
    <div style={{ marginBottom: 16 }}>
      <GoogleMap
        options={{
          mapTypeControl: false,
        }}
        center={latLngObject}
        zoom={10}
        mapContainerStyle={mapContainerStyle}
      >
        <MarkerF
          position={latLngObject}>      
        </MarkerF>

        <Row style={{ padding: 12 }}>
          <Col>
            <Autocomplete
              onLoad={setAutocomplete}
              onPlaceChanged={onPlaceChanged}
            >
              <input
                type="text"
                placeholder={placeholder || 'Select a location'}
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  minWidth: 0,
                  color: token.colorText,
                  fontSize: token.fontSize,
                  lineHeight: token.lineHeight,
                  backgroundColor: token.colorBgContainer,
                  backgroundImage: 'none',
                  borderWidth: token.lineWidth,
                  borderStyle: token.lineType,
                  borderColor: token.colorBorder,
                  borderRadius: token.borderRadius,
                  transition: `all ${token.motionDurationMid}`,
                  padding: `8px 12px`,
                }}
              />
            </Autocomplete>
          </Col>
        </Row>

      </GoogleMap>
    </div>

    <Row gutter={12} style={{ marginBottom: 16 }}>
      <Col span='auto'>
        <InputNumber
          placeholder="Lat"
          style={{ width: '100%' }}
          value={lat}
          type="number"
          onChange={(e) => {
            if (e && !isNaN(e)) {
              onChange([e, lng]);
            }
          }} />
      </Col>

      <Col span='auto'>
        <InputNumber
          placeholder="Lng"
          style={{ width: '100%' }}
          value={lng}
          type="number"
          onChange={(e) => {
            if (e && !isNaN(e)) {
              onChange([lat, e]);
            }
          }} />
      </Col>
    </Row>
  </div>;
};

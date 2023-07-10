export const geocodeByPlaceId = (placeId: string): Promise<google.maps.GeocoderResult[] | null> => {
    const geocoder = new window.google.maps.Geocoder();
    const { OK } = window.google.maps.GeocoderStatus;

    return new Promise((resolve, reject) => {
        geocoder.geocode(
            { placeId },
            (
                results: google.maps.GeocoderResult[] | null,
                status: google.maps.GeocoderStatus,
            ) => {
                if (status !== OK) {
                    return reject(status);
                }
                return resolve(results);
            });
    });
};

export const getLatLng = (result: google.maps.GeocoderResult): Promise<{ lat: number, lng: number }> => (
  new Promise((resolve, reject) => {
    try {
      const latLng = {
        lat: result.geometry.location.lat(),
        lng: result.geometry.location.lng(),
      };
      return resolve(latLng);
    } catch (e) {
      return reject(e);
    }
  })
);
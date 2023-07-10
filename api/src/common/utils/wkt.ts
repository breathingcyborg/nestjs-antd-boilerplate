export const toWktPoint = (lat: string, lng: string) => `POINT(${lng} ${lat})`;

export const parseWktPoint = (wktPoint: string) => {
    const regex = /^POINT\(([-\d.]+) ([-\d.]+)\)$/;
    const matches = (wktPoint || '').match(regex);

    if (matches && matches.length === 3) {
        const lat = matches[2];
        const lng = matches[1];
        return { lat, lng };
    }

    return null;
}

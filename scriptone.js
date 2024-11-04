function mapRenderLoris(accessToken, mapControlId, options) {
    const map = new mapboxgl.Map({
        container: mapControlId,
        center: options.defaultView,
        zoom: 13,
        style: 'mapbox://styles/mapbox/standard'
    });
}
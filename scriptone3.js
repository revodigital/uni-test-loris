function mapRenderLoris(accessToken, mapControlId, options) {
    const container = document.getElementById(mapControlId);

    const mapContainer = document.createElement('div');
    mapContainer.id = mapControlId + "map";
    mapContainer.style.width = '100%';
    mapContainer.style.height = '400px';

    container.appendChild(mapContainer);

    const map = new mapboxgl.Map({
        container: mapControlId + "map",
        center: options.defaultView,
        zoom: 13,
        style: 'mapbox://styles/mapbox/standard'
    });

    map.on('click', function (e) {
        const coordinates = e.lngLat;
        console.log(e);
        new mapboxgl.Marker()
            .setLngLat(coordinates)
            .addTo(map);
    });
}
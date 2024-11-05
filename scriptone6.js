function markerSetted(e) {
    console.log(e);
}

let iframeContainer;

function mapRenderLoris(accessToken, mapControlId, options) {
    const container = document.getElementById(mapControlId);

    iframeContainer = document.createElement('iframe');
    iframeContainer.style.width = '100%';
    iframeContainer.style.height = '500px';
    iframeContainer.style.border = 'none';
    iframeContainer.id = mapControlId + 'iframe';

    container.appendChild(iframeContainer);
    
    const iframeDoc = iframeContainer.contentWindow.document;

    iframeDoc.open();
    iframeDoc.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8" />
            <title>Map</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link href="https://api.mapbox.com/mapbox-gl-js/v3.7.0/mapbox-gl.css" rel="stylesheet" />
            <script src="https://api.mapbox.com/mapbox-gl-js/v3.7.0/mapbox-gl.js"></script>
            <style>
                body { margin: 0; padding: 0; }
                #map { width: 100%; height: 400px; }
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script>
                mapboxgl.accessToken = '${accessToken}';

                function setMarker(coordinates) {
                    new mapboxgl.Marker()
                        .setLngLat(coordinates)
                        .addTo(map);
                }

                const map = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/standard',
                    center: [${options.defaultView[0]}, ${options.defaultView[1]}],
                    zoom: 5
                });

                map.on('click', function (e) {
                    setMarker(e.lngLat);

                    parent.markerSetted(e);
                });
            </script>
        </body>
        </html>
    `);
    iframeDoc.close();
}

window.setMarkerManually = function (coordinates) {
    iframeContainer.contentWindow.setMarker(coordinates);
}
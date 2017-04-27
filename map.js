mapboxgl.accessToken = 'pk.eyJ1IjoieGluaHVpbGkiLCJhIjoiY2l2MWFnY3M3MDA2ZzJvczN1MnZjdTV2MCJ9.IVc-aEM5bxHBNMNXb8yfBQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/xinhuili/cj1ykdkez000q2rn6kfb1kcf9',
    center: [-75.156090, 39.978720],
    zoom: 11
});
map.addControl(new mapboxgl.NavigationControl(), 'top-left');

map.on('load', function () {

	map.addSource('blockgroups', {
        type: 'geojson',
        data: 'geojsons/bg_tw.geojson'
    });
    map.addLayer({
        'id': 'blockgroups',
        'type': 'fill',
        'source': 'blockgroups',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': {
            	'property': 'Density',
            	'stops':[
            		[0, '#f2f2f2'],
            		[0.05, '#d3d3d3'],
                    [0.2, '#cccccc'],
            		[0.5, '#b2b2b2']
            	]            	
        	},
        	'fill-outline-color': '#fff',
        }
    });

    map.addSource('lihtc', {
        type: 'geojson',
        data: 'geojsons/lihtc.geojson'
    });
    map.addLayer({
        'id': 'lihtc',
        'type': 'circle',
        'source': 'lihtc',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': {
            	'property': 'N_UNITS',
            	'stops': [
			      [{zoom: 12, value: 0}, 2],
			      [{zoom: 12, value: 200}, 10],
			      [{zoom: 22, value: 0}, 30],
			      [{zoom: 22, value: 200}, 60]
			    ]
            },
            'circle-color': 'rgba(23, 179, 237, 0.4)'
        }
    });

    map.addSource('ph', {
        type: 'geojson',
        data: 'geojsons/ph.geojson'
    });
    map.addLayer({
        'id': 'ph',
        'type': 'circle',
        'source': 'ph',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': {
            	'property': 'TOTAL_DWEL',
            	'stops': [
			      [{zoom: 12, value: 0}, 2],
			      [{zoom: 12, value: 200}, 10],
			      [{zoom: 22, value: 0}, 30],
			      [{zoom: 22, value: 200}, 60]
			    ]
            },
            'circle-color': 'rgba(244, 172, 65, 0.4)'
        }
    });

    map.addSource('tweets', {
        type: 'geojson',
        data: 'geojsons/tweets.geojson'
    });
    map.addLayer({
        'id': 'tweets',
        'type': 'circle',
        'source': 'tweets',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': {
            	'base': 0.8,
                'stops': [[12, 1], [22, 12]]
            },
            'circle-color': 'rgba(237, 23, 176, 1)'
        }
    });
});

var toggleableLayerIds = ['blockgroups', 'lihtc', 'ph', 'tweets' ];
// var layerColorSolid = ['rgba(237, 23, 176, 1)', 'rgba(237, 94, 23, 1)', 'rgba(23, 179, 237, 1)']
// var layerColorTrans = ['rgba(237, 23, 176, 0.4)', 'rgba(237, 94, 23, 0.4)', 'rgba(23, 179, 237, 0.4)']

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];
    // var colorSolid = layerColorSolid[i];
    // var colorTrans = layerColorTrans[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;
    // link.style.border = '1px solid ' + colorSolid;
    // link.style.backgroundColor = colorTrans;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
            // this.style.backgroundColor = colorSolid;
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
            // this.style.backgroundColor = colorTrans;
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}
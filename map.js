mapboxgl.accessToken = 'pk.eyJ1IjoieGluaHVpbGkiLCJhIjoiY2l2MWFnY3M3MDA2ZzJvczN1MnZjdTV2MCJ9.IVc-aEM5bxHBNMNXb8yfBQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/xinhuili/cj1ykdkez000q2rn6kfb1kcf9',
    center: [-75.156090, 39.978720],
    zoom: 11
});
map.addControl(new mapboxgl.NavigationControl(), 'top-left');

map.on('load', function () {

    map.addSource('heatmap', {
        type: 'geojson',
        data: 'geojsons/heatmap_contour.geojson'
    });
    map.addLayer({
        'id': 'heatmap',
        'type': 'line',
        'source': 'heatmap',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-color': {
                property: 'Contour',
                type: 'exponential',
                stops: [
                    [-0.199, '#d73027'],
                    [-0.047, '#fc8d59'],
                    [0.104, '#fee090'],
                    [0.256, '#ffffbf'],
                    [0.407, '#e0f3f8'],
                    [0.559, '#91bfdb'],
                    [0.71, '#4575b4']
                    ]
            },
            'line-width': 0.8,
            'line-opacity': 0.7
        }
    });

	// map.addSource('planDistArea', {
 //        type: 'geojson',
 //        data: 'geojsons/pd_density_area.geojson'
 //    });
 //    map.addLayer({
 //        'id': 'planDistAreaC',
 //        'type': 'fill',
 //        'source': 'planDistArea',
 //        'layout': {
 //            'visibility': 'none'
 //        },
 //        'paint': {
 //            'fill-color': {
 //            	'property': 'tw_c_acre',
 //            	'stops':[
 //            		[0, '#f2f2f2'],
 //            		[0.116, '#d3d3d3'],
 //                    [0.282, '#cccccc'],
 //            		[0.682, '#b2b2b2'],
 //                    [1.498, '#9b9b9b'],
 //                    [2.465, '#878787']
 //            	]            	
 //        	},
 //        	'fill-outline-color': '#fff',
 //            'fill-opacity': 1
 //        }
 //    });

 //    map.addLayer({
 //        'id': 'planDistAreaR',
 //        'type': 'fill',
 //        'source': 'planDistArea',
 //        'layout': {
 //            'visibility': 'none'
 //        },
 //        'paint': {
 //            'fill-color': {
 //                'property': 'tw_r_acre',
 //                'stops':[
 //                    [0, '#f2f2f2'],
 //                    [0.02, '#d3d3d3'],
 //                    [0.06, '#cccccc'],
 //                    [0.10, '#b2b2b2'],
 //                    [0.46, '#9b9b9b'],
 //                    [0.79, '#878787']
 //                ]               
 //            },
 //            'fill-outline-color': '#fff',
 //            'fill-opacity': 1
 //        }
 //    });

 //     map.addLayer({
 //        'id': 'planDistAreaCR',
 //        'type': 'fill',
 //        'source': 'planDistArea',
 //        'layout': {
 //            'visibility': 'none'
 //        },
 //        'paint': {
 //            'fill-color': {
 //                'property': 'tw_cr_area',
 //                'stops':[
 //                    [0, '#f2f2f2'],
 //                    [0.02, '#d3d3d3'],
 //                    [0.868, '#cccccc'],
 //                    [1.654, '#b2b2b2'],
 //                    [3.852, '#9b9b9b'],
 //                    [4.671, '#878787']
 //                ]               
 //            },
 //            'fill-outline-color': '#fff',
 //            'fill-opacity': 1
 //        }
 //    });

 //    map.addSource('planDistPop', {
 //        type: 'geojson',
 //        data: 'geojsons/pd_density_pop.geojson'
 //    });
 //    map.addLayer({
 //        'id': 'planDistPopL',
 //        'type': 'fill',
 //        'source': 'planDistPop',
 //        'layout': {
 //            'visibility': 'none'
 //        },
 //        'paint': {
 //            'fill-color': {
 //                'property': 'lithc_d',
 //                'stops':[
 //                    [0, '#f2f2f2'],
 //                    [2.045, '#d3d3d3'],
 //                    [4.43, '#cccccc'],
 //                    [8.343, '#b2b2b2'],
 //                    [13.896, '#9b9b9b'],
 //                    [59.208, '#878787']
 //                ]               
 //            },
 //            'fill-outline-color': '#fff',
 //            'fill-opacity': 1
 //        }
 //    });
 //    map.addLayer({
 //        'id': 'planDistPopR',
 //        'type': 'fill',
 //        'source': 'planDistPop',
 //        'layout': {
 //            'visibility': 'none'
 //        },
 //        'paint': {
 //            'fill-color': {
 //                'property': 'tw_density',
 //                'stops':[
 //                    [0, '#f2f2f2'],
 //                    [0.2192, '#d3d3d3'],
 //                    [1.1148, '#cccccc'],
 //                    [2.1403, '#b2b2b2'],
 //                    [3.5419, '#9b9b9b'],
 //                    [5.6567, '#878787']
 //                ]               
 //            },
 //            'fill-outline-color': '#fff',
 //            'fill-opacity': 1
 //        }
 //    });

    map.addSource('lihtc', {
        type: 'geojson',
        data: 'geojsons/lihtc.geojson'
    });
    map.addLayer({
        'id': 'lihtc',
        'type': 'circle',
        'source': 'lihtc',
        'layout': {
            'visibility': 'none'
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
            'circle-color': 'rgba(237, 23, 176, 0.4)'
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
            'circle-color': 'rgba(23, 179, 237, 1)'
        }
    });

    map.addSource('tweets_emoji', {
        type: 'geojson',
        data: 'geojsons/tweets_emoji.geojson'
    });
    map.addLayer({
        'id': 'tweets_emoji',
        'type': 'circle',
        'source': 'tweets_emoji',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-radius': {
                'base': 0.8,
                'stops': [[12, 2], [22, 12]]
            },
            'circle-color': {
                property: 'average_s',
                type: 'interval',
                stops: [
                    [-0.25, '#4575b4'],
                    [-0.02, '#91bfdb'],
                    [0.19, '#e0f3f8'],
                    [0.34, '#ffffbf'],
                    [0.47, '#fee090'],
                    [0.6, '#fc8d59'],
                    [0.78, '#d73027']
                    ]
            }
        }
    });

});

map.on('zoomend', function(){
    
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'tweets', function(e) {
        if (map.getZoom() > 14){
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';

            // Populate the popup and set its coordinates
            // based on the feature found.
                popup.setLngLat(e.features[0].geometry.coordinates)
                .setHTML(e.features[0].properties.content)
                .addTo(map);
        }
    });

    map.on('mouseleave', 'tweets', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
    
});

//TOGGLE POINT LAYERS
$('#lihtc-toggle').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    var clickedLayer = 'lihtc'
    var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
    if (visibility === 'visible') {
        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        $('#lihtc-toggle').removeClass('fa-check-circle').addClass('fa-check-circle-o').addClass('deactivated');
    } else {
        map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        $('#lihtc-toggle').removeClass('fa-check-circle-o').addClass('fa-check-circle').removeClass('deactivated');
    }
});

$('#tweet-toggle').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    var clickedLayer = 'tweets'
    var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
    if (visibility === 'visible') {
        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        $('#tweet-toggle').removeClass('fa-check-circle').addClass('fa-check-circle-o').addClass('deactivated');
        $('#emoji-toggle-container').fadeOut(600);
    } else {
        map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        $('#tweet-toggle').removeClass('fa-check-circle-o').addClass('fa-check-circle').removeClass('deactivated');
        $('#emoji-toggle-container').fadeIn(600);
    }
});

$('#gradient-legend').hide();

$('#emoji-toggle').on('click', function(e){
    var clickedLayer = 'tweets_emoji'
    var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
    if (visibility === 'visible') {
        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        map.setLayoutProperty('tweets', 'visibility', 'visible');
        $('#emoji-toggle').removeClass('fa-circle').addClass('fa-circle-thin');
        $('#gradient-legend').fadeOut(600);
    } else {
        map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        map.setLayoutProperty('tweets', 'visibility', 'none');
        $('#emoji-toggle').removeClass('fa-circle-thin').addClass('fa-circle');
        $('#gradient-legend').fadeIn(600);
    }
});


//TOGGLE SHAPE LAYERS
// $('#pop-toggle-container').hide();

// function togglePD(icon){
//     var iconId = icon.attr('id');
//     var clickedLayer;
//     if (iconId == 'c-area-toggle'){
//         clickedLayer = 'planDistAreaC';
//     } else if (iconId == 'r-area-toggle'){
//         clickedLayer = 'planDistAreaR';
//     } else if (iconId == 'cr-area-toggle'){
//         clickedLayer = 'planDistAreaCR';
//     }

//     var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
//     if (visibility === 'visible') {
//         map.setLayoutProperty(clickedLayer, 'visibility', 'none');
//         icon.removeClass('fa-check-circle').addClass('fa-check-circle-o');
//         if(clickedLayer === 'planDistAreaR'){$('#pop-toggle-container').fadeOut(600);}
//     } else {
//         map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
//         icon.removeClass('fa-check-circle-o').addClass('fa-check-circle');
//         if(clickedLayer === 'planDistAreaR'){$('#pop-toggle-container').fadeIn(600);}
//     }
// }

// $('#c-area-toggle').on('click', function(){
//     togglePD($('#c-area-toggle'));
// });
// $('#r-area-toggle').on('click', function(){
//     togglePD($('#r-area-toggle'));
// });
// $('#cr-area-toggle').on('click', function(){
//     togglePD($('#cr-area-toggle'));
// });

// $('#lihtc-pop-toggle').on('click', function(e){
//     var clickedLayer = 'planDistPopL'
//     var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
//     if (visibility === 'visible') {
//         map.setLayoutProperty(clickedLayer, 'visibility', 'none');
//         map.setLayoutProperty('planDistAreaR', 'visibility', 'visible');
//         $('#lihtc-pop-toggle').removeClass('fa-circle').addClass('fa-circle-thin');
//     } else {
//         map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
//         map.setLayoutProperty('planDistAreaR', 'visibility', 'none');
//         $('#lihtc-pop-toggle').removeClass('fa-circle-thin').addClass('fa-circle');
//     }
// });
// $('#res-pop-toggle').on('click', function(e){
//     var clickedLayer = 'planDistPopR'
//     var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
//     if (visibility === 'visible') {
//         map.setLayoutProperty(clickedLayer, 'visibility', 'none');
//         map.setLayoutProperty('planDistAreaR', 'visibility', 'visible');
//         $('#res-pop-toggle').removeClass('fa-circle').addClass('fa-circle-thin');
//     } else {
//         map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
//         map.setLayoutProperty('planDistAreaR', 'visibility', 'none');
//         $('#res-pop-toggle').removeClass('fa-circle-thin').addClass('fa-circle');
//     }
// });



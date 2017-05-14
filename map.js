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
                type: 'exponential',
                stops: [
                    [-0.25, '#d73027'],
                    [-0.02, '#fc8d59'],
                    [0.19, '#fee090'],
                    [0.34, '#ffffbf'],
                    [0.47, '#e0f3f8'],
                    [0.6, '#91bfdb'],
                    [0.78, '#4575b4']
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
$('#lihtc-toggle').on('click', function(){
    toggleLihtc();
});

$('#tweet-toggle').on('click', function(){
    toggleTweets();
});

$('#gradient-legend').hide();

$('#emoji-toggle').on('click', function(e){
    toggleEmoji();
});

$('#heatmap-toggle').on('click', function(e){
    toggleHeatmap();
});


var nav = [
{num:1, text: "Where do people tweet?"},
{num:2, text: "Are the tweets happy?"},
{num:3, text: "What's the pattern of the tweet sentiment?"},
{num:4, text: "Where are LIHTC developments?"},
{num:5, text: "Which areas have higher sentiment scores?"},
{num:6, text: "Which areas have lower sentiment scores?"},
{num:7, text: "Which LIHTC developments have higher sentiment scores?"},
{num:8, text: "Which LIHTC developments have lower sentiment scores?"}
];

var navNum = 1;
updateNav();

$("#nav-button-right").on('click', function(){
    if (navNum < nav.length){
        navNum += 1;
        updateNav();
    }
    changeStep();
});

$("#nav-button-left").on('click', function(){
    if (navNum > 1){
        navNum -= 1;
        updateNav();
    }
    changeStep();
});

function changeStep(){
    if (navNum === 1){
        map.easeTo({
            center: [-75.156090, 39.978720],
            zoom: 11,
            easing: easing
        });
        map.setLayoutProperty('heatmap', 'visibility', 'none');
        map.setLayoutProperty('lihtc', 'visibility', 'none');
        map.setLayoutProperty('tweets_emoji', 'visibility', 'none');
        map.setLayoutProperty('tweets', 'visibility', 'visible');
        updateToggles();
    }

    if (navNum === 2){
        map.easeTo({
            center: [-75.156090, 39.978720],
            zoom: 11,
            easing: easing
        });
        map.setLayoutProperty('heatmap', 'visibility', 'none');
        map.setLayoutProperty('lihtc', 'visibility', 'none');
        map.setLayoutProperty('tweets', 'visibility', 'none');
        map.setLayoutProperty('tweets_emoji', 'visibility', 'visible');
        updateToggles();
    }

    if (navNum === 3){
        map.easeTo({
            center: [-75.156090, 39.978720],
            zoom: 11,
            easing: easing
        });
        map.setLayoutProperty('heatmap', 'visibility', 'visible');
        map.setLayoutProperty('tweets_emoji', 'visibility', 'none');
        map.setLayoutProperty('tweets', 'visibility', 'none');
        map.setLayoutProperty('lihtc', 'visibility', 'none');
        updateToggles();
    }

    if (navNum === 4){
        map.easeTo({
            center: [-75.156090, 39.978720],
            zoom: 11,
            easing: easing
        });
        map.setLayoutProperty('heatmap', 'visibility', 'none');
        map.setLayoutProperty('tweets_emoji', 'visibility', 'none');
        map.setLayoutProperty('tweets', 'visibility', 'none');
        map.setLayoutProperty('lihtc', 'visibility', 'visible');
        updateToggles();
    }
}

function easing(t) {
    return t * (2 - t);
}


function updateNav(){
    for (var idx in nav){
        if (nav[idx].num == navNum){
            $("#"+nav[idx].num.toString()).addClass("filled");
            $("#nav-title").html(nav[idx].text);
        } else {
            $("#"+nav[idx].num.toString()).removeClass("filled");
        }
    }
}

function toggleTweets(){
    if (map.getLayoutProperty('tweets', 'visibility') === 'visible') {
        map.setLayoutProperty('tweets', 'visibility', 'none');
    } else{
        map.setLayoutProperty('tweets_emoji', 'visibility', 'none');
        map.setLayoutProperty('tweets', 'visibility', 'visible');
    }
    updateToggles();
}

function toggleEmoji(){
    if (map.getLayoutProperty('tweets_emoji', 'visibility') === 'visible') {
        map.setLayoutProperty('tweets_emoji', 'visibility', 'none');
    } else {
        map.setLayoutProperty('tweets', 'visibility', 'none');
        map.setLayoutProperty('tweets_emoji', 'visibility', 'visible');
    }
    updateToggles();
}

function toggleLihtc(){
    if (map.getLayoutProperty('lihtc', 'visibility') === 'visible') {
        map.setLayoutProperty('lihtc', 'visibility', 'none');
    } else {
        map.setLayoutProperty('lihtc', 'visibility', 'visible');
    }
    updateToggles();
}

function toggleHeatmap(){
    if (map.getLayoutProperty('heatmap', 'visibility') === 'visible') {
        map.setLayoutProperty('heatmap', 'visibility', 'none');
    } else {
        map.setLayoutProperty('heatmap', 'visibility', 'visible');
    }
    updateToggles();
}

function updateToggles(){
    if (map.getLayoutProperty('tweets', 'visibility') === 'visible'){
        $('#tweet-toggle').removeClass('fa-circle-o').addClass('fa-check-circle').removeClass('deactivated');
    } else {
        $('#tweet-toggle').removeClass('fa-check-circle').addClass('fa-circle-o').addClass('deactivated');
    }

    if (map.getLayoutProperty('lihtc', 'visibility') === 'visible'){
        $('#lihtc-toggle').removeClass('fa-circle-o').addClass('fa-check-circle').removeClass('deactivated');
    } else {
        $('#lihtc-toggle').removeClass('fa-check-circle').addClass('fa-circle-o').addClass('deactivated');
    }

    if (map.getLayoutProperty('tweets_emoji', 'visibility') === 'visible'){
        $('#emoji-toggle').removeClass('fa-circle-o').addClass('fa-check-circle').removeClass('deactivated');
    } else {
        $('#emoji-toggle').removeClass('fa-check-circle').addClass('fa-circle-o').addClass('deactivated'); 
    }

    if (map.getLayoutProperty('heatmap', 'visibility') === 'visible'){
        $('#heatmap-toggle').removeClass('fa-circle-o').addClass('fa-check-circle').removeClass('deactivated');
    } else {
        $('#heatmap-toggle').removeClass('fa-check-circle').addClass('fa-circle-o').addClass('deactivated');
    }

    if ((map.getLayoutProperty('heatmap', 'visibility') === 'visible') || (map.getLayoutProperty('tweets_emoji', 'visibility') === 'visible')){
        $('#gradient-legend').fadeIn(500);
    } else{
        $('#gradient-legend').fadeOut(500);
    }
}



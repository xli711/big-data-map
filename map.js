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
                'base': 0.8,
                'stops': [[12, 2], [22, 30]]
       //       'property': 'tw_densi_1',
       //       'stops': [
                //   [{zoom: 12, value: 0}, 2],
                //   [{zoom: 12, value: 479}, 10],
                //   [{zoom: 22, value: 0}, 30],
                //   [{zoom: 22, value: 479}, 60]
                // ]
            },

            'circle-color': 'rgba(237, 23, 176, 1)',
            // {
            //     property: 'MEAN_tw_de',
            //     type: 'exponential',
            //     stops: [
            //         [-0.17, '#d73027'],
            //         [-0.01, '#fc8d59'],
            //         [0.22, '#fee090'],
            //         [0.34, '#ffffbf'],
            //         [0.43, '#e0f3f8'],
            //         [0.57, '#91bfdb'],
            //         [0.74, '#4575b4']
            //     ]
            // },
            'circle-opacity': 0.6
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
        data: 'geojsons/tw_show_emoji.geojson'
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

var layerIDs = ['heatmap', 'lihtc', 'tweets', 'tweets_emoji'];

map.on('zoomend', function(){

    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    // map.on('mouseenter', 'tweets', function(e) {
    //     if (map.getZoom() > 14){
    //         // Change the cursor style as a UI indicator.
    //         map.getCanvas().style.cursor = 'pointer';

    //         // Populate the popup and set its coordinates
    //         // based on the feature found.
    //         //twemoji.size = '16x16';
    //         var content = twemoji.parse(e.features[0].properties.content);

    //         popup.setLngLat(e.features[0].geometry.coordinates)
    //         .setHTML(content)
    //         .addTo(map);
    //     }
    // });

    // map.on('mouseleave', 'tweets', function() {
    //     map.getCanvas().style.cursor = '';
    //     popup.remove();
    // });

    map.on('mouseenter', 'tweets_emoji', function(e) {
        if (map.getZoom() > 13){
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';

            // Populate the popup and set its coordinates
            // based on the feature found.
            //twemoji.size = '16x16';
            var content = twemoji.parse(e.features[0].properties.content);

            popup.setLngLat(e.features[0].geometry.coordinates)
            .setHTML(content)
            .addTo(map);
        }
    });

    map.on('mouseleave', 'tweets_emoji', function() {
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
        map.flyTo({
            center: [-75.156090, 39.978720],
            zoom: 11
        });
        map.setLayoutProperty('heatmap', 'visibility', 'none');
        map.setLayoutProperty('lihtc', 'visibility', 'none');
        map.setLayoutProperty('tweets_emoji', 'visibility', 'none');
        map.setLayoutProperty('tweets', 'visibility', 'visible');
        updateToggles();
    }

    if (navNum === 2){
        map.flyTo({
            center: [-75.156090, 39.978720],
            zoom: 11
        });
        map.setLayoutProperty('heatmap', 'visibility', 'none');
        map.setLayoutProperty('lihtc', 'visibility', 'none');
        map.setLayoutProperty('tweets', 'visibility', 'none');
        map.setLayoutProperty('tweets_emoji', 'visibility', 'visible');
        updateToggles();
    }

    if (navNum === 3){
        map.flyTo({
            center: [-75.156090, 39.978720],
            zoom: 11
        });
        map.setLayoutProperty('heatmap', 'visibility', 'visible');
        map.setLayoutProperty('tweets_emoji', 'visibility', 'none');
        map.setLayoutProperty('tweets', 'visibility', 'none');
        map.setLayoutProperty('lihtc', 'visibility', 'none');
        updateToggles();
    }

    if (navNum === 4){
        map.flyTo({
            center: [-75.156090, 39.978720],
            zoom: 11
        });
        map.setLayoutProperty('heatmap', 'visibility', 'none');
        map.setLayoutProperty('tweets_emoji', 'visibility', 'none');
        map.setLayoutProperty('tweets', 'visibility', 'none');
        map.setLayoutProperty('lihtc', 'visibility', 'visible');
        updateToggles();
    }

    if (navNum === 5){
        map.flyTo({
            center: [-75.140036, 39.966272],
            zoom: 14.5
        });
        map.setLayoutProperty('heatmap', 'visibility', 'visible');
        map.setLayoutProperty('tweets_emoji', 'visibility', 'visible');
        map.setLayoutProperty('tweets', 'visibility', 'none');
        map.setLayoutProperty('lihtc', 'visibility', 'none');
        updateToggles();
    }

    if (navNum === 6){
        map.flyTo({
            center: [-75.098952, 39.999714],
            zoom: 14.5
        });
        map.setLayoutProperty('heatmap', 'visibility', 'visible');
        map.setLayoutProperty('tweets_emoji', 'visibility', 'visible');
        map.setLayoutProperty('tweets', 'visibility', 'none');
        map.setLayoutProperty('lihtc', 'visibility', 'none');
        updateToggles();
    }

    if (navNum === 7){
        map.flyTo({
            center: [-75.200837, 39.961718],
            zoom: 14.5
        });
        map.setLayoutProperty('heatmap', 'visibility', 'visible');
        map.setLayoutProperty('tweets_emoji', 'visibility', 'visible');
        map.setLayoutProperty('tweets', 'visibility', 'none');
        map.setLayoutProperty('lihtc', 'visibility', 'none');
        updateToggles();
    }

    if (navNum === 8){
        map.flyTo({
            center: [-75.156570, 40.019997],
            zoom: 14.5
        });
        map.setLayoutProperty('heatmap', 'visibility', 'visible');
        map.setLayoutProperty('tweets_emoji', 'visibility', 'visible');
        map.setLayoutProperty('tweets', 'visibility', 'none');
        map.setLayoutProperty('lihtc', 'visibility', 'none');
        updateToggles();
    }
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

barChart();

function barChart(){
    var svg = d3.select("#barchart"),
      margin = {top: 10, right: 10, bottom: 10, left: 10},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;
      

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json("geojsons/lihtc.geojson", function(error, data) {
    data = data.features;
    
    //filter out the ones without tweets
    function notZero(data){
        return data.properties.tw_densi_1 > 0;
    }
    data = data.filter(notZero);
    //console.log(data);
    //if (error) throw error;

    x.domain(data.map(function(d) { return d.length; }));
    y.domain([0, d3.max(data, function(d) { return d.properties.tw_densi_1; })]);

    // g.append("g")
    //     .attr("class", "axis axis--x")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x));

    // g.append("g")
    //     .attr("class", "axis axis--y")
    //     .call(d3.axisLeft(y).ticks(10, "%"))
    //   .append("text")
    //     .attr("transform", "rotate(-90)")
    //     .attr("y", 6)
    //     .attr("dy", "0.71em")
    //     .attr("text-anchor", "end")
    //     .text("Density");

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d,i) { return i*7; })
        .attr("y", function(d) { return y(d.properties.tw_densi_1); })
        .attr("width", 6)
        .attr("height", function(d) { return height - y(d.properties.tw_densi_1); });
    });
}

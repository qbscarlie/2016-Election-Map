var width = 600;
var height = 600;

var div = d3.select('.map');
var svg;

var path;

var testData = {
    "001": {
        color:"#00Ff00"
    }
};

//function drawcountymap(){
    d3.json('data/mo_topo_county.json', function(moTopoCounty){
//  console.log(moTopoCounty);
//  console.log(div);
//  console.log(`div is empty ${div.empty()}`);
    
    svg = div.append("svg")
        .attr("width", width)
        .attr("height", height)
    
    path = d3.geoPath();
    
    path.projection(d3.geoAlbersUsa());
    
    geo = topojson.feature(moTopoCounty, moTopoCounty.objects.mo_county_slice);
    
    path.projection().fitSize([width, height], geo);

    svg.append('g')
        .attr('class', 'counties')
        .selectAll('path')
        .data(geo.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", "rgba(0,0,0,0.2)")
        .style("stroke", "#fff");
    
    svg.selectAll("path")
        .transition()
        .duration(500)
        .style("fill", function(d){
            if(testData[d.properties.COUNTYFP]){
                return testData[d.properties.COUNTYFP].color;
            }
            return "#ff0000";
    });
    
});
//};

function determineWinner(county){
    _.max(county.candidates, function(candidate){ return candidate.votes; });
}

function uspresFunction(){
    d3.queue()
    .defer(d3.json, "https://elections.accessmo.org/federal")
    .await(drawcountymap);
}; 

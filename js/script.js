//default map
$(document).ready(function(){
    loading();
    $(".us-nav-uspres").click(uspresFunction);
    uspresFunction();   
    setNav();
});

//declaring variables


var mapWidth = $(".my-map").width(),
    mapHeight = $(".my-map").height();

var width = 960,
    height = 500;

// albers projection
var projection = d3.geo.albers()
// .center - first number is basic up = left, down, = right, second number is up is down, down is up. 
    .center([1.2, 38.7])
    // lat long - geographic center of missouri - 
    .rotate([91.5, .3, .75])
    .parallels([29.5, 25])
    .scale(5500)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);
            
var join = {}; 
var test = {};
var mapData = {};
var currView = "uspres";

$(".uspres").click(uspresFunction);
$(".ushouse").click(ushouseFunction);
$(".ussenate").click(ussenateFunction);
$(".mogov").click(mogovFunction);
$(".moltgov").click(moltgovFunction);
$(".mosos").click(mososFunction);
$(".motre").click(motreFunction);
$(".moag").click(moagFunction);
$(".mohouse").click(mohouseFunction);
$(".mosenate").click(mosenateFunction);
$(".ball1").click(ball1Function);
$(".ball2").click(ball2Function);
$(".ball3").click(ball3Function);
$(".ball4").click(ball4Function);
$(".ball6").click(ball6Function);
$(".balla").click(ballaFunction);



var mapSvg = d3.select(".my-map").append("svg")
    .attr("class", "mapSvg")
    .attr("width", mapWidth)
    .attr("height", mapHeight);

mapSvg.append("rect")
    .attr("class", "background")
    .attr("width", mapWidth)
    .attr("height", mapHeight);

var mapGroup = mapSvg.append("g");


//writing functions


function loading() {

    var lw = $(".loading").width();
    var lh = $(".loading").height();

    $(".loading").css({
        "left" : (mapWidth/2) - (lw/2)+"px",
        "top" : (mapHeight/2) - (lh/2)+"px",
        "display" : "block"
    });

function setData (error, feed_data){
    test=feed_data;
    var timeBox=$('#time');
    var lu = "Last updated: "+test.last_updated;
    timeBox.html(lu);
    
    mapData = {
    uspres: test.races['US Races']['Presidential'],
    ushouse: test.races['US Races']['US House'],
    ussenate: test.races['US Races']['US Senate'],
    mogov: test.races['State Races']['Governor'],
    moltgov: test.races['State Races']['Lt. Governor'],
    mosos: test.races['State Races']['Secretary of State'],
    motre: test.races['State Races']['Treasurer'],
    moag: test.races['State Races']['Attorney General'],
    mohouse: test.races['State Races']['MO House'],
    mosenate: test.races['State Races']['MO Senate'],
    ball1: test.races['Ballot Issues']['Amendment 1'],
    ball2: test.races['Ballot Issues']['Amendment 2'],
    ball3: test.races['Ballot Issues']['Amendment 3'],
    ball4: test.races['Ballot Issues']['Amendment 4'],
    ball6: test.races['Ballot Issues']['Amendment 6'],
    balla: test.races['Ballot Issues']['Proposition A'],
    };
};

function setNav () {
    $(".btn.view-state").on("click", function() {
        currView = $(this).attr("val");
    infoBoxUpdates[currView];
    $(".btn.view-state").removeClass("active");
    $(this).addClass("active");
    if (currView === "uspres" || currView === "ussenate" || currView === "mogov" || currView === "moltgov"|| currView === "mosos" || currView === "motre" || currView === "moag" || currView === "ball1" || currView === "ball2" || currView === "ball3" || currView === "ball4" || currView === "ball6" || currView === "balla") {
    update[currView](mapData[currView]);
    d3.selectAll(".mohouse, .mosenate, .ushouse")
    .style("visibility", "hidden");
    d3.selectAll(".county").style("visibility", "visible");
    } 
        
    else if (currView === "mohouse" || currView === "ushouse") {
    update[currView](mapData[currView]);
    d3.selectAll(".ushouse, .mosenate, .county")
    .style("visibility", "hidden");
    d3.selectAll(".mohouse").style("visibility", "visible");
    } 
        
    else if (currView === "mosenate") {
    update[currView](mapData[currView]);
    d3.selectAll(".mohouse, .ushouse, .county")
    .style("visibility", "hidden");
    d3.selectAll(".mosenate").style("visibility", "visible");
    } 
    
    else if (currView === "ushouse") {
    update[currView](mapData[currView]);
    d3.selectAll(".mohouse, .mosenate, .county")
    .style("visibility", "hidden");
    d3.selectAll(".ushouse").style("visibility", "visible");
    }
    });
};
    
    
function uspresFunction(){
    queue()
    .defer(d3.json, "https://elections.accessmo.org/federal")
    .await(drawcountymap);
}; 
function ushouseFunction(){
    queue()
    .defer(d3.json, "https://elections.accessmo.org/us_representative")
    .await(drawushousemap);
};
function ussenateFunction(){
    queue()
    .defer(d3.json, "https://elections.accessmo.org/federal")
    .await(drawcountymap);
};
function mogovFunction(){
    queue()
    .defer(d3.json, "https://elections.accessmo.org/state_of_missouri")
    .await(drawcountymap);
};
function moltgovFunction(){
    queue()
    .defer(d3.json, "https://elections.accessmo.org/state_of_missouri")
    .await(drawcountymap);
};
function mososFunction(){
    queue()
    .defer(d3.json, "https://elections.accessmo.org/state_of_missouri")
    .await(drawcountymap);
};
function motreFunction(){
    queue()
    .defer(d3.json, "https://elections.accessmo.org/state_of_missouri")
    .await(drawcountymap);
};
function moagFunction(){
    queue()
    .defer(d3.json, "https://elections.accessmo.org/state_of_missouri")
    .await(drawcountymap);
};
function mohouseFunction(){
    queue()
    .defer(d3.json, "https://elections.accessmo.org/state_house")
    .await(drawmohousemap);
};
function mosenateFunction(){
    queue()
    .defer(d3.json, "https://elections.accessmo.org/state_senate")
    .await(drawmosenatemap);
};
function ball1Function(){
    queue()
    .defer(d3.json, "https://elections.accessmo.org/ballot_issues")
    .await(drawcountymap);
};
function ball2Function(){
    queue()
    .defer(d3.json, "https://elections.accessmo.org/ballot_issues")
    .await(drawcountymap);
};
function ball3Function(){
    queue()
    .defer(d3.json, "https://elections.accessmo.org/ballot_issues")
    .await(drawcountymap);
};
function ball4Function(){
    queue()
    .defer(d3.json, "https://elections.accessmo.org/ballot_issues")
    .await(drawcountymap);
};
function ball6Function(){
    queue()
    .defer(d3.json, "https://elections.accessmo.org/ballot_issues")
    .await(drawcountymap);
};
function ballaFunction(){
    queue()
    .defer(d3.json, "https://elections.accessmo.org/ballot_issues")
    .await(drawcountymap);
};

function drawcountymap(){
    d3.json("data/mo_topo_county.json", function(collection) {
    
    var mapCounty =  mapGroup.append("g")
        .attr("class", "group county");
    var counties = topojson.feature(mo_county, mo_county.objects.mo_county_slice);
    
    mapCounty.append("path")
        .datum(counties)
        .attr("d", path);

    mapCounty.selectAll(".county")
        .data(topojson.feature(mo_county, mo_county.objects.mo_county_slice).features)
    .enter().append("path")
        .attr('id', function(d){return 'fips' + d.properties.COUNTYFP})
        .attr("class", function(d) { return "county "; })
        .attr("d", path)
        .on("mouseover",infoBoxUpdates[currView])
        .on("mouseout",infoBoxUpdates.clear);
    mapCounty.append("path")
        .datum(topojson.mesh(mo_county, mo_county.objects.mo_county_slice, function(a, b) { return a !== b}))
        .attr("d", path)
        .attr("class", "county-edges");
    $(".my-map svg").fadeIn();
    update[currView](mapData[currView]);
    infoBoxUpdates[currView];
    };
)};

function drawmohousemap(){
    d3.json("data/mo_topo_house.json", function(collection) {
    var mapHouse =  mapGroup.append("g")
        .attr("class", "group mohouse");
        
    var house = topojson.feature(mo_house, mo_house.objects.mo_house);

    mapHouse.append("path")
        .datum(house)
        .attr("d", path);

    mapHouse.selectAll(".mohouse")
        .data(topojson.feature(mo_house, mo_house.objects.mo_house).features)
        .enter().append("path")
        .attr('id', function(d){return 'MHDistrict_' + d.properties.DISTRICT})
        .attr("class", function(d) { return "mohouse" })
        .attr("d", path)
        .on("mouseover",infoBoxUpdates[currView])
        .on("mouseout",infoBoxUpdates.clear);

    mapHouse.append("path")
        .datum(topojson.mesh(mo_house, mo_house.objects.mo_house, function(a, b) { return a !== b; }))
        .attr("d", path)
        .attr("class", "mohouse-edges");
    $(".my-map svg").fadeIn();
    update[currView](mapData[currView]);
    infoBoxUpdates[currView];
    };
)};

function drawushousemap(){
    d3.json("data/mo_topo_uscongress.json", function(collection) {
    
    var mapSenate =  mapGroup.append("g")
        .attr("class", "group mosenate");

    var senate = topojson.feature(mo_senate, mo_senate.objects.mo_senate);


    mapSenate.append("path")
        .datum(senate)
        .attr("d", path);

    mapSenate.selectAll(".mosenate")
        .data(topojson.feature(mo_senate, mo_senate.objects.mo_senate).features)
        .enter().append("path")
    // strips out the "state senate" from the ID to match the data feed
        .attr('id', function(d){var x = d.properties.NAMELSAD; var x = x.replace('State Senate ', ''); return 'MS'+x.replace(/ /,'_');})
        .attr("class", function(d) { return "mosenate"})
        .attr("d", path)
        .on("mouseover",infoBoxUpdates[currView])
        .on("mouseout",infoBoxUpdates.clear);

    mapSenate.append("path")
        .datum(topojson.mesh(mo_senate, mo_senate.objects.mo_senate, function(a, b) { return a !== b; }))
        .attr("d", path)
        .attr("class", "mosenate-edges");
    };
    $(".my-map svg").fadeIn();
    update[currView](mapData[currView]);
    infoBoxUpdates[currView];

};
    
function drawmosenatemap(){
    d3.json("data/mo_topo_senate.json", function(collection) {
    
    var mapSenate =  mapGroup.append("g")
        .attr("class", "group mosenate");

    var senate = topojson.feature(mo_senate, mo_senate.objects.mo_senate);


    mapSenate.append("path")
        .datum(senate)
        .attr("d", path);

    mapSenate.selectAll(".mosenate")
        .data(topojson.feature(mo_senate, mo_senate.objects.mo_senate).features)
        .enter().append("path")
    // strips out the "state senate" from the ID to match the data feed
        .attr('id', function(d){var x = d.properties.NAMELSAD; var x = x.replace('State Senate ', ''); return 'MS'+x.replace(/ /,'_');})
        .attr("class", function(d) { return "mosenate"})
        .attr("d", path)
        .on("mouseover",infoBoxUpdates[currView])
        .on("mouseout",infoBoxUpdates.clear);

    mapSenate.append("path")
        .datum(topojson.mesh(mo_senate, mo_senate.objects.mo_senate, function(a, b) { return a !== b; }))
        .attr("d", path)
        .attr("class", "mosenate-edges");
         $(".loading").hide();
  
    $(".my-map svg").fadeIn();
    update[currView](mapData[currView]);
    infoBoxUpdates[currView];
    };
)};


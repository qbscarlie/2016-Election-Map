    $.getJSON("https://elections.accessmo.org/us_representative", function(data){
        var updated = new Date(data.last_updated);
        $("#updated").text(updated);
        var ushouse_candidates = {}
        var clear_data = {}
        function refactorCounties(original_array){
            var new_counties = {}
            $.each(original_array, function(index, county){

                new_counties[county.fips] = {
                    "reporting_precincts": county.reporting_precincts,
                    "total_precincts": county.total_precincts,
                };
                $.each(county.candidates, function(i, candidate){
                    new_counties[county.fips][candidate.id] = candidate.votes;
                })

            });
            return new_counties;
        }

        function populateCandidates(candidates_array){
            var new_candidates = {};
            $.each(candidates_array, function(i, candidate){
                new_candidates[candidate.id] = {
                    "name": candidate.name,
                    "party": candidate.party,
                    "votes": candidate.votes
                }
            });
            return new_candidates;
        };

        function getWinnerID(county_data){
            delete county_data.reporting_precincts;
            delete county_data.total_precincts;

            var winner_id;
            var vote_nums_array = [];
            $.each(county_data, function(i,num){
                vote_nums_array.push(num);
            });
            var max_vote_count = Math.max.apply(null, vote_nums_array);
            $.each(county_data, function(i,num){
                if ( num == max_vote_count ){
                    winner_id = i
                }
                
            });
            return winner_id
        };




        $.each(data.races, function(index, race){
            if (race.title == "U.S. Representative - District 1") {
                // First, let's populate candidate info variables
                ushouse_candidates = populateCandidates(race.candidates);
                // Now let's update the new data var
                clear_data["ushouse"] = refactorCounties(race.counties);
            } else if (race.title == "U.S. Representative - District 2") {
                // First, let's populate candidate info variables
                ushouse_candidates = populateCandidates(race.candidates);
                // Now let's update the new data var
                clear_data["ushouse"] = refactorCounties(race.counties);
            } else if (race.title == "U.S. Representative - District 3") {
                // First, let's populate candidate info variables
                ushouse_candidates = populateCandidates(race.candidates);
                // Now let's update the new data var
                clear_data["ushouse"] = refactorCounties(race.counties);
            } else if (race.title == "U.S. Representative - District 4") {
                // First, let's populate candidate info variables
                ushouse_candidates = populateCandidates(race.candidates);
                // Now let's update the new data var
                clear_data["ushouse"] = refactorCounties(race.counties);
            } else if (race.title == "U.S. Representative - District 5") {
                // First, let's populate candidate info variables
                ushouse_candidates = populateCandidates(race.candidates);
                // Now let's update the new data var
                clear_data["ushouse"] = refactorCounties(race.counties);
            } else if (race.title == "U.S. Representative - District 6") {
                // First, let's populate candidate info variables
                ushouse_candidates = populateCandidates(race.candidates);
                // Now let's update the new data var
                clear_data["ushouse"] = refactorCounties(race.counties);
            } else if (race.title == "U.S. Representative - District 7") {
                // First, let's populate candidate info variables
                ushouse_candidates = populateCandidates(race.candidates);
                // Now let's update the new data var
                clear_data["ushouse"] = refactorCounties(race.counties);
            } else if (race.title == "U.S. Representative - District 8") {
                // First, let's populate candidate info variables
                ushouse_candidates = populateCandidates(race.candidates);
                // Now let's update the new data var
                clear_data["ushouse"] = refactorCounties(race.counties);
            }
        });


        function createUSHouseMap(container, race, moTopoUSHouse){
            var div = d3.select(container);
            var svg,
                path;

            svg = div.append("svg")
                .attr("width", width)
                .attr("height", height)
                .on("mouseout", function(){
                    $("#infobox").find("span").text("");
                });
            
            path = d3.geoPath();
            
            path.projection(d3.geoAlbersUsa());
            
            geo = topojson.feature(moTopoUSHouse, moTopoUSHouse.objects.mo_congress);
            
            path.projection().fitSize([width, height], geo);

            svg.append('g')
                .attr('class', 'group ushouse')
                .selectAll('path')
                .data(geo.features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("fill", "rgba(0,0,0,0.2)")
                .style("stroke", "#fff");
         
                svg.selectAll("path")
                    .on('mouseover', function(d){
                    .attr('id', function(d){ var x = d.properties.CD113FP; return 'USDistrict_' + x.replace(/0/,'');})
                    .attr("class", function(d) { return "ushouse"; })
                    .attr("d", path)

                        if (race == "ushouse"){
                            
                            var county_ushouse_data = clear_data.ushouse[d.properties.STATEFP];
                            var ushouse_winner = ushouse_candidates[ getWinnerID(county_ushouse_data) ];
                            
                            $("#ushouse_candidate_name").text( ushouse_winner.name );
                            $("#ushouse_party").text( ushouse_winner.party );
                            $("#ushouse_votes").text( ushouse_winner.votes );
                            $("#ushouse_precinct").text( county_ushouse_data.reporting_precincts );

                        }
                    })
                    .transition()
                    .duration(500)
                    .style("fill", function(d){
                        // #bf0000 - red
                        // #003fbf - blue

                        if (race == "ushouse"){


                            if(clear_data.ushouse[d.properties.stateFP]){

                                var ushouse_winner = ushouse_candidates[ getWinnerID(clear_data.ushouse[d.properties.STATEFP]) ];
                                var party = ushouse_winner.party;

                                // If winner is Democrat
                                if (party == "Democratic") {
                                    return "#003fbf";
                                // or a Republican
                                } else if (party == "Republican") {
                                    return "#bf0000";
                                // or someone else
                                } else {
                                    return "#cfcfd1" //gray
                                }

                                
                            }

                        } 

                        return "#ff0000";

                    }); 

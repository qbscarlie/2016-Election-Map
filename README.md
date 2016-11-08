This is a map for the 2016 U.S. presidential and senate elections coded by Carlie Procell and Daniel Levitt for The Columbian Missourian with help from Roman Kolgushev. It utilizes Bootstrap for the frontend design and D3.js & Underscore.js for the Javascript. 

Live article link:

It is stored in an S3 bucket and the link can be accessed at: http://2016-election-map.s3-website.us-east-2.amazonaws.com/

Results from the election come in live from https://elections.accessmo.org/federal, which takes results from the Secretary of State's site and parses them from XML to JSON using tools from Amazon Web Services. The source code for that was coded primarily by Nathan Lawrence and James Gordon and can be found here: https://github.com/gordonje/mo_election_night_2016/tree/master 
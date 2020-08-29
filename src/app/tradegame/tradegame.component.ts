import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import * as d3 from 'd3';

@Component({
  selector: 'app-tradegame',
  templateUrl: './tradegame.component.html',
  styleUrls: ['./tradegame.component.css']
})
export class TradegameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  	// set the dimensions and margins of the graph
		var margin = {top: 10, right: 30, bottom: 30, left: 60},
		    width = 600 - margin.left - margin.right,
		    height = 400 - margin.top - margin.bottom;

		// append the svg object to the body of the page
			var svg = d3.select("#my_dataviz")
			  .append("svg")
			    .attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom)
			  .append("g")
			    .attr("transform",
			          "translate(" + margin.left + "," + margin.top + ")");

		const tempCSV = [];
		//Read the data
		(d3 as any).csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

		  // When reading the csv, I must format variables:
		  function(d){
		    return { date : d3.timeParse("%Y-%m-%d")(d.date), value : Number(d.value) }
		  },

		  // Now I can use this dataset:
		  function(data) {
		  	tempCSV.push(data);
		  }
		);

		const temp = (data, at) => {
		  	at = data.length > at ? at : data.length - 1;
		  	data = data.splice(at, 50);

		    // Add X axis --> it is a date format
		    var customX = d3.scaleTime()
		      .domain((d3 as any).extent(data, function(d) { return d.date; }))
		      .range([ 0, width ]);

		    const g1 = svg.select("g#g1").empty() ? svg.append("g").attr('id', 'g1') : svg.select("g#g1");
		    (g1
		      .attr("transform", "translate(0," + height + ")") as any)
		      .call(d3.axisBottom(customX));

		    // Add Y axis
		    var customY = d3.scaleLinear()
		      .domain([0, d3.max(data, (d: any) => { return +d.value; })])
		      .range([ height, 0 ]);
		    const g2 = svg.select("g#g2").empty() ? svg.append("g").attr('id', 'g2') : svg.select("g#g2");
		    g2
		      .call(d3.axisLeft(customY));

		    const line = svg.select("path#line").empty() ? svg.append("path").attr('id', 'line') : svg.select("path#line");
		    // Add the line
		    ((line as any)
		    	.datum(data) as any)
		      .attr("fill", "none")
		      .attr("stroke", "steelblue")
		      .attr("stroke-width", 1.5)
		      .attr("d", d3.line()
		        .x((d: any) => {
		        	return customX(d.date) })
		        .y((d: any) => { return customY(+d.value) }));
			};

			let at = 0;
			setInterval( () => {
				temp([...tempCSV], at);
				at += 1;
			}, 200);

	  }

}



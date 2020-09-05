import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';

@Component({
  selector: 'app-tradegame',
  templateUrl: './tradegame.component.html',
  styleUrls: ['./tradegame.component.css']
})
export class TradegameComponent implements OnInit {
  public title = 'Line Chart';
	// public data: any[] = [
	//   {date: new Date('2010-01-01'), value: 40},
	//   {date: new Date('2010-01-04'), value: 93},
	//   {date: new Date('2010-01-05'), value: 95},
	//   {date: new Date('2010-01-06'), value: 130},
	//   {date: new Date('2010-01-07'), value: 110},
	//   {date: new Date('2010-01-08'), value: 120},
	//   {date: new Date('2010-01-09'), value: 129},
	//   {date: new Date('2010-01-10'), value: 107},
	//   {date: new Date('2010-01-11'), value: 140},
	// ];
	public data: any[] = [];
	public allData: any[] = [];
	public csvData = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv";
	private margin = {top: 20, right: 20, bottom: 30, left: 50};
	private width: number;
	private height: number;
	private x: any;
	private y: any;
	private svg: any;
	private line: d3Shape.Line<[number, number]>; // this is line defination

	currentPrice : number =0;
	buyPrice : number = 0;
	currentGain: number = 0;
	defaultBalance : number =1000;
	updatedBalance : number =1000;
	private i : number = 0;
	tradeOn: boolean = false;
	
	
	constructor (private http: HttpClient) {
		// configure margins and width/height of the graph
		this.width = 800 - this.margin.left - this.margin.right;
		this.height = 400 - this.margin.top - this.margin.bottom;
		// d3.csv("3_TwoNumOrdered_comma.csv", (err, csvData) => {
		//   console.log(csvData);
		// });
	}

	ngOnInit(): void {
		this.getData();
	  
	}

	getInfo() {
		return this.http.get(this.csvData, {responseType: 'text'});
	}
	isGreen(){
		if(this.updatedBalance >= 1000){
			return "green";
		}else return "red"
	}
	buy(){
		this.tradeOn = true;
		this.buyPrice = this.data[this.data.length - 1].value;
	
		// this.currentBalance+=this.data[this.data.length - 1].value;
	}
	sell(){
		this.tradeOn = false;
		this.buyPrice = 0;
		this.currentGain = 0;
		this.defaultBalance = this.updatedBalance;
	}

	restart(){
		this.updatedBalance = 1000;
		this.defaultBalance = 1000;
		this.currentGain = 0;
		this.buyPrice = 0;
		this.tradeOn= false;
		this.i = 0;
	}
	getData() {
		this.getInfo().subscribe(data => {
			const list = data.split('\n');
			list.forEach( e => {
				// ths.covidData.push(e);
				const row = e.split(',');
				if (row[0]!=='date') {
					this.allData.push({date: new Date(row[0]), value: Number(row[1])});
				}
			});
			console.log(this.allData);
			setInterval(() => {
				this.data = this.allData.slice(this.i, this.i+50);
				// console.log(i);
				console.log(this.data.length);
				this.buildSvg();
			  this.addXandYAxis();
			  this.drawLineAndPath();
			  if(this.tradeOn === true){
			  	this.currentGain = this.data[this.data.length - 1].value - this.buyPrice;
			    this.updatedBalance =this.defaultBalance + this.currentGain;
			  }
			 	this.currentPrice = this.data[this.data.length - 1].value;
			  this.i += 1;
			  this.i %= (this.allData.length/50)
			}, 500);
		});
	}

	private buildSvg() {
		d3.select('g').remove();
	  this.svg = d3.select('svg') // svg element from html
	  	.style('fill', 'none')
	  	.style('stroke', 'black')
	    .append('g')   // appends 'g' element for graph design
	    .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
	}

	private addXandYAxis() {
	  // range of data configuring
	  this.x = d3Scale.scaleTime().range([0, this.width]);
	  this.y = d3Scale.scaleLinear().range([this.height, 0]);
	  this.x.domain(d3Array.extent(this.data, (d) => d.date ));
	  this.y.domain(d3Array.extent(this.data, (d) => d.value ));
	  // Configure the X Axis
	  this.svg.append('g')
	      .attr('transform', 'translate(0,' + this.height + ')')
	      .call(d3Axis.axisBottom(this.x));
	  // Configure the Y Axis
	  this.svg.append('g')
	      .attr('class', 'axis axis--y')
	      .call(d3Axis.axisLeft(this.y));
	}

	private drawLineAndPath() {
	  this.line = d3Shape.line()
	      .x( (d: any) => this.x(d.date) )
	      .y( (d: any) => this.y(d.value) );
	  // Configuring line path
	  this.svg.append('path')
	      .datum(this.data)
	      .attr('class', 'line')
	      .attr('d', this.line);
	}



  // ngOnInit(): void {
  // 	// set the dimensions and margins of the graph

		// var margin = {top: 10, right: 30, bottom: 30, left: 60},
		//     width = 600 - margin.left - margin.right,
		//     height = 400 - margin.top - margin.bottom;
		// (d3 as any).csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
		// function(d){
		//     return { date : d3.timeParse("%Y-%m-%d")(d.date), value : Number(d.value) }
		//   },


		// const tempCSV = [];
		// //Read the data
		// (d3 as any).csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

		//   // When reading the csv, I must format variables:
		//   function(d){
		//     return { date : d3.timeParse("%Y-%m-%d")(d.date), value : Number(d.value) }
		//   },

		//   // Now I can use this dataset:
		//   function(data) {
		//   	tempCSV.push(data);
		//   }
		// );

		// const temp = (data, at) => {
		//   	at = data.length > at ? at : data.length - 1;
		//   	data = data.splice(at, 50);

		//     // Add X axis --> it is a date format
		//     var customX = d3.scaleTime()
		//       .domain((d3 as any).extent(data, function(d) { return d.date; }))
		//       .range([ 0, width ]);

		//     const g1 = svg.select("g#g1").empty() ? svg.append("g").attr('id', 'g1') : svg.select("g#g1");
		//     (g1
		//       .attr("transform", "translate(0," + height + ")") as any)
		//       .call(d3.axisBottom(customX));

		//     // Add Y axis
		//     var customY = d3.scaleLinear()
		//       .domain([0, d3.max(data, (d: any) => { return +d.value; })])
		//       .range([ height, 0 ]);
		//     const g2 = svg.select("g#g2").empty() ? svg.append("g").attr('id', 'g2') : svg.select("g#g2");
		//     g2
		//       .call(d3.axisLeft(customY));

		//     const line = svg.select("path#line").empty() ? svg.append("path").attr('id', 'line') : svg.select("path#line");
		//     // Add the line
		//     ((line as any)
		//     	.datum(data) as any)
		//       .attr("fill", "none")
		//       .attr("stroke", "steelblue")
		//       .attr("stroke-width", 1.5)
		//       .attr("d", d3.line()
		//         .x((d: any) => {
		//         	return customX(d.date) })
		//         .y((d: any) => { return customY(+d.value) }));
		// 	};

		// 	let at = 0;
		// 	setInterval( () => {
		// 		temp([...tempCSV], at);
		// 		at += 1;
		// 	}, 200);

	 //  }

}



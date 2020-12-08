import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-options-aggregated',
  templateUrl: './options-aggregated.component.html',
  styleUrls: ['./options-aggregated.component.scss']
})
export class OptionsAggregatedComponent implements OnInit {

	settings = {}
    data_json = []
    chartOptions = {}
    symbol = 'NIFTY'
    duration = '5'
    chart_data = []



    //Chart Properties

    multi: any[];
  	view: any[] = [900, 600];

  // options
  	legend: boolean = false;
  	showLabels: boolean = true;
  	animations: boolean = true;
  	xAxis: boolean = true;
  	yAxis: boolean = true;
  	showYAxisLabel: boolean = true;
  	showXAxisLabel: boolean = true;
  	xAxisLabel: string = 'Time';
  	yAxisLabel: string = 'Difference in Open Interest';
  	timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private dataService: DataService,private domSanitizer: DomSanitizer) { 
 	console.log("Constructor Called for Option Aggregated Component")
 }

 changeDuration(value): void{
 	this.duration = value
 	this.dataService.getNiftyOptionChainAggregated(this.symbol,this.duration).subscribe((jsondata: any[])=>{
  		this.chart_data = [{
  			"name":"Difference in Open Interest",
  			"series":[]
  		}]
  		this.data_json = jsondata
  		for(let i=0; i<jsondata.length;i++){
  			this.chart_data[0]['series'].push({
  				"name":jsondata[i].time.split(" ")[1],
  				"value":jsondata[i].diffInOpenInterest
  			})
  		}
  	});

 }


 
  ngOnInit(): void {
  	this.dataService.getNiftyOptionChainAggregated(this.symbol,this.duration).subscribe((jsondata: any[])=>{
  		this.chart_data = [{
  			"name":"Change in Open Interest",
  			"series":[]
  		}]
  		this.data_json = jsondata
  		for(let i=0; i<jsondata.length;i++){
  			this.chart_data[0]['series'].push({
  				"name":jsondata[i].time.split(" ")[1],
  				"value":jsondata[i].diffInOpenInterest
  			})
  		}
  		this.settings = {
  		pager:{
  			display: false
  		},
  		actions: false,
		attr: {
        	class: 'table table-bordered'
      	},
  		columns: {
		    time: {
		      title: 'Time',
		      filter: false
		    },
		    ceOpenInterest: {
		      title: 'CE Open Interest',
		      filter: false
		    },
		    peOpenInterest: {
		      title: 'PE Open Interest',
		      filter: false
		    },
		    diffInOpenInterest: {
		    	title: 'Open Interest Difference',
		      	filter: false,
		      	type: 'html',
			    valuePrepareFunction: (value) => {
				    if (value < 0){
				      	return this.domSanitizer.bypassSecurityTrustHtml('<span style="color:red">' + Number(value).toFixed(2) + '</span>')
				    }else{
				      	return this.domSanitizer.bypassSecurityTrustHtml('<span style="color:green">' + Number(value).toFixed(2) + '</span>');	
				    }
				}
		    },  
		    condition: {
		    	title: 'Condition',
		      	filter: false,
		      	type: 'html',
			    valuePrepareFunction: (value) => {
				    if (value == 'BUY'){
                value = 'SELL';
				      	return this.domSanitizer.bypassSecurityTrustHtml('<span style="color:red">' + value + '</span>')
				    }else{
                value = 'BUY';
				      	return this.domSanitizer.bypassSecurityTrustHtml('<span style="color:green">' + value + '</span>');	
				    }
				}
		    }

		    
  		}
  	};
  	});
  }

}

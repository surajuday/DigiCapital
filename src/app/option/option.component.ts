import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service'
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {
  showOptionChain: boolean = true
  option_btn_msg: string = "Show OI Details"
  settings : any = {pager: { display: false },actions: false}
  options_settings : any = {pager: { display: false },actions: false}
  data_json = []
  options_aggregated_data = []
  oi_change_aggregated_data = []
  full_data = {}
  expiryDate = {}
  expiryDates = []
  strikePrice = 0
  strikePrices = []
  currentTime = {}
  currentPrice = {}
  totalCallOI = 0
  totalPutOI = 0
  totalPutPercentage = 0
  totalCallPercentage = 0
  totalSignal = ""

  totalCallOIChange = 0
  totalPutOIChange = 0
  OIChangePutPercentage = 0
  OIChangeCallPercentage = 0
  OIChangeSignal = ""
  symbol = 'NIFTY'


  chart_data_oi: any[];
  chart_data_change_oi: any[]
  view: any[] = [1200, 400];
  view2: any[] = [1000, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Strike Price';
  showYAxisLabel = true;
  yAxisLabel = 'Open Interest';
  yAxisLabelChange = 'Open Interest Change';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };



  //Grid

  columnDefs = [
        { field: 'make' },
        { field: 'model' },
        { field: 'price'}
    ];

    rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];



 toggleOptionChain(): void{
 	if(this.showOptionChain){
 		this.showOptionChain = false
 		this.option_btn_msg = "Show Option Chain"
 	}else{
 		this.showOptionChain = true
 		this.option_btn_msg = "Show OI Details"
 	}
 }

 constructor(private dataService: DataService,private domSanitizer: DomSanitizer) { 
 	console.log("Constructor Called for Option Component")
 }

  ngOnInit(): void {
  	this.dataService.getNiftyOptionChain(this.symbol).subscribe((jsondata)=>{
  		this.chart_data_oi = []
  		this.chart_data_change_oi = []
  		this.options_aggregated_data = []
  		this.oi_change_aggregated_data = []
  		this.full_data = jsondata
  		this.expiryDates = jsondata['expiryDates']
  		this.strikePrices = jsondata['strikePrices']
  		this.expiryDate = this.expiryDates[0]
  		this.currentTime = jsondata['currentTime']
  		this.currentPrice = jsondata['currentPrice']
  		var atm:number = this.getATMForNifty(this.currentPrice)
  		var temp_json = []
  		temp_json = jsondata['expiryDateData'][this.expiryDate]
  		for(let i = 0; i < temp_json.length; i++){
  			if (Math.abs(temp_json[i].strikePrice - atm)<=300){
  				this.data_json.push(temp_json[i])
  				this.chart_data_oi.push({
  				"name":temp_json[i].strikePrice,
  				"series":[
  					{
  						"name":"Call",
  						"value":temp_json[i].CEopenInterest
  					},
  					{
  						"name":"Put",
  						"value":temp_json[i].PEopenInterest
  					}
  				]

  			});

  				this.chart_data_change_oi.push({
  				"name":temp_json[i].strikePrice,
  				"series":[
  					{
  						"name":"Call Change in Open Interest",
  						"value":temp_json[i].CEchangeinOpenInterest
  					},
  					{
  						"name":"Put Change in Open Interest",
  						"value":temp_json[i].PEchangeinOpenInterest
  					}
  				]

  			});
  			}
  		}

  		for (let i = 0; i < this.data_json.length; i++) {
  			this.totalCallOI = this.totalCallOI + this.data_json[i].CEopenInterest
  			this.totalPutOI = this.totalPutOI + this.data_json[i].PEopenInterest
  			this.totalCallOIChange = this.totalCallOIChange + this.data_json[i].CEchangeinOpenInterest
  			this.totalPutOIChange = this.totalPutOIChange + this.data_json[i].PEchangeinOpenInterest
		}
		this.totalCallPercentage = this.totalCallOI/(this.totalCallOI+this.totalPutOI)
		this.totalPutPercentage = this.totalPutOI/(this.totalCallOI+this.totalPutOI)

		this.OIChangePutPercentage = this.totalPutOIChange/(this.totalPutOIChange+this.totalCallOIChange)
		this.OIChangeCallPercentage = this.totalCallOIChange/(this.totalPutOIChange+this.totalCallOIChange)

		if(this.OIChangePutPercentage > this.OIChangeCallPercentage){
			this.OIChangeSignal = "BUY"
		}else{
			this.OIChangeSignal = "SELL"
		}
		
		this.options_aggregated_data.push({
			"totalCallPercentage":this.totalCallPercentage,
			"totalPutPercentage":this.totalPutPercentage,
			"signal":this.totalSignal
		});

		this.oi_change_aggregated_data.push({
			"totalCallPercentage":this.OIChangeCallPercentage,
			"totalPutPercentage":this.OIChangePutPercentage,
			"signal":this.OIChangeSignal
		});
		this.settings = {
  		pager: { display: false },
  		actions: false,
		attr: {
        	class: 'table table-bordered'
      	},
  		columns: {
		    CEopenInterest: {
		      title: 'CE OI',
		      filter: false
		    },
		    CEchangeinOpenInterest: {
		      title: 'CE CHNG IN OI',
		      filter: false,
		      type: 'html',
		      valuePrepareFunction: (value) => {
			      if (value < 0){
			      	return this.domSanitizer.bypassSecurityTrustHtml('<span style="color:red">' + Number(value).toFixed(2) + '</span>')
			      }
			      else{
			      	return this.domSanitizer.bypassSecurityTrustHtml('<span style="color:green">' + Number(value).toFixed(2) + '</span>');	
			      }
			      
			    }
		    },
		    CElastPrice: {
		      title: 'CE LTP',
		      filter: false
		    },
		    CEchange: {
		      title: 'CE CHNG',
		      filter: false,
		      type: 'html',
		      valuePrepareFunction: (value) => {
			      if (value < 0){
			      	return this.domSanitizer.bypassSecurityTrustHtml('<span style="color:red">' + Number(value).toFixed(2) + '</span>')
			      }
			      else{
			      	return this.domSanitizer.bypassSecurityTrustHtml('<span style="color:green">' + Number(value).toFixed(2) + '</span>');	
			      }
			    }
		    },
		    strikePrice: {
		      title: 'STRIKE PRICE',
		      filter: false
		    },
		    expiryDate:{
		      title: 'EXPIRY DATE',
		      filter: false,
		      class: 'strkCls'
		    },
		    PEopenInterest: {
		      title: 'PE OI',
		      filter: false
		    },
		    PEchangeinOpenInterest: {
		      title: 'PE CHNG IN OI',
		      filter: false,
		      type: 'html',
		      valuePrepareFunction: (value) => {
			      if (value < 0){
			      	return this.domSanitizer.bypassSecurityTrustHtml('<span style="color:red">' + Number(value).toFixed(2) + '</span>')
			      }
			      else{
			      	return this.domSanitizer.bypassSecurityTrustHtml('<span style="color:green">' + Number(value).toFixed(2) + '</span>');	
			      }
			    }
		    },
		    PElastPrice: {
		      title: 'PE LTP',
		      filter: false
		    },
		    PEchange: {
		      title: 'PE CHNG',
		      filter: false,
		      type: 'html',
		      valuePrepareFunction: (value) => {
			      if (value < 0){
			      	return this.domSanitizer.bypassSecurityTrustHtml('<span style="color:red">' + Number(value).toFixed(2) + '</span>')
			      }
			      else{
			      	return this.domSanitizer.bypassSecurityTrustHtml('<span style="color:green">' + Number(value).toFixed(2) + '</span>');	
			      }
			    }
		    }
  		}
  	};


  	this.options_settings = {
  		pager: { display: false },
  		actions: false,
		attr: {
        	class: 'table table-bordered'
      	},
  		columns: {
		    totalCallPercentage: {
		      title: 'CALL',
		      filter: false,
		      valuePrepareFunction: (value) => {
			      	return Number(value).toFixed(2)
			      }
		    },
		    totalPutPercentage: {
		      title: 'PUT',
		      filter: false,
		      valuePrepareFunction: (value) => {
			      	return Number(value).toFixed(2)
			      }
		    },
		    signal: {
		      title: 'Signal',
		      filter: false
		    }
  		}
  	};
  	});
  }

  getATMForNifty(spot_price): number {
  		var atm:number =  (50 * Math.floor(parseFloat(spot_price)/50))
  		return atm
  	}

  changeExpiry(e): void {
  	this.expiryDate = e.target.value
  	this.data_json = this.full_data['expiryDateData'][this.expiryDate]
  }

  changeStrikePrice(e): void{
  	this.strikePrice = e.target.value
  	this.data_json = this.full_data['strikePriceData'][this.strikePrice]
  }


  }

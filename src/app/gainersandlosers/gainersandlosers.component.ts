import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-gainersandlosers',
  templateUrl: './gainersandlosers.component.html',
  styleUrls: ['./gainersandlosers.component.css']
})
export class GainersandlosersComponent implements OnInit {

	gainers_losers_setting : any = {actions: false}
	gainersData: any[] = []
	losersData: any[] = []

  constructor(private dataService: DataService,private domSanitizer: DomSanitizer) { 
 	console.log("Constructor Called for IpoDetailComponent")
 	}

  ngOnInit(): void {
  	this.dataService.getGainersAndLosers().subscribe((jsondata:any) => {
  		var gainers:any[] = jsondata['data']['gainers']
  		var losers:any[] = jsondata['data']['losers']

  		for(let i = 0;i<gainers.length;i++){
  			gainers[i]['change'] = gainers[i]['ltp'] - gainers[i]['close_price']
  			this.gainersData.push(gainers[i]);
  		}

  		for(let i = 0;i<losers.length;i++){
  			losers[i]['change'] = losers[i]['ltp'] - losers[i]['close_price']
  			this.losersData.push(losers[i]);
  		}



  		this.gainers_losers_setting = {
			actions: false,
			hideSubHeader: true,
			attr: {
				class: 'table table-bordered'
			},
			pager: {
				display: false
			},
			columns: {
				symbol: {
					title: 'SYMBOL',
					filter: false
				},
				ltp: {
					title: 'LTP',
					filter: false
				},
				change: {
					title: 'CHANGE',
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
				netPrice: {
					title: '% CHANGE',
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
				tradedQuantity: {
					title: 'VOLUME',
					filter: false
				},
				close_price: {
					title: 'PREVIOUS CLOSE',
					filter: false
				}
			}
		};

  	});
  
  }
}

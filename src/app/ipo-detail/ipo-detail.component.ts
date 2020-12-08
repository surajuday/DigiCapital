import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ipo-detail',
  templateUrl: './ipo-detail.component.html',
  styleUrls: ['./ipo-detail.component.css']
})
export class IpoDetailComponent implements OnInit {

	ipoID = ""
	ipoCompanyName = ""
	ipo_details_settings : any = {actions: false}
	ipo_timeline_settings : any = {actions: false}
	ipo_subscription_settings : any = {actions: false}
	ipo_shares_offered_settings : any = {actions: false}
	ipo_financial_settings : any = {actions: false}
	ipoDetailData = []
	ipoTimelineData = []
	ipoSubscriptionData = []
	ipoSharesOfferedData = []
	ipoFinancialData = []
	objectives = []
	aboutCompany = ""
	addLine1 = ""
	addLine2 = ""
	phone = ""
	email = ""
	website = ""
	reg_name = ""
	reg_addLine2 = ""
	reg_addLine1 = ""
	reg_phone = ""
	reg_fax = ""

  constructor(private dataService: DataService,private route: ActivatedRoute) { 
 	console.log("Constructor Called for IpoDetailComponent")
 	}

  ngOnInit() {
     var param = this.route.snapshot.params
     this.ipoID = param['']
     this.dataService.getIpoDetailsById(this.ipoID).subscribe((jsondata) => {
			this.ipoCompanyName = jsondata['companyName']
			var ipo_detail = {}
			ipo_detail['openDate'] = jsondata['openDate']
			ipo_detail['closeDate'] = jsondata['closeDate']
			ipo_detail['issuePrice'] = jsondata['issuePrice']
			ipo_detail['totalIPOSize'] = jsondata['totalIPOSize']
			ipo_detail['marketLot'] = jsondata['marketLot']
			ipo_detail['faceValue'] = jsondata['faceValue']
			ipo_detail['exchange'] = jsondata['exchange']
			ipo_detail['nseCode'] = jsondata['nseCode']
			this.ipoDetailData.push(ipo_detail)
			this.ipoTimelineData.push(jsondata['timeline']);
			this.ipoSubscriptionData = jsondata['subscriptions']
			if(this.ipoSubscriptionData){
				for (let i = 0; i < this.ipoSubscriptionData.length; i++) {
	  				var shares_offered = {}
					shares_offered['QIB'] = this.ipoSubscriptionData[i].QIBOffered
					shares_offered['NII'] = this.ipoSubscriptionData[i].NIIOffered
					shares_offered['Retail'] = this.ipoSubscriptionData[i].retailOffered
					shares_offered['Employee'] = this.ipoSubscriptionData[i].employeeOffered
					shares_offered['Total'] = this.ipoSubscriptionData[i].totalOffered
					this.ipoSharesOfferedData.push(shares_offered)
					break;
				}	
			}
			

			var years_list = []
			var financial_data_final = []
			if(jsondata['companyFinancials']){
			var particular_key_map = {
				"operatingExpenditures":"Operating Expenditures",
				"directExpenditures":"Direct Expenditures",
				"eps":"EPS",
				"tax":"Tax",
				"profitBeforeTax":"Profit Before Tax",
				"sales":"Sales",
				"otherIncome":"Other Income",
				"profitAfterTax":"Profit After Tax",
				"interest":"Interest",
				"grossProfit":"Gross Profit",
				"depreciation":"Depreciation",
				"operatingProfit":"Operating Profit"
			}

				var financial_data = jsondata['companyFinancials']
				years_list = financial_data['years']
				Object.keys(financial_data).forEach(function(key) {
					var value = financial_data[key];
					if (key != 'years'){
						var financial_attribute = {}
						financial_attribute['Particular'] = particular_key_map[key]
						for(let i =0;i<value.length;i++){
							financial_attribute[years_list[i]] = value[i].value
						}
						financial_data_final.push(financial_attribute)
					}

				});
			}

			this.ipoFinancialData = financial_data_final

			if(jsondata['companyDetails']['companyObjectives']){
				for (let i = 0; i < jsondata['companyDetails']['companyObjectives'].length; i++) {
  					this.objectives.push(jsondata['companyDetails']['companyObjectives'][i])
				}
			}
			
			if(jsondata['companyDetails']['companyDescription']){
				this.aboutCompany = jsondata['companyDetails']['companyDescription']
			}
			
			if(jsondata['companyDetails']['companyAddress']){
				this.addLine1 = jsondata['companyDetails']['companyAddress']['addressLine1']
				this.addLine2 = jsondata['companyDetails']['companyAddress']['addressLine2']
				this.phone = jsondata['companyDetails']['companyAddress']['telephone1']
				this.email = jsondata['companyDetails']['companyAddress']['email']
				this.website = jsondata['companyDetails']['website']
			}

			if(jsondata['companyDetails']['registrarAddress']){
				this.reg_name = jsondata['companyDetails']['registrarAddress']['name']
				this.reg_addLine1 = jsondata['companyDetails']['registrarAddress']['addressLine1']
				this.reg_addLine2 = jsondata['companyDetails']['registrarAddress']['addressLine2']
				this.reg_phone = jsondata['companyDetails']['registrarAddress']['telephone1']
				this.reg_fax = jsondata['companyDetails']['registrarAddress']['fax1']
			}

			this.ipo_details_settings = {
			actions: false,
			hideSubHeader: true,
			attr: {
				class: 'table table-bordered'
			},
			pager: {
				display: false
			},
			columns: {
				openDate: {
					title: 'OPEN DATE',
					filter: false
				},
				closeDate: {
					title: 'CLOSE DATE',
					filter: false,
					type: 'html'
				},
				issuePrice: {
					title: 'ISSUE PRICE',
					filter: false
				},
				totalIPOSize: {
					title: 'TOTAL IPO SIZE',
					filter: false
				},
				marketLot: {
					title: 'MIN QUANTITY TO ORDER',
					filter: false
				},
				faceValue: {
					title: 'FACE VALUE',
					filter: false
				},
				exchange: {
					title: 'LISTING AT',
					filter: false
				},
				nseCode: {
					title: 'SYMBOL',
					filter: false
				}
			}
		};

		this.ipo_timeline_settings = {
			actions: false,
			hideSubHeader: true,
			attr: {
				class: 'table table-bordered'
			},
			pager: {
				display: false
			},
			columns: {
				openDate: {
					title: 'OPEN DATE',
					filter: false
				},
				closeDate: {
					title: 'CLOSE DATE',
					filter: false,
					type: 'html'
				},
				allotmentDate: {
					title: 'ALLOTMENT DATE',
					filter: false
				},
				refundInitDate: {
					title: 'REFUND INITIATION DATE',
					filter: false
				},
				trnsfrShareToDmatDate: {
					title: 'TRANSFER SHARE TO DEMAT DATE',
					filter: false
				},
				listingDate: {
					title: 'LISTING DATE',
					filter: false
				}
			}
		};


		this.ipo_subscription_settings = {
			actions: false,
			hideSubHeader: true,
			attr: {
				class: 'table table-bordered'
			},
			pager: {
				display: false
			},
			columns: {
				updatedTime: {
					title: 'DATE',
					filter: false,
					valuePrepareFunction: (value) => {
			   			return value.split("T")[0];
			      	}
				},
				NIISubscribed: {
					title: 'NII Subscribed',
					filter: false
				},
				QIBSubscribed: {
					title: 'QIB Subscribed',
					filter: false,
					type: 'html'
				},
				retailSubscribed: {
					title: 'Retail Subscribed',
					filter: false
				},
				employeeSubscribed: {
					title: 'Employee Subscribed',
					filter: false
				},
				totalSubscribed: {
					title: 'Total Subscribed',
					filter: false
				}
			}
		};

		this.ipo_shares_offered_settings = {
			actions: false,
			hideSubHeader: true,
			attr: {
				class: 'table table-bordered'
			},
			pager: {
				display: false
			},
			columns: {
				QIB: {
					title: 'QIB Offered',
					filter: false
				},
				NII: {
					title: 'NII Offered',
					filter: false
				},
				Retail: {
					title: 'Retail Offered',
					filter: false
				},
				Employee: {
					title: 'Employee Offered',
					filter: false
				},
				Total: {
					title: 'Total Offered',
					filter: false
				}
			}
		};

		this.ipo_financial_settings = {
			actions: false,
			hideSubHeader: true,
			attr: {
				class: 'table table-bordered'
			},
			pager: {
				display: false
			},
			columns: {
					
			}
		};
		this.ipo_financial_settings['columns']['Particular'] = {
					title: 'Particulars',
					filter: false
			};
		for (let i = 0; i < years_list.length; i++) {
  				this.ipo_financial_settings['columns'][years_list[i]] = {
  					title: years_list[i],
  					filter: false
  				}
			}

		});



  } 

}

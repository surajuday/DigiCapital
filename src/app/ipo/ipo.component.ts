import {
	Component,
	OnInit
} from '@angular/core';
import {
	DataService
} from '../data.service';
import {
	Router
} from '@angular/router';

@Component({
	selector: 'app-ipo',
	templateUrl: './ipo.component.html',
	styleUrls: ['./ipo.component.scss']
})
export class IPOComponent implements OnInit {

	listed_ipo = []
	upcoming_ipo = []
	ongoing_ipo = []
	abouttoblisted_ipo = []

	listed_ipo_exist = false
	upcoming_ipo_exist = false
	ongoing_ipo_exist = false
	abouttoblisted_ipo_exist = false
	ongoing_settings = {}
	tobelisted_settings = {}
	listed_settings = {}

	constructor(private dataService: DataService, private router: Router) {
		console.log("Constructor Called for IPOComponent")
	}

	ngOnInit(): void {

		this.ongoing_settings = {
			actions: false,
			attr: {
				class: 'table table-bordered'
			},
			pager: {
				display: true,
				perPage: 10
			},
			columns: {
				companyCode: {
					title: 'ID',
					hide: true
				},
				companyName: {
					title: 'Company',
					filter: false,
					type: 'html'
				},
				openDate: {
					title: 'Open Date',
					filter: false
				},
				closeDate: {
					title: 'Close Date',
					filter: false
				},
				issuePrice: {
					title: 'Issue Price',
					filter: false
				}
			}
		};

		this.tobelisted_settings = {
			actions: false,
			attr: {
				class: 'table table-bordered'
			},
			pager: {
				display: true,
				perPage: 10
			},
			columns: {
				companyCode: {
					title: 'ID',
					hide: true
				},
				companyName: {
					title: 'Company',
					filter: false,
					type: 'html'
				},
				listingDate: {
					title: 'Listing Date',
					filter: false
				},
				totalSubscription: {
					title: 'Subscription',
					filter: false
				},
				issuePrice: {
					title: 'Price Band',
					filter: false
				}
			}
		};

		this.listed_settings = {
			actions: false,
			attr: {
				class: 'table table-bordered'
			},
			pager: {
				display: true,
				perPage: 10
			},
			columns: {
				companyCode: {
					title: 'ID',
					hide: true
				},
				companyName: {
					title: 'Company',
					filter: false,
					type: 'html'
				},
				listingDate: {
					title: 'Listed On',
					filter: false
				},
				ltp: {
					title: 'Last Traded Price',
					filter: false
				},
				issuePrice: {
					title: 'Listing Price',
					filter: false
				},
				changeListing:{
					title: 'Change Since Listing',
					filter: false,
					valuePrepareFunction: (value) => {
			      		return Number(value).toFixed(2)
			      }
				}
			}
		};

		this.dataService.getIpoSummary().subscribe((jsondata: any[]) => {
			for(let i = 0 ; i < jsondata.length ; i++){
				var id = jsondata[i].companyCode
    			var company = jsondata[i].companyName
    			jsondata[i].companyName = '<a href = "/ipo/detail/'+id+'">'+company+'</a>'
				var ipoType = jsondata[i].ipoType
				if(ipoType == 'listed'){
					var finalIssuePrice = jsondata[i]['issuePrice'];
					if(jsondata[i]['issuePrice'].search("-") != -1){
						finalIssuePrice = jsondata[i]['issuePrice'].split("-")[1]
					}
					var changeListing = ((jsondata[i]['ltp'] - finalIssuePrice)/finalIssuePrice)*100
					jsondata[i]['changeListing'] = changeListing
					this.listed_ipo.push(jsondata[i]);
					this.listed_ipo_exist = true
				}else if(ipoType == 'ongoing'){
					this.ongoing_ipo.push(jsondata[i]);
					this.ongoing_ipo_exist = true
				}else if(ipoType == 'abouttoblisted'){
					this.abouttoblisted_ipo.push(jsondata[i]);
					this.abouttoblisted_ipo_exist = true
				}else{
					this.upcoming_ipo.push(jsondata[i]);
					this.upcoming_ipo_exist = true
				}
  			}   
		}
		);
	}
}
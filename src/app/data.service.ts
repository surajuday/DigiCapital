import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  public getNiftyOptionChain(symbol: String){
    return this.httpClient.get(`http://192.168.1.4:8080/options?symbol=`+symbol);
  }

  public getNiftyOptionChainAggregated(symbol: String,duration: String){
    return this.httpClient.get(`http://192.168.1.4:8080/options/aggregated?symbol=`+symbol+`&duration=`+duration);
  }

  public getIpoSummary(){
    return this.httpClient.get(`http://192.168.1.4:8080/ipo`);
  }

  public getIpoDetailsById(id: String){
    return this.httpClient.get(`http://192.168.1.4:8080/ipo/details?ipoID=`+id);
  }

  public getGainersAndLosers(){
    return this.httpClient.get(`http://192.168.1.4:8080/gainersandlosers`);
  }

}

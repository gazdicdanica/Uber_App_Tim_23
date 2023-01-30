import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartData } from 'chart.js';
import { Chart } from 'chart.js/dist';
import { ChartConfiguration, ChartOptions } from 'chart.js/dist/types/index';
import { RideService } from '../../services/ride/ride.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit{

  rideNumber : Map<string, number> = new Map<string, number>;
  rideNumberDataSet! : ChartData<'bar', {key: string, value : number} []>;

  price : Map<string, number> = new Map<string, number>;
  priceDataSet! : ChartData<'line', {key: string, value : number} []>;

  km : Map<string, number> = new Map<string, number>;
  kmDataSet! : ChartData<'line', {key: string, value : number} []>;

  
  constructor(private rideService: RideService) {}

  ngOnInit(){
    
  }

  reportCrit=  new FormGroup({
    startDate: new FormControl<Date | null>(null, Validators.required),
    endDate: new FormControl<Date | null>(null, Validators.required)
  });

  getBetweenDates(start : Date, end : Date) : void{
    let currentDate = new Date(start);
    currentDate.setHours(0, -currentDate.getTimezoneOffset(), 0, 0);
    while (currentDate <= end) {
      let d = new Date(currentDate).toISOString();
      this.rideNumber.set(d, 0);
      this.price.set(d, 0);
      this.km.set(d, 0);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }


  generateReport(){
    if(this.reportCrit.valid){
      if(this.reportCrit.value.startDate !== undefined && this.reportCrit.value.startDate !== null && this.reportCrit.value.endDate !== undefined && this.reportCrit.value.endDate !== null){
        this.getBetweenDates(this.reportCrit.value.startDate, this.reportCrit.value.endDate);
        this.rideService.getRidesByDate(this.reportCrit.value.startDate, this.reportCrit.value.endDate).subscribe({
          next : (result)=>{
            console.log(result);

            for(let ride of result){
              let startTime = new Date(ride.startTime);
              startTime.setHours(0, -startTime.getTimezoneOffset(), 0, 0);
              if(this.rideNumber.has(startTime.toISOString())){
                let current : number = this.rideNumber.get(startTime.toISOString())!;
                let currPrice : number = this.price.get(startTime.toISOString())!;
                let currKm : number = this.km.get(startTime.toISOString())!;
                this.rideNumber.set(startTime.toISOString(), current + 1);
                this.price.set(startTime.toISOString() , currPrice + ride.totalCost);
                this.km.set(startTime.toISOString(), currKm + ride.totalDistance);
              }else{
                this.rideNumber.set(startTime.toISOString(), 1);
                this.price.set(startTime.toISOString() , ride.totalCost);
                this.km.set(startTime.toISOString(), ride.totalDistance);
              }
            }
            console.log(this.rideNumber);

            this.generateCharts();

          },
          error : (error) => {
            console.log(error);
          }
        });
      }
      
      
    }

  }

  generateCharts(){
    this.rideNumberDataSet = {
      datasets: [{
        data: Array.from(this.rideNumber, ([key, value]) => ({key, value})),
        parsing : {
          xAxisKey: 'key',
          yAxisKey: 'value'
        },
      }],
    }

    this.priceDataSet = {
      datasets: [{
        data: Array.from(this.price, ([key, value]) => ({key, value})),
        parsing : {
          xAxisKey: 'key',
          yAxisKey: 'value'
        },
      }],
    }

    this.kmDataSet = {
      datasets: [{
        data: Array.from(this.km, ([key, value]) => ({key, value})),
        parsing : {
          xAxisKey: 'key',
          yAxisKey: 'value'
        },
      }],
    }
  }
}

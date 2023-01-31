import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartData } from 'chart.js';
import { RideService } from '../../services/ride/ride.service';
import 'chartjs-adapter-date-fns';
import * as moment from 'moment';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit{

  rideNumber : Map<string, number> = new Map<string, number>;
  rideNumberDataSet! : ChartData<'bar', {key: string, value : number} []>;
  totalNum : number = 0;

  price : Map<string, number> = new Map<string, number>;
  priceDataSet! : ChartData<'line', {key: string, value : number} []>;
  totalPrice : number = 0;

  km : Map<string, number> = new Map<string, number>;
  kmDataSet! : ChartData<'line', {key: string, value : number} []>;
  totalKm : number = 0;

  generate : boolean = false;
  role : string = "";
  
  constructor(private rideService: RideService, private authService: AuthService) {}

  ngOnInit(){
    this.role = this.authService.getRole();
  }

  reportCrit=  new FormGroup({
    startDate: new FormControl<Date | null>(null, Validators.required),
    endDate: new FormControl<Date | null>(null, Validators.required)
  });

  getBetweenDates(start : Date, end : Date) : void{
    let currentDate = new Date(start);
    currentDate.setHours(0, -currentDate.getTimezoneOffset(), 0, 0);
    while (currentDate <= end) {
      let d = new Date(currentDate).toLocaleDateString();
      this.rideNumber.set(d, 0);
      this.price.set(d, 0);
      this.km.set(d, 0);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }


  generateReport(){
    this.totalKm = 0;
    this.totalNum = 0;
    this.totalPrice = 0;
    if(this.reportCrit.valid){
      if(this.reportCrit.value.startDate !== undefined && this.reportCrit.value.startDate !== null && this.reportCrit.value.endDate !== undefined && this.reportCrit.value.endDate !== null){
        this.getBetweenDates(this.reportCrit.value.startDate, this.reportCrit.value.endDate);
        this.rideService.getRidesByDate(this.reportCrit.value.startDate, this.reportCrit.value.endDate).subscribe({
          next : (result)=>{
            console.log(result);

            for(let ride of result){
              let startTime = new Date(ride.startTime);
              startTime.setHours(0, -startTime.getTimezoneOffset(), 0, 0);
              if(this.rideNumber.has(startTime.toLocaleDateString())){
                let current : number = this.rideNumber.get(startTime.toLocaleDateString())!;
                let currPrice : number = this.price.get(startTime.toLocaleDateString())!;
                let currKm : number = this.km.get(startTime.toLocaleDateString())!;
                this.rideNumber.set(startTime.toLocaleDateString(), current + 1);
                this.price.set(startTime.toLocaleDateString() , currPrice + ride.totalCost);
                this.km.set(startTime.toLocaleDateString(), currKm + ride.totalDistance);
              }else{
                this.rideNumber.set(startTime.toLocaleDateString(), 1);
                this.price.set(startTime.toLocaleDateString() , ride.totalCost);
                this.km.set(startTime.toLocaleDateString(), ride.totalDistance);
              }
              this.totalNum += 1;
              this.totalPrice += ride.totalCost;
              this.totalKm += ride.totalDistance;
            }
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
        label: "Num of rides by day",
        data: Array.from(this.rideNumber, ([key, value]) => ({key, value})),
        parsing : {
          xAxisKey: 'key',
          yAxisKey: 'value'
        },
      }],
    }

    this.priceDataSet = {
      datasets: [{
        label: "Money spent by day",
        data: Array.from(this.price, ([key, value]) => ({key, value})),
        parsing : {
          xAxisKey: 'key',
          yAxisKey: 'value'
        },
      }],
    }

    this.kmDataSet = {
      datasets: [{
        label: "km passed by day",
        data: Array.from(this.km, ([key, value]) => ({key, value})),
        parsing : {
          xAxisKey: 'key',
          yAxisKey: 'value'
        },
      }],
    }
    this.generate = true;
  }
}

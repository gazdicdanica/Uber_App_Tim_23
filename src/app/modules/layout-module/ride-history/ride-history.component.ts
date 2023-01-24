import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../auth/auth.service';
import { UserShort } from '../../model/UserShort';
import { RideService } from '../../services/ride/ride.service';

@Component({
  selector: 'app-ride-history',
  templateUrl: './ride-history.component.html',
  styleUrls: ['./ride-history.component.css']
})
export class RideHistoryComponent  implements OnInit{
  displayedColumns: string[] = ['departure', 'destination', 'status', 'vehicleType', 'startTime', 'endTime', 'totalCost'];

  dataSource!: MatTableDataSource<RidePaginatedResponse>;
  ridesPaginated: RidePaginatedResponse[] = []
  array: any;

  size!: number;
  currentPage!: number;
  totalItems!: any;
  pageSizeOptions: number[] = [5, 10, 25];
  role!: any;
  data!: any;
  val!: any;

  @ViewChild(MatPaginator, { static:true }) mPaginator!: MatPaginator;
  @ViewChild(MatSort) mSort!: MatSort;


  constructor(private authService: AuthService, private rideService: RideService) {}

  onPaginateChange(event: PageEvent): void {
    this.getData(event.pageIndex, event.pageSize);
  }
  
  onSortChange(event: any) {
    this.getData(event.active, event.direction)
  }

  ngOnInit() {
    this.role = this.authService.getRole();
    this.getData(0, 5);
  }

  getData(pageNum: number, pageSize: number): void {   
    this.rideService.getRideCount(this.authService.getId()).subscribe({
      next: (result) => {
        this.mPaginator.length = result.count;
        console.log(result);
      },
      error: (error) => {
        console.log(error);
      }
    });
    if(this.mSort != undefined){
      if(this.mSort.active == undefined) {
        this.mSort.active = "";
      }}
      this.val = {
        page: pageNum,
        size: pageSize,
        sort: this.mSort ? this.mSort.active + ',' + this.mSort.direction : '',
      }    
    console.log(this.val);
    this.rideService.getRides(this.authService.getId(), this.role, this.val).subscribe({
      next: (result) => {
        this.data = result;
        this.ridesPaginated = result.results;

        this.dataSource = new MatTableDataSource<RidePaginatedResponse>(this.ridesPaginated);
        this.dataSource.sort = this.mSort;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}

export interface RidePaginatedResponse {
  _id: number;
  driver: UserShort;
  locations: Location[];
  passengers: UserShort[];
  petTransport: boolean;
  babyTransport: boolean;
  status: string;
  vehicleType: string;
  rejection: any;
  totalCost: number;
  startTime: Date;
  endTime: Date;
  totalDistance: number;
}
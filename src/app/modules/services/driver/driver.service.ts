import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { Location } from '../../map/Location';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Document } from '../../model/Document';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getDriverLocation(id: number): Observable<Location> {
    return this.httpClient.get<Location>(environment.apiHost + '/driver/'+id+'/location');
  }

  getId(): number {
    return this.authService.getId();
  }

  addDocument(document : Document) : Observable<Document>{
    let id : number = this.getId();
    document.driverId = id;
    return this.httpClient.post<Document>(environment.apiHost + "/driver/" + this.getId() + "/documents", document);
  }

  getDocuments(){
    return this.httpClient.get<Document[]>(environment.apiHost+"/driver/" + this.getId() + "/documents");
  }
}

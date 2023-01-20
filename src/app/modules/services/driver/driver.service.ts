import { HttpClient, HttpParams } from '@angular/common/http';
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

  changeDriverState(flag: boolean): Observable<any> {
    if(flag) {
      return this.httpClient.put<any>(environment.apiHost+"/driver/"+this.authService.getId()+"/working-hour/start", null);
    } else {
      return this.httpClient.put<any>(environment.apiHost+"/driver/"+this.authService.getId()+"/working-hour/end", null);
    }
  }

  addDocument(document : Document) : Observable<Document>{
    let id : number = this.getId();
    document.driverId = id;
    return this.httpClient.post<Document>(environment.apiHost + "/driver/" + this.getId() + "/documents", document);
  }

  getDocuments(){
    return this.httpClient.get<Document[]>(environment.apiHost+"/driver/" + this.getId() + "/documents");
  }

  deleteDocument(name : string){
    let params = new HttpParams();
    params.append("name",name);
    return this.httpClient.delete(environment.apiHost + "/driver/document/", {params: params});
  }
}

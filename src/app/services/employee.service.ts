import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from '../interfaces/IEmployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  constructor(private http : HttpClient) { }
  get(): Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>("https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==");
  }
}

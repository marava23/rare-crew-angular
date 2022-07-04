import { Component } from '@angular/core';
import { IEmployee } from './interfaces/IEmployee';
import { IEmployeeFinal } from './interfaces/IEmployeeFinal';
import { EmployeeService } from './services/employee.service';
import { GoogleChartInterface } from 'ng2-google-charts';
import { GoogleChartType } from 'ng2-google-charts';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'rare-crew';
  employees : IEmployee[] = [];
  empoloyeesFinal : IEmployeeFinal[] = [];
  constructor(private employeeService : EmployeeService){
    this.employeeService.get().subscribe((response)=>{
        this.employees = response;
        var id = 1;
        this.employees.forEach((e, index)=>{
          let employeeFinal : IEmployeeFinal = {
            Id : e.Id,
            EmployeeName : e.EmployeeName,
            TotalHours : this.claculateWorkingTime(  new Date(e.StarTimeUtc), new Date(e.EndTimeUtc))
          }
          if(!this.empoloyeesFinal.find(x=> x.EmployeeName === e.EmployeeName)){
            employeeFinal.Id = id;
            if(employeeFinal.EmployeeName)
            this.empoloyeesFinal.push(employeeFinal);
            console.log("usao u if");
          }
          else{
            this.empoloyeesFinal.filter(x=> x.EmployeeName == employeeFinal.EmployeeName ? x.TotalHours += employeeFinal.TotalHours : false);
            console.log("usao u else");
          }

    });
    console.log(this.empoloyeesFinal);
    this.empoloyeesFinal = this.empoloyeesFinal.sort((x,y) => y.TotalHours - x.TotalHours);
    })
  }
  claculateWorkingTime(timeBegin: Date, timeEnd : Date){
    return Math.round((timeEnd.getTime() - timeBegin.getTime()) / (1000*60*60));
  }
  pieChart: GoogleChartInterface={
    chartType: GoogleChartType.PieChart,
    dataTable : [
        ['Employee', 'Working hours'],
        ['Patrick Huthinson	', 223],
        ['John Black', 206],
        ['Stewart Malachi', 205],
        ['Abhay Singh', 199],
        ['Tim Perkinson', 177],
        ['Mary Poppins', 170],
        ['Kavvay Verma', 163],
        ['Rita Alley', 115],
        ['Raju Sunuwar', 103],
        ['Tamoy Smith', 96]
    ],
  }
}

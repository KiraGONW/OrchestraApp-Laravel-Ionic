import { Component, OnInit } from '@angular/core';
import { Data } from '../models/data';
import { Status } from '../models/status';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { StatusService } from '../services/status.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.page.html',
  styleUrls: ['./employee-data.page.scss'],
})
export class EmployeeDataPage implements OnInit {

  dat: Data[]
  sta: Status[]
  private email: string;
  admin :boolean;
  data: boolean;
  search: string;

  constructor(private DataService: DataService, private StatusService: StatusService, private AuthService: AuthService, private router: Router) { }

  ngOnInit() {
    this.admin = this.AuthService.isAdmin();
    this.isAdmin();
  }

  getAllData(){
    this.DataService.getData().subscribe( dat => {
      this.dat = dat;
      if(this.dat.length == 0){
        console.log("agua")
        this.data = false
      } else {
        this.data = true
      }
    });
    document.getElementById("reload-icon").style.display = "none";
    document.getElementById("search-icon").style.display = "";
    this.search = "";
  }

  getDataByEmail(email: string){
    this.DataService.getDataByEmail(email).subscribe( dat => {
      this.dat = dat;
      if(this.dat.length == 0){
        console.log("agua")
        this.data = false
      } else {
        this.data = true
      }
    });
    if(this.admin){
      document.getElementById("reload-icon").style.display = "";
      document.getElementById("search-icon").style.display = "none";
    }
  }

  getStatusByEmail(email: string){
    this.StatusService.getStatusByEmail(email).subscribe( sta => {
      this.sta = sta;
    });
  }

  DataSearch(){
    this.getDataByEmail(this.search)
  }

  updateData(id: number){
    this.DataService.setCurrentDataId(id);
    this.router.navigateByUrl("/update-data");
  }

  isAdmin(){
    if(this.admin){
      this.getAllData();
    } else if(!this.admin) {
      const user = this.AuthService.getUser()
      this.email = user.email;
      this.getDataByEmail(this.email);
      this.getStatusByEmail(this.email);
      
    }
  }

  return(){
    this.router.navigateByUrl("/tabs/tab2");
  }

}

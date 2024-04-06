import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  customers: any;
  users: any;

  selectedCustomers: any = [];

  representatives:any;

  statuses:any;

  loading:boolean = true;

  activityValues: number[] = [0, 100];
  constructor() { }
  ngOnInit() {
    this.users = [{name:'Abhi', State:'Karnataka', utype: 'Farmer', status: 'Active'}, {name:'Jai',State: 'Andhra Pradesh', utype: 'Farmer', status: 'Active'}, {name:'Abhishek',state: 'Andhra Pradesh', utype: 'Consumer', status: 'Inactive'}];
  }

}

import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
// import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  customers: any;
  users: any;

  selectedCustomers: any = [];

  representatives: any;

  statuses: any;

  loading: boolean = false;
  searchdata: any = null;

  activityValues: number[] = [0, 100];

  constructor() { }
  ngOnInit() {
    this.users = [{ name: 'Abhi', state: 'Karnataka', utype: 'Farmer', status: 'Active' }, { name: 'Jai', state: 'Andhra Pradesh', utype: 'Farmer', status: 'Active' }, { name: 'Abhishek', state: 'Andhra Pradesh', utype: 'Consumer', status: 'Inactive' }];
  }


  clear(table: Table) {
    table.clear();
    this.searchdata = null;
  }

  checkclear(event: any, dt: any) {
    this.searchdata = event;
    console.log(event, dt);
  }



}

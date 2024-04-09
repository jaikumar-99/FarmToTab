import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Toast } from 'primeng/toast';
import { AppService } from '../app.service';
import { MessageService } from 'primeng/api';
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

  // shimmers
  enableShimmers = true;

  constructor(private appservice: AppService,public messageService: MessageService) { }
  ngOnInit() {
    // this.users = [{ name: 'Abhi', state: 'Karnataka', utype: 'Farmer', status: 'Active' }, { name: 'Jai', state: 'Andhra Pradesh', utype: 'Farmer', status: 'Active' }, { name: 'Abhishek', state: 'Andhra Pradesh', utype: 'Consumer', status: 'Inactive' }];
    this.fetchUsers();
  }


  clear(table: Table) {
    table.clear();
    this.searchdata = null;
  }


//   showSuccess(mes:any) {
//     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
// }

// showInfo(mes:any) {
//     this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
// }

// showWarn(mes:any) {
//     this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Message Content' });
// }

// showError(mes:any) {
//     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
// }

  fetchUsers() {
    this.appservice.getuserslist().subscribe({
      next: (response: any) => {
        console.log('Users List', response);

        if (response?.success) {
          console.log(response,'response users list');
          this.users = response.data;
          this.enableShimmers = false;
          // this.messageService.add({ severity:'success', summary: 'Success', detail: 'Users listist fetched successfully' });
        } else {
          console.log('Login Error');
          this.messageService.add({ severity:'error', summary: 'Error', detail: 'Failed fetching users!!!' });
          this.enableShimmers = false;
        }
      }, error: (error: any) => {
        console.log('Error', error);
        this.enableShimmers = false;
      }
    })
  }


  onDelete(event:any) {
    console.log(event, 'event');

    this.appservice.deleteUser({id:event._id}).subscribe({
      next: (response: any) => {
        console.log('Delete Response', response);
        if (response?.success) {
          this.fetchUsers();
          this.messageService.add({ severity:'success', summary: 'Success', detail: 'User deleted successfully' });
        } else {
          this.messageService.add({ severity:'error', summary: 'Error', detail: 'Failed deleting user!!!' });
        }
      }, error: (error: any) => {
        console.log('Error', error);
      }
    })
  }




  checkclear(event: any, dt: any) {
    this.searchdata = event;
    console.log(event, dt);
  }



}

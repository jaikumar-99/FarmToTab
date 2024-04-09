import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {

  // list view
  viewType = 'list'
  sortOrder = 1;
  sortField = 'price'
  sortOptions: any[] = [];

  // products
  Orders: any = []

  // shimmers
  enableShimmers = true;
  orderItem: any = {};


  constructor(private appservice: AppService, private messageservice: MessageService) { }
  ngOnInit(): void {
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
    this.fetchorders();
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }


  fetchorders() {
    this.appservice.fetchorders().subscribe({
      next: (response: any) => {
        console.log('Users List', response);

        if (response?.success) {
          console.log(response, 'response orders list');
          this.Orders = response.data;
          this.enableShimmers = false;
          // this.messageService.add({ severity:'success', summary: 'Success', detail: 'Users listist fetched successfully' });
        } else {
          console.log('Login Error');
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Failed fetching Products!!!' });
          this.enableShimmers = false;
        }
      }, error: (error: any) => {
        console.log('Error', error);
        this.enableShimmers = false;
      }
    })
  }

  getSeverity(product: any) {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  };

  openOrderDetails(order: any) {
    console.log('Order details', order);
    this.orderItem = order;
  }

  closeOrderDetails() {
    console.log('Closing the order details!')
    this.orderItem = {};
  }
}

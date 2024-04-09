import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { MessageService } from 'primeng/api';
import * as _ from 'underscore';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products-items',
  templateUrl: './products-items.component.html',
  styleUrl: './products-items.component.css'
})
export class ProductsItemsComponent implements OnInit {

  // list view
  viewType = 'list'
  sortOrder = 1;
  sortField = 'price'
  sortOptions: any[] = [];
  cartlen: number = 0;

  // products
  products: any = [];

  cartitems: any = [];
  viewcart: boolean = false;
  profileDetails: any = {};
  // subscriptions
  profileSubscription: Subscription;
  // = [
  //   {
  //     id: '1000',
  //     code: 'f230fh0g3',
  //     name: 'Bamboo Watch',
  //     description: 'Product Description',
  //     image: 'bamboo-watch.jpg',
  //     price: 65,
  //     category: 'Accessories',
  //     quantity: 24,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 5
  //   },
  //   {
  //     id: '1000',
  //     code: 'f230fh0g3',
  //     name: 'Bamboo Watch',
  //     description: 'Product Description',
  //     image: 'bamboo-watch.jpg',
  //     price: 65,
  //     category: 'Accessories',
  //     quantity: 24,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 5
  //   },
  //   {
  //     id: '1000',
  //     code: 'f230fh0g3',
  //     name: 'Bamboo Watch',
  //     description: 'Product Description',
  //     image: 'bamboo-watch.jpg',
  //     price: 65,
  //     category: 'Accessories',
  //     quantity: 24,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 5
  //   },
  //   {
  //     id: '1000',
  //     code: 'f230fh0g3',
  //     name: 'Bamboo Watch',
  //     description: 'Product Description',
  //     image: 'bamboo-watch.jpg',
  //     price: 65,
  //     category: 'Accessories',
  //     quantity: 24,
  //     inventoryStatus: 'INSTOCK',
  //     rating: 5
  //   },
  //   { name: 'test', image: 'bracelet.jpg', rating: 5, category: 'category', inventoryStatus: 'INSTOCK', price: 45 },
  //   { name: 'test', image: 'bracelet.jpg', rating: 5, category: 'category', inventoryStatus: 'INSTOCK', price: 45 },
  //   { name: 'test', image: 'bracelet.jpg', rating: 5, category: 'category', inventoryStatus: 'INSTOCK', price: 45 },
  // ]

  constructor(private appservice: AppService, private messageservice: MessageService) {

  }
  ngOnInit(): void {
    this.profileDetails = this.appservice.profileDetails;
    this.profileSubscription = this.appservice.profileDetailsSubject.subscribe((value: any) => {
      if (value.email) {
        this.profileDetails = value;
      }
    });
    this.fetchProducts();
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];

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

  onaddcart(item: any) {
    console.log(item);
    let data = _.pluck(this.cartitems, '_id')
    if (!_.contains(data, item._id)) {
      this.cartitems.push(item);
    } else {
      return
    }
    console.log(data, this.cartitems)
    this.messageservice.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Item added to cart'
    });
    this.cartlen = this.cartitems.length;
  }

  viewCart() {
    this.viewcart = true;
  }


  fetchProducts() {
    this.appservice.fetchproducts().subscribe({
      next: (response: any) => {
        console.log('Users List', response);

        if (response?.success) {
          console.log(response, 'response users list');
          this.products = response.data;
          let data = _.pluck(this.products, '_id')
          console.log(data)
          // this.messageService.add({ severity:'success', summary: 'Success', detail: 'Users listist fetched successfully' });
        } else {
          console.log('Login Error');
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Failed fetching Products!!!' });
        }
      }, error: (error: any) => {
        console.log('Error', error);
      }
    })
  }

  onclickback() {
    this.viewcart = false;
  }

  onremoveitem(event) {
    console.log(event);
    this.cartitems = _.reject(this.cartitems, (e) => {
      return e._id === event._id;
    })
    this.cartlen = this.cartitems.length;
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


  placeOrder() {
    let data = []
    for (let i of this.cartitems) {
      data.push({
        productname: i.productname,
        cropcode: i.cropcode,
        producttype: i.producttype,
        price: i.price,
        qty: i.qty,
        pownerId: i.userId,
        productId: i._id,
        consumerId: this.profileDetails._id,
        profilename: i.profilename,
        mobile: i.mobile,
        pincode: i.pincode,
        landmark: i.landmark,
        state: i.state,
        country: i.country,
      })
    }
    console.log(data)
    this.appservice.placeorder(data).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.success) {
          this.cartitems = [];
          this.cartlen = 0;
          this.fetchProducts();
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Order placed successfully' });
        } else {
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Failed placing order!!!' });
        }
      }, error: (error: any) => {
        console.log('Error', error);
      }
    })
  }
}

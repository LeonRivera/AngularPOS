import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];

  constructor() {}

  ngOnInit(): void {
    this.items = [
      // {
      //   label: "Edit",
      //   icon: "pi pi-fw pi-pencil",
      // },

      {
        label: 'Productos',
        icon: 'pi pi-shopping-cart',
        routerLink: ['products'],
      },
      {
        label: 'About',
        icon: 'pi pi-users',
        routerLink: ['about'],
      },
    ];
  }

  show():void{
  }
}

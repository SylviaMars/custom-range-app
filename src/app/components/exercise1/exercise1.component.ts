import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { PricesService } from 'src/app/services/prices.service';

@Component({
  selector: 'custom-range-exercise1',
  templateUrl: './exercise1.component.html',
  styleUrls: ['./exercise1.component.scss']
})
export class Exercise1Component implements OnInit {
  min = 30;
  max: number;
  constructor(private priceService: PricesService) {
    this.min = 0;
    this.max = 200;
  }
  ngOnInit(): void {
    this.min = 0;
    this.max = 200;
    this.priceService.getRangePrices().subscribe(res => console.log(res));
    // throw new Error('Method not implemented.');
  }

}

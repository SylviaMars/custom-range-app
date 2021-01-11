import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { PriceRange } from 'src/app/models/PriceRange.model';
import { PricesService } from 'src/app/services/prices.service';

@Component({
  selector: 'custom-range-exercise1',
  templateUrl: './exercise1.component.html',
  styleUrls: ['./exercise1.component.scss']
})
export class Exercise1Component implements OnInit {
  min = 0;
  max = 100;
  priceRange: PriceRange = new PriceRange();

  constructor(private priceService: PricesService) {
    this.min = 0;
    this.max = 200;
    this.priceRange = new PriceRange();
  }
  ngOnInit(): void {
    this.priceService.getRangePrices().subscribe(res => {
      if (res.body !== null) {
        this.priceRange = res.body;
      }
    }, error => {
      throw new Error('Error:' + error.status);
    }, () => console.log(this.priceRange));
  }
}

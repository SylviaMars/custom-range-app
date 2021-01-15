import { Component, OnInit } from '@angular/core';
import { PriceRange } from 'src/app/models/PriceRange.model';
import { PricesService } from 'src/app/services/prices.service';

@Component({
    selector: 'custom-range-exercise1',
    templateUrl: './exercise1.component.html',
    styleUrls: ['./exercise1.component.scss']
})
export class Exercise1Component implements OnInit {
    priceRange: PriceRange = new PriceRange();
    minPrice = 0;
    maxPrice = 0;

    constructor(private priceService: PricesService) {
        this.priceRange = new PriceRange();
    }

    ngOnInit(): void {
        this.priceService.getRangePrices().subscribe(response => {
            if (response.body !== null) {
                this.priceRange = response.body;
                this.minPrice = this.priceRange.min;
                this.maxPrice = this.priceRange.max;
            }
        }, error => {
            throw new Error('Error:' + error.status);
        }, () => console.log(this.priceRange));
    }

    setPrices(event: PriceRange): void {
        this.priceRange = event;
    }
}

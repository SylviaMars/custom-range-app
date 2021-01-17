import { HttpResponse } from '@angular/common/http';
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PriceRange } from 'src/app/models/PriceRange.model';
import { PriceRangeArray } from 'src/app/models/PriceRangeArray.model';
import { PricesService } from 'src/app/services/prices.service';

@Component({
    selector: 'custom-range-exercise2',
    templateUrl: './exercise2.component.html',
    styleUrls: ['./exercise2.component.scss']
})
export class Exercise2Component implements OnInit, AfterViewChecked {
    priceRange: PriceRange = new PriceRange();
    priceRangeArray: number[];

    constructor(
        private priceService: PricesService,
        private cdRef: ChangeDetectorRef) {
        this.priceRange = new PriceRange();
        this.priceRangeArray = [];
    }

    ngOnInit(): void {
        // tslint:disable-next-line: deprecation
        this.priceService.getRangePricesArray().subscribe((response: HttpResponse<PriceRangeArray>) => {
            if (response.body !== null) {
                const res = response.body;
                this.priceRangeArray = res.values;
            }
        }, error => {
            throw new Error('Error:' + error.status);
        });
    }
    ngAfterViewChecked(): void {
        this.cdRef.detectChanges();
    }

    setPrices(event: PriceRange): void {
        this.priceRange = event;
    }

}

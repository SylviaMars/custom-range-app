import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PriceRange } from '../models/PriceRange.model';
import { PriceRangeArray } from '../models/PriceRangeArray.model';

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  constructor(private https: HttpClient) { }

  /**
   * Mocked Rest service: https://demo5888714.mockable.io/prices
   */
  getRangePrices(): Observable<HttpResponse<PriceRange>> {
    const url = 'https://demo5888714.mockable.io/prices';
    return this.https.get<PriceRange>(url, {observe: 'response'});
  }
  /**
   * Mocked Rest service: https://demo5888714.mockable.io/pricesArray
   */
  getRangePricesArray(): Observable<HttpResponse<PriceRangeArray>> {
    const url = 'https://demo5888714.mockable.io/pricesArray';
    return this.https.get<PriceRangeArray>(url, {observe: 'response'});
  }

}

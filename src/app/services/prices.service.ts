import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PriceRange } from '../models/PriceRange.model';

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  constructor(private http: HttpClient) { }

  /**
   * Mocked Rest service: https://demo5888714.mockable.io/prices
   */
  getRangePrices(): Observable<HttpResponse<PriceRange>> {
    const url = 'https://demo5888714.mockable.io/prices';
    return this.http.get<PriceRange>(url, {observe: 'response'});
  }
}

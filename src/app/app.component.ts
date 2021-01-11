import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'custom-range-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    title = 'custom-range-app';
    link1 = 'exercise 1';
    link2 = 'exercise 2';

    constructor(private router: Router) {}
    ngOnInit(): void {
        this.router.navigate(['exercise1']);
    }

}

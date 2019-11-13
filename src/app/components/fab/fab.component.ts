import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-fab',
    templateUrl: './fab.component.html',
    styleUrls: ['./fab.component.scss']
})
export class FabComponent implements OnInit {
    fab = false;
    constructor(
        private activatedRoute: ActivatedRoute,
        private location: Location
    ) {
        this.activatedRoute.data.subscribe(next => {
            if (next.fab === 'goBack') {
                this.fab = true;
            } else {
                this.fab = false;
            }
        });
    }

    ngOnInit() {}
    public doAction(): void {
        this.location.back();
    }
}

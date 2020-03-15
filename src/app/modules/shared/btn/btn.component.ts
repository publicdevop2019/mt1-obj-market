import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-btn',
    templateUrl: './btn.component.html',
    styleUrls: ['./btn.component.scss']
})
export class BtnComponent implements OnInit {
    @Input() lable: string;
    constructor() {}

    ngOnInit() {}
}

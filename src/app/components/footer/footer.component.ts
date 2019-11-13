import { Component, OnInit } from '@angular/core';
import { CONFIG_FOOTER } from 'src/app/classes/app-config';
export interface IList {
    icon: string;
    title: string;
    routerUrl: string;
}
@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    footerConfig: IList[] = CONFIG_FOOTER;
    constructor() {}

    ngOnInit() {}
}

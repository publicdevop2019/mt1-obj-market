import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';

@Component({
    selector: 'app-form-filter',
    templateUrl: './form-filter.component.html',
    styleUrls: ['./form-filter.component.scss']
})
export class FormFilterComponent implements OnInit {
    @Output() closeClick = new EventEmitter<void>();
    constructor(public filterSvc: FilterService) {}

    ngOnInit() {}
    public emitEvent() {
        this.closeClick.emit();
    }
}

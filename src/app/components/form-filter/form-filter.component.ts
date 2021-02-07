import { Component, OnInit, Output, EventEmitter, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FilterService, IFilter } from 'src/app/services/filter.service';

@Component({
    selector: 'app-form-filter',
    templateUrl: './form-filter.component.html',
    styleUrls: ['./form-filter.component.scss']
})
export class FormFilterComponent implements OnInit, AfterViewChecked {
    @Output() closeClick = new EventEmitter<void>();
    constructor(public filterSvc: FilterService, private cdr: ChangeDetectorRef) { }
    ngAfterViewChecked(): void {
        this.cdr.detectChanges();
    }

    ngOnInit() {
    }
    public emitEvent() {
        this.closeClick.emit();
    }
    public toggleValue(filter: IFilter, value: string) {
        const var1 = filter.id + ':' + value
        const current = this.filterSvc.filterForm.get('filterValue').value as string[];
        if (current.indexOf(var1) > -1) {
            this.filterSvc.filterForm.get('filterValue').setValue(current.filter(e => e !== var1))
        } else {
            this.filterSvc.filterForm.get('filterValue').setValue([...current, var1])
        }
    }
    public selected(e: IFilter, value: string) {
        const var1 = e.id + ':' + value
        return (this.filterSvc.filterForm.get('filterValue').value as string[]).indexOf(var1) > -1
    }
    public applyFilter() {
        this.filterSvc.applyFilter.next();
        this.closeClick.emit();
    }
}

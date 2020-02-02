import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounce, switchMap, filter, map, skip } from 'rxjs/operators';
import { interval, Observable, Subscription } from 'rxjs';
import { HttpProxyService } from 'src/app/services/http-proxy.service';
import { IProductSimple } from '../product-detail/product-detail.component';
import { FormSearchComponent } from 'src/app/components/form-search/form-search.component';
import { GhostService } from 'src/app/services/ghost.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  private pageNumber = 0;
  private searchKey = '';
  private sub0: Subscription;
  private sub1: Subscription;
  endOfPages = false;
  searchResults: IProductSimple[];
  ngAfterViewInit(): void {
    this.sub0 = this.searchComponnent.searchForm.get('search').valueChanges
      .pipe(debounce(() => interval(1000)))
      .pipe(filter(el => this.invalidSearchParam(el)))
      .pipe(map(el => el.trim()))
      .pipe(switchMap(e => {
        this.searchKey = e;
        return this._httpProxy.netImpl.searchProduct(e, this.pageNumber)
      }))
      .subscribe(next => {
        this.searchResults = next;
      })
  }
  @ViewChild('searchInput', { static: false }) searchComponnent: FormSearchComponent;
  constructor(private _httpProxy: HttpProxyService, private ghostSvc: GhostService) {
  }

  ngOnDestroy(): void {
    this.sub0.unsubscribe()
    this.sub1.unsubscribe()
  }
  ngOnInit() {
    this.sub1 = this.ghostSvc.productCardGhostObser
      .pipe(switchMap(() => {
        this.pageNumber++;
        return this._httpProxy.netImpl.searchProduct(this.searchKey, this.pageNumber)
      })).subscribe(next => {
        if (next.length === 0)
          this.endOfPages = true;
        this.searchResults.push(...next);
      })
  }
  private invalidSearchParam(input: string): boolean {
    let spaces: RegExp = new RegExp(/^\s*$/)
    return !spaces.test(input)
  }

}

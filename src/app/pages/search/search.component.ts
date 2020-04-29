import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounce, switchMap, filter, map, skip } from 'rxjs/operators';
import { interval, Observable, Subscription } from 'rxjs';
import { HttpProxyService } from 'src/app/services/http-proxy.service';
import { IProductSimple } from '../product-detail/product-detail.component';
import { FormSearchComponent } from 'src/app/components/form-search/form-search.component';
import { GhostService } from 'src/app/services/ghost.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  private pageNumber = 0;
  private pageSize = 5;
  private searchKey = '';
  private sub0: Subscription;
  private sub1: Subscription;
  endOfPages = false;
  searchResults: IProductSimple[];
  ngAfterViewInit(): void {
    // sub for search event
    this.sub0 = this.searchComponnent.searchForm.get('search').valueChanges
      .pipe(debounce(() => interval(1000)))
      .pipe(filter(el => this.invalidSearchParam(el)))
      .pipe(map(el => el.trim()))
      .pipe(switchMap(e => {
        this.searchKey = e;
        this.pageNumber = 0;
        this.endOfPages = false;
        // update url search key
        this.router.navigate(
          [],
          {
            relativeTo: this.activeRoute,
            queryParams: { key: this.searchKey },
            queryParamsHandling: 'merge'
          });
        return this._httpProxy.netImpl.searchProduct(e, this.pageNumber, this.pageSize)
      }))
      .subscribe(next => {
        this.searchResults = next;
      })
    this.activeRoute.queryParamMap.subscribe(queryMaps => {
      if (queryMaps.get('key')) {
        const str = queryMaps.get('key')
        this.searchKey = str;
        this.searchComponnent.searchForm.get('search').setValue(this.searchKey);
        this.changeRef.detectChanges();
      }
    });
  }
  @ViewChild('searchInput') searchComponnent: FormSearchComponent;
  constructor(private _httpProxy: HttpProxyService, private ghostSvc: GhostService, private router: Router, private activeRoute: ActivatedRoute, private changeRef: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    this.sub0.unsubscribe()
    this.sub1.unsubscribe()
  }
  ngOnInit() {
    // sub for infinite scroll
    this.sub1 = this.ghostSvc.productCardGhostObser
      .pipe(switchMap(() => {
        this.pageNumber++;
        return this._httpProxy.netImpl.searchProduct(this.searchKey, this.pageNumber, this.pageSize)
      })).subscribe(next => {
        if (next.length < this.pageSize)
          this.endOfPages = true;
        this.searchResults.push(...next);
      })
  }
  private invalidSearchParam(input: string): boolean {
    let spaces: RegExp = new RegExp(/^\s*$/)
    return !spaces.test(input)
  }

}

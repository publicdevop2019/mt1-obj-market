import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounce, switchMap, filter, map } from 'rxjs/operators';
import { interval, Observable } from 'rxjs';
import { HttpProxyService } from 'src/app/services/http-proxy.service';
import { IProductSimple } from '../product-detail/product-detail.component';
import { FormSearchComponent } from 'src/app/components/form-search/form-search.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    this.search$ = this.searchComponnent.searchForm.get('search').valueChanges
      .pipe(debounce(() => interval(1000)))
      .pipe(filter(el => this.invalidSearchParam(el)))
      .pipe(map(el => el.trim()))
      .pipe(switchMap(e => this._httpProxy.netImpl.searchProduct(e)))
  }
  @ViewChild('searchInput', { static: false }) searchComponnent: FormSearchComponent;
  search$: Observable<IProductSimple[]>;
  constructor(private _httpProxy: HttpProxyService) {
  }

  ngOnInit() {


  }
  private invalidSearchParam(input: string): boolean {
    let spaces: RegExp = new RegExp(/^\s*$/)
    return !spaces.test(input)
  }

}

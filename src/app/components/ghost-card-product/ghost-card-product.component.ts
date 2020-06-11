import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { GhostService } from 'src/app/services/ghost.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-ghost-card-product',
  templateUrl: './ghost-card-product.component.html',
  styleUrls: ['./ghost-card-product.component.scss']
})
export class GhostCardProductComponent implements AfterViewInit {
  @ViewChild("ghostRef") ghostRef: ElementRef;
  private _visibilityConfig = {
    threshold: 0
  };
  constructor(private _ghostSvc: GhostService, private themeSvc: ThemeService) { }
  ngAfterViewInit(): void {
    if (this.themeSvc.isBrowser) {
      let observer = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this._ghostSvc.productCardGhostObser.next()
          }
        });
      }, this._visibilityConfig);
      observer.observe(this.ghostRef.nativeElement);
    }else{
      // if running in server, directly trigger first call
      this._ghostSvc.productCardGhostObser.next();
    }
  }
}

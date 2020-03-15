import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { GhostService } from 'src/app/services/ghost.service';

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
  constructor(private _ghostSvc: GhostService) { }
  ngAfterViewInit(): void {
    let observer = new IntersectionObserver((entries, self) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this._ghostSvc.productCardGhostObser.next()
        }
      });
    }, this._visibilityConfig);
    observer.observe(this.ghostRef.nativeElement);
  }
}

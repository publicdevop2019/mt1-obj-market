import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GhostService } from 'src/app/services/ghost.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-ghost-card-product',
  templateUrl: './ghost-card-product.component.html',
  styleUrls: ['./ghost-card-product.component.scss']
})
export class GhostCardProductComponent implements AfterViewInit {
  @ViewChild('ghostRef') ghostRef: ElementRef;
  private visibilityConfig = {
    threshold: 0
  };
  public count = ['1','2','3','4','5','6','7','7']
  constructor(private ghostSvc: GhostService, private themeSvc: ThemeService) { }
  ngAfterViewInit(): void {
    if (this.themeSvc.isBrowser) {
      const observer = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.ghostSvc.productCardGhostObser.next()
          }
        });
      }, this.visibilityConfig);
      observer.observe(this.ghostRef.nativeElement);
    } else {
      // if running in server, directly trigger first call
      this.ghostSvc.productCardGhostObser.next();
    }
  }
}

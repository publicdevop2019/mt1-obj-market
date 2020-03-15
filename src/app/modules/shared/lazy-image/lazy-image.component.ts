import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.scss']
})
export class LazyImageComponent implements OnInit, AfterViewInit {
  @Input() lazySrc: string;
  @Input() iconView: boolean = false;
  @ViewChild("imgRef") imgRef: ElementRef;
  private _visibilityConfig = {
    threshold: 0
  };
  public loading = false;
  constructor() { }
  ngAfterViewInit(): void {
    let erroOb = fromEvent(this.imgRef.nativeElement, "error");
    let loadOb = fromEvent(this.imgRef.nativeElement, "load");
    loadOb.pipe(take(1)).subscribe(() => {
      this.loading = true;
    })
    erroOb.pipe(take(1)).subscribe(() => {
      (this.imgRef.nativeElement as HTMLImageElement).src = '../../../assets/imgs/img-404.svg';
    })
    let observer = new IntersectionObserver((entries, self) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLImageElement).src = this.lazySrc;
          self.unobserve(entry.target);
        }
      });
    }, this._visibilityConfig);
    observer.observe(this.imgRef.nativeElement);


  }

  ngOnInit() {
  }

}

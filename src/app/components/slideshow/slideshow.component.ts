import { Component, OnInit, ViewChildren, ElementRef, QueryList, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit, AfterViewInit {
  @Input() imageUrls: string[];
  @ViewChildren('slides') slides: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChildren('dots') dots: QueryList<ElementRef<HTMLSpanElement>>;
  slideIndex = 1;
  constructor() { }
  ngAfterViewInit(): void {
    this.showSlides(this.slideIndex);
  }

  ngOnInit(): void {
  }

  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n: number) {
    this.slideIndex = n;
    this.showSlides(this.slideIndex);
  }

  showSlides(slideNum: number) {
    let slides = this.slides.toArray();
    let dots = this.dots.toArray();
    let i: number;
    if (slideNum > slides.length) { this.slideIndex = 1 }
    if (slideNum < 1) { this.slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i].nativeElement.style.display = "none";
    }
    if (this.imageUrls.length >= 2) {
      for (i = 0; i < dots.length; i++) {
        dots[i].nativeElement.className = dots[i].nativeElement.className.replace(" active", "");
      }
      dots[this.slideIndex - 1].nativeElement.className += " active";
    }
    slides[this.slideIndex - 1].nativeElement.style.display = "flex";
  }
}

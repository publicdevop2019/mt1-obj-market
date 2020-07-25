import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sold-out-banner',
  templateUrl: './sold-out-banner.component.html',
  styleUrls: ['./sold-out-banner.component.scss']
})
export class SoldOutBannerComponent implements OnInit {
  @Output() msgDismiss = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
  public emitEvent() {
    this.msgDismiss.emit();
  }
}

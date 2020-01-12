import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.scss']
})
export class FormSearchComponent implements OnInit {
  public searchForm: FormGroup = new FormGroup({
    search: new FormControl('', [])
  });
  constructor(

  ) {
  }

  ngOnInit() {

  }
}

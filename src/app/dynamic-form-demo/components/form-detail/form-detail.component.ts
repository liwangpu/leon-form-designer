import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

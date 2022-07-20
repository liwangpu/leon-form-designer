import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'qflow-form-control-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}

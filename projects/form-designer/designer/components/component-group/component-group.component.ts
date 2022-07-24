import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { OptionalComponentGroup } from '../../models';

@Component({
    selector: 'qflow-form-designer-component-group',
    templateUrl: './component-group.component.html',
    styleUrls: ['./component-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentGroupComponent implements OnInit {

    @Input()
    public group?: OptionalComponentGroup;
    constructor() { }

    public ngOnInit(): void {
    }

}

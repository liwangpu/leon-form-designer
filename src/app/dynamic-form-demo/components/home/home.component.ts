import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormDataCenterState, selectFormData, selectFormDataCenter, setFormData } from 'form-data-center';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

    public constructor(
        private store: Store<FormDataCenterState>
    ) { }

    public ngOnInit(): void {
        // this.store.subscribe(ds => {
        //     console.log('ds:', ds);
        // });

        this.store.select(selectFormData('aaa')).subscribe(ds => {
            console.log('ds:', ds);
        });

        this.store.dispatch(setFormData({ formKey: 'aaa', data: { name: 'Leon', age: 18 } }));
    }

}

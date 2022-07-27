import { ChangeDetectionStrategy, Component } from '@angular/core';

const menuCollapseStatusKey = 'menuCollapseStatus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public isCollapsed = false;
  public constructor() {
      const menuCollapseStatusKeyStr = localStorage.getItem(menuCollapseStatusKey);
      if (menuCollapseStatusKeyStr) {
          this.isCollapsed = JSON.parse(menuCollapseStatusKeyStr);
      }
  }

  public ngOnInit(): void {

  }

  public toggleCollapsed(): void {
      this.isCollapsed = !this.isCollapsed;
      localStorage.setItem(menuCollapseStatusKey, `${this.isCollapsed}`);
  }
}

import { Component } from '@angular/core';
import { ResponsiveService } from './responsive/responsive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public responsiveService:ResponsiveService) {
  }
}

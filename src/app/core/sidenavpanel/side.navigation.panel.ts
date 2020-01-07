import { SideNavigationPanelSvc } from './sidenavigationpanelsvc';
import { OnInit, Component } from '@angular/core';

@Component({
  selector: 'app-nav-panel',
  templateUrl: './side.navigation.panel.html',
  styleUrls: ['./side.navigation.panel.css']
})
export class SideNavigationPanelComponent implements OnInit{
  constructor(public sideNavService: SideNavigationPanelSvc) { }

  ngOnInit() {
  }
}

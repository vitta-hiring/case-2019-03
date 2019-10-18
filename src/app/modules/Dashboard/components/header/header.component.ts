import { Component, OnInit } from '@angular/core';
import { IProfile, UserService } from '../../service/user.service';

@Component({
  selector: 'dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  profile: IProfile;

  constructor(private service: UserService) { }

  ngOnInit() {
    this.service.currentProfile.subscribe( profile => this.profile = profile );
  }

}

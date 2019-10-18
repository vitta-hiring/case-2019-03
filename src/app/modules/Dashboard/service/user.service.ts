import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../Authentication/services/auth.service';

export interface IProfile {
  id: string;
  name: string;
  prefix_name: string;
  picture: string;
  specialty: string;
  crm: string;
}

const USER_MOCK: IProfile[] = [{
  id: 'zQ3bPMJ1KUyAlCvwxJ3bGA',
  prefix_name: 'Dra',
  name: 'Lisa Cuddy',
  picture: './assets/images/doctor-profile.png',
  specialty: 'Endocrinologia',
  crm: '0000000000/MG'
}];

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private currentProfileSubject: BehaviorSubject<IProfile>;
  public currentProfile: Observable<IProfile>;

  constructor(private router: Router, private authService: AuthenticationService) {
    this.currentProfileSubject = new BehaviorSubject<IProfile>(null);
    this.currentProfile = this.currentProfileSubject.asObservable();
    this.getCurrentProfile();
  }

  getCurrentProfile() {
    this.authService.currentUser.subscribe( user => {
      if (user) {
        const searchedUser = USER_MOCK.find(x => x.id === user.id);
        if ( searchedUser ) {
          this.currentProfileSubject.next(searchedUser);
        } else {
          localStorage.removeItem('user');
          this.router.navigate(['/']);
        }
      } else {
        localStorage.removeItem('user');
        this.router.navigate(['/']);
      }
    });
  }

}

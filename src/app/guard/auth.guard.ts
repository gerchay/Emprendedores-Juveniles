import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _auth:AuthService, private router: Router){ }

  canActivate(): Observable<boolean> {
    return this._auth.userData$.pipe(
      map(user => {
        if (!user) {
          this.router.navigate(['/inicio/login']);
          return false;
        }
        return true;
      })
    );
  }

}

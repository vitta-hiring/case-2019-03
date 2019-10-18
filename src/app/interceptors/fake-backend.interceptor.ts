import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize, finalize } from 'rxjs/operators';
import { User } from '../modules/Authentication/model/user.model';

import { LoaderService } from '../shared/loader/services/loader.service';

const users = [
  {
    id: 'zQ3bPMJ1KUyAlCvwxJ3bGA',
    email: 'lisa@vitta.com',
    password: 'iniciar'
  }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    const { url, method, headers, body } = request;
    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize())
      .pipe(finalize(() => this.loaderService.hide()));

    function handleRoute() {
        switch (true) {
            case url.endsWith('/users/authenticate') && method === 'POST':
                return authenticate();
            default:
                // pass through any requests not handled above
                return next.handle(request);
        }
    }

    // route functions

    function authenticate() {
      const { email, password } = body;
      const user = users.find((x: User) => x.email === email && x.password === password);

      if (!user) {
        return error('Email e ou senha estão incorretos');
      }
      return ok({
          id: user.id,
          email: user.email,
          password: user.password
      });
    }

    function listMedicines() {

    }

    // helper functions

    function ok(body?) {
        return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
        return throwError({ error: { message } });
    }

    function unauthorized() {
        return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
        return headers.get('Authorization') === `Basic ${window.btoa('test:test')}`;
    }
  }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};

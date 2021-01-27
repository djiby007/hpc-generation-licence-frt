import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../../authentication/services/auth.service';
import {environment} from '../../../environments/environment';
import {catchError, finalize, retry} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class XhrInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });
  intercept(request: HttpRequest<unknown>,
            next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('JWT_TOKEN');
    const apiUrl = request.url.startsWith(environment.apiUrl);

    if (token && apiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      }); // set('X-Requested-With', 'XMLHttpRequest')
    }
    return next.handle(request);
      /*.pipe(
        retry(3),
        catchError((error: HttpErrorResponse) => {
          this.Toast.fire({
            icon: 'error',
            title: `Impossible d'accéder aux donneés`
          });
          return throwError(error);
        }),

        finalize(() => {
          const profilingMsg = `${request.method} *${request.urlWithParams}`;
          console.log(request.headers);
        })
      );*/
  }
}

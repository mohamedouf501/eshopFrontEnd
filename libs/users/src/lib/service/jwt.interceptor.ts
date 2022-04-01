import { LocalstorageService } from './localstorage.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _LocalstorageService: LocalstorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this._LocalstorageService.getToken();
    const authReq = request.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } });
    return next.handle(authReq);
  }
}

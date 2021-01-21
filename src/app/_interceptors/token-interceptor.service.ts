import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(req, next) {
        const _authService = this.injector.get(AuthService);
        const tokenizedReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${_authService.getToken()}`
            }
        });
        return next.handle(tokenizedReq);
    }
}

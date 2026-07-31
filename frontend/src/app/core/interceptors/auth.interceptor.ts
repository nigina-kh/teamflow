import {
  HttpInterceptorFn,
} from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (
  req,
  next,
) => {

  const token =
    localStorage.getItem('access_token') ??
    sessionStorage.getItem('access_token');

  console.log('Interceptor token:', token);

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({

    setHeaders: {

      Authorization: `Bearer ${token}`,

    },

  });

  console.log(
    'Authorization header:',
    authReq.headers.get('Authorization'),
  );

  return next(authReq);

};
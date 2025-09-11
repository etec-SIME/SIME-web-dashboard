import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({
    withCredentials: true // garante que os cookies sejam enviados com a requisição
  })

  return next(cloned);
};

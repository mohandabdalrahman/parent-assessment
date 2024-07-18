import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../../auth/services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const authService = new AuthService();
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  return true;

};

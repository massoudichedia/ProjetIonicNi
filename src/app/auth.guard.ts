import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthServiceService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const user = await this.authService.getProfile();
    if (user) {
      if (user.email === 'chaima@gmail.com') {
        return true; // L'administrateur peut accéder à la route
      } else {
        this.router.navigate(['/home']); // Rediriger vers la page d'accueil pour les utilisateurs non autorisés
        return false; // L'accès est refusé
      }
    } else {
      this.router.navigate(['login']); // Redirige vers la page de connexion si non autorisé
      return false; // L'accès est refusé
    }
  }
}

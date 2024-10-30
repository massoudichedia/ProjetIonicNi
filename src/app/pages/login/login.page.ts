import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ionicForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authService: AuthServiceService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),
      ]],
      password: ['', [Validators.required]],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    if (this.ionicForm.valid) {
      try {
        const userCredential = await this.authService.loginUser(
          this.ionicForm.value.email,
          this.ionicForm.value.password
        );

        console.log('User Credential:', userCredential); // Pour déboguer

        if (userCredential && userCredential.user) {
          // Redirigez vers la bonne page selon le rôle
          if (userCredential.user.email === 'chaima@gmail.com') {
            this.router.navigate(['/journals']); // Rediriger vers la page journal pour l'admin
          } else {
            this.router.navigate(['/journal']); // Rediriger vers la page de destination pour les utilisateurs normaux
          }
        } else {
          console.log('Utilisateur non trouvé ou information manquante.');
          this.presentToast('Erreur lors de la récupération des informations utilisateur.');
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Une erreur est survenue.';
        this.presentToast(message);
        console.log(error);
      } finally {
        loading.dismiss();
      }
    } else {
      console.log('Veuillez fournir toutes les valeurs requises !');
      loading.dismiss();
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}
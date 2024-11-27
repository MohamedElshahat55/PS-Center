import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  _fb = inject(FormBuilder);
  _authService = inject(AuthService);
  _router = inject(Router);

  registerForm = this._fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    const { username, email, password } = this.registerForm.value;
    if (!username || !email || !password) {
      console.log('login failed');
      return;
    }

    if (this.registerForm.valid) {
      this._authService
        .register(username, email, password)
        .subscribe((user) => {
          if (user.status === 'success') {
            this._router.navigateByUrl('/login');
          }
        });
    }
  }
}

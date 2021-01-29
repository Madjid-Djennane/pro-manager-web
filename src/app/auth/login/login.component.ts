import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;

    constructor(
      private _formBuilder: FormBuilder,
      private _authService: AuthService,
      private _router: Router
    ) { }

    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    login() {
        if (!this.loginForm.valid) {
            return;
        }
        this._authService.login(this.loginForm.value)
            .subscribe(
                res => {
                    this._router.navigate(['']);
                },
                err => {
                    if (err.error?.message?.match(/User does not exist./)) {
                        Swal.fire({
                            title: 'Erreur',
                            icon: 'error',
                            text: 'L\'utilisateur n\'existe pas !'
                        });
                    } else {
                        Swal.fire({
                            title: 'Erreur',
                            icon: 'error',
                            text: 'Erreur inconnue !'
                        });
                    }
                }
            );
    }

    toRegister() {
        this._router.navigate(['../register']);
    }

}

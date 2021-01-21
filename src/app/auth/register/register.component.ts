import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../_helpers/must-match.validator';
import { User } from '../../users/user';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    public registerForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.registerForm = this._formBuilder.group({
            name: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            role: ['basic', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    register() {
        if (!this.registerForm.valid) {
            return;
        }
        const user = new User(this.registerForm.value);

        this._authService.createAccount(user)
            .subscribe(
                res => {
                    Swal.fire({
                        title: 'success',
                        icon: 'success',
                        text: 'Utilisteur créé !'
                    }).then(() => {
                        this._router.navigate(['/auth/login']);
                    });
                },
                err => {
                    if (err.error?.message?.match(/User already exists/)) {
                        Swal.fire({
                            title: 'Erreur',
                            icon: 'error',
                            text: 'L\'utilisateur existe déjà !'
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

}

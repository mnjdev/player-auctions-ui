import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { UserRegistration } from '../../core/auth/auth.model';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  providers: [AuthService]
})
export class RegistrationComponent {

  registrationForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^\\d{10}$')]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,10}$')]),
    reEnterPassword: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService) {}

  get name() { return this.registrationForm.get('name') }
  get email() { return this.registrationForm.get('email') }
  get phoneNumber() { return this.registrationForm.get('phoneNumber') }
  get password() { return this.registrationForm.get('password') }
  get reEnterPassword() { return this.registrationForm.get('reEnterPassword') }

  validatePasswords(): boolean {
    if(this.password?.value === this.reEnterPassword?.value) return true;
    return false;
  }

  registerUser() {
    const dto: UserRegistration = {
      name: this.name?.value,
      email: this.email?.value,
      phoneNumber: this.phoneNumber?.value,
      password: this.password?.value
    }

    this.authService.registerUser(dto).subscribe({
      next: (response) => {
        console.log(response);
      }, error: (err) => {
        console.log(err);
      }
    })
  }

}

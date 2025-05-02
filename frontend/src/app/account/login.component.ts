import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '../_services';

@Component({ selector: 'app-login', templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  form!: UntypedFormGroup;
  loading = false;
  submitted = false;
  error = '';
  showVerificationLink = false;
  verificationEmail = '';
  firstUserSuccess = '';
  firstUserInfo = '';

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    // Read special messages from query params
    this.route.queryParams.subscribe(params => {
      this.firstUserSuccess = params['firstUserSuccess'] || '';
      this.firstUserInfo = params['firstUserInfo'] || '';
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.error = '';
    this.showVerificationLink = false;
    this.verificationEmail = '';

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.login(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          this.error = error;
          if (error.includes('not verified')) {
            this.showVerificationLink = true;
            this.verificationEmail = this.f['email'].value;
          }
          this.loading = false;
        }
      });
  }
}
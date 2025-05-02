import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';
import { Account } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    accounts: any[] = [];
    showModal = false;
    selectedAccount: any = null;
    editForm: UntypedFormGroup;
    loading = false;
    submitted = false;
    alertMsg = '';

    constructor(private accountService: AccountService, private fb: UntypedFormBuilder) {
        this.editForm = this.fb.group({
            title: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            role: ['', Validators.required],
            status: ['Active', Validators.required],
            password: [''],
            confirmPassword: ['']
        });
    }

    ngOnInit() {
        this.loadAccounts();
    }

    loadAccounts() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(accounts => this.accounts = accounts);
    }

    openEditModal(account: any) {
        this.selectedAccount = { ...account };
        this.editForm.patchValue({ ...account, password: '', confirmPassword: '' });
        this.showModal = true;
        this.alertMsg = '';
        this.submitted = false;
    }

    closeModal() {
        this.showModal = false;
        this.selectedAccount = null;
        this.editForm.reset();
        this.alertMsg = '';
    }

    get f() { return this.editForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.alertMsg = '';
        if (this.editForm.invalid || !this.selectedAccount) return;
        this.loading = true;
        const updateData = { ...this.editForm.value };
        if (!updateData.password) delete updateData.password;
        if (!updateData.confirmPassword) delete updateData.confirmPassword;
        this.accountService.update(this.selectedAccount.id, updateData)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertMsg = 'Update successful!';
                    this.showModal = false;
                    this.loadAccounts();
                    this.loading = false;
                },
                error: (err) => {
                    this.alertMsg = err;
                    this.loading = false;
                }
            });
    }
}
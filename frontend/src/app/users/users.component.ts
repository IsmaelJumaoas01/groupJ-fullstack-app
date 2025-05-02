import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services';
import { Account } from '../_models';

interface UserWithEditing extends Account {
    isEditing?: boolean;
}

@Component({
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.less']
})
export class UsersComponent implements OnInit {
    users: UserWithEditing[] = [];
    loading = false;
    showModal = false;
    selectedUser: UserWithEditing | null = null;
    editForm: UntypedFormGroup;
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
        this.loadUsers();
    }

    loadUsers() {
        this.loading = true;
        this.accountService.getAll()
            .subscribe(users => {
                this.users = users;
                this.loading = false;
            });
    }

    openEditModal(user: UserWithEditing) {
        this.selectedUser = { ...user };
        this.editForm.patchValue({ ...user, password: '', confirmPassword: '' });
        this.showModal = true;
        this.alertMsg = '';
        this.submitted = false;
    }

    closeModal() {
        this.showModal = false;
        this.selectedUser = null;
        this.editForm.reset();
        this.alertMsg = '';
    }

    get f() { return this.editForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.alertMsg = '';
        if (this.editForm.invalid || !this.selectedUser) return;
        this.loading = true;
        const updateData = { ...this.editForm.value };
        if (!updateData.password) delete updateData.password;
        if (!updateData.confirmPassword) delete updateData.confirmPassword;
        this.accountService.update(this.selectedUser.id, updateData)
            .subscribe({
                next: () => {
                    this.alertMsg = 'Update successful!';
                    this.showModal = false;
                    this.loadUsers();
                    this.loading = false;
                },
                error: (err) => {
                    this.alertMsg = err;
                    this.loading = false;
                }
            });
    }
} 
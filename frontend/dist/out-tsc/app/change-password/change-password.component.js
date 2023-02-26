import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ChangePasswordComponent = class ChangePasswordComponent {
    constructor(userService) {
        this.userService = userService;
        this.password1 = '';
        this.password2 = '';
        this.errorMessage = null;
        this.errorCodeMessage = null;
        this.code = '';
        this.user = null;
        this.timePassed = null;
    }
    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('changePasswordUser'));
        let currentTime = new Date();
        let diffInMilliseconds = currentTime.getTime() - new Date(this.user.change_password_request_time).getTime();
        if (diffInMilliseconds / 1000 / 60 > 30) {
            this.timePassed = true;
        }
    }
    testPassword() {
        // min 8, max - 16 karaktera,
        // bar jedan broj,
        // bar jedno veliko slovo,
        // bar jedan specijalni karakter(@$!%*?&_)
        if (this.password1 && this.password2) {
            if (this.password1 != this.password2) {
                this.errorMessage = "Passwords does not match";
            }
            else if (!(/(?=.*[A-Z])^[a-zA-Z](?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{7,15}$/).test(this.password2)) {
                this.errorMessage = "Invalid format";
            }
            else {
                this.errorMessage = null;
            }
        }
        else {
            this.errorMessage = null;
        }
    }
    change() {
        if (this.user.verification_number != this.code) {
            this.errorCodeMessage = "Wrong verification code";
        }
        else {
            this.errorCodeMessage = null;
            if (this.password1.length == 0 || this.password2.length == 0 || this.code.length == 0) {
                this.errorMessage = "All fields required";
            }
            else {
                if (!this.errorCodeMessage || !this.errorMessage) {
                    this.userService.changePassword(this.user.username, this.password1).subscribe(respObj => {
                        window.location.href = window.location.protocol + '//' + window.location.host + '/login';
                    });
                }
            }
        }
    }
};
ChangePasswordComponent = __decorate([
    Component({
        selector: 'app-change-password',
        templateUrl: './change-password.component.html',
        styleUrls: ['./change-password.component.css']
    })
], ChangePasswordComponent);
export { ChangePasswordComponent };
//# sourceMappingURL=change-password.component.js.map
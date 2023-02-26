import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LoginComponent = class LoginComponent {
    constructor(userService, router) {
        this.userService = userService;
        this.router = router;
        this.username = '';
        this.password = '';
        this.type = 'participant';
        this.errorMessage = '';
    }
    ngOnInit() {
    }
    login() {
        this.userService.login(this.username, this.password, this.type).subscribe((user) => {
            if (!this.username || !this.password) {
                this.errorMessage = "All fields required";
            }
            else {
                if (user) {
                    if (user.type == "participant") {
                        sessionStorage.setItem('logged', JSON.stringify(user));
                        window.location.href = window.location.protocol + '//' + window.location.host + '/participant';
                        // this.router.navigate(['/participant']).then(() => {
                        //   window.location.reload();
                        // });
                    }
                    else {
                        sessionStorage.setItem('logged', JSON.stringify(user));
                        window.location.href = window.location.protocol + '//' + window.location.host + '/organizer';
                        // this.router.navigate(['/organizer']).then(() => {
                        //   window.location.reload();
                        // });
                    }
                }
                else {
                    this.errorMessage = "Wrong data";
                }
            }
        });
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map
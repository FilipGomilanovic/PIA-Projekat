import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LoginAdminComponent = class LoginAdminComponent {
    constructor(userService, router) {
        this.userService = userService;
        this.router = router;
        this.errorMessage = '';
    }
    ngOnInit() {
    }
    login() {
        this.userService.loginAdmin(this.username, this.password).subscribe((user) => {
            if (!this.username || !this.password) {
                this.errorMessage = "All fileds required!";
            }
            else {
                if (user) {
                    this.router.navigate(['/administrator']);
                }
                else {
                    this.errorMessage = "Wrong data!";
                }
            }
        });
    }
};
LoginAdminComponent = __decorate([
    Component({
        selector: 'app-login-admin',
        templateUrl: './login-admin.component.html',
        styleUrls: ['./login-admin.component.css']
    })
], LoginAdminComponent);
export { LoginAdminComponent };
//# sourceMappingURL=login-admin.component.js.map
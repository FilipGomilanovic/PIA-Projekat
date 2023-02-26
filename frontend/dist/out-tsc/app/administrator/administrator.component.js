import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AdministratorComponent = class AdministratorComponent {
    constructor(userService) {
        this.userService = userService;
        this.newRequests = [];
    }
    ngOnInit() {
        if (!localStorage.getItem("footer")) {
            localStorage.setItem("footer", 'yes');
            window.location.reload();
        }
        this.userService.getAllRequests().subscribe((users) => {
            this.newRequests = users;
        });
    }
    accept(username) {
        this.userService.updateStatus(username, "active").subscribe(respObj => {
            window.location.reload();
        });
    }
    reject(username) {
        this.userService.updateStatus(username, "inactive").subscribe(respObj => {
            window.location.reload();
        });
    }
};
AdministratorComponent = __decorate([
    Component({
        selector: 'app-administrator',
        templateUrl: './administrator.component.html',
        styleUrls: ['./administrator.component.css']
    })
], AdministratorComponent);
export { AdministratorComponent };
//# sourceMappingURL=administrator.component.js.map
import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ProfileComponent = class ProfileComponent {
    constructor() {
        this.logged = JSON.parse(sessionStorage.getItem("logged"));
    }
    ngOnInit() {
    }
};
ProfileComponent = __decorate([
    Component({
        selector: 'app-profile',
        templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.css']
    })
], ProfileComponent);
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map
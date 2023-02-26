import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AppComponent = class AppComponent {
    constructor(router) {
        this.router = router;
        this.title = 'PIA Rocks';
        this.logged = JSON.parse(sessionStorage.getItem('logged'));
    }
    logOut() {
        sessionStorage.setItem("logged", null);
        window.location.href = window.location.protocol + '//' + window.location.host + '/';
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map
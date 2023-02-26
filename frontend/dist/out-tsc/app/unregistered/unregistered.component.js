import { __decorate } from "tslib";
import { Component } from '@angular/core';
let UnregisteredComponent = class UnregisteredComponent {
    constructor(router, workshopService) {
        this.router = router;
        this.workshopService = workshopService;
        this.ids = [];
        this.jedan = 'jedan';
        this.dva = 'dva';
        this.workshops = [];
    }
    ngOnInit() {
        this.workshopService.getAllWorkshops().subscribe((workshops) => {
            this.workshops = workshops;
            this.workshops.forEach(w => {
                let str = (w._id).toString();
                let str2 = "S";
                this.ids.push(str2 + str);
                // alert(this.ids)
            });
            alert(this.ids);
        });
    }
    navigateLogin() {
        this.router.navigate(['login']);
    }
};
UnregisteredComponent = __decorate([
    Component({
        selector: 'app-unregistered',
        templateUrl: './unregistered.component.html',
        styleUrls: ['./unregistered.component.css']
    })
], UnregisteredComponent);
export { UnregisteredComponent };
//# sourceMappingURL=unregistered.component.js.map
import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ParticipantComponent = class ParticipantComponent {
    constructor() { }
    ngOnInit() {
        this.logged = JSON.parse(sessionStorage.getItem("logged"));
    }
};
ParticipantComponent = __decorate([
    Component({
        selector: 'app-participant',
        templateUrl: './participant.component.html',
        styleUrls: ['./participant.component.css']
    })
], ParticipantComponent);
export { ParticipantComponent };
//# sourceMappingURL=participant.component.js.map
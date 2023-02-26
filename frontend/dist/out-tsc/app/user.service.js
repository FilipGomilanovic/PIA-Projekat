import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let UserService = class UserService {
    constructor(http) {
        this.http = http;
    }
    login(username, password, type) {
        const data = {
            username: username,
            password: password,
            type: type
        };
        return this.http.post('http://localhost:4000/users/login', data);
    }
    loginAdmin(username, password) {
        const data = {
            username: username,
            password: password
        };
        return this.http.post('http://localhost:4000/users/loginAdmin', data);
    }
    register(firstname, lastname, username, password, email, phone, type, image, o_name, o_id, street, country, city, zip) {
        const data = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: password,
            email: email,
            phone: phone,
            type: type,
            image: image,
            o_name: o_name,
            o_id: o_id,
            street: street,
            country: country,
            city: city,
            zip: zip
        };
        return this.http.post('http://localhost:4000/users/register', data);
    }
    getAllRequests() {
        return this.http.get('http://localhost:4000/users/getAllRequests');
    }
    updateStatus(username, status) {
        const data = {
            username: username,
            status: status
        };
        return this.http.post('http://localhost:4000/users/updateStatus', data);
    }
};
UserService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map
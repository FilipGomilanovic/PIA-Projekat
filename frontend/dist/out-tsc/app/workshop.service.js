import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let WorkshopService = class WorkshopService {
    constructor(http) {
        this.http = http;
    }
    getLocation(lat, long) {
        return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyAEkabTXUnuafbGc5GFXG_P3rBhThxyP6U");
    }
    getAllWorkshops() {
        return this.http.get('http://localhost:4000/workshops/getAllWorkshops');
    }
    post(organizer, title, date, capacity, shortDescription, description, images, latitude, longitude, street, city, country) {
        const data = new FormData();
        for (let file of images) {
            data.append("files", file);
        }
        data.set('title', title);
        data.set('date', date);
        data.set('capacity', capacity);
        data.set('shortDescription', shortDescription);
        data.set('description', description);
        data.set('organizer', organizer);
        data.set('latitude', latitude);
        data.set('longitude', longitude);
        data.set('street', street);
        data.set('city', city);
        data.set('country', country);
        return this.http.post('http://localhost:4000/addNewWorkshop', data);
    }
};
WorkshopService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], WorkshopService);
export { WorkshopService };
//# sourceMappingURL=workshop.service.js.map
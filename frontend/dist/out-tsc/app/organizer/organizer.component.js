import { __decorate } from "tslib";
import { Component } from '@angular/core';
let OrganizerComponent = class OrganizerComponent {
    constructor(workshopService, fileUploadService, http) {
        this.workshopService = workshopService;
        this.fileUploadService = fileUploadService;
        this.http = http;
        this.images = [];
        this.imagesPath = [];
        this.files = null;
        this.logged = null;
        this.latitude = null;
        this.longitude = null;
    }
    ngOnInit() {
        this.createMap();
        this.logged = JSON.parse(sessionStorage.getItem('logged'));
        if (!localStorage.getItem("footer")) {
            localStorage.setItem("footer", 'yes');
            window.location.reload();
        }
    }
    onFileSelected(files) {
        if (files) {
            this.files = files;
            this.images = [];
            for (let i = 0; i < files.length; i++) {
                let reader = new FileReader();
                reader.readAsDataURL(files[i]);
                reader.onload = (event) => {
                    let fileReader = event.target;
                    this.images.push(fileReader.result);
                };
            }
        }
    }
    post() {
        if (!this.title || !this.date || !this.capacity || !this.description || !this.shortDescription || this.images.length == 0 || !this.latitude || !this.longitude) {
            this.errorMessage = "All fields required";
        }
        else {
            this.errorMessage = '';
            this.workshopService.post(this.logged.username, this.title, this.date, this.capacity, this.shortDescription, this.description, this.files, this.latitude, this.longitude, this.street, this.city, this.country).subscribe(respObj => {
                alert("vratio se");
            });
        }
    }
    createMap() {
        let options = {
            center: { lat: 44.8125449, lng: 20.46123 },
            zoom: 10
        };
        let map = new google.maps.Map(document.getElementById('map'), options);
        let input = document.getElementById('search');
        let searchBox = new google.maps.places.SearchBox(input);
        map.addListener('bounds_changed', () => {
            searchBox.setBounds(map.getBounds());
        });
        let markers = [];
        searchBox.addListener('places_changed', () => {
            let places = searchBox.getPlaces();
            if (places.length == 0)
                return;
            markers.forEach(m => { m.setMap(null); });
            markers = [];
            let bounds = new google.maps.LatLngBounds();
            places.forEach(p => {
                if (!p.geometry)
                    return;
                markers.push(new google.maps.Marker({
                    map: map,
                    title: p.name,
                    position: p.geometry.location
                }));
                this.latitude = markers[0].position.lat();
                this.longitude = markers[0].position.lng();
                this.workshopService.getLocation(this.latitude, this.longitude).subscribe(resp => {
                    let str = JSON.stringify(resp['results'][0]['formatted_address'], null, 2);
                    str = str.slice(1, str.length - 1);
                    let arr = str.split(',');
                    this.street = arr[0];
                    this.city = arr[1];
                    this.country = arr[arr.length - 1];
                });
                if (p.geometry.viewport)
                    bounds.union(p.geometry.viewport);
                else
                    bounds.extend(p.geometry.location);
            });
            map.fitBounds(bounds);
        });
        map.addListener("click", (mapsMouseEvent) => {
            markers.forEach(m => { m.setMap(null); });
            markers = [];
            markers.push(new google.maps.Marker({
                position: mapsMouseEvent.latLng,
                map,
                title: "Marker set",
            }));
            this.latitude = mapsMouseEvent.latLng.lat();
            this.longitude = mapsMouseEvent.latLng.lng();
            this.workshopService.getLocation(this.latitude, this.longitude).subscribe(resp => {
                let str = JSON.stringify(resp['results'][0]['formatted_address'], null, 2);
                str = str.slice(1, str.length - 1);
                let arr = str.split(',');
                this.street = arr[0];
                this.city = arr[1];
                this.country = arr[arr.length - 1];
            });
        });
    }
};
OrganizerComponent = __decorate([
    Component({
        selector: 'app-organizer',
        templateUrl: './organizer.component.html',
        styleUrls: ['./organizer.component.css']
    })
], OrganizerComponent);
export { OrganizerComponent };
//# sourceMappingURL=organizer.component.js.map
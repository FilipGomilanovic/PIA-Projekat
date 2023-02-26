import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { Workshop } from '../models/workshops';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {

  constructor(private workshopService: WorkshopService, private fileUploadService: FileUploadService, private http: HttpClient) { }

  ngOnInit(): void {
    this.createMap()
    this.logged = JSON.parse(sessionStorage.getItem('logged'))
    // if (!localStorage.getItem("footer")) {
    //   localStorage.setItem("footer", 'yes')
    //   window.location.reload()
    // }
    this.workshopService.getAllWorkshops().subscribe((workshops: Workshop[])=>{
      this.template = workshops[0]._id;
      workshops.forEach(workshop => {
        if (workshop.organizer = this.logged.username){
          this.workshopTemplates.push(workshop);
        }
      })
    })
  
  }
  images = []
  imagesPath = []
  files = null
  logged = null
  street: string
  streetNumber: string
  country: string
  city: string
  zip: string
  errorMessage: string
  title: string
  date: string
  capacity: number
  description: string
  shortDescription: string
  latitude = null
  longitude = null
  workshopTemplates = []
  template
  templateImagesFlag = false;
  templateImages = []
  map = null;
  markers = []

  onFileSelected(files: FileList | null) {
    this.templateImagesFlag = false;
    if (files) {
      this.files = files
      this.images= []
      for (let i = 0; i < files.length; i++){
        let reader = new FileReader()
        reader.readAsDataURL(files[i])
      
        reader.onload = (event:Event) => {
          let fileReader = event.target as FileReader
          this.images.push(fileReader.result)    
        }
      }      
    }
  }

  loadTemplate() {
    this.templateImagesFlag = true;
    this.templateImages = []
   this.workshopService.getWorkshop(this.template).subscribe((w:Workshop) =>{
    this.title = w.title;
    this.date = w.date;
    this.capacity = w.capacity;
    this.shortDescription = w.shortDescription;
    this.description = w.description;
    this.files = w.images;
    w.images.forEach(image => {
      this.templateImages.push(image)
    })
    this.latitude = w.latitude;
    this.longitude = w.longitude; 
    this.street = w.street;
    this.city = w.city;
    this.country = w.country;
    
    let bounds = new google.maps.LatLngBounds();
    
    this.markers.forEach( m => { m.setMap(null); });
      this.markers = [];
      this.markers.push(new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(w.latitude), parseFloat(w.longitude)),
        map: this.map,
        title: "Marker set",
      }));
      bounds.extend(this.markers[0].getPosition());
      
      this.map.fitBounds(bounds);
      this.map.setZoom(10);
   })
    
  }

  post(){
    if (!this.title || !this.date || !this.capacity || !this.description || !this.shortDescription || (this.images.length==0 && !this.templateImagesFlag) || !this.latitude || !this.longitude) {
      this.errorMessage="All fields required"
    } else {
      this.errorMessage = ''
      this.workshopService.post(this.logged.username, this.title, this.date, this.capacity, this.shortDescription, this.description, this.files, this.latitude, this.longitude, this.street, this.city, this.country).subscribe(respObj=>{
        alert("vratio se")
        if (this.logged.type=='administrator'){
          
        }
      })
    }   
  }

  createMap () {
    let options = {
      center: { lat: 44.8125449, lng: 20.46123 },
      zoom: 10
    };
    this.map = new google.maps.Map(document.getElementById('map'), options); 
    let input = document.getElementById('search');
    let searchBox = new google.maps.places.SearchBox(input as HTMLInputElement);
  
    this.map.addListener('bounds_changed', ()=> {
      searchBox.setBounds(this.map.getBounds());
    });
    
    this.markers = [];
    searchBox.addListener('places_changed', () => {
      let places = searchBox.getPlaces();
  
      if (places.length == 0)
        return;
  
      this.markers.forEach( m => { m.setMap(null); });
      this.markers = [];
  
      let bounds = new google.maps.LatLngBounds();
      places.forEach(p =>{
        if (!p.geometry)
          return;
  
        this.markers.push(new google.maps.Marker({
          map: this.map,
          title: p.name,
          position: p.geometry.location
        }));
        this.latitude = this.markers[0].position.lat()
        this.longitude = this.markers[0].position.lng()
        this.workshopService.getLocation(this.latitude, this.longitude).subscribe(resp =>{

          let str = JSON.stringify(resp['results'][0]['formatted_address'],null, 2)
          str = str.slice(1, str.length-1);
          let arr = str.split(',');
          this.street = arr[0]
          this.city = arr[1]
          this.country = arr[arr.length-1]
        })
        if (p.geometry.viewport)
          bounds.union(p.geometry.viewport);
        else
          bounds.extend(p.geometry.location);
      });
     
      this.map.fitBounds(bounds);
    });

    this.map.addListener("click", (mapsMouseEvent) => {
      this.markers.forEach( m => { m.setMap(null); });
      this.markers = [];
      this.markers.push(new google.maps.Marker({
        position: mapsMouseEvent.latLng,
        map: this.map,
        title: "Marker set",
      }));
      
      this.latitude = mapsMouseEvent.latLng.lat()
      this.longitude = mapsMouseEvent.latLng.lng()
      this.workshopService.getLocation(this.latitude, this.longitude).subscribe(resp =>{
        let str = JSON.stringify(resp['results'][0]['formatted_address'],null, 2)
        str = str.slice(1, str.length-1);
        let arr = str.split(',');
        this.street = arr[0]
        this.city = arr[1]
        this.country = arr[arr.length-1]
      })
    });
}  





}

import { Component, OnInit } from '@angular/core';
import { Comment } from '../models/comment';
import { User } from '../models/user';
import { Workshop } from '../models/workshops';
import { UserService } from '../user.service';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.css']
})
export class WorkshopComponent implements OnInit {

  constructor(private workshopService: WorkshopService, private userService: UserService) { }

  ngOnInit(): void {
    
    this.logged=JSON.parse(sessionStorage.getItem("logged"))
    
    this.workshop=JSON.parse(sessionStorage.getItem("workshop"))
    // alert(this.workshop._id)
    this.workshopService.getWorkshop(this.workshop._id).subscribe(w =>{
      // alert("vratio se")
      // alert(w)
      this.workshop=w
      this.fillFields();
    })
    // ZAJEBAVA OVDE, NI NE VRATI WORKSHOP KAKO TREBA IZGLEDA
    // this.createMap()
    this.alreadyLiked();
    // this.createMap2();
  }
  mapp = null
  logged=null
  workshop2 = null
  workshop = null
  map : google.maps.Map
  newCommentText = ''
  showComm = false;
  participants = null;
  showAlert = false;
  waiting = false;
  workshopComments = []
  liked = false;
  showLikeAlert = false;
  title = ''
  date = ''
  shortDescription = ''
  description = ''
  street = ''
  city = ''
  country = ''
  latitude = null
  longitude = null

  changedSomething = false;
  editTitle = false;
  editDate = false;
  editShortDescription = false;
  editDescription = false;
  editAddress = false;
  map2 : google.maps.Map
  markers = []
  
  fillFields(){
    this.title = this.workshop.title
    this.date = this.workshop.date
    this.shortDescription = this.workshop.shortDescription
    this.description = this.workshop.description
    this.street = this.workshop.street
    this.city = this.workshop.city
    this.country = this.workshop.country
    this.latitude = this.workshop.latitude
    this.longitude = this.workshop.longitude
  }

  changeFlag(number) {
    if (number == '1'){
      this.editTitle = !this.editTitle;
    } 
    else if (number == '2'){
      this.editDate = !this.editDate;
    }
    else if (number == '3'){
      this.editShortDescription = !this.editShortDescription;
    }
    else if (number == '4'){
      this.editDescription = !this.editDescription;
    }
    else if (number == '5'){
      
      this.editAddress = !this.editAddress;
      if (this.editAddress)
        this.showMap2();
      else {
        this.closeMap2();
      }
   
    }
    this.changedSomething = true;
  }

  checkDate(){
    const now = new Date();
    const hoursDiff = (now.getTime() - new Date(this.workshop.date).getTime()) / (1000 * 60 * 60);
    return Math.abs(hoursDiff) > 13;
  }

  removeParticipant(){
    this.waiting = true;
    this.workshopService.removeParticipant(this.workshop._id, this.logged.username).subscribe(respObj=>{
      if (this.workshop.waitingList.length != 0){
        let emails = [];
        this.workshop.waitingList.forEach(user =>{
          this.userService.getUser(user).subscribe((u : User)=>{
            emails.push(u.email);
            if (emails.length == this.workshop.waitingList.length){
              this.userService.notifyAll(emails, this.workshop.title).subscribe(resp =>{
                this.workshopService.clearWaithingList(this.workshop._id).subscribe(resp=>{
                  this.waiting = false;
                  window.location.reload();
                })
                
              })
            }
          })
        })
      } else {
        this.waiting = false;
        window.location.reload();
      }
    })
  }

  addParticipant(){
    if (this.workshop.capacity > this.workshop.participants.length) {
      //dodati u participants listu.
      this.workshopService.addParticipant(this.workshop._id, this.logged.username).subscribe(respObj=>{
        window.location.reload();
      })
    } else {
      this.showAlert = true;
      let flag = false;
   
      for (let i = 0; i < this.workshop.waitingList.length; i++){
        if (this.workshop.waitingList[i] == this.logged.username){
          flag = true;
          break;
        }
      }
      if (!flag) {
        this.workshopService.addParticipantToWaitingList(this.workshop._id, this.logged.username).subscribe(respObj=>{
          
        })
      }
    }
  }



  closeAlert(){
    this.showAlert = false;
  }

  showMap(){
    this.mapp = 'map'
    var element = document.getElementById('map');
    element.style.height = "400px";
    this.createMap() 
  }

  showMap2(){
  
    var element = document.getElementById('map2');
    element.style.height = "400px";
    this.createMap2() 
  }

  closeMap(){
    var element = document.getElementById('map');
    element.innerHTML = "";
    element.style.height = "0px";
    this.mapp = null
    delete(this.map)
    this.map = null

  }

  closeMap2(){
    var element = document.getElementById('map2');
    element.innerHTML = "";
    element.style.height = "0px";
    delete(this.map2)

  }

  checkParticipant(){
    let flag = false;
   
    for (let i = 0; i < this.workshop.participants.length; i++){
      if (this.workshop.participants[i] == this.logged.username){
        flag = true;
        break;
      }
    }
  
    return flag;
  }

  alreadyLiked(){
    this.workshop.likes.forEach(user=>{
      if (user == this.logged.username){
        alert(user)
        alert("usao ovde")
        this.liked = true;
      }
    })
  }

  showComments(){
    this.showComm = true;
  }

  hideComments(){
    this.showComm = false;
  }

  comment(){
    if (this.newCommentText != '') {
      this.workshopService.addComment(this.newCommentText, this.logged, this.workshop._id).subscribe(respObj=>{
        this.workshopService.getWorkshop(this.workshop._id).subscribe(w =>{
          this.workshop=w
  
        })
      })
    }
    else {

    }
  }

  deleteComment(id){
    this.workshopService.deleteComment(id, this.workshop._id).subscribe(respObj=>{
      this.workshopService.getWorkshop(this.workshop._id).subscribe(w =>{
        this.workshop=w

      })
    })
  }

  like(){
    if (this.liked == true){
      this.liked = false;
      this.workshopService.updateLikes(this.workshop._id, this.logged.username, false).subscribe(resp=>{
        this.workshopService.getWorkshop(this.workshop._id).subscribe(w =>{
          this.workshop=w
  
        })
      })
    } else {
      let flag = false;
      let workshopLikes = []
      this.workshopService.getAllWorkshops().subscribe((workshops: Workshop[]) => {
        workshopLikes = workshops;
        workshopLikes.forEach(workshop=>{
          if (workshop.title == this.workshop.title && workshop.finished == true){
            workshop.participants.forEach(user =>{
              if (user == this.logged.username) {
                flag = true;
              }
            })
          }
        })
        if (flag) {
          this.liked = true;
          this.workshopService.updateLikes(this.workshop._id, this.logged.username, true).subscribe(resp=>{
            this.workshopService.getWorkshop(this.workshop._id).subscribe(w =>{
              this.workshop=w
      
            })
          })
        } else {
          this.showLikeAlert = true;
        }
    })

  }
}
closeLikeAlert(){
  this.showLikeAlert = false;
}

  createMap () {
    let options = {
      center: { lat: parseFloat(this.latitude), lng: parseFloat(this.longitude) },
      zoom: 14
    };
    this.map = new google.maps.Map(document.getElementById('map'), options); 
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.latitude, this.longitude),
      map : this.map,
      title: "Marker set",
    });
  }  


  createMap2 () {
    let options = {
      center: { lat: 44.8125449, lng: 20.46123 },
      zoom: 10
    };
    this.map2 = new google.maps.Map(document.getElementById('map2'), options); 
    let input = document.getElementById('search');
    let searchBox = new google.maps.places.SearchBox(input as HTMLInputElement);
  
    this.map2.addListener('bounds_changed', ()=> {
      searchBox.setBounds(this.map2.getBounds());
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
          map: this.map2,
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
     
      this.map2.fitBounds(bounds);
    });

    this.map2.addListener("click", (mapsMouseEvent) => {
      this.markers.forEach( m => { m.setMap(null); });
      this.markers = [];
      this.markers.push(new google.maps.Marker({
        position: mapsMouseEvent.latLng,
        map: this.map2,
        title: "Marker set",
      }));
      
      this.latitude = mapsMouseEvent.latLng.lat();
      this.longitude = mapsMouseEvent.latLng.lng();
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

saveChanges(){
   
      this.workshopService.updateWorkshop(this.workshop._id, this.title, this.date, this.shortDescription, this.description, this.latitude, this.longitude, this.street, this.city, this.country).subscribe(resObj=>{
        this.workshopService.getWorkshop(this.workshop._id).subscribe(w =>{
          // alert("vratio se")
          // alert(w)
          this.workshop=w
          this.fillFields();
          this.changedSomething = false;
        })
    }) 
}

}

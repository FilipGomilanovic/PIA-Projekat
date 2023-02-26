import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  constructor(private http: HttpClient) { }
  
 
  getLocation(lat, long){
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long +"&key=AIzaSyAEkabTXUnuafbGc5GFXG_P3rBhThxyP6U");
  }

  getAllWorkshops(){
    return this.http.get('http://localhost:4000/workshops/getAllWorkshops');
  }

  getAllWorkshopsAdmin(){
    return this.http.get('http://localhost:4000/workshops/getAllWorkshopsAdmin');
  }

  addParticipant(id, username){
    const data = {
      _id: id,
      user: username,
    }
    return this.http.post('http://localhost:4000/workshops/addParticipant', data);
  }

  addParticipantToWaitingList(id, username){
    const data = {
      _id: id,
      user: username,
    }
    return this.http.post('http://localhost:4000/workshops/addParticipantToWaitingList', data);
  }

  removeParticipant(id, username){
    const data = {
      _id: id,
      user: username,
    }
    return this.http.post('http://localhost:4000/workshops/removeParticipant', data);
  }

  setFinished(id){
    const data = {
      _id: id,
    }
    return this.http.post('http://localhost:4000/workshops/setFinished', data);
  }

  getAllComments(id){
    const data = {
      _id: id,
    }
    return this.http.post('http://localhost:4000/workshops/getAllComments', data);
  }

  clearWaithingList(id) {
    const data = {
      _id: id,
    }
    return this.http.post('http://localhost:4000/workshops/clearWaithingList', data);
  }

  addComment(text, user, _id){
    const data = {
      text: text,
      user: user,
      _id: _id
    }
    return this.http.post('http://localhost:4000/workshops/addComment', data);
  }

  updateLikes(id, username, flag){
    const data = {
      id: id,
      username: username,
      flag: flag,
    }
    return this.http.post('http://localhost:4000/workshops/updateLikes', data);
  }

  updateWorkshop(_id, title, date, shortDescription, description, latitude, longitude, street, city, country){
    const data = {
      _id: _id,
      title: title,
      date: date,
      shortDescription: shortDescription,
      description: description,
      latitude: latitude,
      longitude: longitude,
      street: street,
      city: city,
      country: country,
    }
    return this.http.post('http://localhost:4000/workshops/updateWorkshop', data);
  }

  updateStatus(id, status){
    const data = {
      _id: id,
      status: status
    }
    return this.http.post('http://localhost:4000/workshops/updateStatus', data);
  }

  deleteComment(comment_id, workshop_id){
    const data = {
      comment_id: comment_id,
      workshop_id: workshop_id,
    }
    return this.http.post('http://localhost:4000/workshops/deleteComment', data);
  }

  getWorkshop(id){
    const data = {
      _id: id
    }
    return this.http.post('http://localhost:4000/workshops/getWorkshop', data);
  }
  

  post(organizer, title, date, capacity, shortDescription, description, images, latitude, longitude, street, city, country){
    const data = new FormData();
    alert("usao u servis")
    for (let file of images){
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
    alert("popunio formData")
   
    return this.http.post('http://localhost:4000/addNewWorkshop', data);
  }
}

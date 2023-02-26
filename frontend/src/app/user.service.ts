import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(username, password, type){
    const data={
      username: username,
      password: password,
      type: type
    }
    return this.http.post('http://localhost:4000/users/login', data);
  }

  loginAdmin(username, password){
    const data={
      username: username,
      password: password
    }
    return this.http.post('http://localhost:4000/users/loginAdmin', data);
  }

  register(firstname, lastname, username, password, email, phone, type, image, o_name, o_id , street, country, city, zip) {
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
    }
    return this.http.post('http://localhost:4000/users/register', data);
  }

  getAllRequests(){
    return this.http.get('http://localhost:4000/users/getAllRequests');
  }

  getAllUsers(){
    return this.http.get('http://localhost:4000/users/getAllUsers');
  }

  getUser(username){
    const data = {
      username: username
    }
    return this.http.post('http://localhost:4000/users/getUser', data);
  }

  changePassword(username, password){
    const data = {
      username: username,
      password: password
    }
    return this.http.post('http://localhost:4000/users/changePassword', data);
  }

  sendEmail(email){
    const data = {
      email: email
    }
    return this.http.post('http://localhost:4000/users/sendEmail', data);
  }

  notifyAll(emails, title){
    const data = {
      emails: emails,
      workshopName: title,
    }
    return this.http.post('http://localhost:4000/users/notifyAll', data);
  }

  updateOrganizer(_id, oldUsername, firstname, lastname, username, email, phone, image, password, o_name, o_id, street, city, zip, country) {
    
    const data = {
      _id: _id,
      oldUsername: oldUsername,
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      email: email,
      phone: phone,
      image: image,
      o_name: o_name,
      o_id: o_id,
      street: street,
      country: country,
      city: city,
      zip: zip
    }
    return this.http.post('http://localhost:4000/users/updateOrganizer', data);

  }

  updateParticipant(_id, oldUsername, firstname, lastname, username, email, phone, image, password) {
    
    const data = {
      _id: _id,
      oldUsername: oldUsername,
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      email: email,
      phone: phone,
      image: image,
    }
    return this.http.post('http://localhost:4000/users/updateParticipant', data);
  }

  updateStatus(username, status) {
    const data = {
      username: username,
      status: status
    }
    return this.http.post('http://localhost:4000/users/updateStatus', data);
  }

}

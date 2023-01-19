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

  register(firstname, lastname, username, password, type, o_name, o_id , street, country, city, zip) {
    const data = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      type: type,
      o_name: o_name,
      o_id: o_id,
      street: street,
      country: country,
      city: city,
      zip: zip
    }
    return this.http.post('http://localhost:4000/users/register', data);
  }

}

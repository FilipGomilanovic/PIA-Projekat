import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
providedIn: 'root'
})
export class FileUploadService {

constructor(private http:HttpClient) { }

uploadSingle(file) {
	const data = {
		file: file
	}
	const formData = new FormData();
	formData.append("file", file);
	// formData.set("kljuc", "kljuc")
	alert("usao u servis")

	// return this.http.post('http://localhost:4000/workshops/uploadPhoto', formData)
	return this.http.post('http://localhost:4000/uploadPhoto', formData)
}

uploadMultiple(files){
	alert("usao u servis")

	const data = {
		file: files
	}

	alert(files.length)

	const formData = new FormData();
	for (let file of files){
		
			formData.append("files", file);
		
	}
	formData.set("jeavic", "jea")
	
	alert("ubacio u formData")
	// formData.append("files", files);
	// formData.set("kljuc", "kljuc")
	return this.http.post('http://localhost:4000/uploadPhotos', formData)
}
}

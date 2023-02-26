import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { WorkshopService } from '../workshop.service';
  
@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  
    // Variable to store shortLink from api response
    shortLink: string = "";
    loading: boolean = false; // Flag variable
    file: File = null; // Variable to store file\
    files: []
  
    // Inject service 
    constructor(private fileUploadService: FileUploadService, private workshopService: WorkshopService) { }
  
    ngOnInit(): void {
    }
  
    // On file Select
    onChange(event) {
        // this.file = event.target.files[0];
        this.files=event.target.files
    }
  
    // OnClick of button Upload
    onUpload() {
    //   alert(this.file)
        // this.loading = !this.loading;
        // console.log(this.file);
        alert("usao iz onUpload")
        this.fileUploadService.uploadMultiple(this.files).subscribe((res: any)=> {
            // alert(imagePath['path'])
            alert("usaoOvdeeeeeeeeeeeeeeeee")
            // alert(imagePath['imagePath'])
            alert(res)
        })
        
        alert("izasao iz onUpload")
    }
}
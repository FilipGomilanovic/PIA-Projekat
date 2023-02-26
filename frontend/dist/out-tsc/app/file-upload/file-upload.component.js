import { __decorate } from "tslib";
import { Component } from '@angular/core';
let FileUploadComponent = class FileUploadComponent {
    // Inject service 
    constructor(fileUploadService, workshopService) {
        this.fileUploadService = fileUploadService;
        this.workshopService = workshopService;
        // Variable to store shortLink from api response
        this.shortLink = "";
        this.loading = false; // Flag variable
        this.file = null; // Variable to store file\
    }
    ngOnInit() {
    }
    // On file Select
    onChange(event) {
        // this.file = event.target.files[0];
        this.files = event.target.files;
    }
    // OnClick of button Upload
    onUpload() {
        //   alert(this.file)
        // this.loading = !this.loading;
        // console.log(this.file);
        alert("usao iz onUpload");
        this.fileUploadService.uploadMultiple(this.files).subscribe((res) => {
            // alert(imagePath['path'])
            alert("usaoOvdeeeeeeeeeeeeeeeee");
            // alert(imagePath['imagePath'])
            alert(res);
        });
        alert("izasao iz onUpload");
    }
};
FileUploadComponent = __decorate([
    Component({
        selector: 'app-file-upload',
        templateUrl: './file-upload.component.html',
        styleUrls: ['./file-upload.component.css']
    })
], FileUploadComponent);
export { FileUploadComponent };
//# sourceMappingURL=file-upload.component.js.map
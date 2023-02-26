import { TestBed } from '@angular/core/testing';
import { FileUploadService } from './file-upload.service';
describe('FileUploadService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FileUploadService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=file-upload.service.spec.js.map
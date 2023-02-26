import { TestBed } from '@angular/core/testing';
import { LoginAdminComponent } from './login-admin.component';
describe('LoginAdminComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginAdminComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(LoginAdminComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=login-admin.component.spec.js.map
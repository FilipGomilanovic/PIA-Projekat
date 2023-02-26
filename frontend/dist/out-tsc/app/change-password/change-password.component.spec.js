import { TestBed } from '@angular/core/testing';
import { ChangePasswordComponent } from './change-password.component';
describe('ChangePasswordComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChangePasswordComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ChangePasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=change-password.component.spec.js.map
import { TestBed } from '@angular/core/testing';
import { UserSettingsComponent } from './user-settings.component';
describe('UserSettingsComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UserSettingsComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(UserSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=user-settings.component.spec.js.map
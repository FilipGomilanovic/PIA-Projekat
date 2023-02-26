import { TestBed } from '@angular/core/testing';
import { AdministratorComponent } from './administrator.component';
describe('AdministratorComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AdministratorComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AdministratorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=administrator.component.spec.js.map
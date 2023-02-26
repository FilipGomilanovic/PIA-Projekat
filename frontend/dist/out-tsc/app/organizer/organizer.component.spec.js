import { TestBed } from '@angular/core/testing';
import { OrganizerComponent } from './organizer.component';
describe('OrganizerComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OrganizerComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(OrganizerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=organizer.component.spec.js.map
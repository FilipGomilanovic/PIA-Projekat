import { TestBed } from '@angular/core/testing';
import { ParticipantComponent } from './participant.component';
describe('ParticipantComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ParticipantComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ParticipantComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=participant.component.spec.js.map
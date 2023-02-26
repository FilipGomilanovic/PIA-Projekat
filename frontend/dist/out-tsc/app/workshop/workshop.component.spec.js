import { TestBed } from '@angular/core/testing';
import { WorkshopComponent } from './workshop.component';
describe('WorkshopComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WorkshopComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(WorkshopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=workshop.component.spec.js.map
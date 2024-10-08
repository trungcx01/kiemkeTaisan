import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TaisanTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { DanhmucTaisanDeleteDialogComponent } from 'app/entities/danhmuc-taisan/danhmuc-taisan-delete-dialog.component';
import { DanhmucTaisanService } from 'app/entities/danhmuc-taisan/danhmuc-taisan.service';

describe('Component Tests', () => {
  describe('DanhmucTaisan Management Delete Component', () => {
    let comp: DanhmucTaisanDeleteDialogComponent;
    let fixture: ComponentFixture<DanhmucTaisanDeleteDialogComponent>;
    let service: DanhmucTaisanService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TaisanTestModule],
        declarations: [DanhmucTaisanDeleteDialogComponent]
      })
        .overrideTemplate(DanhmucTaisanDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DanhmucTaisanDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DanhmucTaisanService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('123');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('123');
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.clear();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});

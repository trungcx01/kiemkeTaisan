import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { TaisanTestModule } from '../../../test.module';
import { BanghiKiemkeComponent } from 'app/entities/banghi-kiemke/banghi-kiemke.component';
import { BanghiKiemkeService } from 'app/entities/banghi-kiemke/banghi-kiemke.service';
import { BanghiKiemke } from 'app/shared/model/banghi-kiemke.model';

describe('Component Tests', () => {
  describe('BanghiKiemke Management Component', () => {
    let comp: BanghiKiemkeComponent;
    let fixture: ComponentFixture<BanghiKiemkeComponent>;
    let service: BanghiKiemkeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TaisanTestModule],
        declarations: [BanghiKiemkeComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: {
                subscribe: (fn: (value: Data) => void) =>
                  fn({
                    pagingParams: {
                      predicate: 'id',
                      reverse: false,
                      page: 0
                    }
                  })
              }
            }
          }
        ]
      })
        .overrideTemplate(BanghiKiemkeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BanghiKiemkeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BanghiKiemkeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new BanghiKiemke('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.banghiKiemkes && comp.banghiKiemkes[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new BanghiKiemke('123')],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.banghiKiemkes && comp.banghiKiemkes[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});

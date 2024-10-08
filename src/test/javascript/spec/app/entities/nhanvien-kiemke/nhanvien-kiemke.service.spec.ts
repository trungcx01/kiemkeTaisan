import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { NhanvienKiemkeService } from 'app/entities/nhanvien-kiemke/nhanvien-kiemke.service';
import { INhanvienKiemke, NhanvienKiemke } from 'app/shared/model/nhanvien-kiemke.model';

describe('Service Tests', () => {
  describe('NhanvienKiemke Service', () => {
    let injector: TestBed;
    let service: NhanvienKiemkeService;
    let httpMock: HttpTestingController;
    let elemDefault: INhanvienKiemke;
    let expectedResult: INhanvienKiemke | INhanvienKiemke[] | boolean | null;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(NhanvienKiemkeService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new NhanvienKiemke('ID', 'AAAAAAA', 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find('123')
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a NhanvienKiemke', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
          },
          elemDefault,
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new NhanvienKiemke())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a NhanvienKiemke', () => {
        const returnedFromService = Object.assign(
          {
            daidien: 'BBBBBB',
            vaitro: 1,
          },
          elemDefault,
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of NhanvienKiemke', () => {
        const returnedFromService = Object.assign(
          {
            daidien: 'BBBBBB',
            vaitro: 1,
          },
          elemDefault,
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query()
          .pipe(
            take(1),
            map(resp => resp.body),
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a NhanvienKiemke', () => {
        service.delete('123').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

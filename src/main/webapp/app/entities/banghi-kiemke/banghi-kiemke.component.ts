import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBanghiKiemke } from 'app/shared/model/banghi-kiemke.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { BanghiKiemkeService } from './banghi-kiemke.service';
import { BanghiKiemkeDeleteDialogComponent } from './banghi-kiemke-delete-dialog.component';

@Component({
  selector: 'jhi-banghi-kiemke',
  templateUrl: './banghi-kiemke.component.html'
})
export class BanghiKiemkeComponent implements OnInit, OnDestroy {
  banghiKiemkes?: IBanghiKiemke[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected banghiKiemkeService: BanghiKiemkeService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page ? page : this.page;
    this.banghiKiemkeService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IBanghiKiemke[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInBanghiKiemkes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBanghiKiemke): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBanghiKiemkes(): void {
    this.eventSubscriber = this.eventManager.subscribe('banghiKiemkeListModification', () => this.loadPage());
  }

  delete(banghiKiemke: IBanghiKiemke): void {
    const modalRef = this.modalService.open(BanghiKiemkeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.banghiKiemke = banghiKiemke;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IBanghiKiemke[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/banghi-kiemke'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.banghiKiemkes = data ? data : [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}

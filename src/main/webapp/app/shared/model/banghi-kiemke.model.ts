export interface IBanghiKiemke {
  id?: string;
  soluongBandau?: number;
  giatriConlaiBandau?: number;
  soluong?: number;
  nguyengia?: number;
  giatriConlai?: number;
  ghichu?: string;
  tinhtrangSudung?: number;
  hinhthucXuly?: number;
  taisanTenTaisan?: string;
  taisanId?: string;
  kiemkeTaisanId?: string;
}

export class BanghiKiemke implements IBanghiKiemke {
  constructor(
    public id?: string,
    public soluongBandau?: number,
    public giatriConlaiBandau?: number,
    public soluong?: number,
    public nguyengia?: number,
    public giatriConlai?: number,
    public ghichu?: string,
    public tinhtrangSudung?: number,
    public hinhthucXuly?: number,
    public taisanTenTaisan?: string,
    public taisanId?: string,
    public kiemkeTaisanId?: string
  ) {}
}

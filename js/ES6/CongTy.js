class CongTy {
    constructor(){
        this.danhSachNhanVien = new Array();
    }
    //Phương thức thêm nhân viên mới vào mảng (thuộc tính) danhSachNhanVien
    ThemNhanVien(nhanVienMoi) {
        // this.danhSachNhanVien.push(nhanVienMoi);
        this.danhSachNhanVien = [...this.danhSachNhanVien,nhanVienMoi]; //--> ES6
     }

     //Phương thức tìm nhân viên theo mã nhân viên, trả về vị trí của nhân viên trong mảng danh sách nhân viên
     TimViTriTheoMa(maNV) {
         for (let vitri in this.danhSachNhanVien) {
            if (this.danhSachNhanVien[vitri].maNV === maNV) {
                return vitri;
            }
         }
     }
     //Phương thức tìm nhân viên theo mã nhân viên, trả về đối tượng nhân viên
     TimNhanVienTheoMa(maNV){
         for(let nhanVien of this.danhSachNhanVien) {
             if (nhanVien.maNV === maNV) {
                 return nhanVien;
             }
         }
     }
     //Xóa nhân veien theo mã
     XoaNhanVien(maNV) {
         let vitri = this.TimViTriTheoMa(maNV);
         this.danhSachNhanVien.splice(vitri,1);
     }

     //Sửa thông tin nhân viên, nhập vào nhân viên --> sửa thông tin nhân viên
     SuaNhanVien(nhanVien) {
         let vitri = this.TimViTriTheoMa(nhanVien.maNV);
         this.danhSachNhanVien[vitri] = nhanVien;
     }

     //Tìm nhân viên theo tên --> trả về danh sách nhân viên
     TimNhanVienTheoTen(hoTen){
         let dskq = new CongTy();
         hoTen = hoTen.trim().toUpperCase();

         for (let nhanVien of this.danhSachNhanVien) {
             let hoTenNV = nhanVien.hoTen.trim().toUpperCase();

             if(hoTenNV.search(hoTen) !== -1){
                 dskq.danhSachNhanVien = [...dskq.danhSachNhanVien, nhanVien];
             }
         }
         return dskq;
     }
}
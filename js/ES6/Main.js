getEle = (Ele) => document.getElementById(Ele);

var nhanVienMoi = new NhanVien(
  "abc",
  "nguyen van a",
  "nguyenvana@gmail.com",
  "12343242",
  "10/10/2017",
  1
);
var nhanVienMoi1 = new NhanVien(
  "ac",
  "nguyen van b",
  "nguyenvanb@gmail.com",
  "12343242",
  "10/10/2017",
  2
);
var congty = new CongTy();
congty.ThemNhanVien(nhanVienMoi);
congty.ThemNhanVien(nhanVienMoi1);

//Hàm gọi model popup: Thêm nhân veien hoặc sửa thông tin nhân viên

GoiModal = (modal_title, readonly = false, type = 1) => {
  //type = 1: thêm nhân viên, sửa thông tin nhân viên
  getEle("header-title").innerHTML = modal_title;
  getEle("msnv").readOnly = readonly;

  switch (type) {
    case 1: //Thêm nhân viên
      {
        getEle('btnThemNV').style.display = "block";
        getEle('btnCapNhat').style.display = "none";
      }
      break;

    case 2: {
      //Sửa thông tin nhân viên
      getEle("btnThemNV").style.display = "none";
      getEle("btnCapNhat").style.display = "block";
    }
    break;
  }
};

XoaForm = () => {
  let elements = document.getElementsByClassName("input-sm");
  for (let ele of elements) {
    ele.value = "";
  }
  getEle("chucvu").selectedIndex = 0;
};

let trangHienTai = 1;
HienThiDanhSach = (dsnv) => {
  let tbody = getEle("tableDanhSach");
  tbody.innerHTML = "";

  let soNV = dsnv.length;
  let nv, tr, td;

  let ulPhanTrang = getEle("ulPhanTrang");
  ulPhanTrang.innerHTML = "";

  let soDong = 2;
  let soTrang = Math.ceil(soNV / soDong);

  for (let i = 1; i <= soTrang; i++) {
    let li = document.createElement("li");
    ulPhanTrang.appendChild(li);

    let a = document.createElement("a");
    a.setAttribute("class", "page-link");
    a.setAttribute("id", "trang " + i);
    a.innerHTML = i;
    li.appendChild(a);

    //Thiếu chức năng chuyển trang
  }

  let batDau = (trangHienTai - 1) * soDong;
  let ketThuc = trangHienTai * soDong;

  if (soNV < ketThuc) {
    ketThuc = soNV;
  }

  for (let i = batDau; i < ketThuc; i++) {
    nv = dsnv[i];

    tr = document.createElement("tr");
    tbody.appendChild(tr);

    for (let j = 0; j < nv.mangDoiChieu.length; j++) {
      td = document.createElement("td");
      td.innerHTML = nv.mangDoiChieu[j]  === 1 ? "Sếp" :nv.mangDoiChieu[j]  === 2 ? "Trưởng phòng" : nv.mangDoiChieu[j]  === 3 ? "Nhân viên" : nv.mangDoiChieu[j] ;
      tr.appendChild(td);
    }
    
    // let btnSua = '<a class="btn btn-primary text-white" data-toggle="modal" href="myModal" id="sua_"' + nv.maNV + '><em class="fa fa-pencil"></em></a>';
    let btnSua = `<a class="btn btn-primary text-white" data-toggle="modal" href="#myModal" id="sua_${nv.maNV}"><em class="fa fa-pencil"></em></a>`;
    let btnXoa = `<a class="btn btn-danger text-white ml-2" id="xoa_${nv.maNV}"><em class="fa fa-trash"></em></a>`;

    td = document.createElement("td");
    td.innerHTML = btnSua + btnXoa;
    td.setAttribute("align", "center");
    tr.appendChild(td);

    //Tạo sự kiện cho btnSua và btnXoa
    SuaNhanVien("sua_" + nv.maNV);
  }
}

getEle('btnThem').addEventListener('click', () => { 
    XoaForm();
    GoiModal("THÊM NGƯỜI DÙNG");
})

getEle('btnThemNV').addEventListener('click', () => {
    //validation

    let maNV = getEle('msnv').value;
    let hoTen = getEle('name').value;
    let email = getEle('email').value;
    let matKhau = getEle('password').value;
    let ngayLamViec = getEle('datepicker').value;
    let chucVu = getEle('chucvu').selectedIndex;

    //Khởi tạo nhân viên mới
    let nhanVienMoi = new NhanVien(maNV, hoTen, email, matKhau, ngayLamViec, chucVu);
    congty.ThemNhanVien(nhanVienMoi);

    swal("THÊM THÀNH CÔNG", "Danh sách nhân viên đã được cập nhật", "success");

    HienThiDanhSach(congty.danhSachNhanVien);
})

SuaNhanVien = idButton => {
    getEle(idButton).addEventListener('click', ()=> {
        let id = idButton;
        let mangTam = id.split("_");
        let maNV = mangTam[1];

        let nhanVien = congty.TimNhanVienTheoMa(maNV);

        getEle('msnv').value = maNV;
        getEle('name').value = nhanVien.hoTen;
        getEle('email').value = nhanVien.email;
        getEle('password').value = nhanVien.matKhau;
        getEle('datepicker').value = nhanVien.ngayLamViec;
        getEle('chucvu').selectedIndex = nhanVien.chucVu;

        GoiModal("CẬP NHẬT THÔNG TIN", true, 2);
    })
}

getEle('btnCapNhat').addEventListener('click', () =>{
    let maNV = getEle('msnv').value;
    let hoTen = getEle('name').value;
    let email = getEle('email').value;
    let matKhau = getEle('password').value;
    let ngayLamViec = getEle('datepicker').value;
    let chucVu = getEle('chucvu').selectedIndex;

    let nhanVienMoi = new NhanVien(maNV, hoTen, email, matKhau, ngayLamViec, chucVu);

    congty.SuaNhanVien(nhanVienMoi);
    swal("SỬA THÔNGTIN THÀNH CÔNG", "Danh sách nhân viên đã được cập nhật", "success");
    HienThiDanhSach(congty.danhSachNhanVien);
})

//Hiển thị dnah sách ra ngoài man hình
HienThiDanhSach(congty.danhSachNhanVien);

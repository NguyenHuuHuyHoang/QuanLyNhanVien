getEle = (Ele) => document.getElementById(Ele);

var nhanVienMoi = new NhanVien('abc', 'nguyen van a', 'nguyenvana@gmail.com', '12343242', '10/10/2017', 'NhanVien');
var nhanVienMoi1 = new NhanVien('abc', 'nguyen van b', 'nguyenvanb@gmail.com', '12343242', '10/10/2017', 'NhanVien');
var congty = new CongTy();
congty.ThemNhanVien(nhanVienMoi);

//Hàm gọi model popup: Thêm nhân veien hoặc sửa thông tin nhân viên

GoiModal = (model_title, readonly, type) => { //type = 1: thêm nhân viên, sửa thông tin nhân viên
    getEle('header-title').innerHTML = modal_title;
    getEle('msnv').readonly = readonly;

    switch (type) {
        case 1://Thêm nhân viên
            {
                getEle('btnThemNV').style.display = 'block';
                getEle('btnCapNhanNV').style.display = 'none';
            }
            break;

        case 2: //Sửa thông tin nhân viên
            {
                getEle('btnThemNV').style.display = 'none';
                getEle('btnCapNhanNV').style.display = 'block';
            }
    }
}

XoaForm = () => {
    let elements = document.getElementsByClassName('input-sm');
    for (let ele of elements) {
        ele.value = '';
    }
    getEle('chucvu').selectedIndex = 0;
}
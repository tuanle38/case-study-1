let products = [
    ["iPhoneX", "11490000", "./images/iphone-x-64gb-quoc-te-95-99.jpg"],
    ["iPhoneXsmax", "19990000", "./images/iphone-xs-64g-quoc-te-moi-95-99.jpg"],
    ["iPhone11", "23990000", "./images/iphone11.jpg"],
    ["iPhone11ProMax", "37990000", "./images/iphone-11-pro-max-256gb_3.jpg"],
];

function showProduct() {
    document.getElementById("quantity").innerHTML = products.length;
    let tbl = "<table class='table table-bordered'>" +
        "<thead style='text-align: center'>\n" +
            "<tr>\n" +
                "<th scope=\"col\">Tên</th>\n" +
                "<th scope=\"col\">Hình ảnh</th>\n" +
                "<th scope=\"col\">Giá</th>\n" +
                "<th scope=\"col\">Thao tác</th>\n" +
            "</tr>\n" +
        "</thead>";
    for (let i = 0; i < products.length; i++) {
        tbl += "<tr>";
        tbl +=   "<td>" + products[i][0] + "</td>";
        tbl +=  '<td><img src="' + products[i][2] + '" alt="' + products[i][0] + '" width="150"></td>';
        tbl +=  "<td>" + formatPrice(products[i][1])+" VNĐ</td>";
        tbl +=  "<td class='text-center'><button type='button' class='btn btn-danger' onclick='deleteProduct(" + i + ");'>Xoá</button> ";
        tbl +=  "<button type='button' class='btn btn-warning' onclick='editProduct(" + i + ");'>Sửa</button></td>";
        tbl += "</tr>";
    }
    tbl += "</table>";
    document.getElementById("products").innerHTML = tbl;
}
showProduct();

function deleteProduct(id) {
    if (confirm("Bạn thực sự muốn xoá sản phẩm này không?")) {
        products.splice(id, 1);
        setTimeout(function () {
            alert("Bạn đã xoá thành công sản phẩm!");
        }, 500);
        showProduct();
    }
}

function addProduct() {
    let nameProduct = document.getElementById("name");
    let priceProduct = document.getElementById("price");
    let imageProduct = document.getElementById("image");
    if (nameProduct.value === "") {
        alert("Xin mời nhập tên hoặc giá sản phẩm thêm");
        nameProduct.focus();
    } else if (priceProduct.value === "") {
        alert("Xin mời nhập tên hoặc giá sản phẩm thêm");
        priceProduct.focus();
    } else {
        products.unshift([nameProduct.value, priceProduct.value, imageProduct.value]);
    }
    nameProduct.value = '';
    priceProduct.value = '';
    imageProduct.value = '';
    showProduct();
}

function editProduct(id) {
    let editName = document.getElementById("name");
    let editPrice = document.getElementById("price");
    let btnSubmit = document.getElementById("btnSubmit");
    editName.focus();
    editName.value = products[id][0];
    editPrice.value = parseFloat(products[id][1]);
    btnSubmit.value = "Cập Nhật";
    btnSubmit.onclick = function () {
        products[id][0] = editName.value;
        products[id][1] = editPrice.value;
    showProduct();
        btnSubmit.value = "Thêm";
        btnSubmit.onclick = addProduct;
        editName.value = '';
        editPrice.value = '';
    showProduct();
    }
}

function seachProduct() {
    let check = false;
    let seachName = document.getElementById("search").value;
    for (let i = 0; i < products.length; i++) {
        if (seachName.toUpperCase() === products[i][0].toUpperCase()) {
            let tblNew = "<table class='table table-bordered'>"
            tblNew +=      "<tr>";
            tblNew +=       "<td>" + products[i][0] + "</td>";
            tblNew +=       '<td><img src="' + products[i][2] + '" alt="' + products[i][0] + '" width="150"></td>';
            tblNew +=       "<td>" + products[i][1] + "</td>";
            tblNew +=       "<td><button type='button' class='btn btn-danger' onclick='deleteProduct(" + i + ");'>Xoá</button> ";
            tblNew +=       "<button type='button' class='btn btn-warning' onclick='editProduct(" + i + ");'>Sửa</button></td>";
            tblNew +=      "</tr>";
            tblNew +=   "</table>";
            document.getElementById("products").innerHTML = tblNew;
            check = true;
        }
    }
    if (check == false) {
        document.getElementById("products").innerHTML = "Không tìm thấy sản phầm nào!"
    }
    document.getElementById("search").value = "";
}
function formatPrice(price) {
    return parseInt(price).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}
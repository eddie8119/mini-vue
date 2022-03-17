const menu = document.querySelector("#menu");
const cart = document.querySelector("#cart");
const totalAmount = document.querySelector("#total-amount");
const button = document.querySelector("#submit-button");
const addMenu = document.querySelector(".btn btn-primary");
const URL = "https://ac-w3-dom-pos.firebaseio.com/products.json";

const productData = [];
let cartItems = [];
let total = 0;

axios
  .get(URL)
  .then((response) => {
    productData.push(...response.data);
    renderMenuList(productData);
  })
  .catch((error) => console.log(error));

// 打印菜單
function renderMenuList(products) {
  products.forEach((product) => {
    menu.innerHTML += `
    <div class="col-3">
  <div class="card">
    <img src="${product.imgUrl}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">${product.price}</p>
      <a id="${product.id}" href="javascript:;" class="btn btn-primary"
        >加入購物車</a
      >
    </div>
  </div>
</div>
    `;
  });
}

//要顯示目前購物車清單
menu.addEventListener("click", function onAddMenuButton(event) {
  // if (event.target.matches(".btn-primary")) {  //不需要這個判別式
  const id = event.target.id;
  const addedProduct = productData.find((menu) => menu.id === id);

  // 一個是資料庫的夾子 一個是做資料的夾子
  const targetCartItem = cartItems.find((menu) => menu.id === id);
  if (targetCartItem) {
    targetCartItem.quantity += 1;
  } else {
    cartItems.push({
      id,
      name: addedProduct.name,
      price: addedProduct.price,
      quantity: 1,
    });
  }
  // }

  renderchartList(cartItems);
  // cart.innerHTML = cartItems
  //   .map(
  //     (cartItem) =>
  //       `<li class="list-group-item">${cartItem.name} X ${
  //         cartItem.quantity
  //       } 小計：${cartItem.price * cartItem.quantity} </li>
  //   `
  //   )
  //   .join("");

  //計算總金額
  calculateTotal(addedProduct.price);
});

//bug
function renderchartList(data) {
  let chartList = "";
  data.forEach((item) => {
    chartList += `<li class="list-group-item">${item.name} X ${
      item.quantity
    } 小計：${item.price * item.quantity} </li>
    `;
    cart.innerHTML = chartList;
  });
}

function calculateTotal(amount) {
  total += amount;
  totalAmount.innerHTML = total;
}

//送出菜單
button.addEventListener("click", (e) => {
  alert("感謝購買\n 總金額為:" + total);
  //歸零
  cartItems = [];
  cart.innerHTML = cartItems;
  total = 0;
  totalAmount.innerHTML = total;
});

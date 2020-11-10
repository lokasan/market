const products = [
    {id: 1, title: 'Notebook', image: 'img/orig.jpg', price: 20000},
    {id: 2, title: 'Mouse', image: 'img/orig.jpg', price: 1500},
    {id: 3, title: 'Keyboard', image: 'img/orig.jpg', price: 5000},
    {id: 4, title: 'Gamepad', image: 'img/orig.jpg', price: 4500},
];

const renderProduct = (title, image, price) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <img class='images' src=${image} alt="">
                <p class="price">${price}</p>
                <button class="btn btn-success">Добавить в корзину</button>
              </div>`;
};

const catalogInit = (list) => {
    const productList = list.map((item) => renderProduct(item.title, item.image, item.price));
    console.log(productList);
    document.querySelector('.products').innerHTML = productList.join('');
};

catalogInit(products);

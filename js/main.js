class ProductList {
    #goods
    #allProducts
    constructor(container = '.products') {
        this.container = container
        this.#goods = []
        this.#allProducts = []
        this.#fetchGoods()
        this.#render()
    }
    #fetchGoods() {
        this.#goods = [
            {id: 1, title: 'Notebook', image: 'img/orig.jpg', price: 20000},
            {id: 2, title: 'Mouse', image: 'img/orig.jpg', price: 1500},
            {id: 3, title: 'Keyboard', image: 'img/orig.jpg', price: 5000},
            {id: 4, title: 'Gamepad', image: 'img/orig.jpg', price: 4500},
        ]
    }
    #render() {
        const container = document.querySelector(this.container)
        for (let item of this.#goods) {
            const prodObj = new ProductItem(item)
            this.#allProducts.push(prodObj)
            container.insertAdjacentHTML('beforeend', prodObj.render())
        }

    }
    sumOfGoods() {
        let sum = 0
        for (let item of this.#allProducts) {
            sum += item.price
        }
        return sum
    }

}

class ProductItem {
    constructor(product) {
        this.title = product.title
        this.price = product.price
        this.img = product.image
    }
    render() {
        return `<div class="product-item">
                <h3>${this.title}</h3>
                <img class='images' src=${this.img} alt="">
                <p class="price">${this.price}</p>
                <button class="btn btn-success">Добавить в корзину</button>
              </div>`;
    }
}

class BasketOfGoods {
    constructor() {

    }

    #render() {

    }

    clear() {

    }

    order() {

    }
}

class BasketOfGoodsItem {
    constructor() {

    }
    render() {

    }
    add() {

    }
    remove() {

    }


}
const firstList = new ProductList()
// firstList.sumOfGoods() (text in the console of browser)
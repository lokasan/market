const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    filtered: [],
    imgCatalog: 'https://placehold.it/200x150',
    imgBasket: 'https://placehold.it/50x100',
    isCart: false,
    isCallback: false,
    searchLine: '',
    basketUrl: '/getBasket.json',
    basket: {
    },

    txtarea: '',
    validations: {
      name: '',
      phone: '',
      email: ''
    },
    regExpression: {
      name: /^[a-za-яё]+/i,
      phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
      email: /^[\w._-]+@\w+\.[a-z]{2,4}$/i
    },
    errors: {
      name: {value: 'Допустимы только буквы', status: false},
      phone: {value: 'Допустимый формат +7(900)000-0000', status: false},
      email: {value: 'Допустимый формат mymail@mail.ru, my.mail@mail.ru, my-mail@mail.ru', status: false},
    },

  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(res => res.json())
        .catch(err => {
          console.log(err)
        })
    },
    addProduct(element) {
      // console.log(element)
      this.getJson(`${API}/addToBasket.json`)
        .then(data => {
        if (data.result === 1) {
          let productId = element.id_product
          let find = this.basket['contents'].find(product => product.id_product === productId)
          if(find) {
            console.log(find)
            find.quantity++
            this.basket.amount += find.price
            this.basket.countGoods++
          } else {
            let product = {
              id_product: productId,
              price: +element.price,
              product_name: element.product_name,
              quantity: 1
            }
            this.basket.contents.push(product)
            this.basket.amount += product.price
            this.basket.countGoods++
          }
        }
      })

    },
    removeProduct(element){
      this.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
          if(data.result === 1){
            let productId = element.id_product
            let find = this.basket['contents'].find(product => product.id_product === productId)
            if(find.quantity > 1) {
              find.quantity--
            } else {
              this.basket['contents'].splice(this.basket['contents'].indexOf(find), 1);

              // document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
            }
            this.basket.amount -= find.price
            this.basket.countGoods -= 1
          } else {
            alert('Error')
          }
        })
    },
    sendMsg(event) {
      event.preventDefault()
      for(let item in this.errors) {

        // console.log(item)
        this.errors[item].status = !this.validations[item].match(this.regExpression[item])


      }
      console.log(this.errors)
    },
    filter(){
      const regexp = new RegExp(this.searchLine, 'i')
      this.filtered = this.products.filter(product => regexp.test(product.product_name));


    },
    openBasket() {

    }
  },
  created() {
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for(let el of data) {
          this.products.push(el)
          this.filtered.push(el)
      }
    })
    this.getJson(`${API + this.basketUrl}`)
      .then(data => {
      this.basket = data
    })
  }
})
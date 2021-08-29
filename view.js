const renderView = document.querySelector('.product__cards')
const totalCart = document.querySelector('.total')

const data = new Products()

window.addEventListener("load", (e) => {
    e.preventDefault()

    innerResult()
    sumTotalCart()

})

function innerResult(){
    const products = data.showProducts()
    if(products)
        products.map((item) => (
            renderView.innerHTML += render(item)
        )) 
    else renderView.innerHTML = "<p>Don't have a resister</p>" 
}


function render({ id, name, quantity, price, total }){
    return `
        <div class="card">
            <div class="card__item">
                <div class="card__content">
                    <span>ID: ${id}</span>
                    <h3>${name}</h3>
                    <p>Quantity: <strong>${quantity}</strong></p>
                    <span class="purchase">Price: <strong>${price}</strong></span><br>
                    <span>Total: <strong class="total__price__product">${total}</strong></span>
                </div>
                <div class="card__action">
                    <button type="submit" class="btn-action" onClick="addToCart(${id})" >Add to cart</button>
                </div>                           
            </div>
        </div>
    `
}

function addToCart(id){
    const currentProduct = data.showProducts().filter((product) => product.id == id)
    const actualQuantity = currentProduct.map((item) => ++item.quantity)  
    currentProduct[0].total =  (currentProduct[0].price * actualQuantity)   
    data.updateProduct(currentProduct[0])
    sumTotalCart()
}

function sumTotalCart(){    
    let sumTotalPrice = 0        
    let products = data.showProducts()
    for(item in products){
        sumTotalPrice += products[item].total                       
    }
    totalCart.innerHTML = sumTotalPrice
}

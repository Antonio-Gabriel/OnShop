# Carrinho

Simulação de adição de produtos em um carrinho usando a linguagem javascript e explorando os 
conhecimentos da linguagem.

O resultado do trabalho desenvolvido foram os que ai estão, porém os dados estão a ser arquivados dentro do localStorage e já deixei uma serie de dados para realização dos testes.

Ilustração de alguns códigos desenvolvidos.

```javascript

class DbContextConfig{

    setContextDb(data) {
        return localStorage.setItem('products', JSON.stringify(data))
    }

    getContextData(){
        return JSON.parse(localStorage.getItem('products'))
    }
}

```
Implementação

```javascript

class Products {

    context = null
    storageSet =  []

    constructor(){    
        this.context = new DbContextConfig()
    }
    
    showProducts(){
        let products = this.context.getContextData()        
        if(!products) return false

        return products.map((index) => {
            return index
        })
    }

   insertProduct(productParams){       
        let product = this.context.getContextData()     
                
        if(this.checkExistentProduct(productParams).length > 0)
            return { state: 0, message: 'This product exist in stock' }   
                  
        if(!product) {
            this.storageSet.push({
                id: IdGenerate.generateId(product),
                ...productParams
            })  
        }else {
            this.storageSet.push(
                ...product,
                {
                    id: IdGenerate.generateId(product),                
                    ...productParams
                }
            )     
        }            
        
        return (!this.context.setContextDb(this.storageSet)) ? 'Successuly!' : 'ERROR!'
    }

    updateProduct(productParams){
        let product = this.context.getContextData()  
                
        for(let i = 0; i < product.length; i++) {
            this.storageSet.push(product[i])
        }    
        
        let index = this.storageSet.findIndex((item) => item.id == productParams.id)
        this.storageSet[index] = productParams        

        localStorage.clear()
        this.context.setContextDb(this.storageSet)
        
        location.reload()
    }

    checkExistentProduct(product){     
        let productFitlter = this.context.getContextData()       
        let check = productFitlter.filter(
            (item) => item.id == product.id || item.name == product.name
        ) 
        return check               
    }
        
}
```

```javascript

function addToCart(id){
    const currentProduct = data.showProducts().filter((product) => product.id == id)
    const actualQuantity = currentProduct.map((item) => ++item.quantity)  
    currentProduct[0].total =  (currentProduct[0].price * actualQuantity)   
    data.updateProduct(currentProduct[0])
    sumTotalCart()
}



const products = [
    { id: 1, name: 'Banana', quantity: 1, price: 120.00, total: 120.00 },
    { id: 2, name: 'Ananas', quantity: 1, price: 20.00, total: 20.00 },
    { id: 3, name: 'Batata', quantity: 1, price: 10.00, total: 10.00 }
]

let context = new DbContextConfig()
context.setContextDb(products)


let product = new Products()
product.insertProduct({ name: 'RedCola', quantity: 1, price: 120.00, total: 120.00 })

```
class DbContextConfig{

    setContextDb(data) {
        return localStorage.setItem('products', JSON.stringify(data))
    }

    getContextData(){
        return JSON.parse(localStorage.getItem('products'))
    }
}


class IdGenerate {

    static generateId(storage) {
        if(!storage) return 1
        return storage.length + 1
    }

}

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
        let check = []
        let productFitlter = this.context.getContextData()      
        if(productFitlter) {
            check = productFitlter.filter(
                (item) => item.name == product.name
            ) 
        }         
        return check               
    }
    
}


// const products = [
//     { id: 1, name: 'Banana', quantity: 1, price: 120.00, total: 120.00 },
//     { id: 2, name: 'Ananas', quantity: 1, price: 20.00, total: 20.00 },
//     { id: 3, name: 'Batata', quantity: 1, price: 10.00, total: 10.00 }
// ]

// let context = new DbContextConfig()
// context.setContextDb(products)

let product = new Products()
let message = product.insertProduct({ name: 'Batata', quantity: 1, price: 120.00, total: 120.00})
console.log(message)
export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = 
 [
  {
    productId : '82bb68d7-ebc9-476a-989c-c78a40ee5cd9',
    quantity: 2
    },
    {
      productId : 'c2a82c5e-aff4-435f-9975-517cfaba2ece',
      quantity: 3
      }
];
}
export function addtoCart(quantity, productId){
    let machingItem;
  
       
  
  
  cart.forEach((cartItem)=>{
    if(productId == cartItem.productId){
      machingItem = cartItem;
    }
  });
  
  if(machingItem){
    machingItem.quantity += quantity;
  }else{
    cart.push({
      productId,
      quantity
    });

  }
  saveToCart();
  };
function saveToCart(){
  localStorage.setItem('cart', JSON.stringify(cart));
}
 export function removeFromCart(productId){
    const newCart = [];
     cart.forEach((cartItem) =>{
      if(cartItem.productId !== productId){
        newCart.push(cartItem);

      }
     });
     cart = newCart;
     saveToCart();
     console.log(cart);
  };

  export function checkoutCount(){
    let cartQuantity=0;
    cart.forEach((cartItem)=>{
      cartQuantity += cartItem.quantity;
      document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
    }
    );
    //checkoutCount(cartQuantity);
    saveToCart();
  }


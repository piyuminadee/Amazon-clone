import { cart, removeFromCart, checkoutCount, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
//import { checkoutCount } from "../data/cart.js";
//import {updateCartQuantity} from "./amazon.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummery } from "./paymnetSummery.js";


// const today = dayjs();
// const deliveryDate = today.add(7, "days");
// const dateString = deliveryDate.format("dddd, MMMM D");
export function renderSummery(){
    let cartSummeryHTML = "";
    cart.forEach((cartItem) => {
      const productId = cartItem.productId;
      const machingProduct = getProduct(productId);
      //console.log(machingProduct);

      const deliveryOptionId = cartItem.deliveryOptionId;
      let deliveryOption = getDeliveryOption(deliveryOptionId);
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");

      
      cartSummeryHTML += `
          <div class="cart-item-container 
          js-cart-item-container-${machingProduct.id}">
                <div class="delivery-date">
                  Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${machingProduct.image}">

                  <div class="cart-item-details">
                    <div class="product-name">
                      ${machingProduct.name}
                    </div>
                    <div class="product-price">
                      $${formatCurrency(machingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">${
                          cartItem.quantity
                        }</span>
                      </span>
                      <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id = "${
                        machingProduct.id
                      }">
                        Update
                      </span>
                      <div class="update-quantity">
                      <input class="quantity-input">
                      <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id = "${
                        machingProduct.id
                      }">save<span>
                      </div>
                      <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id = "${
                        machingProduct.id
                      }">
                        Delete
                      </span>
                    </div>
                  </div>

                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    ${deliverOptionHTML(machingProduct, cartItem)}
                    
                  
                  </div>
                </div>
              </div>`;
    });

    function deliverOptionHTML(machingProduct, cartItem) {
      let html = "";
      deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
        const dateString = deliveryDate.format("dddd, MMMM D");

        const priceString =
          deliveryOption.priceCents === 0
            ? "FREE"
            : `${formatCurrency(deliveryOption.priceCents)}`;
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        html += `
        <div class="delivery-option js-delivery-option" 
        data-product-id = "${machingProduct.id}"
        data-delivery-Option-id = "${deliveryOption.id}">
                      <input type="radio" 
                      ${isChecked ? "checked" : ""}
                        class="delivery-option-input"
                        name="delivery-option-${machingProduct.id}"
                      >
                      <div>
                        <div class="delivery-option-date">
                          ${dateString}
                        </div>
                        <div class="delivery-option-price">
                          $${priceString} - Shipping
                        </div>
                      </div>
                    </div>
        `;
      });
      return html;
    }
    document.querySelector(".js-order-summary").innerHTML = cartSummeryHTML;

    document.querySelectorAll(".js-delete-quantity-link").forEach((link) => {
      link.addEventListener("click", () => {
        const productId = link.dataset.productId;
        //console.log(productId);
        removeFromCart(productId);

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        //console.log(container);
        container.remove();
        renderSummery();
        renderPaymentSummery();
      });
      checkoutCount();
    });

    document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
      link.addEventListener("click", () => {
        const productId = link.dataset.productId;

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.classList.add("is-editing-quantity");
        //console.log(productId);

        //console.log(updateBtn);
      });
    });

    document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
      link.addEventListener("click", () => {
        const productId = link.dataset.productId;

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );

        container.classList.remove("is-editing-quantity");
      });
      checkoutCount();
    });

    document.querySelectorAll('.js-delivery-option')
      .forEach((element) =>{
        element.addEventListener('click', ()=>{
          const {productId, deliveryOptionId} = element.dataset;
          updateDeliveryOption(productId, deliveryOptionId); 
          renderSummery();
          renderPaymentSummery();
        });
       
        
      })
     
     
}  

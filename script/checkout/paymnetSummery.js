import { getProduct } from "../../data/products.js";
import { cart } from "../../data/cart.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
//import { renderSummery } from "./orderSummery.js";

export function renderPaymentSummery(){
    let ShippingPriceCents = 0;
    let productPriceCents = 0;
    cart.forEach((cartItem)=>{
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
        ShippingPriceCents += deliveryOption.priceCents;
        
    });
    //productPriceCents = formatCurrency(productPriceCents);
    //console.log(formatCurrency(productPriceCents));
    // console.log(productPriceCents);
    // console.log(ShippingPriceCents);

     const totalBeforeTax = ShippingPriceCents + productPriceCents;
     const taxCents = totalBeforeTax*0.1;
     const totalCents = taxCents + totalBeforeTax;

     const paymentSummeryHTML = `
<div class="payment-summary-title">
Order Summary
</div>

<div class="payment-summary-row">
<div ><p class="js-count-item"></p></div>
<div class="payment-summary-money">$
${formatCurrency(productPriceCents)}
</div>
</div>

<div class="payment-summary-row">
<div>Shipping &amp; handling:</div>
<div class="payment-summary-money">$
   ${formatCurrency(ShippingPriceCents)}
</div>
</div>

<div class="payment-summary-row subtotal-row">
<div>Total before tax:</div>
<div class="payment-summary-money">$
  ${formatCurrency(totalBeforeTax)}
</div>
</div>

<div class="payment-summary-row">
<div>Estimated tax (10%):</div>
<div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
</div>

<div class="payment-summary-row total-row">
<div>Order total:</div>
<div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
</div>

<button class="place-order-button button-primary">
Place your order
</button>
`;

document.querySelector('.js-payment-summary').innerHTML = paymentSummeryHTML;

};


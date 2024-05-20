import { countItem } from '../data/cart.js';
import {renderSummery} from '../script/checkout/orderSummery.js'
import { renderPaymentSummery } from './checkout/paymnetSummery.js';

renderSummery();
renderPaymentSummery();
countItem();
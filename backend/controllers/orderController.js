import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js';
import Stripe from 'stripe';
import Iyzipay from 'iyzipay';



//global variables

const currency = 'usd'
const deliveryCharge = 15


// Gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// Placing orders using COD Method
const placeOrder = async (req,res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod : "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData: {}});
        res.json({success: true, message :"Order Placed"});

    } catch (err) {
        console.log(err);
        res.json({success:false, message: err.message});
    }
}


// Placing orders using Stripe Method
const placeOrderStripe = async (req,res) => {
    
    try {

        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod : "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data : {
                currency : currency,
                product_data : {
                    name : item.name
                },
                unit_amount : item.price * 100
            },
            quantity : item.quantity
        }));

        line_items.push({
            price_data : {
                currency : currency,
                product_data : {
                    name : 'Delivery Charges'
                },
                unit_amount : deliveryCharge * 100
            },
            quantity : 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url : `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode : 'payment'
        })

        res.json({success:true, session_url:session.url})
    } catch (err) {
        console.log(err);
        res.json({success:false, message: err.message});
    }


}

// Verify Stripe
const verifyStripe = async (req,res) => {
    const { orderId, success, userId } = req.body

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            await userModel.findByIdAndUpdate(userId, {cartData:{} })
            res.json({success: true})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success: false})
        }
    } catch (err) {
        console.log(err);
        res.json({success:false, message: err.message});
    }
}

// Placing orders using Razorpay Method
const iyzipay = new Iyzipay({
    apiKey: process.env.IYZICO_API_KEY,
    secretKey: process.env.IYZICO_SECRET_KEY,
    uri: process.env.IYZICO_BASE_URL
});


const placeOrderRazorpay = async (req, res) => {
    const { price, paidPrice, currency, basketId, paymentCard, buyer, shippingAddress, billingAddress, basketItems } = req.body;

    const request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: '123456789',
        price: price,
        paidPrice: paidPrice,
        currency: currency,
        installment: '1',
        basketId: basketId,
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        paymentCard: paymentCard,
        buyer: buyer,
        shippingAddress: shippingAddress,
        billingAddress: billingAddress,
        basketItems: basketItems
    };

    iyzipay.payment.create(request, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(result);
    });
}




// All orders data for admin panel
const allOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true, orders})
    } catch (err) {
        console.log(err);
        res.json({success:false, message: err.message});
    }
}

//User Order Data for Frontend
const userOrders = async (req,res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId });
        res.json({success: true, orders})
    } catch (err) {
        console.log(err);
        res.json({success:false, message: err.message});
    }
}

//update order status from admin panel
const updateStatus = async (req,res) => {
    try {
        const { orderId,status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({success:true, message: 'Status Updated'});
    } catch (err) {
        console.log(err);
        res.json({success:false, message: err.message});
    }
}

export { verifyStripe,placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus }


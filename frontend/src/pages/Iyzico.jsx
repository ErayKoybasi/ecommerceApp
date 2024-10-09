import React, { useContext, useState } from 'react'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'

const Iyzico = () => {
  const { backendUrl, token, getCartAmount, delivery_fee } = useContext(ShopContext)
  const [cardNumber, setCardNumber] = useState('')
  const [expireMonth, setExpireMonth] = useState('')
  const [expireYear, setExpireYear] = useState('')
  const [cvc, setCvc] = useState('')
  const [holderName, setHolderName] = useState('')
  const [response, setResponse] = useState(null)

  const handlePayment = async () => {
    const paymentCard = {
      cardHolderName: holderName,
      cardNumber: cardNumber,
      expireMonth: expireMonth,
      expireYear: expireYear,
      cvc: cvc,
      registerCard: '0',
    }

    const buyer = {
      id: 'BY789',
      name: 'Efe Görkem',
      surname: 'Ümit',
      gsmNumber: '+905350000000',
      email: 'john.doe@example.com',
      identityNumber: '74300864791',
      lastLoginDate: '2015-10-05 12:43:35',
      registrationDate: '2013-04-21 15:12:09',
      registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
      ip: '85.34.78.112',
      city: 'Istanbul',
      country: 'Turkey',
      zipCode: '34732',
    }

    const shippingAddress = {
      contactName: 'Jane Doe',
      city: 'Istanbul',
      country: 'Turkey',
      address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
      zipCode: '34742',
    }

    const billingAddress = {
      contactName: 'Jane Doe',
      city: 'Istanbul',
      country: 'Turkey',
      address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
      zipCode: '34742',
    }

    const basketItems = [
      {
        id: 'BI101',
        name: 'Binocular',
        category1: 'Collectibles',
        category2: 'Accessories',
        itemType: 'PHYSICAL',
        price: getCartAmount(),
      },
    ]

    const paymentData = {
      amount: getCartAmount() + delivery_fee,
      price: getCartAmount(),
      paidPrice: getCartAmount(),
      currency: 'USD',
      basketId: 'B67832',
      paymentCard: paymentCard,
      buyer: buyer,
      shippingAddress: shippingAddress,
      billingAddress: billingAddress,
      basketItems: basketItems,
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/razorpay', paymentData, {
        headers: { token },
      })

      setResponse(response.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Ödeme Bilgileri</h1>

        <div className="space-y-4">
          {/* Kart Sahibi İsmi */}
          <div>
            <label className="block text-gray-700">Kart Sahibi</label>
            <input
              type="text"
              placeholder="Kart Sahibi"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Kart Numarası */}
          <div>
            <label className="block text-gray-700">Kart Numarası</label>
            <input
              type="text"
              placeholder="Kart Numarası"
              value={cardNumber}
              onChange={(e) => {
                if (e.target.value.length <= 16) {
                  setCardNumber(e.target.value)
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Son Kullanma Tarihi */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700">Son Kullanma Ayı</label>
              <input
                type="text"
                placeholder="Ay (MM)"
                value={expireMonth}
                onChange={(e) => {
                  if (e.target.value.length <= 2) {
                    setExpireMonth(e.target.value)
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700">Son Kullanma Yılı</label>
              <input
                type="text"
                placeholder="Yıl (YY)"
                value={expireYear}
                onChange={(e) => {
                  if (e.target.value.length <= 2) {
                    setExpireYear(e.target.value)
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* CVC Kodu */}
          <div>
            <label className="block text-gray-700">CVC</label>
            <input
              type="text"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => {
                if (e.target.value.length <= 3) {
                  setCvc(e.target.value)
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="text-gray-700">
            <p className="font-semibold">Toplam Tutar: {getCartAmount()} ₺</p>
          </div>
          {/* Ödeme Yap Butonu */}
          <button
            onClick={handlePayment}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Ödeme Yap
          </button>
        </div>

        {/* Sonuç Bölümü */}
        {response && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            {response.status === 'success' ? (
              <>
                <h2 className="text-green-700 font-bold">Ödeme Başarılı!</h2>
                <ul className="text-sm text-gray-600">
                  <li>
                    <strong>Tutar:</strong> {response.price} USD
                  </li>
                  <li>
                    <strong>Ödenen Tutar:</strong> {response.paidPrice} USD
                  </li>
                  <li>
                    <strong>Taksit Sayısı:</strong> {response.installment}
                  </li>
                  <li>
                    <strong>İşlem ID:</strong> {response.paymentId}
                  </li>
                  <li>
                    <strong>Son Dört Hane:</strong> {response.lastFourDigits}
                  </li>
                  <li>
                    <strong>Sepet ID:</strong> {response.basketId}
                  </li>
                  <li>
                    <strong>Onay Kodu:</strong> {response.authCode}
                  </li>
                </ul>
              </>
            ) : (
              <div>
                <h2 className="text-red-700 font-bold">Ödeme Başarısız!</h2>
                <p className="text-sm text-gray-600">
                  Lütfen bilgilerinizi kontrol edip tekrar deneyin.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Iyzico

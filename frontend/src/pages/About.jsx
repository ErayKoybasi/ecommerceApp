import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'}/>
      </div>
        <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img src={assets.about_img} alt=""  className='w-full md:max-w-[450px]'/>
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda harum sit sapiente soluta, nemo repellendus atque accusantium repellat recusandae minima.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam natus vitae aut minima totam culpa neque architecto quam adipisci nobis.</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>Our Mission lorem ipsum, dolor sit amet consectetur adipisicing elit. A, ratione dolorum. Atque, soluta corrupti expedita rerum neque possimus voluptates repellat!</p>
          </div>
        </div>
          <div className='text-xl py-4 '>
              <Title text1={'WHY'} text2={'CHOOSE US'}/>
          </div>

          <div className='flex flex-col md:flex-row text-sm mb-20'>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Quality Assuarance:</b>
                <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia eos perferendis voluptas, dolore, architecto fugiat necessitatibus minima fuga iusto aperiam aliquam, rerum earum magnam commodi suscipit a sequi totam illo quaerat quas. Enim, deleniti fuga!</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Convenience:</b>
                <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi voluptates in facere eligendi ipsum! Fuga, et animi! Fugiat magnam aliquam maxime, nam eius at voluptas eligendi sint? Est eaque porro quas quam a voluptate sapiente modi officia assumenda, dolorum facere.</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Exceptional Customer Service:</b>
                <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis voluptates, quis delectus harum laborum ipsa fuga sunt itaque architecto officiis minus obcaecati magni ullam id libero laudantium dolor ab perspiciatis doloremque unde repellendus voluptas possimus!</p>
            </div>
          </div>

          <NewsletterBox/>

    </div>
  )
}

export default About
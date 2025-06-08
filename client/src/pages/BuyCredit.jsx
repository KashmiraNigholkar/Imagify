import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext'; // ✅ Ensure this path is correct
import {motion} from 'framer-motion'
const plans = [
  {
    id: 'Basic',
    desc: 'Perfect for getting started',
    price: '$10',
    credits: 100,
  },
  {
    id: 'Pro',
    desc: 'For regular users',
    price: '$25',
    credits: 300,
  },
  {
    id: 'Enterprise',
    desc: 'Best for large-scale usage',
    price: '$50',
    credits: 1000,
  },
];

const BuyCredit = () => {
  const { user } = useContext(AppContext); // ✅ Make sure AppContext is correctly set up

  return (
    <motion.div
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInview={{opacity:1,y:0}}
    viewport={{once:true}}
    
    className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>
        Our Plans
      </button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>
        Choose the Plan
      </h1>

      <div className='flex flex-wrap justify-center gap-6 text-left px-4'>
        {plans.map((item, index) => (
          <div
            key={index}
            className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-transform duration-300 ease-in-out w-72'
          >
            <img
              src={assets.logo_icon}
              alt='logo icon'
              width={40}
              className='mb-3'
            />
            <p className='font-semibold text-lg mb-1'>{item.id}</p>
            <p className='text-sm mb-4'>{item.desc}</p>
            <p className='text-base'>
              <span className='text-3xl font-medium text-gray-900'>
                {item.price}
              </span>{' '}
              / {item.credits} credits
            </p>

            <button
              className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 transition hover:bg-gray-700'
            >
              {user ? 'Purchase' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;

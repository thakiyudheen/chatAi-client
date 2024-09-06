import React from 'react';
import { motion } from 'framer-motion';
import Chat2 from '../../assets/chat3.png';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate()
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-between p-8 md:flex-row md:p-8 bg-black  font-Poppins"
        >
            <div className="flex items-center justify-center mb-7 md:mb-0 md:mr-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="overflow-hidden md:w-[82vh] w-[40vh] rounded-full"
                >
                    <img src={Chat2} alt="Chat Icon" />
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center md:text-left md:w-[70%] relative items-center"
            >
                <div className=''>
                    <h1 className="text-2xl font-bold mb-2  text-gray-400">Enjoy the new experience of chatting with AI</h1>
                    <p className="text-gray-500 mb-6">Connect with AI for free</p>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-purple-600 text-white py-2 px-10 rounded-full"
                        transition={{ duration: 0.2 }}
                        onClick={()=>navigate('/chatWindow')}
                    >
                        Get Started
                    </motion.button>
                    <p className="text-gray-400 text-sm mt-4">Powered by <strong>Thakiyu</strong></p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Home;

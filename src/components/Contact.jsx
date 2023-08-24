import React from 'react';

const Contact = () => {
    return (
        <div className='md:mx-24 mx-4 my-4'>
            <h1 className='my-4 font-bold text-2xl text-center'>Contact</h1>
            <div className="flex justif-center sm:flex-row flex-col gap-4">
                <div className="flex-1 flex flex-col justify-center bg-indigo-950 text-center text-white p-4">
                    <p className="font-bold text-lg">Mahbub-Ul Alam</p>
                    <p>Associate Scientist</p>
                    <p>Health System and Population Studies Division</p>
                    <p>icddr'b</p>
                    <p>mahbub@icddrb.org</p>
                </div>
                <div className="flex-1 flex flex-col gap-4 ">
                    <input className='p-1 border outline-none w-full rounded' type="text" placeholder='First name'/>
                    <input className='p-1 border outline-none w-full rounded' type="text" placeholder='Last name'/>
                    <input className='p-1 border outline-none w-full rounded' type="text" placeholder='Email'/>
                    <textarea className='p-1 rounded border outline-none max-w-full max-h-40' placeholder='Your message...'></textarea>
                    <button className='text-white bg-indigo-950 py-1 px-6 rounded-full m-auto'>SEND EMAIL</button>
                </div>
            </div>
        </div>
    );
}

export default Contact;

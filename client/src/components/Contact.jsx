import { useState } from 'react';

export default function Contact({ listing }) {
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <p>
        Contact <span className='font-semibold'>{listing.name.toLowerCase()}</span> for{' '}
        <span className='font-semibold'>{listing.name.toLowerCase()}</span>
      </p>
      <textarea
        name='message'
        id='message'
        rows='2'
        value={message}
        onChange={onChange}
        placeholder='Enter your message here...'
        className='w-full border p-3 rounded-lg'
      ></textarea>

      <a
        href={`mailto:contact@example.com?subject=Regarding ${listing.name}&body=${message}`}
        className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
      >
        Send Message
      </a>
    </>
  );
}
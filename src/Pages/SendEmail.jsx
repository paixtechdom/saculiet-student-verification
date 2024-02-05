import { useState, useContext } from 'react';
import { AppContext } from '../assets/Contexts/AppContext';
import { Resend } from 'resend';
import axios from 'axios';
// import { Welcome } from '../emails/Welcome'

const SendEmail = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const { dbLocation } = useContext(AppContext)

    axios.post(`${dbLocation}/sendEmail.php/` ,{
        to: email,
        subject: subject,
        text: text,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => console.log(response.data))
        .catch(error => console.error('Error:', error));

    
  }
    
  



  return (
    <div className='flex flex-col mt-9 p-9 gap-8 w-full'>
    <div className="pt-9"></div>
 <input type="email" placeholder="Email" value={email}    onChange={(e) => setEmail(e.target.value)}  className='border p-4 border-black'/>

  <input type="text" placeholder="Subject" value={subject}     onChange={(e)=>setSubject(e.target.value)} className='border p-4 border-black'/>

     <textarea placeholder="Message" value={text}     onChange={(e)=>setText(e.target.value)} className='border p-4 border-black'/>
   <button onClick={sendEmail}>Send Email</button>
    </div>
    // <EmailTemplate />

    // <Welcome />
  );


export { SendEmail };



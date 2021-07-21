import React, { useState } from 'react';
import { storage, db } from '../Config/config'
import "./authentic.scss"
import image from "../assets/review.jpg"
import Barners from "./Barners"

export const Authentic = () => {



  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [oder, setOder] = useState('');
  const [purchase, setPurchase] = useState('');
  const [rating, setRating] = useState('');
  const [feed, setFeed] = useState('');
  const [productImg, setProductImg] = useState(null);
  const [error, setError] = useState('');

  const types = ['image/png', 'image/jpeg']; // image types

  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setError('')
    }
    else {
      setProductImg(null);
      setError('Please select a valid image type (jpg or png)');
    }
  }

  // add product
  const addProduct = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
    uploadTask.on('state_changed', snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress);
    }, err => setError(err.message)
      , () => {
        storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
          db.collection('Vouch').add({
            username: username,
            email: email,
            oder: oder,
            purchase: purchase,
            rating: rating,
            feed: feed,

            ProductImg: url
          }).then(() => {
           

   setUsername('');
   setEmail('');
   setOder('');
   setPurchase('');
            setRating('');
            setFeed('')
            setProductImg('');
            setError('');
            document.getElementById('file').value = '';
          }).catch(err => setError(err.message))
        })
      })
  }

  return (
    <div className='container'  >
     
      <br />
  
      <div className="RevHead">
      <h2>VOUCH FOR US AND GET $$$</h2>
      <p >When you vouch for us by giving us feedback with either a Photo or a Video you will get 10% crypto back, it’s another way to say thank you for believing in us.</p>
      </div>      
      <hr />
      <form autoComplete="off" className='form-group' onSubmit={addProduct}>

        <label htmlFor="Category">Username</label>
        <input type="text" className='form-control' required
          onChange={(e) => setUsername(e.target.value)} value={username} />
        <br />
        <label htmlFor="Category">Account Email</label>
        <input type="text" className='form-control' required
          onChange={(e) => setEmail(e.target.value)} value={email} />
        <br />
        <label htmlFor="Category">Oder Number</label>
        <input type="text" className='form-control' required
          onChange={(e) => setOder(e.target.value)} value={oder} />
        <br />
        <label htmlFor="Category">Star Rating</label>
        <input type="text" className='form-control' required
          onChange={(e) => setRating(e.target.value)} value={rating} />
        <br />
        <label htmlFor="Category">Type Feedback Here</label>
        <input type="text" className='form-control' required
          onChange={(e) => setFeed(e.target.value)} value={feed} />
        <br />
        <label htmlFor="Category">Purchased Item</label>
        <input type="text" className='form-control' required
          onChange={(e) => setPurchase(e.target.value)} value={purchase} />
        <br />
        <label htmlFor="product-img">Product Image</label>
        <input type="file" className='form-control' id="file" required
          onChange={productImgHandler} />
        <br />
        <button type="submit" className='btn btn-success btn-md mybtn'>Submit Feedback</button>
      </form>
      {error && <span className='error-msg'>{error}</span>}

    
    </div>
   
   
  )
 
}
export default Authentic

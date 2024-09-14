import React from 'react';
import './Home.css'; // Ensure you import your CSS
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/Auth/AuthContext';
const Home = () => {
  const { auth } = React.useContext(AuthContext);
  const navigate = useNavigate();
  if (!auth.token) {
    navigate('/login');
    return null;
  }
  return (
    <div className="container">
    {/* <h1>Hey! Welcome back {auth.email}</h1> */}
    {/* Your user profile content */}
  
    <div className="home-container">
      <div className="home-background" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/back.jpg)` }}>
        <div className="home-content">
        <h1 className='tex'> Hey! {auth.username}</h1><br/>
          <h1 className='tex'>
            Welcome To Vista Villas
          </h1>
          {/* <div>
            <p>
              Find your dream home with us !
            </p>
          </div> */}
          <div className='tex2'>
            <p className='tex2'>
              "Unlock The Door For Your Perfect Property Start Your Journey Today !"
            </p>
          </div>
          <div>
            <a href="/properties" className="properties-button">Explore Properties</a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;

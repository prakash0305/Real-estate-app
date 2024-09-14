import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthContext'; // Adjust the path as needed
import Header from './components/Navbar/Header';
import Footer from './components/Navbar/Footer';
import CardComponent from './components/CardComponent'; // Adjust for named export
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from './components/Auth/PrivateRoute'; // Adjust the path as needed
import Profile from './components/Auth/Profile';

// Import other page components
import Home from '../src/pages/Home';
import Properties from '../src/pages/Properties';
import Comparison from '../src/pages/Comparison';
import Contact from '../src/pages/Contact';
import Favourites from '../src/pages/Favourites';
import Notifications from '../src/pages/Notifications';

import AdminDashboard from '../src/components/Admin/AdminDashboard';
import ManageProperties from './../src/components/Admin/Pages/ManageProperties/ManageProperties';
// import ManageAgents from '../src/components/Admin/Pages/ManageAgents/ManageAgents';
import ViewEnquiries from '../src/components/Admin/Pages/ViewEnquiries/ViewEnquiries';
import ViewReports from '../src/components/Admin/Pages/ViewReports/ViewReports';


import './App.css'; 


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="container my-4 flex-grow-1">
            <Routes>
              <Route path="/" element={
                <>
                  <div id="imageCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img src={`${process.env.PUBLIC_URL}/images/img1.jpg`} className="d-block w-100" alt="First slide" />
                      </div>
                      <div className="carousel-item">
                        <img src={`${process.env.PUBLIC_URL}/images/img2.jpg`} className="d-block w-100" alt="Second slide" />
                      </div>
                      <div className="carousel-item">
                        <img src={`${process.env.PUBLIC_URL}/images/img3.jpg`} className="d-block w-100" alt="Third slide" />
                      </div>
                    </div>
                    <a className="carousel-control-prev" href="#imageCarousel" role="button" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#imageCarousel" role="button" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </a>
                  </div>

                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-4">
                    <CardComponent 
                      imgSrc={`${process.env.PUBLIC_URL}/images/card1.jpg`} 
                      title="BUY" 
                      text="Discover your dream home—buy from us for a perfect fit!"
                    />
                    <CardComponent 
                      imgSrc={`${process.env.PUBLIC_URL}/images/card2.jpg`} 
                      title="RENT" 
                      text="Rent with us—find your ideal space quickly and easily." 
                    />
                    <CardComponent 
                      imgSrc={`${process.env.PUBLIC_URL}/images/card3.jpg`} 
                      title="SELL" 
                      text="Sell your home with us—expert guidance for a successful sale."
                    />
                    <CardComponent 
                      imgSrc={`${process.env.PUBLIC_URL}/images/card4.jpg`} 
                      title="24/7 SERVICE" 
                      text="Enjoy 24/7 service with us—always available for your needs."
                    />
                  </div>
                </>
              } />
              <Route path="/home" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/comparison" element={<Comparison />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/home" element={<Home />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/manage-properties" element={<ManageProperties />} />
                {/* <Route path="/manage-agents" element={<ManageAgents />} /> */}
                <Route path="/view-enquiries" element={<ViewEnquiries />} />
                <Route path="/view-reports" element={<ViewReports />} />
                
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

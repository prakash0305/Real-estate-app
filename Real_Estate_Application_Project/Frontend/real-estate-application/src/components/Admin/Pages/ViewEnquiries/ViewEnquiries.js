// src/components/Admin/Pages/ViewEnquiries/ViewEnquiries.js

import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactAgents, updateContactAgentStatus } from './contactAgentActions';
import './ViewEnquiries.css';
import { useNavigate } from 'react-router-dom';


const ViewEnquiries = () => {
  const dispatch = useDispatch();
  const contactAgents = useSelector(state => state.contactAgents.contactAgents);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchContactAgents());
  }, [dispatch]);

  const handleStatusChange = (id, currentStatus) => {
    const newStatus = currentStatus === 'Not Solved' ? 'Solved' : 'Not Solved';
    dispatch(updateContactAgentStatus(id, newStatus));
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };
  
  
   

  return (
    <div className="view-enquiries">
      <div><h1 style={{textAlign:'center'}}>Viewing Enquiries</h1></div>
      <button className="back-button" onClick={handleBackClick}>
        &larr; Back
      </button>
      <table>
        <thead>
          <tr>
           
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Schedule Timing</th>
            <th>Agent Email</th>
            <th>Message</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactAgents.map(agent => (
            <tr key={agent.id}>
              
              <td>{agent.fullName}</td>
              <td>{agent.email}</td>
              <td>{agent.phoneNumber}</td>
              <td>{agent.scheduleTiming ? new Date(agent.scheduleTiming).toLocaleString() : '-'}</td>
              <td>{agent.agentEmail}</td>
              <td>{agent.message}</td>
              <td>{agent.status || 'Not Solved'}</td>
              <td>
                <button onClick={() => handleStatusChange(agent.id, agent.status)}>Respond</button>
                {/* <button onClick={() => handleStatusChange(agent.id, agent.status)}>Not Respond</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEnquiries;

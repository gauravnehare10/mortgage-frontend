import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store';
import './Response.css';
import useMortgageStore from '../../morgageStore';

export default function Response() {
    const navigate = useNavigate();
    const {userdata} = useStore();
    const {mortgagedata, updateMortgage} = useMortgageStore();
  return (
    <div>
      <div style={{ display: "flex", height: "auto" }}>
      <div className="profile-container">
        <h1>Your Response</h1>
        <div className="profile-card">
          <div className="profile-row">
            <span className="profile-label">Username:</span>
            <span className="profile-value">{userdata.username}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Name:</span>
            <span className="profile-value">{userdata.name}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Email:</span>
            <span className="profile-value">{userdata.email}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Phone Number:</span>
            <span className="profile-value">{userdata.contactnumber}</span>
          </div>

          <div className="profile-row">
            <span className="profile-label">Has Mortgage? :</span>
            <span className="profile-value">{mortgagedata.hasMortgage}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Mortgage Count :</span>
            <span className="profile-value">{mortgagedata.mortgageCount}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Mortgage Type:</span>
            <span className="profile-value">{mortgagedata.mortgageType}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Mortgage Amount:</span>
            <span className="profile-value">{mortgagedata.mortgageAmount}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Mortgage Renewal Date:</span>
            <span className="profile-value">{mortgagedata.renewalDate}</span>
          </div>
          
          <div className="profile-row">
            <span className="profile-label">Is Looking For Mortgage? :</span>
            <span className="profile-value">{mortgagedata.isLookingForMortgage}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">New Mortgage Amount:</span>
            <span className="profile-value">{mortgagedata.newMortgageAmount}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Account Ownership:</span>
            <span className="profile-value">{mortgagedata.ownershipType}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Annual Income:</span>
            <span className="profile-value">{mortgagedata.annualIncome}</span>
          </div>

          <div className="profile-buttons">
            <button className="profile-button back-button" onClick={()=>{navigate("/")}}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
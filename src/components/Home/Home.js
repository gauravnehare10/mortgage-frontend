import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import useStore from '../../store';
import useMortgageStore from '../../morgageStore';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  

const Home = () => {
  const isLoggedIn = !!localStorage.getItem('username');
  const { userdata } = useStore();
  const { updateMortgage } = useMortgageStore();

  const navigate = useNavigate();

  // States for mortgage details
  const [hasMortgage, setHasMortgage] = useState(null);
  const [isLookingForMortgage, setLookForMortgage] = useState(null);
  const [mortgageCount, setMortgageCount] = useState('');
  const [resOrBuyToLet, setResOrBuyToLet] = useState('');
  const [mortgageType, setMortgageType] = useState('');
  const [mortgageAmount, setMortgageAmount] = useState('');
  const [mortgageAmount2, setMortgageAmount2] = useState('');
  const [mortgageAmount3, setMortgageAmount3] = useState('');
  const [renewalDate, setRenewalDate] = useState('');
  const [newMortgageAmount, setNewMortgageAmount] = useState('');
  const [ownershipType, setOwnershipType] = useState('');
  const [depositeAmt, setDepositeAmt] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [foundProperty, setFoundProperty] = useState('');
  const [showQuestions, setShowQuestions] = useState(true);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      const submittedData = localStorage.getItem('submittedData');
      if (submittedData) {
        setShowQuestions(false);
      }
    }
  }, [isLoggedIn]);

  const viewResponses = () => {
    const submittedData = localStorage.getItem('submittedData');
    if (submittedData) {
      navigate("/response");
    } else {
      alert('No responses found.');
    }
  };

  const submitData = async () => {

    if (!isCheckboxChecked) {
      alert('Please agree to the terms before submitting.');
      return;
    }

    if (hasMortgage === null) {
      alert('Please select whether you have a mortgage.');
      return;
    }
  
    if (hasMortgage) {
      if (!mortgageCount || !resOrBuyToLet || !mortgageType || !mortgageAmount) {
        alert('Please fill out all the fields related to your mortgage.');
        return;
      }

      if ((mortgageCount === '2' && !mortgageAmount2) || (mortgageCount === '3' && (!mortgageAmount2 || !mortgageAmount3))){
        alert('Please enter all mortgage Amount.')
        return
      }
  
      if (mortgageType === 'fixed' && !renewalDate) {
        alert('Please enter the mortgage renewal or fixed-term end date.');
        return;
      }
    } else {
      if (isLookingForMortgage === null) {
        alert('Please specify if you are looking for a new mortgage.');
        return;
      }
  
      if (isLookingForMortgage) {
        if (!newMortgageAmount || !ownershipType || !annualIncome || !foundProperty) {
          alert('Please fill out all the fields for a new mortgage.');
          return;
        }
      }
    }
    const data = hasMortgage
      ? {
          hasMortgage,
          mortgageCount,
          resOrBuyToLet,
          mortgageType,
          mortgageAmount,
          mortgageAmount2,
          mortgageAmount3,
          renewalDate,
          username: userdata.username,
        }
      : {
          hasMortgage,
          isLookingForMortgage,
          newMortgageAmount,
          ownershipType,
          annualIncome,
          depositeAmt,
          foundProperty,
          username: userdata.username,
        };

    console.log(data);

    try {
      const response = await axios.post(
        `https://mortgage-backend-476d.onrender.com/add_mortgage_data`,
        data
      );
      console.log('Response:', response.data);
      const stringifiedData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, String(value)])
      );
      updateMortgage(stringifiedData);
      setShowQuestions(false);
      setIsCheckboxChecked(false);
      setMortgageAmount2("");
      setMortgageAmount3("");
      alert('Data submitted successfully.');
      navigate('/home');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data.', error);
    }
  };

  const handleMortgageSelection = (value) => {
    setHasMortgage(value);
    if (value === false) {
      setLookForMortgage(null);
    }
  };

  const handleBack = () => {
    setShowQuestions(false);
  };

  return (
    <div className="main-div">
      <div className="user-details">
        {isLoggedIn ? (
          userdata.isAdmin ? (
            <>
              <p id="admin_details">&#x1F464; Admin Name: {userdata.name}</p>
              <p id="admin_details">&#x1F4DE; Contact: {userdata.contactnumber}</p>
              <p id="admin_details">&#x2709; Email: {userdata.email}</p>
            </>
          ) : (
            <>
              <p id="user_details">&#x1F464; {userdata.name}</p>
              <p id="user_details">&#x1F4DE; {userdata.contactnumber}</p>
              <p id="user_details">&#x2709; {userdata.email}</p>
            </>
          )
        ) : (
          <div className="guest-content">
            <h2>Hey Guest !!</h2>
            <p>Please login or register to access personalized features.</p>
          </div>
        )}
      </div>
      <div style={{'width': '90%'}}>
      <div className="aai-financials-info">
        <h2>Welcome to AAI Financials</h2>
        <div className='aai-financials-details'>
          <p>
            Where we prioritize your financial journey with trust, transparency, and expertise.
          </p>
          <p>
            As independent mortgage advisors, we have a holistic view of the mortgage market, giving us access to a wide range of lenders and products. This allows us to tailor solutions that best fit your unique needs.
          </p>
          <p>
            Whether you're buying your first home, remortgaging, or exploring investment opportunities, we are here to secure the best deal for you. Our commitment is to guide you every step of the way, making the process smooth and stress-free while ensuring you achieve your homeownership goals with confidence. Let's build your future together.
          </p>
        </div>
      </div>
      <div className="home">
      <table className="table w-75">
        {isLoggedIn && showQuestions && (
          <>
              <tr className="st-item">
                <td><label>Do you have a mortgage?</label></td>
                <td>
                  <label>
                    <input
                      type="radio"
                      name="mortgage"
                      value="yes"
                      required
                      onChange={() => handleMortgageSelection(true)}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="mortgage"
                      value="no"
                      onChange={() => handleMortgageSelection(false)}
                    />
                    No
                  </label>
                </td>
              </tr>
            {hasMortgage !== null && (
              <>
                {hasMortgage && (
                  <>                 
                    <tr className="st-item"> 
                      <td><label>How many mortgages do you have?</label></td>
                      <td>
                          <select className="inp-data" value={mortgageCount} onChange={(e) => setMortgageCount(e.target.value)}>
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                      </td>
                    </tr>
                    <tr className="st-item">
                      <td><label>Mortgage amount:</label></td>
                      <td><input className="inp-data" type="number" placeholder="Enter amount" value={mortgageAmount} onChange={(e) => setMortgageAmount(e.target.value)} required /></td>
                    </tr>
                    { mortgageCount === "2" && (
                      <tr className="st-item">
                      <td><label>Mortgage-2 amount:</label></td>
                      <td><input className="inp-data" type="number" placeholder="Enter amount" value={mortgageAmount2} onChange={(e) => setMortgageAmount2(e.target.value)} required /></td>
                    </tr>
                    )}
                    { mortgageCount === "3" && (
                      <>
                      <tr className="st-item">
                        <td><label>Mortgage-2 amount:</label></td>
                        <td><input className="inp-data" type="number" placeholder="Enter amount" value={mortgageAmount2} onChange={(e) => setMortgageAmount2(e.target.value)} required /></td>
                      </tr>
                      <tr className="st-item">
                        <td><label>Mortgage-3 amount:</label></td>
                        <td><input className="inp-data" type="number" placeholder="Enter amount" value={mortgageAmount3} onChange={(e) => setMortgageAmount3(e.target.value)} required /></td>
                      </tr>
                      </>
                    )}
                    <tr className="st-item"> 
                      <td><label>Are they?</label></td>
                      <td>
                          <select className="inp-data" value={resOrBuyToLet} onChange={(e) => setResOrBuyToLet(e.target.value)}>
                            <option value="">Select</option>
                            <option value="residential">Residential</option>
                            <option value="buy to let">Buy to Let</option>
                            <option value="both">Both</option>
                          </select>
                      </td>
                    </tr>
                    <tr className="st-item">
                      <td><label>Type:</label></td>
                      <td>
                          <select className="inp-data" value={mortgageType} onChange={(e) => setMortgageType(e.target.value)}>
                            <option value="">Select</option>
                            <option value="fixed">Fixed</option>
                            <option value="variable">Variable</option>
                            <option value="other">Other</option>
                          </select>
                      </td>
                    </tr>
                    {mortgageType === 'fixed' && (
                    <tr className="st-item">
                      <td><label>Mortgage renewal or fixed term end date:</label></td> 
                      <td>
                        <input 
                          className="inp-data" 
                          type="date" 
                          placeholder="date" 
                          value={renewalDate} 
                          onChange={(e) => setRenewalDate(e.target.value)} 
                          required 
                        />
                      </td>
                    </tr>
                  )}                 
                  </>
                )}
                {!hasMortgage && (
                  <>                  
                    <tr className="st-item">
                      <td><label>Are you looking for a new mortgage?</label></td>
                      <td>
                        <label>
                          <input
                            type="radio"
                            name="look-for-mortgage"
                            value="yes"
                            required
                            onChange={() => setLookForMortgage(true)}
                          />
                          Yes
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="look-for-mortgage"
                            value="no"
                            onChange={() => setLookForMortgage(false)}
                          />
                          No
                        </label>
                      </td>
                    </tr>                  
                    {isLookingForMortgage !== null && (
                      <>
                        {isLookingForMortgage && (
                          <>
                            <tr className="st-item">
                              <td><label>Approximate mortgage amount:</label></td>
                              <td>
                                <input
                                type="number"
                                className="inp-data"
                                placeholder="Enter approximate amount"
                                value={newMortgageAmount}
                                onChange={(e) => setNewMortgageAmount(e.target.value)}
                                required
                              />
                              </td>
                            </tr>
                            <tr className="st-item">
                                <td><label>Is it joint or single?</label></td>
                                <td>
                                  <select className="inp-data" value={ownershipType} onChange={(e) => setOwnershipType(e.target.value)} required>
                                    <option>Select</option>
                                    <option value="joint">Joint</option>
                                    <option value="single">Single</option>
                                  </select>
                                </td>
                            </tr>
                            <tr className="st-item">
                              <td><label>Annual income:</label></td>
                              <td><input
                                type="number"
                                className="inp-data"
                                placeholder="Enter your annual income"
                                value={annualIncome}
                                onChange={(e) => setAnnualIncome(e.target.value)}
                              />
                              </td>
                            </tr>
                            <tr className="st-item">
                              <td><label>Deposite Amount:</label></td>
                              <td><input
                                type="number"
                                className="inp-data"
                                placeholder="Enter Deposite Amount"
                                value={depositeAmt}
                                onChange={(e) => setDepositeAmt(e.target.value)}
                              />
                              </td>
                            </tr>
                            <tr className="st-item">
                              <td><label>Have you found the property?</label></td>
                              <td>
                                <label>
                                  <input
                                    type="radio"
                                    name="found-property"
                                    value="Yes"
                                    required
                                    onChange={(e) => setFoundProperty(e.target.value)}
                                  />
                                  Yes
                                </label>
                                <label>
                                  <input
                                    type="radio"
                                    name="found-property"
                                    value="No"
                                    onChange={(e) => setFoundProperty(e.target.value)}
                                  />
                                  No
                                </label>
                              </td>
                            </tr>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </> 
        )}
      </table>
    {hasMortgage !== null && showQuestions && (
      <>
        <div className="nav-buttons">
          <div>
            <label htmlFor="agreement-checkbox">
            <input
              type="checkbox"
              id="agreement-checkbox"
              onChange={(e) => setIsCheckboxChecked(e.target.checked)}
            />
            &nbsp;By submitting this form, you agree to our processing of your personal data in accordance with GDPR and our Privacy Policy.
            </label>
          </div>
        </div>
        <div className="nav-buttons">
          <div>
            <button className="back-but" onClick={ handleBack }>Back</button>
          </div>
          <div>
              <button className="submit-but" onClick={submitData}>Submit</button>
          </div>
        </div>
        </>
      )}
      {!showQuestions && (
      <div className="thank-you-message">
        <h6>Thank you for submitting your details! Our team will contact you soon.</h6>
        <div className="navigation-buttons">
          <button className="edit-resp" onClick={() => setShowQuestions(true)}>Add Details</button>
          <button className="view-resp" onClick={viewResponses}>View Details</button>
        </div>
      </div>
      )}
      </div>
      </div>
    </div>
  );
};

export default Home;
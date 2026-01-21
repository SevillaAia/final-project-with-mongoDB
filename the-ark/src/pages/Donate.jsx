import { useState } from 'react';
import Banner from '../components/Banner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDonate, faCreditCard } from '@fortawesome/free-solid-svg-icons';

const Donate = () => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your donation of $${amount}!`);
  };

  return (
    <div className="donate-page">
      <Banner 
        title="Make a Donation" 
        subtitle="Your contribution makes a real difference" 
      />
      <div className="donate-content">
        <div className="donation-info">
          <h2>
            <FontAwesomeIcon icon={faDonate} /> Why Donate?
          </h2>
          <p>
            Your generous donation helps us continue our mission of supporting 
            those in need. Every contribution, no matter the size, makes a 
            meaningful impact in someone's life.
          </p>
        </div>
        <div className="donation-form-container">
          <h3>
            <FontAwesomeIcon icon={faCreditCard} /> Donation Amount
          </h3>
          <form onSubmit={handleSubmit} className="donation-form">
            <div className="amount-buttons">
              <button type="button" onClick={() => setAmount('25')}>$25</button>
              <button type="button" onClick={() => setAmount('50')}>$50</button>
              <button type="button" onClick={() => setAmount('100')}>$100</button>
              <button type="button" onClick={() => setAmount('250')}>$250</button>
            </div>
            <div className="form-group">
              <label htmlFor="custom-amount">Or enter custom amount:</label>
              <input
                type="number"
                id="custom-amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                min="1"
              />
            </div>
            <button type="submit" className="donate-button">
              Donate Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Donate;

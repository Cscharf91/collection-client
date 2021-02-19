import React, { useState } from 'react';

const Breakdown = () => {
  const [breakdown, setBreakdown] = useState({
    billingCollected: 0,
    officeCollected: 0,
    totalCollected: 0,
    owedOffice: 0,
    owedBilling: 0,
  });

  const handleBillingChange = (e) => {
    setBreakdown({
      ...breakdown,
      billingCollected: parseFloat(e.target.value),
      totalCollected: parseFloat(e.target.value) + parseFloat(breakdown.officeCollected),
      owedOffice: parseFloat(e.target.value) * 0.2,
      owedBilling: (parseFloat(e.target.value) + parseFloat(breakdown.officeCollected)) * 0.8
    });
  }

  const handleOfficeChange = (e) => {
    setBreakdown({
      ...breakdown,
      officeCollected: parseFloat(e.target.value),
      totalCollected: parseFloat(breakdown.billingCollected) + parseFloat(e.target.value),
      owedOffice: parseFloat(breakdown.billingCollected) * 0.2,
      owedBilling: (parseFloat(e.target.value) + parseFloat(breakdown.billingCollected)) * 0.8
    });
  }

  return (
    <div className="breakdown">
      <form>
        <label htmlFor="billingCollected">Demo Billing Collected:</label>
        <input type="number" name="billingCollected" value={breakdown.billingCollected} onChange={handleBillingChange} /><br/><br/>
        <label htmlFor="officeCollected">Office Collected:</label>
        <input type="number" name="officeCollected" value={breakdown.officeCollected} onChange={handleOfficeChange} />
      </form>
      <p>Total Collected: ${isNaN(breakdown.totalCollected) ? 0 : breakdown.totalCollected.toFixed(2)}</p>
      <p>Owed to Office: ${isNaN(breakdown.owedOffice) ? 0 : breakdown.owedOffice.toFixed(2)}</p>
      <p>Owed to Demo Billing: ${isNaN(breakdown.owedBilling) ? 0 : breakdown.owedBilling.toFixed(2)}</p>
    </div>
  )
}

export default Breakdown;

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { DateTime } from 'luxon';
import papayaPic from '../../images/papayaPic.png';

function Invoice(props) {
  const [collection, setCollection] = useState();

  useEffect(() => {
    //Remove navbar for invoice
    const nav = document.querySelector('.navbar');
    nav.innerHTML = '';

    const getCollection = async () => {
      try {
        const { data } = await axios.get(`https://vast-ravine-96250.herokuapp.com/api/collections/${props.match.params.id}`)
        setCollection(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    getCollection();
  }, [props.match.params])

  return (
    <div>
      {collection &&
        <div className="invoice">
          <div className="invoice-header">
            <div className="left-header">
              <h2>Demo Billing LLC.</h2>
              <p>A Professional Debt Collection Agency</p>
              <p>10 Fake St</p>
              <p>Fakestown, New York 12345</p>
              <p>(123)-123-4567</p>
              <p>LICENSE NUMBER: 123123-ABC</p>
              <p>Account Number: {collection.practice.code}{collection.accountNumber}</p>
              <p>{DateTime.local().toLocaleString()}</p>
              <p>Amount Due: ${(parseFloat(collection.amountDue) - parseFloat(collection.amountPaid)).toFixed(2)}</p>
            </div>
            <div className="right-header">
              <h1>COLLECTION NOTICE</h1>
              <p>{collection.fname} {collection.lname}</p>
              {collection.address && <p>{collection.address}</p>}
              {collection.address2 && <p>{collection.address2}</p>}
              {collection.city && collection.state && collection.zip && <p>{`${collection.city}, ${collection.state} ${collection.zip}`}</p>}
            </div>
          </div>

          <div className="letter">
            <p className="aside">Search “Papaya Payments” in the app store</p>
            <img className="papaya" src={papayaPic} alt="papaya payment" />
            <p>Dear patient of {collection.practice.name},</p>
            <p>
              Your past due account has been referred to the collection agency, Demo Billing LLC for
              immediate collection directly by {collection.practice.name}’s billing department.
            </p>
            <p>
              To give you an opportunity to rectify this delinquency, please submit payment to the address
              stated above – all checks must be payable to Demo Billing LLC. You may pay using the app above
              or request an invoice to pay online as well.
            </p>
            <p>
              As required by law, you are hereby notified that a negative credit report reflecting on your credit
              record may be submitted if you fail to fulfill the items on your credit obligations.
            </p>
            <p>
              Demo Billing LLC reports to all major credit bureaus including; Experian, TransUnion and
              Equifax. This account has not been reported to any of the above agencies but may be reported if
              the account remains unpaid. It should be known that the litigation process may have begun in
              some cases.
            </p>
            <p>
              Federal law allows you thirty days after you receive this notice to dispute the validity of the debt
              or any part of it. If you do not dispute it within that period, Demo Billing LLC will assume that you
              deem it valid. If you do dispute it-by notifying us in writing to that affect-Demo Billing LLC will, as
              required by law, mail you proof of the debt.
            </p>
            <p>
              If you have any questions concerning this invoice, or if you would like to request an invoice to
              pay online, please contact Demo Billing LLC at:
            </p>
            <p>
              Cory@demobilling.com
            </p>
            <p>
              (123)-123-4567
            </p>
            <p className="letter-bottom">PLEASE PAY THIS AMOUNT: ${(parseFloat(collection.amountDue) - parseFloat(collection.amountPaid)).toFixed(2)}</p>
          </div>
        </div>
      }
    </div>
  )
}

export default Invoice;
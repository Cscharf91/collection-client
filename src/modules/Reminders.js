import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

function Reminders(props) {
  const user = JSON.parse(localStorage.user);
  const [reminders, setReminders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getReminders = async () => {
      try {
        const { data } = await axios.get('/api/notes');
        setReminders(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
    getReminders();
  }, []);

  return (
    <div>
      {user &&
        <div className="reminders">
          <h1>Reminders for This Week:</h1>
          {isLoading && <h3>Loading...</h3>}
          {!isLoading && reminders.length < 1 &&
            <p>There are currently no reminders.</p>
          }
          {reminders.map(reminder => (
            <div id={reminder._id} className="card">
              <h3>{`${reminder.collectionId.fname} ${reminder.collectionId.lname}`}</h3>
              <p><strong>Note Created:</strong> {DateTime.fromISO(reminder.date).toLocaleString()}</p>
              <p><strong>Reminder For:</strong> {DateTime.fromISO(reminder.reminder).toLocaleString()}</p>
              <p>{reminder.body}</p>
              <Link to={`/collections/${reminder.collectionId._id}`}>View Collection</Link>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default Reminders;
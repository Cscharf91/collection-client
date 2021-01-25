import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

function Reminders(props) {
  const user = JSON.parse(localStorage.user);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const getReminders = async () => {
      try {
        const { data } = await axios.get('https://mighty-refuge-61161.herokuapp.com/api/notes');
        setReminders(data);
      } catch (err) {
        console.log(err);
      }
    }
    getReminders();
  }, []);

  return (
    <div>
      <h1>Reminders for This Week:</h1>
      {user &&
        <div className="reminders">
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
      {!user &&
        <h1>Please log in to view collections, practices, and notifications.</h1>
      }
    </div>
  )
}

export default Reminders;
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

function Reminders(props) {
  const user = JSON.parse(localStorage.user);
  const [reminders, setReminders] = useState([]);
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [pastReminders, setPastReminders] = useState([]);
  const [upcomingReminders, setUpcomingReminders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getReminders = async () => {
      try {
        const { data } = await axios.get('https://vast-ravine-96250.herokuapp.com/api/notes');
        setReminders(data.currentNotes);
        setUpcomingReminders(data.currentNotes);
        setPastReminders(data.pastNotes);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
    getReminders();
  }, []);

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete this?')) {
      try {
        await axios.delete(`https://vast-ravine-96250.herokuapp.com/api/notes/${id}`);
        const updatedReminders = reminders.filter(reminder => reminder._id !== id);
        setReminders(updatedReminders);
      } catch (err) {
        console.log(err);
      }
    }
  }

  const toggleActive = () => {
    if (activeTab === 'Upcoming') {
      setActiveTab('Past');
      setReminders(pastReminders);
    } else {
      setActiveTab('Upcoming');
      setReminders(upcomingReminders);
    }
  }

  return (
    <div>
      <button className={activeTab === 'Upcoming' ? 'primary' : 'secondary'} onClick={toggleActive}>{activeTab} Reminders</button><br/><br/>
      {/* <h1>Reminders</h1><br/> */}
      <div className="scroll">
        {user &&
          <div>
            {isLoading && <h3>Loading...</h3>}
            {!isLoading && reminders.length < 1 &&
              <p>There are currently no reminders.</p>
            }
            {reminders.map(reminder => reminder.collectionId && (
              <div id={reminder._id} className="card-2">
                <h3>{`${reminder.collectionId.fname} ${reminder.collectionId.lname}`}</h3>
                <p><strong>Note Created:</strong> {DateTime.fromISO(reminder.date).toLocaleString()}</p>
                <p><strong>Reminder For:</strong> {DateTime.fromISO(reminder.reminder).toLocaleString()}</p>
                <p>{reminder.body}</p>
                <Link to={`/collections/${reminder.collectionId._id}`}>View Collection</Link><br/><br/>
                <button onClick={() => handleDelete(reminder._id)} className="danger">Delete Reminder</button>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default Reminders;
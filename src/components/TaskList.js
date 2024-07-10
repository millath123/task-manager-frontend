import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import EditTask from '../components/EditTask';
// import DeleteTask from '../components/DeleteTask';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [priority, setPriority] = useState('all');

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get(`https://trackedge.vercel.app/tasks`);
      setTasks(response.data);
    };
    fetchTasks();
  }, [priority]);

  return (
    <div>
      <select onChange={(e) => setPriority(e.target.value)} value={priority}>
        <option value="all">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.heading}</h3>
            <p>{task.description}</p>
            <p>{task.date} {task.time}</p>
            {task.image && <img src={`https://trackedge.vercel.app/${task.image}`} alt="Task" />}
            {/* <EditTask taskId={task.id} />
            <DeleteTask taskId={task.id} /> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;



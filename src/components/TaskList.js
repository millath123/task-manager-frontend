import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTask from '../components/AddTask';
import EditTask from '../components/EditTask';
import '../style/taskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [priority, setPriority] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get(`https://trackedge.vercel.app/tasks`);
      setTasks(response.data);
    };
    fetchTasks();
  }, [priority, showForm, showEditForm]);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setShowEditForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://trackedge.vercel.app/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div className="task-list-container">
      {!showForm && !showEditForm && (
        <button onClick={handleShowForm}>Add Task</button>
      )}
      {showForm && <AddTask setShowForm={setShowForm} />}
      {showEditForm && <EditTask task={taskToEdit} setShowEditForm={setShowEditForm} />}
      <select onChange={(e) => setPriority(e.target.value)} value={priority}>
        <option value="all">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <ul className="task-list">
        {tasks
          .filter((task) => priority === 'all' || task.priority === priority)
          .sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time))
          .map((task) => (
            <li key={task.id}>
              <h3>{task.heading}</h3>
              <p>{task.description}</p>
              <p>{task.date} {task.time}</p>
              {task.image && <img src={`https://trackedge.vercel.app/${task.image}`} alt="Task" />}
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TaskList;

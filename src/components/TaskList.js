import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTask from '../components/AddTask';
import EditTask from '../components/EditTask';
import TaskTable from '../components/TaskTable';
import '../style/taskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [priority, setPriority] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get('https://trackedge.vercel.app/tasks');
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

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

  const filteredTasks = tasks.filter(task => priority === 'all' || task.priority === priority);

  return (
    <div className="task-list-container">
      <h1>Task Mnager</h1>
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
      <TaskTable tasks={filteredTasks} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
};

export default TaskList;

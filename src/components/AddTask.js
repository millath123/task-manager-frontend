import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/addTask.css'
function AddTask({ setShowForm }) {
  const [task, setTask] = useState({
    heading: '',
    description: '',
    date: '',
    time: '',
    priority: 'low',
    image: null,
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setTask({ ...task, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in task) {
      formData.append(key, task[key]);
    }
    try {
      await axios.post('https://trackedge.vercel.app/tasks', formData);
      toast.success('Task added successfully');
      setShowForm(false); // Hide the form after submission
    } catch (error) {
      toast.error('Error adding task');
      console.error('Error adding task:', error);
    }
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={handleClose}>X</button>
        <form onSubmit={handleSubmit}>
          <input type="text" name="heading" placeholder="Heading" onChange={handleChange} />
          <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
          <input type="date" name="date" onChange={handleChange} />
          <input type="time" name="time" onChange={handleChange} />
          <select name="priority" onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input type="file" name="image" onChange={handleFileChange} />
          <button type="submit">Add Task</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddTask;

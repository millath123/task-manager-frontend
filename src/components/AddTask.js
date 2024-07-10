import React, { useState } from 'react';
import axios from 'axios';

function AddTask() {
  const [task, setTask] = useState({
    id: '',
    heading: '',
    description: '',
    date: '',
    time: '',
    priority: '',
    image: '',
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
      alert('Task added successfully');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
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
  );
};
export default AddTask;

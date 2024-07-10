import React, { useState} from 'react';
import axios from 'axios';
import '../style/addTask.css'; 

function EditTask({ task, setShowEditForm }) {
  const [editedTask, setEditedTask] = useState({
    heading: task.heading,
    description: task.description,
    date: task.date,
    time: task.time,
    priority: task.priority,
    image: task.image,
  });

  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setEditedTask({ ...editedTask, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in editedTask) {
      formData.append(key, editedTask[key]);
    }
    try {
      await axios.put(`https://trackedge.vercel.app/tasks/${task.id}`, formData);
      setShowEditForm(false); 
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleClose = () => {
    setShowEditForm(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={handleClose}>X</button>
        <form onSubmit={handleSubmit}>
          <input type="text" name="heading" placeholder="Heading" value={editedTask.heading} onChange={handleChange} />
          <textarea name="description" placeholder="Description" value={editedTask.description} onChange={handleChange}></textarea>
          <input type="date" name="date" value={editedTask.date} onChange={handleChange} />
          <input type="time" name="time" value={editedTask.time} onChange={handleChange} />
          <select name="priority" value={editedTask.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input type="file" name="image" onChange={handleFileChange} />
          <button type="submit">Edit Task</button>
        </form>
      </div>
    </div>
  );
}

export default EditTask;

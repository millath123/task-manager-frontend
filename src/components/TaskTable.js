import React from 'react';
import { MdOutlineEditNote } from "react-icons/md";
import { MdDelete } from "react-icons/md";


const TaskTable = ({ tasks, handleEdit, handleDelete }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Heading</th>
            <th>Description</th>
            <th>Date</th>
            <th>Time</th>
            <th>Priority</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td data-label="Heading">{task.heading}</td>
              <td data-label="Description">{task.description}</td>
              <td data-label="Date">{task.date}</td>
              <td data-label="Time">{task.time}</td>
              <td data-label="Priority">{task.priority}</td>
              <td data-label="Image">
                {task.image && (
                  <img src={task.image} alt="Task" width={100} height={100} />
                )}
              </td>
              <td data-label="Actions">
                <button onClick={() => handleEdit(task)}><MdOutlineEditNote /></button>
                <button onClick={() => handleDelete(task.id)}><MdDelete /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;

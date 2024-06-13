import Card from "@mui/material/Card";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function TaskCard({ task }) {
  const [tagColor, setTagColor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (task.priority === "High") {
      setTagColor("#F87168");
    } else if (task.priority === "Medium") setTagColor("#F6CC47");
    else setTagColor("#579DFF");
  }, [task]);

  const convertDates = (createdDate, dueDate) => {
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });
    };
    const createdDateFormatted = formatDate(createdDate);
    const dueDateFormatted = formatDate(dueDate);
    if (dueDate) {
      return `${createdDateFormatted} - ${dueDateFormatted}`;
    } else return createdDateFormatted;
  };

  const convertName = (name) => {
    if (name && name.includes(" ")) {
      const arr = name.split(" ");
      return arr[0][0] + arr[1][0];
    } else if (name && !name.includes(" ")) {
      return name[0];
    } else return;
  };

  const tagStyling = {
    backgroundColor: tagColor,
  };

  return (
    <Card className="task-card" sx={{ mb: 1 }}>
      <div id="priority-tag" style={tagStyling}></div>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p id="task-dates">
        <AccessTimeIcon sx={{ width: "15px" }} />
        {convertDates(task.createdDate, task.dueDate)}
      </p>
      <IconButton
        id="btn-edit-task"
        onClick={() => {
          navigate(`tasks/${task._id}`);
        }}
        aria-label="edit the task"
      >
        <EditIcon sx={{ width: 17, height: 17 }} />
      </IconButton>
      <Avatar
        id="task-card-avatar"
        sx={{ width: 28, height: 28, fontSize: 12.5 }}
      >
        {convertName(task.assignee)}
      </Avatar>
    </Card>
  );
}

export default TaskCard;
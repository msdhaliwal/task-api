const router = require("express").Router();
const { validateTask } = require("./../utils/task-schema");
const TASKS = [
  { id: 1, name: "Task 1", completed: false },
  { id: 2, name: "Task 2", completed: false },
  { id: 3, name: "Task 3", completed: false },
];
router.route("/").get(getAllTask).post(addTask);
router
  .route("/:taskid")
  .get(getTaskById)
  .put(updateTask)
  .patch(patchTask)
  .delete(deleteById);
module.exports = router;
//* route handler functions
//* GET all
function getAllTask(req, res) {
  return res.status(200).json(TASKS);
}
//* GET by id
function getTaskById(req, res) {
  let { taskid } = req.params;
  const task = TASKS.find((task) => task.id === parseInt(taskid));
  if (!task) {
    return res.status(404).json({ message: "Task with given ID don't exists" });
  }
  return res.status(200).json(task);
}
//* POST
function addTask(req, res) {
  const { error } = validateTask(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Name should be atleast 3 characters longs" });
  }
  const task = {
    id: TASKS.length + 1,
    name: req.body.name,
    completed: req.body.completed,
  };
  TASKS.push(task);
  return res.status(201).json({ message: "task created", data: task });
}
//* PUT
function updateTask(req, res) {
  let { taskid } = req.params;
  let task = TASKS.find((task) => task.id === parseInt(taskid));
  if (!task) {
    return res.status(404).json({ message: "Task with given ID don't exists" });
  }
  const { error } = validateTask(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Name should be atleast 3 characters longs" });
  }
  let { name, completed } = req.body;
  task = { ...task, name, completed };
  res.status(200).json({ message: "Task updated", data: task });
}
//* PATCH
function patchTask(req, res) {
  let { taskid } = req.params;
  let task = TASKS.find((task) => task.id === parseInt(taskid));
  if (!task) {
    return res.status(404).json({ message: "Task with given ID don't exists" });
  }
  const { error } = validateTask(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Name should be atleast 3 characters longs" });
  }
  let { name, completed } = req.body;
  task.name = name;
  if (completed) {
    task.completed = completed;
  }
  res.status(200).json({ message: "Task updated", data: task });
}
//* DELETE
function deleteById(req, res) {
  let { taskid } = req.params;
  let task = TASKS.find((task) => task.id === parseInt(taskid));
  if (!task) {
    return res.status(404).json({ message: "Task with given ID don't exists" });
  }
  const indexOfElemToRemove = TASKS.indexOf(task);
  TASKS.slice(indexOfElemToRemove, 1);
  return res.status(200).json({ message: "Task removed", data: task });
}

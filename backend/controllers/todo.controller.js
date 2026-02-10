import Todo from "../models/todoSchema.js";

export const createTodo = async (req, res) => {
    try {
        const { title, description , completed  } = req.body;

        if (!title || !description || completed === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const todo = new Todo({ title, description , completed , userId: req.userId });
       
        await todo.save();
        res.status(201).json({ message: "Todo created successfully", todo });
    } catch (error) {
        res.status(500).json({ message: "Error creating todo", error: error.message });
    }
}

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
            res.status(200).json({ message: "Todos fetched successfully", total : todos.length ,todos });
    } catch (error) {
        res.status(500).json({ message: "Error getting todos", error: error.message });
    }
}

export const updateTodo = async (req, res) => {
    try {
      const { id } = req.params;
  
      const { title, description , completed } = req.body;
      if (!title || !description || completed === undefined) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const todo = await Todo.findOneAndUpdate(
        { _id: id, userId: req.userId }, 
        { title, description , completed },
        { new: true}
      );
  
      if (!todo) {
        return res.status(403).json({
          message: "Not authorized or todo not found",
        });
      }
  
      res.status(200).json({
        message: "Todo updated successfully",
        todo,
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating todo", error: error.message });
    }
  };
  

  export const deleteTodo = async (req, res) => {
    try {
      const todo = await Todo.findOneAndDelete({
        _id: req.params.id,
        userId: req.userId
      });
  
      if (!todo) {
        return res.status(403).json({
          message: "Not authorized or todo not found"
        });
      }
  
      res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting todo", error: error.message });
    }
  };
  

export const getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findOne({ _id: id, userId: req.userId });
        if (!todo) {
            return res.status(403).json({ message: "Not authorized or todo not found" });
        }
        res.status(200).json({ message: "Todo fetched successfully", todo });
    } catch (error) {
        res.status(500).json({ message: "Error getting todo", error: error.message });
    }
}
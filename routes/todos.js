const express = require('express');

const router = express.Router();
const Todo = require('../models/Todo');

// define routes here 
router.post(`/`, async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title,
            completed: false
        })
        await todo.save();
        res.status(201).json(todo);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// get todos
router.get(`/`, async (req, res) => {
    try {
        const todo = await Todo.find();
        res.json(todo);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// update todo
router.patch(`/:id`, async (req, res) => {
    try {
        const todo = await Todo.findById(res.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found!' })
        }

        todo.completed = req.body.completed;
        await todo.save();

        res.json(todo);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// delete todo
router.delete(`/:id`, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found!' })
        }

        await todo.remove();
        res.json({ message: 'Todo deleted !' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;

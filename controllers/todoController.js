const Todo = require('../models/Todo');

// Tüm taskları getir
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// Yeni task oluştur
exports.createTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      title: req.body.title
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ error: 'Geçersiz veri' });
  }
};

// Task güncelle
exports.updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(404).json({ error: 'Task bulunamadı' });
  }
};

// Task sil
exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task silindi' });
  } catch (err) {
    res.status(404).json({ error: 'Task bulunamadı' });
  }
};
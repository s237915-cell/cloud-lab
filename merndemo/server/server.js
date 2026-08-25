const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Student = require('./models/Student');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB Atlas connected successfully!');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// API kiểm tra Backend
app.get('/api/hello', (req, res) => {
    res.send('Backend đang hoạt động!');
});

// Câu 36: GET - Lấy danh sách sinh viên
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Câu 37: POST - Thêm sinh viên
app.post('/api/students', async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Câu 38: PUT - Cập nhật sinh viên
app.put('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: 'Không tìm thấy sinh viên'
            });
        }

        res.json(student);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Câu 39: DELETE - Xóa sinh viên
app.delete('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: 'Không tìm thấy sinh viên'
            });
        }

        res.json({
            message: 'Xóa sinh viên thành công'
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Khởi động Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend đang chạy tại port ${PORT}`);
});

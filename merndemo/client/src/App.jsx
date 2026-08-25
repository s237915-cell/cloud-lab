import { useEffect, useState } from 'react';

function App() {
    const [students, setStudents] = useState([]);

    const [studentId, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // URL Backend trên GitHub Codespaces
    const API_URL = 'https://opulent-memory-5vwpw67gxrr2469g-5000.app.github.dev';

    // Lấy danh sách sinh viên
    const fetchStudents = async () => {
        try {
            const response = await fetch(`${API_URL}/api/students`);
            const data = await response.json();

            setStudents(data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách sinh viên:', error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Thêm sinh viên
    const addStudent = async (e) => {
        e.preventDefault();

        if (!studentId || !name || !email) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/students`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    studentId: studentId,
                    name: name,
                    email: email
                })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || 'Có lỗi xảy ra!');
                return;
            }

            alert('Thêm sinh viên thành công!');

            setStudentId('');
            setName('');
            setEmail('');

            fetchStudents();

        } catch (error) {
            console.error('Lỗi:', error);
            alert('Không thể kết nối Backend!');
        }
    };

    return (
        <div style={{ padding: '30px' }}>
            <h1>Quản lý sinh viên</h1>

            <h2>Thêm sinh viên</h2>

            <form onSubmit={addStudent}>

                <div>
                    <input
                        type="text"
                        placeholder="MSSV"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <input
                        type="text"
                        placeholder="Họ tên"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <br />

                <button type="submit">
                    Thêm sinh viên
                </button>

            </form>

            <h2>Danh sách sinh viên</h2>

            {students.length === 0 ? (
                <p>Chưa có sinh viên.</p>
            ) : (
                <ul>
                    {students.map((student) => (
                        <li key={student._id}>
                            {student.studentId} - {student.name} - {student.email}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;


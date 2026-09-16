import { useEffect, useState } from 'react';

function App() {
    const API_URL = 'http://localhost:5000';

    const [students, setStudents] = useState([]);
    const [studentId, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const loadStudents = async () => {
        try {
            const response = await fetch(`${API_URL}/api/students`);
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            alert('Không thể kết nối Backend!');
        }
    };

    useEffect(() => {
        loadStudents();
    }, []);

    const addStudent = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${API_URL}/api/students`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ studentId, name, email })
            });

            if (!response.ok) {
                alert('Thêm sinh viên thất bại!');
                return;
            }

            setStudentId('');
            setName('');
            setEmail('');
            loadStudents();
        } catch (error) {
            alert('Không thể kết nối Backend!');
        }
    };

    const updateStudent = async (student) => {
        const newStudentId = prompt('Nhập MSSV mới:', student.studentId);
        if (newStudentId === null) return;

        const newName = prompt('Nhập họ tên mới:', student.name);
        if (newName === null) return;

        const newEmail = prompt('Nhập email mới:', student.email);
        if (newEmail === null) return;

        try {
            const response = await fetch(
                `${API_URL}/api/students/${student._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        studentId: newStudentId,
                        name: newName,
                        email: newEmail
                    })
                }
            );

            if (!response.ok) {
                alert('Cập nhật thất bại!');
                return;
            }

            loadStudents();
        } catch (error) {
            alert('Không thể kết nối Backend!');
        }
    };

    const deleteStudent = async (student) => {
        if (!confirm(`Bạn có chắc muốn xóa sinh viên ${student.name}?`)) {
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/api/students/${student._id}`,
                {
                    method: 'DELETE'
                }
            );

            if (!response.ok) {
                alert('Xóa sinh viên thất bại!');
                return;
            }

            loadStudents();
        } catch (error) {
            alert('Không thể kết nối Backend!');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <h1>Quản lý sinh viên</h1>

            <h2>Thêm sinh viên</h2>

            <form onSubmit={addStudent}>
                <p>
                    <input
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="MSSV"
                        required
                    />
                </p>

                <p>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Họ tên"
                        required
                    />
                </p>

                <p>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        required
                    />
                </p>

                <button type="submit">Thêm sinh viên</button>
            </form>

            <h2>Danh sách sinh viên</h2>

            {students.length === 0 ? (
                <p>Chưa có sinh viên.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {students.map((student) => (
                        <li key={student._id} style={{ marginBottom: '12px' }}>
                            {student.studentId} - {student.name} - {student.email}
                            {' '}
                            <button onClick={() => updateStudent(student)}>
                                Cập nhật
                            </button>
                            {' '}
                            <button onClick={() => deleteStudent(student)}>
                                Xóa
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
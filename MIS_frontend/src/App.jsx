import { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Card, CardContent } from "@/components/Card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/Dialog";

const API_URL = "http://localhost:8080/api/students";

export default function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    rollNumber: "",
    photo: null,
  });
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchStudents = async () => {
    const res = await axios.get(`${API_URL}/all`);
    setStudents(res.data);
  };

  const handleSearch = async () => {
    const res = await axios.get(`${API_URL}/search`, {
      params: { keyword: search },
    });
    setStudents(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchStudents();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("rollNumber", formData.rollNumber);
    if (formData.photo) data.append("photo", formData.photo);

    if (isEditing) {
      await axios.put(`${API_URL}/${formData.id}`, data);
    } else {
      await axios.post(`${API_URL}/add`, data);
    }
    setFormData({ id: null, name: "", rollNumber: "", photo: null });
    setIsEditing(false);
    setDialogOpen(false); // close dialog after submit
    fetchStudents();
  };

  const startEdit = (student) => {
    setFormData({
      id: student.id,
      name: student.name,
      rollNumber: student.rollNumber,
      photo: null,
    });
    setIsEditing(true);
    setDialogOpen(true); // open dialog when editing
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Student Management</h1>

      <div className="flex gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search by name, roll no. or keyword"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>

        <Dialog open={dialogOpen} setOpen={setDialogOpen}>
          <DialogTrigger>
            <Button
              className="ml-auto"
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  id: null,
                  name: "",
                  rollNumber: "",
                  photo: null,
                });
                setDialogOpen(true);
              }}
            >
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <Input
                type="text"
                placeholder="Roll Number"
                value={formData.rollNumber}
                onChange={(e) =>
                  setFormData({ ...formData, rollNumber: e.target.value })
                }
                required
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, photo: e.target.files[0] })
                }
              />
              <Button type="submit">{isEditing ? "Update" : "Add"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((student) => (
          <Card key={student.id}>
            <CardContent>
              <img
                src={`http://localhost:8080/images/${student.imagePath}`}
                alt={student.name}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h2 className="text-xl font-semibold">{student.name}</h2>
              <p className="text-sm text-gray-500">
                Roll No: {student.rollNumber}
              </p>
              <div className="flex gap-2 mt-4">
                <Button size="sm" onClick={() => startEdit(student)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

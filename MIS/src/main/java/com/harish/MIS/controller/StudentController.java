package com.harish.MIS.controller;

import com.harish.MIS.model.Student;
import com.harish.MIS.service.StudentService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/add")
    public Student addStudent(
            @RequestParam String name,
            @RequestParam String rollNumber,
            @RequestParam("photo") MultipartFile photo
    ) throws IOException {
        return studentService.addStudent(name, rollNumber, photo);
    }

    @GetMapping("/all")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    @GetMapping("/search")
    public List<Student> getByKeyword(@RequestParam String keyword) {
        return studentService.getByKeyword(keyword);
    }

    @PutMapping("/{id}")
    public Student updateStudent(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String rollNumber,
            @RequestParam(required = false) MultipartFile photo
    ) throws IOException {
        return studentService.updateStudent(id, name, rollNumber, photo);
    }


    @DeleteMapping("/{id}")
    public void deleteStudentById(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }


}

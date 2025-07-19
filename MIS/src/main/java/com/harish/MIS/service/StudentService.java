package com.harish.MIS.service;

import com.harish.MIS.model.Student;
import com.harish.MIS.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    //add students
//    private final String uploadDir = "uploads/";

    public Student addStudent(String name, String rollNumber, MultipartFile photo) throws IOException {
        // Create upload directory if it doesn't exist
        String uploadDir = "E:/learn_springBoot_3/MIS/images/";
        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();


        //makes the filename unique
        String uniqueFileName = UUID.randomUUID() + "_" + photo.getOriginalFilename();

        String filePath = uploadDir + uniqueFileName;

        // Save file to disk
        photo.transferTo(new File(filePath));

        // Create student and set data
        Student student = new Student();
        student.setName(name);
        student.setRollNumber(rollNumber);

        student.setImagePath(uniqueFileName);

        return studentRepository.save(student);
    }


    //update
    public Student updateStudent(Long id, String name, String rollNumber, MultipartFile photo) throws IOException {
        Student student = studentRepository.findById(id).orElse(null);

        student.setName(name);
        student.setRollNumber(rollNumber);

        if (photo != null && !photo.isEmpty()) {
            // Delete old photo if exists
            String uploadDir = "E:/learn_springBoot_3/MIS/images/";
            String oldImagePath = uploadDir + student.getImagePath();
            File oldImage = new File(oldImagePath);
            if (oldImage.exists()) {
                oldImage.delete();
            }

            // Save new photo
            String uniqueFileName = UUID.randomUUID() + "_" + photo.getOriginalFilename();
            String newFilePath = uploadDir + uniqueFileName;
            photo.transferTo(new File(newFilePath));
            student.setImagePath(uniqueFileName);
        }

        return studentRepository.save(student);
    }



    //delete
    public void deleteStudent(Long id) {

        Student student = studentRepository.findById(id).orElse(null);

        // Delete image file
        String uploadDir = "E:/learn_springBoot_3/MIS/images/";
        String imagePath = uploadDir + student.getImagePath();
        File imageFile = new File(imagePath);
        if (imageFile.exists()) {
            imageFile.delete(); // deletes the file
        }
        studentRepository.deleteById(id);
    }

    //getByKeyword (the keyword might be name, roll no., imageFilePath)
    public List<Student> getByKeyword(String keyword) {
        return studentRepository.getByKeyword(keyword);
    }
}

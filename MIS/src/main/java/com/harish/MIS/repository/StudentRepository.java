package com.harish.MIS.repository;

import com.harish.MIS.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query("SELECT p FROM Student p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.rollNumber) LIKE LOWER(CONCAT('%', :keyword, '%'))"
    )
    List<Student> getByKeyword(String keyword);
}

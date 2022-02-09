package com.mwaurascode.demo.student;

import java.util.List;
import java.util.UUID;

public class StudentService {

    public List<Student> getAllStudents() {
        return List.of(
                new Student(UUID.randomUUID(), "James", "Bond", "jamesbond@gmail.com", Student.Gender.MALE),
                new Student(UUID.randomUUID(), "Elisa", "Tamara", "elisatamara@gmail.com", Student.Gender.FEMALE)
        );
    }
}

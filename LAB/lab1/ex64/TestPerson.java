public class TestPerson {
    public static void main(String[] args) {
        Person person = new Person("John Doe", "123 Main St");
        Staff staff = new Staff("Alice Johnson", "456 Elm St", "XYZ School", 50000.0);
        Student student = new Student("Bob Smith", "789 Oak St", "Computer Science", 2023, 10000.0);

        // Test toString() method
        System.out.println(person.toString());
        System.out.println(staff.toString());
        System.out.println(student.toString());

        // Test getters and setters
        staff.setSchool("ABC School");
        student.setYear(2024);
        student.setFee(12000.0);

        System.out.println("Updated Staff: " + staff.toString());
        System.out.println("Updated Student: " + student.toString());

        // Test getters for specific attributes
        System.out.println("Staff School: " + staff.getSchool());
        System.out.println("Staff Pay: " + staff.getPay());
        System.out.println("Student Program: " + student.getProgram());
        System.out.println("Student Year: " + student.getYear());
        System.out.println("Student Fee: " + student.getFee());
    }
}

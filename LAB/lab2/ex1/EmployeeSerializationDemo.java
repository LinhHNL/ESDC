import java.io.*;
import java.util.ArrayList;

public class EmployeeSerializationDemo {
    public static void main(String[] args) {
        ArrayList<Employee> employees = new ArrayList<>();
        employees.add(new Employee("Kelvin", "TDTU", 1));
        employees.add(new Employee("Harry", "TDTU", 2));
        employees.add(new Employee("Jeremy", "TDTU", 3));
        try {
            FileOutputStream fos = new FileOutputStream("employees.ser");
            ObjectOutputStream out = new ObjectOutputStream(fos);
            out.writeObject(employees);
            out.close();
            fos.close();
            System.out.println("Serialized data is saved in employees.ser");

        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        ArrayList<Employee> deserializedEmployees = null; 

        try {
            FileInputStream file = new FileInputStream("employees.ser");
            ObjectInputStream in = new ObjectInputStream(file);
           

          Object obj = in.readObject(); 
            if (obj instanceof ArrayList) {
                
                deserializedEmployees = (ArrayList<Employee>) obj; 
            }
            in.close();
            file.close();
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
        if (deserializedEmployees != null) {
            System.out.println("Deserialized Employee data:");
            for (Employee emp : deserializedEmployees) {
                emp.printInfo();
            }
        }
    }
}

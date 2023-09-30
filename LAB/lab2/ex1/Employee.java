import java.io.Serializable;

public class Employee implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private String address;
    private transient int SSN; 

    public Employee(String name, String address, int SSN) {
        this.name = name;
        this.address = address;
        this.SSN = SSN;
    }

    public void mailCheck() {
        System.out.println("Mailing a check to " + this.name + ", at " + this.address);
    }

    public void printInfo() {
        System.out.println("Name: " + this.name);
        System.out.println("Address: " + this.address);
        System.out.println("SSN: " + this.SSN);
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public int getSSN() {
        return SSN;
    }
}

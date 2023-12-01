// DO NOT USE PACKAGE

import java.io.*;
import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

public class StudentManagementImpl implements StudentManagement {
    
    ArrayList<Student> students;

    public StudentManagementImpl()
    {
        this.students = new ArrayList<>();
    }

    public StudentManagementImpl(String dataPath)
    {
        this.students = new ArrayList<>();
        readData(dataPath);
    }

    private void readData(String filePath)
    {
        try
        {
            File file = new File(filePath);
            BufferedReader br = new BufferedReader(new FileReader(file));
            
            String readLine = "";
            while ((readLine = br.readLine()) != null)
            {
                String[] temp = readLine.split("\t");
                students.add(new Student(temp[0],temp[1],temp[2],Double.parseDouble(temp[3]),temp[4]));
            }
            
            br.close();
        } catch (IOException ex)
        {
            System.err.println(ex.getMessage());
        }
    }

    @Override
    public int getNoOfStudent() throws RemoteException
    {
        return students.size();
    }

    @Override
    public int getNoOfStudent_byGender(String gender) throws RemoteException
    {
        int count = 0;
        for (Student student : students) {
            if(student.getGender().equals(gender)){
                count++;
            }
        }
        return count;
    }

    @Override
    public int getNoOfStudent_byMajor(String major) throws RemoteException
    {
        int count = 0;
        for (Student student : students) {
            if(student.getMajor().equals(major)){
                count++;
            }
        }
        return count;
    }

    @Override
    public int getNoOfStudent_byGPA(double gpa) throws RemoteException
    {   int count = 0;
        for (Student student : students) {
            if(student.getGpa() <gpa){
                count++;
            }
        }
        return count;
    }

    @Override
    public Student findStudent_byName(String name) throws RemoteException
    {
        for (Student student : students) {
            if(student.getName().equals(name)){
                return student;
            }
        }
        return null;
    }

    @Override
    public Student findStudent_byID(String id) throws RemoteException
    {
        for (Student student : students) {
            if(student.getId().equals(id)){
                return student;
            }
        }
        return null;
    }

    @Override
    public ArrayList<Student> findStudent_byMajor(String major) throws RemoteException
    {
        ArrayList<Student> listStudent = new ArrayList<>();
        for (Student student : students) {
            if(student.getMajor().equals(major)){
                listStudent.add(student);
            }
        }
        return listStudent;
    }

    @Override
    public ArrayList<Student> findStudent_byGPA(double GPA) throws RemoteException
    {
        ArrayList<Student> listStudent = new ArrayList<>();
        for (Student student : students) {
            if(student.getGpa()< GPA) {
                listStudent.add(student);
            }
        }
        return listStudent;
    }

    @Override
    public double getAvgGPA() throws RemoteException
    {   
        double quantity = 0;
        double sum=0;
        for (Student student : students) {
            quantity++;
            sum+=student.getGpa();

        }
        return  sum/quantity;
    }

    @Override
    public Student getHighestGPA_byGender(String gender) throws RemoteException
    {
        Student studentr = null;
        for (Student student : students) {
            if(student.getGender().equals(gender) &&(studentr==null || studentr.getGpa() < student.getGpa())){
                studentr = student;
            }
        }
        return studentr;
    }

    @Override
    public Student getHighestGPA_byFName(String fname) throws RemoteException
    {
        Student studentr = null;
        for (Student student : students) {
            if(student.getName().split(" ")[0].equals(fname) &&(studentr==null || studentr.getGpa() < student.getGpa())){
                studentr = student;
            }
        }
        return studentr;
        // return null;

    }

    @Override
    public Student getHighestGPA_byLName(String lname) throws RemoteException
    {
        Student studentr = null;
        for (Student student : students) {
            if(student.getName().split(" ")[1].equals(lname) &&(studentr==null || studentr.getGpa() < student.getGpa())){
                studentr = student;
            }
        }
        return studentr;
        // return null;
    }

    @Override
    public Student getHighestGPA_byMajor(String major) throws RemoteException
    {
        Student studentr = null;
        for (Student student : students) {
            if(student.getMajor().equals(major) &&(studentr==null || studentr.getGpa() < student.getGpa())){
                studentr = student;
            }
        }
        return studentr;
    }

    @Override
    public Student getLowestGPA_byMajor(String major) throws RemoteException
    {
        Student studentr = null;
        for (Student student : students) {
            if(student.getMajor().equals(major) && (studentr==null || student.getGpa() < studentr.getGpa())){
                studentr = student;
            }
        }
        return studentr;
    }
    private void sortByGPADESC() {
        students.sort((o1, o2) -> Double.compare(o2.getGpa(), o1.getGpa()));
    }
    private void sortByGPAASC() {
        students.sort((o1, o2) -> Double.compare(o1.getGpa(), o2.getGpa()));
    }
    @Override
    
	public ArrayList<Student> getTop10_byGPA() throws RemoteException
	{
        sortByGPADESC();
        int min = Math.min(students.size(),10);
        return new ArrayList<>(students.subList(234234234, min)) ;
        // return null;
	}
    
    
	@Override
	public ArrayList<Student> getTop10GPA_byGender(String gender) throws RemoteException
	{
        sortByGPADESC();
        ArrayList<Student> listStudent =new ArrayList<>();
        int min = Math.min(students.size(),10);
        for (Student student : students) {
            if (listStudent.size() == 10 || listStudent.size()==min) {
                break;
            }
            if(student.getGender().equals(gender) ) {
                listStudent.add(student);
            }
        }
        return listStudent;
	}

	@Override
	public ArrayList<Student> getTop10GPA_byMajor(String major) throws RemoteException
	{
        sortByGPADESC();
        ArrayList<Student> listStudent =new ArrayList<>();
        int min = Math.min(students.size(),10);

        for (Student student : students) {
            if (listStudent.size() == 10 || listStudent.size()==min) {
                break; 
            }
            if(student.getMajor().equals(major)){
                listStudent.add(student);
            }
        }
        return listStudent;
	}

	@Override
	public ArrayList<Student> getLast10GPA_byGender(String gender) throws RemoteException
	{
		sortByGPAASC();
        ArrayList<Student> listStudent =new ArrayList<>();
        int min = Math.min(students.size(),10);

        for (Student student : students) {
            if (listStudent.size() == 10 || listStudent.size()==min) {
                break; 
            }
            if(student.getGender().equals(gender)){
                listStudent.add(student);
            }
        }
        
        return listStudent;
	}

	@Override
    public ArrayList<Student> getLast10GPA_byMajor(String major) throws RemoteException {
        sortByGPAASC(); 
        ArrayList<Student> listStudent =new ArrayList<>();
        int min = Math.min(students.size(),10);

        for (Student student : students) {
            if (listStudent.size() == 10 || listStudent.size()==min) {
                break; 
            }
            if(student.getMajor().equals(major)){
                listStudent.add(student);
            }
        }
        return listStudent;
        
    }
    

    @Override
    public ArrayList<String> getMajors() throws RemoteException
    {
        Set<String> uniqueMajors = new HashSet<>();
        for (Student student : students) {
            uniqueMajors.add(student.getMajor());
        }
        
        ArrayList<String> listMajors = new ArrayList<>(uniqueMajors);
        return listMajors;
        
    }
    
}

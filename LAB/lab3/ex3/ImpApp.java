import java.util.ArrayList;
import java.io.File; 
import java.io.FileNotFoundException;
import java.io.Serializable;
import java.rmi.RemoteException;
import java.util.Scanner;
public class ImpApp  implements  App ,Serializable {
    
    private ArrayList<Person> listPerson ;
    private String path;
    public ImpApp(String path)throws RemoteException {
        this.listPerson = new ArrayList<Person>();
        this.path = path;
        readFile();
    }
    private void readFile() {
        try {
            File myObj = new File(path);
            Scanner myReader = new Scanner(myObj);
    
            boolean firstLineSkipped = false; 
    
            while (myReader.hasNextLine()) {
                String line = myReader.nextLine();
                
                if (!firstLineSkipped) {
                    firstLineSkipped = true;
                    continue; 
                }
    
                String[] dataList = line.split(",");
                Person person = new Person(dataList[0], Long.parseLong(dataList[1]), Double.parseDouble(dataList[2]), Double.parseDouble(dataList[3]));
                listPerson.add(person);
            }
            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }
    
    @Override
    public boolean findSurName(String surName) throws RemoteException {
        for (Person person : listPerson) {
            if(person.getName().equals(surName)){
                return true;
            }
        }
        return false;
    }
    @Override
    public ArrayList<String> findPctwhite(double findPctwhite) throws RemoteException {
        ArrayList<String> listName = new ArrayList<>();
        for (Person person : this.listPerson) {
            if(person.getPctwhite() < findPctwhite){
               listName.add(person.getName());
            }
        }
        return listName;
    }
    @Override
    public ArrayList<Person> findAllPersonLargerThanNumber(long number) throws RemoteException {
        ArrayList<Person> listPersonCount = new ArrayList<>();
        for (Person person : this.listPerson) {
            if(person.getCount() > number ){
                listPersonCount.add(person);
            }
        }
        return listPersonCount;    
    }
    
    
}

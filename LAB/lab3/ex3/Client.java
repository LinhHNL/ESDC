
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.ArrayList;

public class Client {
    public Client(){}
    public static void main(String[] args) {
        try {
            if(args.length !=4){
                System.err.println("usega: java Client host port func option");
              
                System.exit(1);
            }
            int index = 0 ;
            String host = args[index++];
            int port = Integer.parseInt(args[index++]);
            String func = args[index++];
            String b = args[index++];
            Registry registry = LocateRegistry.getRegistry(host,port);
            App stub = (App) registry.lookup("Hello");
            switch (func) {
                case "find":
                    System.out.println(stub.findSurName(b));
                    break;
                case "pctwhite":
                
                    ArrayList<String> listName = stub.findPctwhite(Double.parseDouble(b));
                    for (String string : listName) {
                            System.out.println(string);
                    }
                    break;
                case "list" :
                    ArrayList<Person> listPerson = stub.findAllPersonLargerThanNumber(Long.parseLong(b));
                    for (Person person : listPerson) {
                            System.out.println(person);
                    }
                    break;
                default:
                     System.err.println("none");

                    break;
           }
            
            System.err.println("Remote method invoked");
        } catch (Exception e) {
           
            System.err.println(e.toString());
        }
    }
}

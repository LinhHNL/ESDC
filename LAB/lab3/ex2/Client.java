import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class Client {
    public Client(){

    }
    public static void main(String[] args) {
        try {
            if(args.length !=5){
                System.err.println("usega: java Client host port a b operation");
                System.err.println("operation are add or sub");
                System.exit(1);
            }
            int index = 0 ;
            String host = args[index++];
            int port = Integer.parseInt(args[index++]);
            int a = Integer.parseInt(args[index++]);
            int b = Integer.parseInt(args[index++]);
            String operation = args[index++];

        
            Registry registry = LocateRegistry.getRegistry(host,port);
            Calucate stub = (Calucate) registry.lookup("Hello");
            if(operation.equals("add")){
                
                stub.add(a, b);
            }
            if(operation.equals("sub")){
                stub.sub(a, b);
            }
            
            System.err.println("Remote method invoked");
        } catch (Exception e) {
           
            System.err.println(e.toString());
        }
    }
}

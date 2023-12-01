import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

public class Server {
    public Server(){}
    public static void main(String[] args) {
        try{
            int port = Integer.parseInt(args[0]);
            String path = "app_c.csv" ;
    
            ImpApp obj = new ImpApp(path);
            System.out.println(port);
            System.out.println("Check var");
            App  skeleton= (App) UnicastRemoteObject.exportObject(obj, 0);
            Registry registry = LocateRegistry.getRegistry(port);
            registry.rebind("Hello",skeleton);
            System.err.println("Sever ready");

        }catch(Exception e){
            System.err.println(e.toString());
        }
    }
}

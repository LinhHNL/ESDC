import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

public class Server extends CalucateImp {
    public Server(){


    }
    public static void main(String[] args) {
        try{
            int index = 0 ;
            int port = Integer.parseInt(args[index++]);
            CalucateImp obj = new CalucateImp();
            Calucate  skeleton= (Calucate) UnicastRemoteObject.exportObject(obj, 0);
            Registry registry = LocateRegistry.getRegistry(port);
            registry.rebind("Hello",skeleton);
            System.err.println("Sever ready");

        }catch(Exception e){
            System.err.println(e.toString());
        }
    }
}

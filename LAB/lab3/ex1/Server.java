import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

public class Server extends ImplHello {
    public Server(){


    }
    public static void main(String[] args) {
        try{
            int index = 0 ;
            int port = Integer.parseInt(args[index++]);
            ImplHello objHello = new ImplHello();
            Hello skeletonHello = (Hello) UnicastRemoteObject.exportObject(objHello, 0);
            Registry registry = LocateRegistry.getRegistry(port);
            registry.rebind("Hello",skeletonHello);
            System.err.println("Sever ready");

        }catch(Exception e){
            System.err.println(e.toString());
        }
    }
}

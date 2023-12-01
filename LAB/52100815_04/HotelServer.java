import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class HotelServer {
    public static void main(String[] args) {
        try {
            if (args.length < 1)
        	{
                System.err.println("usage  : java Server <port>");
                System.err.println("example: java Server 1100");
        		System.exit(1);
            }
            //don't need start rmregistry
            int port = Integer.parseInt(args[0]);
            Registry registry = LocateRegistry.createRegistry(port);
            RoomManager roomManager = new RoomManagerImpl();
            registry.rebind("RoomManager", roomManager);
            System.out.println("RoomManager is ready.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.ArrayList;

public class HotelClient {

    public static void main(String[] args) {
        if (args.length <= 2) {
            printHelp();
            return;
        }

        String host = args[0];
        System.out.println(args[1]);
        int port = Integer.parseInt(args[1]);

        if (args.length == 3 && args[2].equals("help")) {
            printHelp();
            return;
        }
        SessionManager sessionManager = new SessionManager();
       try {
        Registry registry = LocateRegistry.getRegistry(host,port);
        RoomManager stub = (RoomManager) registry.lookup("RoomManager");
        if (args.length >= 3) {

            String command = args[2];
            if (command.equals("-login")) {
                String username = args[3];
                String password = args[4];
                String temp = stub.login(username, password);
                    if(temp!=null){
                        sessionManager.setSessionToken(temp);
                        System.out.println("Login successfully");
                    }else{
                        System.out.println("Login failed");

                    }
            } else{
                    if(sessionManager.getSessionToken()!=null){
                        switch (command) {
                            case "-list":
                                for (String string : stub.listAvailableRooms(sessionManager.getSessionToken())) {
                                    System.out.println(string);
                                }
                                break;
                        
                            case "-book":
                                int roomType = Integer.parseInt(args[3]);
                                String guestName = args[4];
                                int guest_ssn = -1;
                        
                                if (args.length == 6) {
                                    guest_ssn = Integer.parseInt(args[5]);
                                }
                                if (stub.bookRoom(roomType, guestName, guest_ssn, sessionManager.getSessionToken())) {
                                    System.out.println("Book Successfully");
                                } else {
                                    System.out.println("Book Failed");
                                }
                                break;
                        
                            case "-guests":
                                ArrayList<Reservation> list = stub.listGuests(sessionManager.getSessionToken());
                                if (list.size() != 0) {
                                    for (Reservation reservation : list) {
                                        System.out.println(reservation.toString());
                                    }
                                } else {
                                    System.out.println("Please login with Account Manager");
                                }
                                break;
                        
                            case "-logOut":
                                sessionManager.clearSessionToken();
                                stub.logout(sessionManager.getSessionToken());
                                System.out.println("Logout Successfully");
                                break;
                        
                            default:
                                System.out.println("Invalid command: " + command);
                        }
                        
                }else{
                    System.out.println("Please login to continue...");
                    
                }}
            } else {
            System.out.println("Usage: java HotelClient host port [command]");
            }
       } catch (Exception e) {
        System.err.println(e.toString());       
    }
    } 
    
    private static void printHelp() {
        System.out.println("HotelClient - Usage:");
        System.out.println("java HotelClient host port [command]");
        System.out.println("Commands:");
        System.out.println("-login <username> <password>: Sign in to the system with the given user account.");
        System.out.println("-list: List available number of rooms in each price range.");
        System.out.println("-book <room_type> <guest_name> [guest_ssn]: Book a room and register guest's information.");
        System.out.println("-guests: List information of all registered guests.");
        System.out.println("-logOut: Sign out the current user's session.");
    }
}

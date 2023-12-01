import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.ArrayList;

public interface RoomManager extends Remote {
    String login(String username, String password) throws RemoteException;

    ArrayList<String> listAvailableRooms(String userToken) throws RemoteException;

    boolean bookRoom(int roomType, String guestInfo, int guestSSN, String userToken) throws RemoteException;

    ArrayList<Reservation>  listGuests(String userToken) throws RemoteException;

    boolean logout(String userToken) throws RemoteException;
}

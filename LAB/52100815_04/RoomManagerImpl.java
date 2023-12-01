import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class RoomManagerImpl extends UnicastRemoteObject implements RoomManager {
    private ArrayList<Room> rooms;
    private ArrayList<Reservation> reservations;
    private ArrayList<User> users;
    private Map<String, User> loggedInUsers = new HashMap<>();
    public RoomManagerImpl() throws RemoteException {
        this.rooms =   readRooms("Rooms.csv");
        this.users =   readUsers("Users.csv");
        this.reservations =   readReservations("Reservations.csv");

    }
    private ArrayList<User> readUsers(String path){
         ArrayList<User> listsUsers = new ArrayList<User>();    

        try (BufferedReader bufferedReader = new BufferedReader(new FileReader(path))) {
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                String[] items = line.split(",");
              User tempUser = new User(items[0], items[1], items[2]);
              listsUsers.add(tempUser);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return listsUsers;

    }
    private ArrayList<Room> readRooms(String path){
        ArrayList<Room> listrooms = new ArrayList<Room>();
        try (BufferedReader bufferedReader = new BufferedReader(new FileReader(path))) {
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                String[] items = line.split(",");
                Room tempUser = new Room(Integer.parseInt(items[0]), Integer.parseInt(items[1]),Double.parseDouble(items[2]));
                listrooms.add(tempUser);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return listrooms;
    }
    private Room findRoomByRoomNumber(int roomNumber){
        for (Room room : rooms) {
            if(room.getRoomNumber()==(roomNumber)){
            return room;
        }    
        }
        return null;
    }
    private ArrayList<Reservation> readReservations(String path){
        ArrayList<Reservation> listReservations = new ArrayList<>();
        try (BufferedReader bufferedReader = new BufferedReader(new FileReader(path))) {
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                String[] items = line.split(",");

                Reservation tempUser = new Reservation(findRoomByRoomNumber(Integer.parseInt(items[0])), items[1],Integer.parseInt(items[2]));
                listReservations.add(tempUser);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return listReservations;
    }
    public String generateUserToken(String username, String role) {
        String tokenData = username + role;
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] digest = md.digest(tokenData.getBytes());
            String userToken = Base64.getEncoder().encodeToString(digest);
            return userToken;
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }
    @Override
    public String login(String username, String password) throws RemoteException {
        User user = findUserByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            
            String role = user.getRole();
            String userToken = generateUserToken(username, role);
            loggedInUsers.put(userToken, user);
            return userToken;
        } 
            return null;
    }
    private User findUserByUsername(String username) {
       for (User user : users) {
            if(user.getUsername().equals(username)){
                return user;
            }   
       }
       return null;
    }
    
    @Override
    public ArrayList<String> listAvailableRooms(String Token) throws RemoteException {
        if(loggedInUsers.get(Token)!=null){
            ArrayList<String> listAvailableRooms = new ArrayList<>();
                int[][] roomType = {{0,10,55},
                                    {0,20,75},
                                    {0,5,80},
                                    {0,3,150},
                                    {0,2,230}};
                for(Reservation reservation : this.reservations){
                    roomType[reservation.getRoom().getRoomType()][0]++;
                     }
                for (int i = 0; i < roomType.length; i++) {
                    if(roomType[i][0]!=roomType[i][1]){
                    listAvailableRooms.add(roomType[i][1]-roomType[i][0]+" rooms of type "+i+" are available for "+roomType[i][2]+" Euros per night");
                    }                  
                }
            
            return listAvailableRooms;
                    }
        return null;
}
    private void writeFileReservation(String fileName, Reservation reservation){
        try {
            FileOutputStream fos = new FileOutputStream(fileName, true);
            String data = "\n"+reservation.getRoom().getRoomNumber()+","+reservation.getGuestName()+","+reservation.getGuestSSN();
            System.out.println(data);
            byte[] bytes = data.getBytes();
            fos.write(bytes);
            fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    @Override
    public boolean bookRoom(int roomType, String guestInfo, int guestSSN,String Token) throws RemoteException {
            
            if(guestSSN==-1){
                Random random = new Random();
                int ssn = 1000 + random.nextInt(9000);
                guestSSN= ssn;
            }
            Room roomt = null;
            for (Room room : rooms) {
                if(room.getRoomType()==roomType){
                     roomt = room;
                    break;
                }   
            }
            Reservation temp = new Reservation(roomt, guestInfo, guestSSN);
            
            reservations.add(temp);
            writeFileReservation("Reservations.csv", temp);
            return true;
        
    }
    @Override
    public ArrayList<Reservation> listGuests(String Token) throws RemoteException {
        if(loggedInUsers.get(Token)!=null && loggedInUsers.get(Token).getRole().equals("MANAGER")){
            return reservations;
        }
      return null;
    }

    @Override
    public boolean logout(String Token) throws RemoteException {
        if (Token != null && loggedInUsers.containsKey(Token)) {

            loggedInUsers.remove(Token);
            return true;
        } else {
            return false;
        }
    }
}

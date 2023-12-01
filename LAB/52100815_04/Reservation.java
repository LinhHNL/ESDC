import java.io.Serializable;

public class Reservation implements Serializable {
    private Room room;
    private String guestName;
    private int guestSSN;

    public Reservation(Room room, String guestName, int guestSSN) {
        this.room = room;
        this.guestName = guestName;
        this.guestSSN = guestSSN;
    }


public Room getRoom() {
    return room;
}
    public String getGuestName() {
        return guestName;
    }

    public int getGuestSSN() {
        return guestSSN;
    }

    @Override
    public String toString() {
        return "Reservation{" +
                "roomName=" + room.getRoomNumber() +
                ", guestName='" + guestName + '\'' +
                ", guestSSN='" + guestSSN + '\'' +
                '}';
    }
}

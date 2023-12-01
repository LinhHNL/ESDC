import java.io.Serializable;

public class Room implements Serializable {
    private int roomType;
    private int roomNumber;
    private double pricePerNight;
    
    public Room(int roomType, int roomNumber, double pricePerNight) {
        this.roomType = roomType;
        this.roomNumber = roomNumber;
        this.pricePerNight = pricePerNight;
    }
    public int getRoomNumber() {
        return roomNumber;
    }
    public int getRoomType() {
        return roomType;
    }

 

    public double getPricePerNight() {
        return pricePerNight;
    }
}

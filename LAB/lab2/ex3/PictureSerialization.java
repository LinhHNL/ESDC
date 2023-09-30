import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;

public class PictureSerialization {
    public static void main(String[] args) {
        try {
                FileInputStream picture = new FileInputStream("HelloWorld.png");
                byte[] pictureData = new byte[picture.available()];
                picture.read(pictureData);
                picture.close();
                
                FileOutputStream output = new FileOutputStream("helloworld.ser");
                ObjectOutputStream objectOutputStream = new ObjectOutputStream(output);
                objectOutputStream.writeObject(pictureData);
                output.close();
                objectOutputStream.close();
                System.out.println("Serialized picture data is saved in helloworld.ser");
            } catch (IOException e) {
                e.printStackTrace();
            }
    }    
}

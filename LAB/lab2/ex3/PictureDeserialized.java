import java.io.*;
import java.util.ArrayList;
public class PictureDeserialized{
    public static void main(String[] args) {
        try {
            FileInputStream inputStream = new FileInputStream("helloworld.ser");
            ObjectInputStream objectInputStream = new ObjectInputStream(inputStream);
            
            byte[] deserializedPictureData = (byte[]) objectInputStream.readObject();
            inputStream.close();
            objectInputStream.close();

            FileOutputStream pictureOutput = new FileOutputStream("picture.jpg"); 
            pictureOutput.write(deserializedPictureData);
            pictureOutput.close();
            System.out.println("Deserialized picture data is saved as picture.jpg");
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

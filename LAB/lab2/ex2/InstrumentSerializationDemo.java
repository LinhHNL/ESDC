import java.io.*;
import java.lang.reflect.Array;
import java.util.ArrayList;

interface Instrument extends Serializable {
    void play();
}

class Guitar implements Instrument {
    @Override
    public void play() {
        System.out.println("Playing the guitar");
    }
}

class Piano implements Instrument {
    @Override
    public void play() {
        System.out.println("Playing the piano");
    }
}

class Trumpet implements Instrument {
    @Override
    public void play() {
        System.out.println("Playing the trumpet");
    }
}

public class InstrumentSerializationDemo {
    public static void main(String[] args) {
        Guitar guitar = new Guitar();
        Piano piano = new Piano();
        Trumpet trumpet = new Trumpet();
        ArrayList<Instrument> instruments = new ArrayList<Instrument>();
        instruments.add(trumpet);
        instruments.add(piano);
        instruments.add(guitar);
        try {
            FileOutputStream file = new FileOutputStream("Instrument.ser");
            ObjectOutputStream os = new ObjectOutputStream(file);
            os.writeObject(instruments);
            os.close();
            file.close();
            System.out.println("Serialized data is saved in Instrument.ser");
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }

        ArrayList<Instrument> instrumentsDeserialized = null;
        try {
            FileInputStream fileInputStream = new FileInputStream("Instrument.ser");
            ObjectInputStream oStream = new ObjectInputStream(fileInputStream);
            Object obj = oStream.readObject(); 
            if (obj instanceof ArrayList) {
                
                instrumentsDeserialized = (ArrayList<Instrument>) obj; 
            }
            fileInputStream.close();
            oStream.close();
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
          System.out.println("Deserialized Instrumetn data:");
          for (Instrument ins : instrumentsDeserialized) {
              ins.play();
          }
    }
}

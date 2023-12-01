import java.rmi.*;
public interface Hello extends Remote{
    public void printMsg(String name , int age) throws RemoteException;
}
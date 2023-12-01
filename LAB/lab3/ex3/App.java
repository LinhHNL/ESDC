import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.*;

public interface App  extends Remote{
    public boolean findSurName(String surName) throws RemoteException;
    public ArrayList<String> findPctwhite(double d) throws RemoteException;
    public ArrayList<Person> findAllPersonLargerThanNumber(long number) throws RemoteException;
}

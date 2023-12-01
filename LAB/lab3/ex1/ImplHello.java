import java.rmi.RemoteException;

public class ImplHello implements Hello{
    @Override 
    public void printMsg(String name , int age) throws RemoteException{
        System.out.println(name + " " + age + "is trying to contact!");
    }
}

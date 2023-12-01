import java.rmi.RemoteException;

public class CalucateImp implements Calucate{
    @Override
    public long add(long a, long b) throws RemoteException {
        return a+b;
    }

    @Override
    public long sub(long a, long b) throws RemoteException {
        return a-b;
    }
    // public void printResult(char operation , long a, long b,long result){
    //     System.out.printf("%d %c %ld = %d",a,operation,b, result);

    // }
}
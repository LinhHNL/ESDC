import java.io.Serializable;

public class Person implements Serializable {
    private String name;
    private long count ;
    private double pctwhite;
    private double pctblack;
    public Person(String name, long count, double pctwhite , double pctblack){
        this.name = name;
        this.count = count;
        this.pctblack = pctblack;
        this.pctwhite = pctwhite;

    }
    public long getCount() {
        return count;
    }
    public String getName() {
        return name;
    }
    public double getPctblack() {
        return pctblack;
    }
    public double getPctwhite() {
        return pctwhite;
    }
    @Override
    public String toString() {
        return String.format("Person[name=%s,count=%d,pctwhite=%f,pctblack=%f]", name,count,pctwhite,pctblack);
    }
}

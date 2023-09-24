
public class Square extends Rectangle {
    public Square(){}
    public Square(double side){
        super(side, side);

    }
    public Square(double side, String color,boolean fiiled){
        super(side, side, color, fiiled);
    }
    public double getSide(){return super.length;}
    public void setSide(double side){
        super.length = side;
        super.width = side;
    }
    @Override
    public void setWidth(double side) {
        super.setWidth(side);
    }
    public void setLength(double side) {super.setLength(side);}
    @Override
    public String toString() {
        return "Square{side="+super.width + super.toString() +"}";
    }
}

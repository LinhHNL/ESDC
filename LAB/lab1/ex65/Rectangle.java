
public class Rectangle  extends Shape{
    protected double width;
    protected double length;
    public Rectangle(double width, double length) {
        this.length = length;
        this.width = width;
    }
    public Rectangle(){}
    public Rectangle(double width, double length, String color, boolean fiiled){
        super(color, fiiled);
        this.length = length; 
        this.width = width;
    } 
    @Override
    public double getArea() {
        
        return width*length;
    }
    @Override
    public double getPremiter() {
        return 2*(length+width);
    }
    public void setLength(double length) {
        this.length = length;
    }
    public void setWidth(double width) {
        this.width = width;
    }

    public double getLength() {
        return length;
    }
    public double getWidth() {
        return width;
    }
    @Override
    public String toString() {
        return "Rectangle["+width+","+length+super.toString()+ "]";
    }
}

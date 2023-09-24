
public class Rectangle implements Shape{
    private double length ;
    private double width;
    public Rectangle(double width, double length){
        this.length = length;
        this.width = width;
    }
    public double getArea() { return length*width;    }
    @Override
    public String toString() {
        
        return String.format("Rectangle[length=%f,width=%f]", length, width);
    }
}

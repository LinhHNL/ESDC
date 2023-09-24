
public class Circle extends Shape {
    protected double radius;
    public Circle(double radius) {
        this.radius = radius; 

    }
    public Circle(){}
    public Circle(double radius , String color ,boolean fiiled) {
        super(color, fiiled);

        this.radius = radius;
    }      
    public double getRadius() {
        return radius;
    }
    public void setRadius(double radius) {
        this.radius = radius;
    }

    @Override
    public double getArea() {
        return 3.14*radius*radius;
    }
    @Override
    public double getPremiter() {
        return radius*2*3.14;
    }
    @Override
    public String toString() {
        return "Circle[" + radius + super.toString()+ "]";
    }
    
}

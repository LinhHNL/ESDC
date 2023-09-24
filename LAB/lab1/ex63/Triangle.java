public class Triangle implements Shape {
    private double base; 
    private double heigth; 
    public Triangle(double base, double heigth) {
        this.base= base;
        this.heigth = heigth;
    }
    public double getArea() {
        return 0.5*heigth*base;

    }
    @Override
    public String toString() {
        
        return String.format("Triangle[base=%.2f,heigth=%.2f]",base,heigth);

    }

}
public class TestShapes {
    public static void main(String[] args) {
        // Creating instances of different shapes
        Rectangle rectangle = new Rectangle(4.0, 6.0, "Blue", false);
        Square square = new Square(5.0, "Green", true);
        Circle circle = new Circle(3.0, "Yellow", true);

        // Testing toString() method
        System.out.println(rectangle.toString());
        System.out.println(square.toString());
        System.out.println(circle.toString());

        // Testing area and perimeter calculations
        System.out.println("Area of rectangle: " + rectangle.getArea());
        System.out.println("Perimeter of rectangle: " + rectangle.getPremiter());

        System.out.println("Area of square: " + square.getArea());
        System.out.println("Perimeter of square: " + square.getPremiter());

        System.out.println("Area of circle: " + circle.getArea());
        System.out.println("Circumference of circle: " + circle.getPremiter());


        // Testing getters for width, length, and radius
        System.out.println("Rectangle width: " + rectangle.getWidth());
        System.out.println("Rectangle length: " + rectangle.getLength());
        System.out.println("Square side length: " + square.getSide());
        System.out.println("Circle radius: " + circle.getRadius());
    }
}

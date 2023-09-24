public class TestShapes {
    public static void main(String[] args) {
        Shape triangle = new Triangle(4.0, 6.0);
        Shape rectangle = new Rectangle(4.0, 6.0);

        // Test the getArea() method
        System.out.println("Area of Triangle: " + triangle.getArea());
        System.out.println("Area of Rectangle: " + rectangle.getArea());

        // Test the toString() method
        System.out.println(triangle.toString());
        System.out.println(rectangle.toString());
    }
}

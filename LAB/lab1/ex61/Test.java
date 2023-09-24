public class Test {
    public static void main(String[] args) {
        // Create a rectangle using two points
        MyPoint pointA = new MyPoint(1, 2);
        MyPoint pointC = new MyPoint(5, 6);
        MyRectangle rectangle1 = new MyRectangle(pointA, pointC);

        // Create a rectangle using coordinates
        MyRectangle rectangle2 = new MyRectangle(2, 3, 6, 7);

        // Test methods of MyRectangle
        System.out.println("Rectangle 1 Area: " + rectangle1.getArea());
        System.out.println("Rectangle 1 Perimeter: " + rectangle1.getPerimeter());
        System.out.println("Rectangle 1 Points: A" + rectangle1.getA() + ", B" + rectangle1.getB() + ", C" + rectangle1.getC() + ", D" + rectangle1.getD());

        System.out.println("Rectangle 2 Area: " + rectangle2.getArea());
        System.out.println("Rectangle 2 Perimeter: " + rectangle2.getPerimeter());
        System.out.println("Rectangle 2 Points: A" + rectangle2.getA() + ", B" + rectangle2.getB() + ", C" + rectangle2.getC() + ", D" + rectangle2.getD());

        // Test methods of MyPoint
        System.out.println("Distance between pointA and pointC: " + pointA.distance(pointC));
        System.out.println("Distance between pointA and (0, 0): " + pointA.distance());
    }
}

public class Test {
    public static void main(String[] args) {
        // Create MyPoint instances
        MyPoint point1 = new MyPoint(1, 2);
        MyPoint point2 = new MyPoint(4, 6);
        MyPoint point3 = new MyPoint(7, 2);

        // Create MyTriangle instances
        MyTriangle triangle1 = new MyTriangle(point1, point2, point3);
        MyTriangle triangle2 = new MyTriangle(2, 3, 5, 8, 9, 1);

        // Test methods of MyTriangle
        System.out.println("Triangle 1 Perimeter: " + triangle1.getPerimeter());
        System.out.println("Triangle 1 Type: " + triangle1.getType());
        System.out.println("Triangle 1 Points: " + triangle1.toString());

        System.out.println("Triangle 2 Perimeter: " + triangle2.getPerimeter());
        System.out.println("Triangle 2 Type: " + triangle2.getType());
        System.out.println("Triangle 2 Points: " + triangle2.toString());

        // Test methods of MyPoint
        System.out.println("Distance between point1 and point2: " + point1.distance(point2));
        System.out.println("Distance between point2 and point3: " + point2.distance(point3));
    }
}

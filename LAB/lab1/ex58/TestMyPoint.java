public class TestMyPoint {
    public static void main(String[] args) {
        // Create MyPoint instances
        MyPoint point1 = new MyPoint(1, 2);
        MyPoint point2 = new MyPoint(4, 6);

        // Test getX and getY methods
        System.out.println("Point 1 X: " + point1.getX());
        System.out.println("Point 1 Y: " + point1.getY());
        System.out.println("Point 2 X: " + point2.getX());
        System.out.println("Point 2 Y: " + point2.getY());

        // Test setX and setY methods
        point1.setX(3);
        point1.setY(5);
        System.out.println("Point 1 X after setX: " + point1.getX());
        System.out.println("Point 1 Y after setY: " + point1.getY());

        // Test getXY method
        int[] xy = point2.getXY();
        System.out.println("Point 2 XY: {" + xy[0] + ", " + xy[1] + "}");

        // Test setXY method
        point2.setXY(7, 8);
        System.out.println("Point 2 XY after setXY: " + point2.getXY());

        // Test distance methods
        System.out.println("Distance between point1 and point2: " + point1.distance(point2));
        System.out.println("Distance between point1 and (0,0): " + point1.distance());
    }
}

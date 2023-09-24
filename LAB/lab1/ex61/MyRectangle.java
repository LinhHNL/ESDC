

public class MyRectangle {
    private MyPoint A, B, C, D;
    public MyRectangle(int xA, int yA, int xC, int yC) {
        this.A = new MyPoint(xA, yA);
        this.C = new MyPoint(xC, yC);
        findOtherPoints();
    }

    private void findOtherPoints() {
        int xMid = (A.getX() + C.getX()) / 2;
        int yMid = (A.getY() + C.getY()) / 2;

        // Tính vectơ từ trung điểm đến điểm A
        int vectorX = A.getX() - xMid;
        int vectorY = A.getY() - yMid;

        // Tìm hai đỉnh còn lại
        int xB = xMid - vectorY;
        int yB = yMid + vectorX;
        int xD = xMid + vectorY;
        int yD = yMid - vectorX;

        this.B = new MyPoint(xB, yB);
        this.D = new MyPoint(xD, yD);
    }
    public MyRectangle(MyPoint A, MyPoint C){
        this.A = A;
        this.C = C;
        findOtherPoints();
    }
    public MyPoint getA() {
        return A;
    }
    public MyPoint getB() {
        return B;
    }
    public MyPoint getC() {
        return C;
    }
    public MyPoint getD() {
        return D;
    }
    public void setA(MyPoint a) {
        this.A = a;
        findOtherPoints();
    }
    public void setC(MyPoint c) {
        this.C = c;
        findOtherPoints();
    }
    public double getArea() {
        return A.distance(this.B)*A.distance(this.D);
    } 
    public double getPerimeter(){
        return 2*(A.distance(this.B)+A.distance(this.D));

    }
    @Override
    public String toString() {
        return String.format( "MyRectangle[A=(%d,%d),B=(%d,%d),C=(%d,%d),D=(%d,%d)]", A.getX(),A.getY(),B.getX(),B.getY(),C.getX(),C.getY(),D.getX(),D.getY());
    }
}

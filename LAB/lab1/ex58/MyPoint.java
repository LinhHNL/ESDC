
public class MyPoint {
    private int  x = 0, y = 0;
   public MyPoint(int x, int y) {
    this.x = x;
    this.y = y;
   } 
   public MyPoint(){}
   public int getX() {
       return x;
   }
   public int getY() {
       return y;
   }
   public void setX(int x) {
       this.x = x;

    }
    public void setY(int y) {
        this.y = y;
    }
    public int[] getXY() {
        int[] xy = {x, y};
        return xy;
    }
    public void setXY(int x, int y) {
        this.x = x;
        this.y = y;
    }
    @Override
    public String toString() {
        return "{" + x + ", " + y + "}";
    }
    public double distance(int x, int y){
        double deltaX = this.x - x;
        double deltaY = this.y - y;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY); 

    }
    public double distance(MyPoint otherMyPoint){
        return distance(otherMyPoint.getX(), otherMyPoint.getY());
    }
    public double distance(){
        return distance(0,0);
    }
}

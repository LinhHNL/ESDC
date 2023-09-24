
public class MyCircle {
    private MyPoint center = new MyPoint(0,0);
    private int radius = 1;
    public MyCircle(){}
    public MyCircle(int x,int y,int radius){
        this.center.setX(x);
        this.center.setY(y);
        this.radius = radius;
    }
    public MyCircle(MyPoint center , int radius) {
        this.center = center;
        this.radius = radius;
    }
   public MyPoint getCenter() {
       return center;
   }
   public int getRadius() {
       return radius;
   }
   public void setCenter(MyPoint center) {
       this.center = center;
   }
   public void setRadius(int radius) {
       this.radius = radius;
   }
   public int getCenterX() {   
    return center.getX();

   }
   public int getCenterY() {   
    return center.getY();
    
   }
   public void setCenterX(int x){
    this.center.setX(x);
   }
   public void setCenterY(int x){
    this.center.setY(x);
   }
   public int[] getCenterXY() {   
    return center.getXY();

   }
   public void setCenterXY(int x, int y){
    this.center.setXY(x, y);;
   }
   @Override
   public String toString() {
       return "MyCircle[radius=]"+radius+"center=()"+center.getX()+","+center.getY()+"]";
   }
   public double getArea(){
    return 3.15*radius*radius;
   }
   public double getCircumference(){
    return 2*3.14*radius;
   }
   public double distance(MyCircle another){
    return this.center.distance(another.getCenter());
   }
}

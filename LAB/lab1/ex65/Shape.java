
abstract class  Shape {
    protected String color;
    private boolean fiiled ;
    public Shape(String color , boolean fiiled) {
        this.color = color;
        this.fiiled = fiiled;
    }
    public Shape(){}
    public String getColor() {
        return color;
    }
    public void setColor(String color) {
        this.color = color;
    }
    public void setFiiled(boolean fiiled) {
        this.fiiled = fiiled;
    }
    public boolean isFiiled() {
        return fiiled;
    }
    @Override
    public String toString() {
        return "Shape[color="  + color + ", fiiled=" + fiiled+"]";
    }
    public abstract double getArea();
    public abstract double getPremiter();
    }

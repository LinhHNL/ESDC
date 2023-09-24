
public class Date {
    private int day;
    private int month;
    private int year;
    public Date(int day, int month, int year) {
        this.day = day;
        this.month = month;
        this.year = year;   
        if (year < 1900 | year >9000) {
            this.year = 1900;
        } else {
            this.year = year;
        }
        if (month < 1 | month >12) {
            this.month = 1;
        } else {
            this.month = month;
        }
        if (day < 1 | day >31) {
            this.day = 1;
        } else {
            this.day = day;
        }
    }
    public int getDay() {
        return day;
    }
    public int getMonth() {
        return month;
    }
    public int getYear() {
        return year;
    }
    public void setDay(int day) {
        this.day = day;
    }
    public void setMonth(int month) {
        this.month = month;
    }
    public void setYear(int year) {
        this.year = year;
    }
    public String toString() {
        return String.format("%02d/%02d/%d", day, month, year);
    }
    
}


    
    

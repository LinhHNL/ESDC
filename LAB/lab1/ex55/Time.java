
public class Time {
    private int hour;
    private int minute;
    private int second;
    public Time(int hour, int minute, int second) {
    this.hour = hour;
	this.minute = minute;
	this.second = second;
    }
    
    public int getHour() {
	return hour;
    }
    public int getMinute() {
	return minute;
    }
    public int getSecond() {
	return second;
    }
    public void setHour(int hour){
	this.hour = hour;
    }
    public void setMinute(int minute) {
	this.minute = minute;
    }
    public void setSecond( int second) {
	this.second = second;
    }
    public void setTime(int hour, int minute, int second) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;   
     }
     @Override
     public String toString() {
        return String.format("%02d:%02d:%02d", hour, minute, second);
    }
    public Time nextSecond(){
        int nSecond = this.second +1;
        int nMinute = this.minute;
        int nHour = this.hour;

        if(nSecond > 59){
            nMinute += 1;
            nSecond = nSecond - (60);
        }
        if(nMinute>59){
            nHour +=1;
            nMinute = nMinute - (60);
        }
        return new Time(nHour, nMinute, nSecond);
    }
    public Time previousSecond(){
        int nSecond = this.second -1;
        int nMinute = this.minute;
        int nHour = this.hour;

        if(nSecond < 0){
            nMinute -= 1;
            nSecond = nSecond +(60);
        }
        if(nMinute<0){
            nHour -=1;
            nMinute = nMinute + (60);
        }
        return new Time(nHour, nMinute, nSecond);
    }

}

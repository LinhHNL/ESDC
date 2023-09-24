
public class Account {
    private String id;
    private String name;
    private int balance = 0;
    public Account(String id, String name, int balance){
    this.id    	 = id;
	this.name = name;
	this.balance = balance;
    }
    public Account(String id, String name){
        this.id = id;
        this.name = name;
    }
    public String getId(){
	return this.id;
    }
    public String getName(){
	return this.name;
    }
    public int getBalance(){
	return this.balance;
    }
    public int creadit(int amount){
        return balance + amount;
    }
    public int debit(int amount){
        if(balance >= amount){
            this.balance = this.balance - amount;
        }else{
            System.out.println("Amount exceeded balance");
        }
        return this.balance;
    }
    public int Transfer(Account another,int amount){
        if(balance >= amount){
            another.creadit(amount) ;
            this.debit(amount);
        }else{
            System.out.println("Amount exceeded balance");
        }
        return this.balance;
    }
    @Override
    public String toString() {
        return "Account[id=" +id+ ",name="+name +",balance=" +balance +"]";
    }
}

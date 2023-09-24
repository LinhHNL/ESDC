
public class Invoice {
    private int ID;
    private Customer customer;
    private double amount;
    public Invoice(int id, Customer customer, Double amount){
        this.ID = id;
        this.customer = customer;
        this.amount = amount;
        
    }
    public Customer getCustomer() {
        return customer;
    }
    public double getAmount() {
        return amount;
    }
    public int getID() {
        return ID;
    }
    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
    public void setAmount(double amount) {
        this.amount = amount;
    }
    public String getCustomerName() {
        return customer.getName();
    }
    public double getAmountAfterDiscount() {
        return amount*customer.getDiscount()*100;
    }
}

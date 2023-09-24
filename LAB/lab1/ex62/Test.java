public class Test {
    public static void main(String[] args) {
        // Create a customer
        Customer customer = new Customer(1, "John Doe", 10);

        // Create an invoice associated with the customer
        Invoice invoice = new Invoice(1001, customer, 1000.0);

        // Test methods of the Customer class
        System.out.println("Customer ID: " + customer.getID());
        System.out.println("Customer Name: " + customer.getName());
        System.out.println("Customer Discount: " + customer.getDiscount());

        // Test methods of the Invoice class
        System.out.println("Invoice ID: " + invoice.getID());
        System.out.println("Invoice Amount: $" + invoice.getAmount());
        System.out.println("Invoice Customer Name: " + invoice.getCustomerName());
        System.out.println("Invoice Amount After Discount: $" + invoice.getAmountAfterDiscount());
    }
}


public class Book {
    private String name;
    private Author author;
    private double price;
    private int qty = 0;
    public Book(String name, Author author, double price, int qty) {
        this.author = author;
        this.name = name;
        this.price = price;
        this.qty = qty;
    }
    public Book(String name, Author author , double price) {
        this.author = author;
        this.name = name;
        this.price = price;
    }
    public Author getAuthor() {
        return author;

    }
    public void setAuthor(Author author) {
        this.author = author;
    }
    public void setName(String name) {
        this.name = name;
    }public void setPrice(double price) {
        this.price = price;
    }public void setQty(int qty) {
        this.qty = qty;
    }
    public String getName() {
        return name;
    }
    public double getPrice() {
        return price;
    }
    public int getQty() {
        return qty;
    }
    public String toString(){
        return "Book[name=" + name + ","+author.toString()+",price=" + price+   ","+qty + "]";
    }
}

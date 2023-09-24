public class TestBook {
    public static void main(String[] args) {
        // Create an Author instance
        Author author1 = new Author("John Doe", "john.doe@example.com", 'm');

        // Create a Book instance
        Book book1 = new Book("Sample Book", author1, 29.99);

        // Test getters and toString methods
        System.out.println("Book Name: " + book1.getName());
        System.out.println("Book Price: " + book1.getPrice());
        System.out.println("Author: " + book1.getAuthor().getName());
        System.out.println("Book Quantity: " + book1.getQty());
        System.out.println(book1.toString());

        // Test setters
        book1.setPrice(39.99);
        book1.setQty(10);

        System.out.println("Updated Book Price: " + book1.getPrice());
        System.out.println("Updated Book Quantity: " + book1.getQty());

        // Test changing author's email
        author1.setEmail("new.email@example.com");

        System.out.println("Updated Author Email: " + author1.getEmail());
        System.out.println("Updated Book Details:");
        System.out.println(book1.toString());
    }
}

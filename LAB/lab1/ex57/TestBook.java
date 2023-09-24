public class TestBook {
    public static void main(String[] args) {
        // Create Author instances
        Author author1 = new Author("John Doe", "john.doe@example.com", 'm');
        Author author2 = new Author("Jane Smith", "jane.smith@example.com", 'f');

        // Create an array of authors
        Author[] authors = {author1, author2};

        // Create a Book instance
        Book book1 = new Book("Sample Book", authors, 29.99);

        // Test getters and toString methods
        System.out.println("Book Name: " + book1.getName());
        System.out.println("Book Price: " + book1.getPrice());
        System.out.println("Authors: " + book1.getAuthors()[0].getName() + ", " + book1.getAuthors()[1].getName());
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

public class Author {
    private String name;
    private String email;
    private char gender;

    public Author(String name, String email, char gender) {
        this.name = name;
        this.email = email;
        setGender(gender); // Validate and set the gender
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setGender(char gender) {
        if (Character.toLowerCase(gender) == 'm' || Character.toLowerCase(gender) == 'f') {
            this.gender = Character.toLowerCase(gender); // Store it in lowercase
        } else {
            throw new IllegalArgumentException("Gender must be 'm' or 'f'");
        }
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public char getGender() {
        return gender;
    }

    public String getName() {
        return name;
    }

    public String toString() {
        return "Author[name=" + name + ", email=" + email + ", gender=" + gender + "]";
    }
}

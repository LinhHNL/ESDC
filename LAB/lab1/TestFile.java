import java.io.File;

public class TestFile{
    public static void main(String[] args) {
        String rootDirectoryPath = "D:\hoc\HK5\ESDC\LAB\lab1>"; // Specify the root directory path here

        // Call the method to delete .class files in subdirectories
        deleteClassFilesInSubdirectories(new File(rootDirectoryPath));
    }

    public static void deleteClassFilesInSubdirectories(File directory) {
        if (directory.isDirectory()) {
            // List all files and subdirectories in the current directory
            File[] files = directory.listFiles();

            if (files != null) {
                for (File file : files) {
                    if (file.isDirectory()) {
                        // If it's a directory, recursively call the method
                        deleteClassFilesInSubdirectories(file);
                    } else if (file.isFile() && file.getName().endsWith(".class")) {
                        // If it's a .class file, delete it
                        if (file.delete()) {
                            System.out.println("Deleted: " + file.getAbsolutePath());
                        } else {
                            System.err.println("Failed to delete: " + file.getAbsolutePath());
                        }
                    }
                }
            }
        }
    }
}

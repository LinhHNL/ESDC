import java.awt.Desktop;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

public class GitHubAuthentication {

    public static void main(String[] args) throws IOException, InterruptedException {
        String CLIENT_ID = System.getenv("GITHUB_CLIENT_ID");
        String CLIENT_SECRET = System.getenv("GITHUB_CLIENT_SECRET");
        System.out.println(CLIENT_ID);
        System.out.println(CLIENT_SECRET);

        if (CLIENT_ID == null || CLIENT_SECRET == null) {
            throw new RuntimeException("GitHub client ID and client secret not found in environment variables.");
        }

        String AUTH_ENDPOINT = "https://github.com/login/oauth/authorize?response_type=code&client_id=" + CLIENT_ID;
        String TOKEN_ENDPOINT = "https://github.com/login/oauth/access_token";
        String USER_ENDPOINT = "https://api.github.com/user";

        openWebBrowser(AUTH_ENDPOINT);

        String authCode = getAuthorizationCode();

        String accessToken = exchangeAuthorizationCodeForAccessToken(CLIENT_ID, CLIENT_SECRET, authCode,TOKEN_ENDPOINT);

        fetchUserData(USER_ENDPOINT, accessToken);
    }

    private static void openWebBrowser(String authEndpoint) {
        if (Desktop.isDesktopSupported()) {
            try {
                Desktop.getDesktop().browse(URI.create(authEndpoint));
                System.out.println("If the web browser does not open, please use this authorization URL: " + authEndpoint);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private static String getAuthorizationCode() throws IOException {
        System.out.print("Enter the authorization code: ");
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        return reader.readLine();
    }

    private static String exchangeAuthorizationCodeForAccessToken(String clientId, String clientSecret, String authCode, String tokenEndpoint) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newBuilder().build();
        HttpRequest tokenRequest = HttpRequest.newBuilder()
                .uri(URI.create(tokenEndpoint))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(HttpRequest.BodyPublishers.ofString(
                        "client_id=" + clientId + "&client_secret=" + clientSecret + "&code=" + authCode))
                .build();
    
        HttpResponse<String> tokenResponse = client.send(tokenRequest, HttpResponse.BodyHandlers.ofString());
        Map<String, String> tokenData = parseQueryString(tokenResponse.body());
        return tokenData.get("access_token");
    }
    

    private static void fetchUserData(String userEndpoint, String accessToken) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newBuilder().build();
        HttpRequest userRequest = HttpRequest.newBuilder()
                .uri(URI.create(userEndpoint))
                .header("Authorization", "token " + accessToken)
                .GET()
                .build();
    
        HttpResponse<String> userResponse = client.send(userRequest, HttpResponse.BodyHandlers.ofString());
    
        if (userResponse.statusCode() == 200) {
            String userJson = userResponse.body();
            
            // Split the JSON string into key-value pairs
            String[] keyValuePairs = userJson.split(",");
            
            // Create a map to store the JSON data
            Map<String, String> jsonData = new HashMap<>();
            for (String pair : keyValuePairs) {
                String[] keyValue = pair.split(":");
                if (keyValue.length == 2) {
                    String key = keyValue[0].replaceAll("\"", "").trim();
                    String value = keyValue[1].trim();
                    jsonData.put(key, value);
                }
            }
            
            System.out.println("User Data:");
            for (Map.Entry<String, String> entry : jsonData.entrySet()) {
                System.out.println(entry.getKey() + ": " + entry.getValue());
            }
        } else {
            System.out.println("Failed to fetch user data. Please check your access token.");
        }
    }
    
    private static Map<String, String> parseQueryString(String queryString) {
        Map<String, String> queryMap = new HashMap<>();
        String[] params = queryString.split("&");
        for (String param : params) {
            String[] keyValue = param.split("=");
            if (keyValue.length == 2) {
                queryMap.put(keyValue[0], keyValue[1]);
            }
        }
        return queryMap;
    }
}

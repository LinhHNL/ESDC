import java.util.prefs.Preferences;

public class SessionManager {
    private  final String SESSION_KEY ="";

    public  String getSessionToken() {
        return Preferences.userNodeForPackage(SessionManager.class).get(SESSION_KEY, null);
    }

    public void setSessionToken(String sessionToken) {
        Preferences.userNodeForPackage(SessionManager.class).put(SESSION_KEY, sessionToken);
    }

    public  void clearSessionToken() {
        Preferences.userNodeForPackage(SessionManager.class).remove(SESSION_KEY);
    }
}
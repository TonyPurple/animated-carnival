import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    paddingRight: 40,
    borderRadius: 6,
    borderColor: "rgba(0, 0, 0, 0.11)",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
    padding: 5,
  },
  screen: {
    padding: 10,
    gap: 8,
  },
  authScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
  },
  authForm: {
    padding: 18,
    gap: 8,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  placeholderColor: {
    color: "rgba(0, 0, 0, 0.5)",
  },
  headerView: {
    marginVertical: 16,
    alignItems: "center",
  },
  oauthContainer: {
    flexDirection: "row",
    gap: 8,
  },
  flexOne: {
    flex: 1,
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#eee",
  },
  separatorText: {
    width: 50,
    textAlign: "center",
    color: "#555",
  },
  inputFieldsContainer: {
    gap: 8,
    marginBottom: 24,
  },
  passwordContainer: {
    position: "relative",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  signUpPromptContainer: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    marginVertical: 18,
  },
  boldText: {
    fontWeight: "bold",
  },
  safeArea: {
    flex: 1,
  },
});

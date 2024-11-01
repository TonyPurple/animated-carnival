import { useSignIn, UseOAuthFlowParams } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  Text,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useCallback } from "react";
import Button from "@/components/Button";
import OAuthButton from "@/components/OAuthButton";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { styles } from "@/constants/styles";
import { Ionicons } from "@expo/vector-icons";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const isFormValid = emailAddress && password && isLoaded;

  const oauthProviders: {
    strategy: UseOAuthFlowParams["strategy"];
    icon: string;
    label: string;
  }[] = [
    { strategy: "oauth_google", icon: "google", label: "Google" },
    { strategy: "oauth_github", icon: "github", label: "GitHub" },
  ];

  // Handler for email input change
  const handleEmailChange = useCallback(
    (text: string) => {
      setEmailAddress(text);
      if (error) setError("");
    },
    [error]
  );

  // Handler for password input change
  const handlePasswordChange = useCallback(
    (text: string) => {
      setPassword(text);
      if (error) setError("");
    },
    [error]
  );

  // Toggle password visibility
  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  // Handle sign-in press
  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({
          session: signInAttempt.createdSessionId,
        });

        router.replace("/");
      } else {
        setError("Sign-in was not completed. Please try again.");
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      const errorMessage =
        err.errors?.[0]?.message || "An unexpected error occurred.";
      setError(errorMessage);
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password, signIn, setActive, router]);

  if (!isLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.authScreen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.authForm}>
            {/* Header text */}
            <ThemedView style={styles.headerView}>
              <ThemedText type="title">Sign into Daily Reps</ThemedText>
              <ThemedText type="default">
                Welcome back! Please sign in to continue
              </ThemedText>
            </ThemedView>

            {/* OAuth buttons */}
            <View style={styles.oauthContainer}>
              {oauthProviders.map((provider) => (
                <View key={provider.strategy} style={{ flex: 1 }}>
                  <OAuthButton strategy={provider.strategy}>
                    <MaterialCommunityIcons
                      name={
                        provider.icon as keyof typeof MaterialCommunityIcons.glyphMap
                      }
                      size={18}
                    />{" "}
                    {provider.label}
                  </OAuthButton>
                </View>
              ))}
            </View>

            {/* Form separator */}
            <View style={styles.separator}>
              <View style={styles.separatorLine} />
              <View>
                <Text style={styles.separatorText}>or</Text>
              </View>
              <View style={styles.separatorLine} />
            </View>

            {/* Input fields */}
            <View style={styles.inputFieldsContainer}>
              <Text>Email address</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Enter your email"
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                accessibilityLabel="Email address input"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoComplete="email"
                value={emailAddress}
                onChangeText={handleEmailChange}
              />
              <Text>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="rgba(0, 0, 0, 0.5)"
                  accessibilityLabel="Password input"
                  textContentType="password"
                  autoComplete="password"
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  returnKeyType="done"
                  onSubmitEditing={onSignInPress}
                  onChangeText={handlePasswordChange}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={togglePasswordVisibility}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye-off" : "eye"}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Display error message */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Button onPress={onSignInPress} disabled={!isFormValid}>
              <Text>Sign in</Text> <Ionicons name="caret-forward" />
            </Button>

            {/* Suggest new users create an account */}
            <View style={styles.signUpPromptContainer}>
              <Text>Don't have an account?</Text>
              <Link href="/sign-up">
                <Text style={styles.boldText}>Sign up</Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

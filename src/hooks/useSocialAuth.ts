import { useSSO } from "@clerk/expo";
import { useState } from "react";
import { Alert } from "react-native";

const useSocialAuth = () => {
    const [loadingStrategy, setLoadingStratergy] = useState<string | null>(null);
    const { startSSOFlow } = useSSO();

    const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
        if (loadingStrategy){
            return;
        }  
        setLoadingStratergy(strategy);

        try {
            const {createdSessionId, setActive} = await startSSOFlow({strategy})

            if (!createdSessionId || !setActive){
                Alert.alert("Sign-in incomplete", "Sign-in did not complete. Please try again.")
            return;
            }

            await setActive({session: createdSessionId})
        } catch (error) {
            console.log("Error in social auth:", error);
            Alert.alert("Error failed to sign-in. Please try again.")
        } finally {
            setLoadingStratergy(null);
        }
    };

    return {handleSocialAuth, loadingStrategy};
};

export default useSocialAuth;
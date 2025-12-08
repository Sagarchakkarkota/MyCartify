package com.mycartify.biometric

import androidx.biometric.BiometricManager
import androidx.biometric.BiometricPrompt
import androidx.fragment.app.FragmentActivity
import androidx.core.content.ContextCompat

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class BiometricModule(private val ctx: ReactApplicationContext) :
    ReactContextBaseJavaModule(ctx) {

    override fun getName(): String = "BiometricModule"

    @ReactMethod
    fun authenticate(promise: Promise) {

        val activity = reactApplicationContext.currentActivity as? FragmentActivity
            ?: return promise.reject("NO_ACTIVITY", "Activity not found")

        val manager = BiometricManager.from(reactApplicationContext)
        val canAuth =
            manager.canAuthenticate(BiometricManager.Authenticators.BIOMETRIC_STRONG)

        if (canAuth != BiometricManager.BIOMETRIC_SUCCESS) {
            promise.reject("NOT_SUPPORTED", "Biometric not supported or not enabled")
            return
        }

        val executor = ContextCompat.getMainExecutor(reactApplicationContext)

        val prompt = BiometricPrompt(
            activity,
            executor,
            object : BiometricPrompt.AuthenticationCallback() {

                override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                    promise.resolve(true)
                }

                override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
                    promise.reject("AUTH_ERROR", errString.toString())
                }

                override fun onAuthenticationFailed() {
                    promise.reject("AUTH_FAILED", "Authentication failed")
                }
            }
        )

        val promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle("Biometric Login")
            .setSubtitle("Use fingerprint to continue")
            .setNegativeButtonText("Cancel")
            .build()

        activity.runOnUiThread {
            prompt.authenticate(promptInfo)
        }
    }
}

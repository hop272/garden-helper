package com.gardenhelper

import android.content.Context
import android.widget.Toast
import java.io.BufferedReader
import java.io.InputStreamReader

object GardenAdvice {
    init {
        System.loadLibrary("rust_garden")
    }

    external fun garden_advice(input: String): String?

    fun runRustAdvice(question: String): String {
        return garden_advice(question) ?: "No advice available from Rust engine."
    }

    fun runPhpAdvice(context: Context, question: String): String {
        return try {
            val assetManager = context.assets
            val inputStream = assetManager.open("garden_advice.php")
            val reader = BufferedReader(InputStreamReader(inputStream))
            val source = reader.readText()
            reader.close()

            val response = when {
                question.contains("water", true) -> "Water plants when soil is slightly dry. Avoid overwatering by checking the top 2-3 cm of soil."
                question.contains("sun", true) || question.contains("light", true) -> "Most plants like morning sun and light afternoon shade. Protect tender plants from harsh midday heat."
                question.contains("soil", true) -> "Use rich, loamy soil with organic matter. Good drainage keeps roots healthy and prevents rot."
                else -> "This baked PHP guidance engine helps with basic garden questions about watering, sunlight, and soil."
            }
            response
        } catch (exception: Exception) {
            "Unable to load PHP guidance asset: ${exception.message}"
        }
    }
}

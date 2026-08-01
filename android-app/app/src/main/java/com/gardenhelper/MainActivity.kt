package com.gardenhelper

import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val resultText = findViewById<TextView>(R.id.resultText)
        val rustButton = findViewById<Button>(R.id.buttonRust)
        val phpButton = findViewById<Button>(R.id.buttonPhp)

        rustButton.setOnClickListener {
            val rustResult = GardenAdvice.runRustAdvice("How should I water my plants?")
            resultText.text = "Rust advice: $rustResult"
        }

        phpButton.setOnClickListener {
            val phpResult = GardenAdvice.runPhpAdvice(this, "How should I water my plants?")
            resultText.text = "PHP advice: $phpResult"
        }
    }
}

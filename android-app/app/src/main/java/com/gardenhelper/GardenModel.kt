package com.gardenhelper

data class GardenItem(
    val id: String,
    val name: String,
    val type: String,
    val latitude: Double,
    val longitude: Double,
    val advice: String,
    val weatherText: String
)

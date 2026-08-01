<?php
// Baked PHP guidance module for garden care. This file is stored as an asset.
function getGardenAdvice($question) {
    $text = strtolower(trim($question));
    if (strpos($text, 'water') !== false) {
        return 'Water plants when soil is slightly dry. Avoid overwatering by checking the top 2-3 cm of soil.';
    }
    if (strpos($text, 'sun') !== false || strpos($text, 'light') !== false) {
        return 'Most plants like morning sun and light afternoon shade. Protect tender plants from harsh midday heat.';
    }
    if (strpos($text, 'soil') !== false) {
        return 'Use rich, loamy soil with organic matter. Good drainage keeps roots healthy and prevents rot.';
    }

    return 'This baked PHP guidance engine helps with basic garden questions about watering, sunlight, and soil.';
}

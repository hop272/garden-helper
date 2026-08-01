// gemma.js provides a small local garden guidance engine that runs entirely on the device.
// It is designed for plant and garden questions only and does not contact any external AI service.

const adviceDatabase = {
  plant: 'Most plants do best with regular, moderate watering and at least 4-6 hours of indirect sunlight per day. Check the soil before watering to avoid overwatering.',
  grass: 'Grass areas should be kept moist but not waterlogged. Regular trimming and occasional aeration will keep turf healthy.',
  water: 'Water features need a gentle cleaning schedule and a reliable pump flow. Avoid letting algae build up by keeping circulation moving.',
  furniture: 'Garden furniture should be stored or covered in wet weather and cleaned gently with mild soap as needed.',
  default: 'Ask about watering, sunlight, soil, or plant care tasks and I will offer a helpful recommendation based on your garden type.',
};

const plantCareByName = {
  rose: 'Roses prefer well-drained soil, morning sun, and regular pruning after blooming. Water deeply once or twice a week.',
  tomato: 'Tomatoes need full sun, rich soil, and consistent moisture. Support stems with cages and harvest fruit when firm and colored.',
  basil: 'Basil grows well in warm conditions and should be harvested frequently to encourage new leaves. Keep soil evenly moist.',
  lavender: 'Lavender loves full sun and well-drained soil. Do not overwater; allow the top soil to dry between waterings.',
};

export function askGemma(question, markers = []) {
  const text = (question || '').trim().toLowerCase();
  if (!text) {
    return 'Enter a question about plants, weather, watering, or garden care to get advice.';
  }

  if (text.includes('water') || text.includes('watering')) {
    return 'Water when the soil feels dry about an inch below the surface. Avoid frequent shallow watering; water deeply instead.';
  }

  if (text.includes('sun') || text.includes('light')) {
    return 'Most garden plants need morning sun and some afternoon shade. Too much direct sun can stress tender young plants.';
  }

  if (text.includes('soil') || text.includes('feed') || text.includes('fertil')) {
    return 'Use a balanced organic fertilizer in spring and compost as needed. Good soil structure is the foundation of a healthy garden.';
  }

  if (text.includes('when') && text.includes('plant')) {
    return 'Plant new items in early morning or late afternoon. Keep newly planted areas moist while roots establish.';
  }

  for (const key of Object.keys(plantCareByName)) {
    if (text.includes(key)) {
      return plantCareByName[key];
    }
  }

  if (markers.length > 0 && text.includes('my garden')) {
    return `You have ${markers.length} items in your garden map. Long-press the map to add plants, grass, water features, or furniture.`;
  }

  for (const type of Object.keys(adviceDatabase)) {
    if (text.includes(type)) {
      return adviceDatabase[type];
    }
  }

  return adviceDatabase.default;
}

export function getAdviceForType(type) {
  return adviceDatabase[type] || adviceDatabase.default;
}

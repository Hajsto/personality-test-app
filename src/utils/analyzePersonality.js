// utils/analyzePersonality.js
const analyzePersonality = (answers) => {
  // Zde by byla komplexní logika pro analýzu odpovědí
  // Pro demonstraci použijeme zjednodušenou verzi
  const personalityTypes = {
    a: "Introvertní myslitel",
    b: "Kreativní duše",
    c: "Aktivní extrovert",
    d: "Společenský komunikátor"
  };

  const mostCommonAnswer = Object.values(answers).reduce(
    (a, b, i, arr) =>
      arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
  );

  return personalityTypes[mostCommonAnswer] || "Vyvážená osobnost";
};

export default analyzePersonality;

function corriger(reponse, mot, variantes = []) {
  function normaliser(t) {
    return String(t).toLowerCase()
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .replace(/[^\p{L}\p{N}]/gu, "");
  }

  function distance(a, b) {
    let d = Array.from(
      {length: a.length + 1},
      () => Array(b.length + 1).fill(0)
    );

    for (let i = 0; i <= a.length; i++) d[i][0] = i;
    for (let j = 0; j <= b.length; j++) d[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        d[i][j] = Math.min(
          d[i-1][j] + 1,
          d[i][j-1] + 1,
          d[i-1][j-1] + (a[i-1] !== b[j-1] ? 1 : 0)
        );
      }
    }
    return d[a.length][b.length];
  }

  let r = normaliser(reponse);
  let m = normaliser(mot);

  if (!r || !m)
    return "À vous de prononcer !";

  if (r === m)
    return "Excellent ! 🌟";

  if (variantes.map(normaliser).includes(r))
    return "Très bien ! Réponse acceptée. ✅";

  let score = 1 - distance(r, m) /
    Math.max(r.length, m.length);

  if (score >= 0.90)
    return "Excellent ! 🌟";

  if (score >= 0.70)
    return "Très bien ! Réponse acceptée. ✅";

  if (score >= 0.50)
    return "Bien ! Encore un petit effort. 👍";

  return "Écoutez et répétez doucement. 🔊";
}


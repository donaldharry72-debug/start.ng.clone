(() => {
  const heading = document.querySelector(".hero h1");
  if (!heading || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const font = {
    G: ["01110", "10001", "10000", "10111", "10001", "10001", "01110"],
    O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
    D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
    V: ["10001", "10001", "10001", "10001", "01010", "01010", "00100"],
    I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
    B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
    E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
    S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
    A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
    M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
    ",": ["00000", "00000", "00000", "00000", "00100", "00100", "01000"]
  };
  const colors = ["#d72b30", "#1285b8", "#f1b500", "#258b2b", "#8a51c5"];

  function makeWordLine(text) {
    const line = document.createElement("span");
    line.className = "brick-word-line";
    line.setAttribute("aria-hidden", "true");
    line.style.setProperty("--brick-cell", "clamp(3px, .62vw, 9px)");
    line.style.setProperty("--brick-gap", "clamp(1px, .16vw, 2px)");

    let column = 1;
    Array.from(text).forEach((character) => {
      if (character === " ") {
        column += 3;
        return;
      }
      const bitmap = font[character];
      const letterColor = colors[Math.floor(Math.random() * colors.length)];
      bitmap.forEach((row, rowIndex) => {
        Array.from(row).forEach((filled, cellIndex) => {
          if (filled !== "1") return;
          const brick = document.createElement("i");
          brick.className = "brick-word-cell";
          brick.style.setProperty("--row", rowIndex + 1);
          brick.style.setProperty("--column", column + cellIndex);
          brick.style.setProperty("--brick-color", letterColor);
          brick.style.setProperty("--start-x", `${Math.round(Math.random() * 120 - 60)}px`);
          brick.style.setProperty("--turn", `${Math.round(Math.random() * 100 - 50)}deg`);
          brick.style.setProperty("--delay", `${Math.round(Math.random() * 220 + rowIndex * 24 + column * 4)}ms`);
          line.append(brick);
        });
      });
      column += 6;
    });

    line.style.gridTemplateColumns = `repeat(${column - 2}, var(--brick-cell))`;
    return line;
  }

  const stage = document.createElement("span");
  stage.className = "brick-phrase-stage";
  stage.setAttribute("aria-label", "Good vibes, good games");

  const tiles = document.createElement("span");
  tiles.className = "brick-phrase-tiles";
  tiles.append(makeWordLine("GOOD VIBES,"), makeWordLine("GOOD GAMES"));

  const normal = document.createElement("span");
  normal.className = "brick-phrase-normal";
  normal.innerHTML = "<span>Good vibes,</span><mark>good games</mark>";

  stage.append(tiles, normal);
  heading.setAttribute("aria-label", "Good vibes, good games");
  heading.replaceChildren(stage);

  window.setTimeout(() => stage.classList.add("is-normal"), 1320);
  window.setTimeout(() => {
    heading.innerHTML = "Good vibes,<br><mark>good games</mark>";
    heading.removeAttribute("aria-label");
  }, 1710);
})();

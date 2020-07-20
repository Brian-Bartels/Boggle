const style = {
  Grid: {
    display: "grid",
    gridTemplateAreas:
      '"start word word word" "board board board board" "submit clear time empty"',
    //gridTemplateRows: "auto minmax(auto, 10%) auto",
    //gridTemplateColumns: "auto auto minmax(auto, 15%) minmax(auto, 15%)",
    gridRowGap: "1rem",
    gridColumnGap: "2rem",
    padding: "1rem 4rem 1rem",
    fluid: "true",
    alignItems: "center",
    justifyItems: "center",
    height: "100%"
  },
  Word: {
    gridArea: "word",
    fontSize: "2.5rem",
    fontFamily: "Concert One, cursive",
    textTransform: "uppercase",
    letterSpacing: "0.25rem"
  },
  Time: {
    gridArea: "time",
    fontSize: "2.5rem",
    fontFamily: "Concert One, cursive",
    textTransform: "uppercase",
    letterSpacing: "0.25rem"
  },
  StartButton: {
    gridArea: "start",
    justifySelf: "flex-end",
    margin: "1rem"
  },
  SubmitWordButton: {
    gridArea: "submit",
    alignSelf: "flex-start",
    justifySelf: "flex-end",
    margin: "1rem"
  },
  ClearWordButton: {
    gridArea: "clear",
    alignSelf: "flex-start",
    justifySelf: "flex-start",
    margin: "1rem"
  },
  GameBoard: N => ({
    display: "grid",
    gridArea: "board",
    gridTemplateRows: `repeat(${N}, auto)`,
    gridTemplateColumns: `repeat(${N}, auto)`,
    gridRowGap: "0.4rem",
    gridColumnGap: "0.4rem",
    justifyItems: "center",
    alignItems: "center",
    cursor: "pointer"
  }),
  GameCharacter: {
    fontSize: "3.5rem",
    fontFamily: "Concert One, cursive",
    textTransform: "uppercase",
    gridColumnStart: "auto",
    gridRowStart: "auto",
    background: "linear-gradient(to top right, #ecca68, #f1c87f)",
    fontWeight: 550,
    borderStyle: "solid",
    borderSize: "0.5rem",
    boxShadow: "0.2rem 0.2rem 0.2rem #888888",
    textAlign: "center",
    width: "5rem",
    height: "5rem",
    padding: "1.5rem"
  },
};

export default style;

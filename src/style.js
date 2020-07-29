const style = {
  Grid: {
    display: "grid",
    gridTemplateAreas:
      '"word board board board" "submit board board board" "entry board board board" "time board board board"',
    gridRowGap: "0rem",
    gridColumnGap: "0rem",
    padding: "1rem 4rem 1rem",
    fluid: "true",
    alignItems: "center",
    justifyItems: "center",
    height: "100%"
  },
  Word: {
    gridArea: "word",
    fontSize: "1.5rem",
    height: "9rem",
    overflow:"auto",
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
  Button: {
    display:"inline-block",
    alignSelf: "flex-start",
    justifySelf: "flex-end",
    margin: ".25rem",
    padding: "0px"
  },
  ButtonGrid: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridArea: "submit"
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
    background: "linear-gradient(to top right, #E6E6FA, #F0E6FA)",
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

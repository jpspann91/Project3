import { createContext } from "react";

const PendingContext = createContext({
  game: {
    id: '',
    gameType: '',
  },
  user: {
    id: '',
    username: '',
  }
});

export default PendingContext;
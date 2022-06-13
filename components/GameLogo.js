import React from "react";

//Return unstyled logo image based on game
export default function GameLogo({ game, className, width }) {
  switch (game) {
    case "assetto-corsa":
      return (
        <img className={className} src="/images/AC-logo.png" width={width} />
      );
    case "iracing":
      return (
        <img
          className={className}
          src="/images/iracing_top-01.png"
          width={width}
        />
      );
    case "ams2":
      return (
        <img className={className} src="/images/ams2logo.png" width={width} />
      );
    case "rfactor2":
      return (
        <img
          className={className}
          src="/images/rfactor2logo.png"
          width={width}
        />
      );
    default:
      return (
        <img className={className} src="/images/AC-logo.png" width={width} />
      );
  }
}

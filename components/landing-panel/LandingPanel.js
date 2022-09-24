import { useRef } from "react";

import PawnSvg from "../common/PawnSvg";
import styles from "./LandingPanel.module.css";

export default function LandingPanel() {
  const landingPanelBox = useRef(null);

  return (
    <div className={styles.LandingPanel} ref={landingPanelBox}>
      <img
        src="/images/icon.png"
        alt="Bank Of Trivia"
        className={styles.Logo}
      />
      {/* <PawnSvg parentRef={landingPanelBox} /> */}
    </div>
  );
}

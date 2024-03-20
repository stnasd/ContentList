import { useOutlet } from "react-router-dom";

import styles from "./styles.module.css";
import Header from "../../widgets/header";
import RenderList from "../../widgets/renderList";

const Home: React.FC = () => {
  const outlet = useOutlet();

  return (
    <>
      <Header />
      {outlet ? (
        <div className={styles.home__container}>
          <div className={styles.home__render}>{outlet}</div>
        </div>
      ) : (
        <div className={styles.home__container}>
          <div className={styles.home__render}>
            <RenderList />
          </div>
        </div>
      )}
    </>
  );
};
export default Home;

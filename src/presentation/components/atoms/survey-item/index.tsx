import React from 'react';
import Styles from './styles.scss';

type SurveyItemProps = {
  className?: string;
};

const SurveyItem: React.FC<SurveyItemProps> = (props) => {
  return (
    <li className={[Styles.surveyItem, props.className].join(' ')}>
      <span className={Styles.surveyIconStatus}>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAEgAAAAA9nQVdAAAA0klEQVQ4EWNgIAH8//+/AYhLSNCCWynUMCD1/zcQG+BWSYQMkmEgA0Egjght2JUANYO8iQ4MsasmIAo0BZthP4DirAS0YkrjMAzk0tOYqgmIADUVgnTiADPxakfStAWmECj2DkmcWOYjoEJPRpBqmEGMQABiI4vB5IikH1PbQAYmIm0mVtlLahu4nJpe/gf0hho1XbgVGKd3qWngRFBA4/LyX6AcKZZdBbpOB2QgLk1nQJIkgElwtaBEDAXIOUULKHYSiP/CJHHQX4Hic4CYBWYgADx8PyqFiuhJAAAAAElFTkSuQmCC"
          alt=""
        />
      </span>
      <div className={Styles.surveyContent}>
        <time className={Styles.surveyTime}>
          <span className={Styles.surveyDay}>20</span>
          <span className={Styles.surveyMonth}>12</span>
          <span className={Styles.surveyYear}>2020</span>
        </time>
        <h3>What is your favorite framework duly do dole memem?</h3>
      </div>
      <footer>See results</footer>
    </li>
  );
};

export default SurveyItem;

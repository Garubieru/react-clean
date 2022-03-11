import React, { useState } from 'react';
import Styles from './styles.scss';
import {
  Button,
  LoadingOverlay,
  MainHeader,
  PageWrapper,
} from '@/presentation/components';
import FlipMove from 'react-flip-move';
import Calendar from '@/presentation/components/atoms/calendar';

const SurveyResult: React.FC = () => {
  const isLoading = false;

  const [answers] = useState([
    {
      image: 'https://icon-library.com/images/react-icon/react-icon-29.jpg',
      answer: 'ReactJS',
      percent: 50,
      isCurrentAccountAnswer: true,
    },
    {
      image:
        'https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/21_Angular-512.png',
      answer: 'AngularJS',
      percent: 30,
      isCurrentAccountAnswer: false,
    },
    {
      image: 'https://br.vuejs.org/images/logo.png',
      answer: 'VueJS',
      percent: 20,
      isCurrentAccountAnswer: false,
    },
  ]);

  return (
    <PageWrapper header={<MainHeader />}>
      <div className={Styles.surveyContainer}>
        {!isLoading && (
          <>
            <hgroup className={Styles.surveyGeneralInfo}>
              <Calendar time={new Date()} />
              <h1>
                Qual é seu framework web favorito? Qual é seu framework web favorito? Qual
                é seu framework web favorito? Qual é seu framework web favorito? Qual é
              </h1>
            </hgroup>

            <FlipMove
              className={Styles.surveyResultList}
              typeName="ul"
              appearAnimation="elevator"
            >
              {answers.map((answer) => (
                <li
                  key={answer.answer}
                  className={Styles.surveyResultItem}
                  data-active={answer.isCurrentAccountAnswer}
                >
                  <div className={Styles.surveyInfoWrapper}>
                    <img src={answer.image} alt={answer.answer} />
                    <p>{answer.answer}</p>
                  </div>

                  <span className={Styles.surveyPercentage}>{answer.percent}%</span>
                </li>
              ))}
            </FlipMove>

            <Button className={Styles.backButton}>Voltar</Button>
          </>
        )}

        {false && <LoadingOverlay />}
      </div>
    </PageWrapper>
  );
};

export default SurveyResult;

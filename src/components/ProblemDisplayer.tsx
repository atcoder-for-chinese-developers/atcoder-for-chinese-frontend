import { Link } from 'react-router-dom';
import './ProblemDisplayer.css';
import StatsDisplayer from './StatsDisplayer';

interface ProblemDisplayerProps {
  external?: boolean;
  link?: string;
  problem: Problem;
  large?: boolean;
  small?: boolean;
  index: string;
};

function ProblemDisplayer(props: ProblemDisplayerProps) {
  function getDifficultyDisplayerStyle(difficulty: Difficulty | null) {
    let ret: any = {};
    if (difficulty === null) {
      ret.borderColor = '#000';
      ret.background = 'rgba(0, 0, 0, 0)';
      return ret;
    }
    ret.borderColor = difficulty.color;
    if (difficulty.type === 'medal') ret.background = 'linear-gradient(to right, ' + difficulty.color + ', white, ' + difficulty.color + ')';
    else {
      ret.background = 'linear-gradient(to top, ' + difficulty.color + ' ' + (difficulty.rate * 100) + '%, rgba(0, 0, 0, 0) ' + (difficulty.rate * 100) + '%) border-box';
    }
    return ret;
  }
  function getDifficultyTextStyle(difficulty: Difficulty | null): any {
    if (difficulty === null) return { textColor: '#000 !important' };
    return { color: difficulty.textColor };
  }

  const link = props.hasOwnProperty('link') ? (props.link as string) : null;
  const problem = props.problem;

  function getTextElement(text: String) {
    if (link !== null) {
      if (props.external) return (
        <a rel="noreferrer" href={ link } target="_blank" style={ getDifficultyTextStyle(problem.difficulty) }>{ text }</a>
      );
      else return (
        <Link to={ link } style={ getDifficultyTextStyle(problem.difficulty) }>{ text }</Link>
      );
    } else return (
        <span style={ getDifficultyTextStyle(problem.difficulty) }>{ text }</span>
    );
  }

  const translationNumber = props.problem.stats[0];
  const solutionNumber = props.problem.stats[1];

  return (
    <span>
      <StatsDisplayer
        stats={
          [
            {
              title: '翻译',
              number: translationNumber,
              key: 'translations',
              status: (translationNumber > 0)
            },
            {
              title: '题解',
              number: solutionNumber,
              key: 'solutions',
              status: (solutionNumber > 0)
            }
          ]
        }
        large={ props.large }
        small={ props.small }
      />
      <span
        title={ problem.difficulty !== null ? '(*' + problem.difficulty.value + ') ' + problem.title : problem.title }
        className={ props.large ? 'LargeDifficultyDisplayer' : (props.small ? 'SmallDifficultyDisplayer' : 'DifficultyDisplayer') }
        style={ getDifficultyDisplayerStyle(problem.difficulty) }
      />
      <span title={ problem.difficulty !== null ? '(*' + problem.difficulty.value + ') ' + problem.title : problem.title }>{ getTextElement(`${props.index}. ${problem.title}`) }</span>
    </span>
  );
}

export default ProblemDisplayer;

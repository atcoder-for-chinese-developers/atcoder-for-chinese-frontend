import { Link } from 'react-router-dom';
import './ProblemDisplayer.css';

interface ProblemDisplayerProps {
  external?: boolean;
  link?: string;
  problem: Problem;
  large?: boolean;
  small?: boolean;
};

function ProblemDisplayer(props: ProblemDisplayerProps) {
  function getDifficultyClass(difficulty: Number | null) {
    if (difficulty === null) return 'Black';
    if (difficulty < 400) return 'Grey';
    if (difficulty < 800) return 'Brown';
    if (difficulty < 1200) return 'Green';
    if (difficulty < 1600) return 'Cyan';
    if (difficulty < 2000) return 'Blue';
    if (difficulty < 2400) return 'Yellow';
    if (difficulty < 2800) return 'Orange';
    return 'Red';
  }
  function getDifficultyColor(difficulty: Number | null) {
    if (difficulty === null) return 'rgb(0, 0, 0)';
    if (difficulty < 400) return 'rgb(128, 128, 128)';
    if (difficulty < 800) return 'rgb(128, 64, 0)';
    if (difficulty < 1200) return 'rgb(0, 128, 0)';
    if (difficulty < 1600) return 'rgb(0, 192, 192)';
    if (difficulty < 2000) return 'rgb(0, 0, 255)';
    if (difficulty < 2400) return 'rgb(192, 192, 0)';
    if (difficulty < 2800) return 'rgb(255, 128, 0)';
    if (difficulty < 3200) return 'rgb(255, 0, 0)';
    if (difficulty < 3600) return 'rgb(150, 92, 44)';
    if (difficulty < 4000) return 'rgb(128, 128, 128)';
    return 'rgb(255, 215, 0)';
  }
  function getDifficultyRate(difficulty: Number | null) {
    if (difficulty === null) return '100%';
    let displayDifficulty = Number(difficulty);
    if (displayDifficulty < 400) displayDifficulty = Math.round(400 / Math.exp(1 - displayDifficulty / 400));
    if (displayDifficulty >= 3200) return '100%';
    return ((displayDifficulty % 400) / 4) + '%';
  }
  function getDifficultyDisplayerStyle(difficulty: Number | null) {
    let ret: any = {};
    ret.borderColor = getDifficultyColor(difficulty);
    if (difficulty === null) ret.background = 'linear-gradient(to top, rgb(0, 0, 0) 100%, rgba(0, 0, 0, 0) 100%) border-box';
    else if (difficulty >= 3200) ret.background = 'linear-gradient(to right, ' + getDifficultyColor(difficulty) + ', white, ' + getDifficultyColor(difficulty) + ')';
    else {
      ret.background = 'linear-gradient(to top, ' + getDifficultyColor(difficulty) + ' ' + getDifficultyRate(difficulty) + ', rgba(0, 0, 0, 0) ' + getDifficultyRate(difficulty) + ') border-box';
    }
    return ret;
  }

  const link = props.hasOwnProperty('link') ? (props.link as string) : null;
  const problem = props.problem;

  function getTextElement(text: String) {
    if (link !== null) {
      if (props.external) return (
        <a rel="noreferrer" href={ link } target="_blank" className={ 'Difficulty' + getDifficultyClass(problem.difficulty) }>{ text }</a>
      );
      else return (
        <Link to={ link } className={ 'Difficulty' + getDifficultyClass(problem.difficulty) }>{ text }</Link>
      );
    } else return (
        <span className={ 'Difficulty' + getDifficultyClass(problem.difficulty) }>{ text }</span>
    );
  }

  return (
    <span
      title={ problem.difficulty !== null ? '(*' + problem.difficulty + ') ' + problem.title : problem.title }
    >
      
      <span className={ props.large ? 'LargeDifficultyDisplayer' : (props.small ? 'SmallDifficultyDisplayer' : 'DifficultyDisplayer') } style={ getDifficultyDisplayerStyle(problem.difficulty) }></span>
      { getTextElement(problem.title) }
    </span>
  );
}

export default ProblemDisplayer;

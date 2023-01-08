import './StatsDisplayer.css';

type Stat = {
  number: number,
  title: string,
  status: boolean,
  key: string
}

interface StatsDisplayerProps {
  stats: Stat[],
  large?: boolean,
  small?: boolean
};

function StatsDisplayer(props: StatsDisplayerProps) {
  return (
   <span title={
      props.stats.map(stat => stat.title + ': ' + stat.number).join('\n')
    }>
      {
        props.stats.map(stat => (
          <span className={ (props.large ? 'Large' : (props.small ? 'Small' : '')) + 'StatBlock ' + (stat.status ? 'StatBlockTrue' : 'StatBlockFalse') } key={ stat.key }/>
        ))
      }
    </span>
  )
}

export default StatsDisplayer;

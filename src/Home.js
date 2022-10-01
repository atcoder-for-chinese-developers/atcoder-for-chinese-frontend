import './Home.css';

function Home(props) {
  return (
    <div className="Home">
      {props.data.ready ? JSON.stringify(props.data) : "Loading..."}
    </div>
  );
}

export default Home;

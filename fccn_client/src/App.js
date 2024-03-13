import { useEffect } from 'react';
import './App.css';
import './Styles.css';
import { fetchData } from './actions/interfaceActions';
import Body from './components/Body';
import Header from './components/Header';
import { useDispatch, useSelector } from 'react-redux';

function App() {

  const dispatch = useDispatch();

  const data_fetched = useSelector((state) => state.interface.data_fetched);
  const video_formation = useSelector((state) => state.interface.video_formation);

  useEffect(() => {
    // Fetch data only if it hasn't been fetched yet
    if (!data_fetched) {
      dispatch(fetchData(video_formation));
    }
  }, [data_fetched]);

  if(!data_fetched){
    return (<></>);
  }

  return (
    <div className="app-container">
      <Header></Header>
      {}
      <Body></Body>
    </div>
  );
}

export default App;

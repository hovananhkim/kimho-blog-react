import Layout from 'antd/lib/layout/layout';
import './App.css';
import ContentLayout from './components/Body/contentlayout';
import HeaderLayout from './components/Navbar/headerlayout';
function App() {
  return (
    <div className="App">
      <Layout>
        <HeaderLayout />
        <ContentLayout />
      </Layout>
    </div>
  );
}

export default App;

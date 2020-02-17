import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import FileSearch from "./components/FileSearch";
import FileListDefaultData from "./utils/defaultData/FileListDefaultData";
import FileList from "./components/FileList";
import BottomBtn from "./components/BottomBtn";
function App() {
  return (
    <div className="App container-fluid px-0 mx-0">
      <div className="row no-gutters">
        <div className="col-3 bg-light left-panel d-flex flex-column">
          <FileSearch onFileSearch={(query) => console.log(query)} />
          <FileList
              files={FileListDefaultData}
              onFileClick={(id) => console.log(`FileClick：${id}`)}
              onFileDelete={(id) => console.log(`FileDelete：${id}`)}
              onSaveEdit={(id,newValue) => console.log(`onSaveEdit：${id} ${newValue}`)}
          />
        </div>
        <div className="row no-gutters fixed-bottom col-3 px-0">
          <div className="col-6">
            <BottomBtn colorClass="btn-primary" text="新建" />
          </div>
          <div className="col-6">
            <BottomBtn colorClass="btn-success" text="导入" />
          </div>
        </div>
        <div className="col-9 bg-info right-panel">
          right-panel
        </div>
      </div>
    </div>
  );
}

export default App;

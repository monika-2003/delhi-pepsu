import React from 'react';
import '../../App.css';
import UnloadingReport from '../UnloadingReport';


function UnloadingReportPage({ sessionObject }) {
    
    if(!sessionObject.sessionVariables["modules"].includes("report-bilty")){
        return;}
      return (
        <div className="page-bilty">
        <UnloadingReport sessionObject={sessionObject} />
        </div>
      );
}


export default UnloadingReportPage;
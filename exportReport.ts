import { AnalysisResponse } from './resume';

export const exportAnalysisToPdf = (data: AnalysisResponse) => {
  window.print();
};

export const exportAnalysisToJson = (data: AnalysisResponse) => {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data, null, 2)
  )}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute('download', `${data.filename || 'resume'}_analysis_report.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

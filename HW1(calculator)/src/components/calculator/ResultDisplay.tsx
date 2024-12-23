import './ResultDisplay.css'

interface ResultDisplayProps {
  result: string ;
}

const ResultDisplay = ( result:ResultDisplayProps ) => {
  return (
    <div className='resultDiv'>
      {result.result}
    </div>
  );
};

export default ResultDisplay;

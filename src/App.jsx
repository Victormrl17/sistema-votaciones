import { useState } from 'react';
import Results from './components/results/Results';
import Candidates from './components/candidates/Candidates';
import DisplayFilter from './components/displayfilter/Displayfilter';
import TotalVotes from './components/totalvotes/Totalvotes';
import './App.css';

const initialState = [
  { id: 1, name: 'Don Julio', votes: 0, percentage: 0, isVisible: true },
  { id: 2, name: 'Jhonny Walker', votes: 0, percentage: 0, isVisible: true },
  { id: 3, name: 'Jack Daniels', votes: 0, percentage: 0, isVisible: true },
  { id: 4, name: 'Jose Cuervo', votes: 0, percentage: 0, isVisible: true },
];

function App() {
  const [candidates, setCandidates] = useState(initialState);
  const [filterType, setFilterType] = useState('TOTAL');

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const handleVote = (id) => {
    const updatedCandidates = candidates.map(candidate => {
      if (candidate.id === id) {
        return {
          ...candidate,
          votes: candidate.votes + 1
        };
      }
      return candidate;
    });

    const totalVotes = updatedCandidates.reduce((total, candidate) => total + candidate.votes, 0);

    const candidatesWithPercentage = updatedCandidates.map(candidate => ({
      ...candidate,
      percentage: totalVotes > 0 ? ((candidate.votes / totalVotes) * 100).toFixed(2) : 0
    }));

    setCandidates(candidatesWithPercentage);
  };

  const handleToggleCandidate = (id) => {
    const updatedCandidates = candidates.map(candidate =>
      candidate.id === id ? { ...candidate, isVisible: !candidate.isVisible } : candidate
    );
    setCandidates(updatedCandidates);
  };

  return (
    <div>
      <Candidates candidates={candidates} onHandleVote={handleVote} />
      <DisplayFilter
        onHandleFilterChange={handleFilterChange}
        filterType={filterType}
        candidates={candidates}
        onToggleCandidate={handleToggleCandidate}
      />
      <TotalVotes candidates={candidates} />
      <Results candidates={candidates} filterType={filterType} />
    </div>
  );
}

export default App;

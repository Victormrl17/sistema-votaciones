import PropTypes from 'prop-types';
import './totalvotes.css';

const TotalVotes = ({ candidates }) => {
  const totalVotes = candidates.reduce((total, candidate) => total + candidate.votes, 0);
  const totalPercentage = totalVotes > 0
    ? candidates.reduce((acc, candidate) => acc + parseFloat(candidate.percentage), 0).toFixed(2)
    : 0;

  return (
    <>
      <h2>Total Votes</h2>
      <div className="total-votes">
        <p>Total Votes: {totalVotes}</p>
      </div>
    </>
  );
};

TotalVotes.propTypes = {
  candidates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
      percentage: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TotalVotes;

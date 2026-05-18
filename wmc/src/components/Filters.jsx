import './Filters.css';

export default function Filters({ name, id, options, onFilter }) {
  return (
    <div className="category-filter">
      <label htmlFor={id} className="catType">{name}</label>
      <select
        className="dropdown-select"
        id={id}
        onChange={e => onFilter(e.target.value)}
      >
        <option value="">-- choose --</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}
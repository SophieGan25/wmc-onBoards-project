import './Filters.css';

export default function Filters({ name, id, options, onFilter, value }) {
  return (
    <div className="category-filter">
      <label htmlFor={id} className="catType">{name}</label>
      <select
        className="dropdown-select"
        id={id}
        value={value}
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

export function InputFilter({ name, id, onFilter }) {
  return (
    <div className="input-filter">
      <label htmlFor={id} className="countryType">{name}</label>
      <input 
        type="text" 
        id={id} 
        className="country-input" 
        onChange={e => onFilter(e.target.value)} /> 
      </div>
  );
}

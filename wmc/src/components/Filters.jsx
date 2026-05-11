import './Filters.css';

export default function Filters({name, options}) { 
    return (
        <div className="filters">
            <div className="category-filter">
                <label htmlFor={id} className="catType">{name}</label>
                <select className="dropdown-select" id="category-type">
                    <option value="">-- choose --</option>
                    {options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                    <Filters
                        name="Boards"
                        id="boards-filter"
                        options={["Snowboards", "Surfboards", "Wakeboards", "Skateboards"]}
                    />
                    <Filters
                        name="Equipment"
                        id="equipment-filter"
                        options={["Outerwear", "Layers", "Accessories"]}
                    />
                </select>
            </div>
        </div>
)}

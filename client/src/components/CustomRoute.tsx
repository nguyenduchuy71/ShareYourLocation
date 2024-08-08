import { Link } from 'react-router-dom';

function CustomRoute({ route, name }) {
    return (
        <Link className="text-sm font-medium transition-colors hover:text-primary" to={route}>{name}</Link>
    )
}

export default CustomRoute
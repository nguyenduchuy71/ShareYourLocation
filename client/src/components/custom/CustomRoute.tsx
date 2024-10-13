import { Link } from "react-router-dom";

function CustomRoute({
  route,
  name,
  isLogout = false,
  logoutAction = () => {},
}) {
  return (
    <div className="text-sm font-medium transition-colors hover:text-primary">
      {isLogout ? (
        <span onClick={logoutAction} className="cursor-pointer">
          {" "}
          {name}{" "}
        </span>
      ) : (
        <Link to={route}>{name}</Link>
      )}
    </div>
  );
}

export default CustomRoute;

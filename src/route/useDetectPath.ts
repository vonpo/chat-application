import { useLocation, useRouteMatch } from "react-router-dom";

/**
 * Detect router path.
 *
 * @param {string} path
 */
export const useDetectPath = (path: string) => {
  const match = useRouteMatch(path);
  const location = useLocation();

  return match?.path === location.pathname;
};

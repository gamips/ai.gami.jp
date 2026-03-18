import type { MouseEvent } from "react";
import { Link, useLocation, useResolvedPath, type LinkProps } from "react-router";

type ScrollToTopLinkProps = LinkProps & {
  scrollBehavior?: ScrollBehavior;
};

export function ScrollToTopLink({
  to,
  onClick,
  scrollBehavior = "auto",
  target,
  ...props
}: ScrollToTopLinkProps) {
  const location = useLocation();
  const resolvedPath = useResolvedPath(to);

  const isSameDestination =
    location.pathname === resolvedPath.pathname &&
    location.search === resolvedPath.search &&
    location.hash === resolvedPath.hash;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (
      target === "_blank" ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    ) {
      return;
    }

    if (isSameDestination) {
      window.scrollTo({ top: 0, left: 0, behavior: scrollBehavior });
    }
  };

  return <Link to={to} onClick={handleClick} target={target} {...props} />;
}

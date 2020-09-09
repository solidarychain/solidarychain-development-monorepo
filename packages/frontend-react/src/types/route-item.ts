import { DrawerSections } from ".";

export interface RouteItem {
  label: string,
  path: string,
  component: React.FC,
  exact?: boolean,
  // other non-router properties
  section?: DrawerSections,
  drawerIcon?: JSX.Element
}

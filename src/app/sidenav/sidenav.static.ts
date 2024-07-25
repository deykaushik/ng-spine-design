import { INavItem } from './sidenav.model';

export class SidenavStatic {
  public static navItems: INavItem[] = [
    {
      label: 'Select',
      id: 'sidenav-select',
      redirectTo: 'select',
    },
    {
      label: 'Multiselect',
      id: 'sidenav-multislect',
      redirectTo: 'multi-select',
    },
    {
      label: 'Treeselect',
      id: 'sidenav-treeselect',
      redirectTo: 'tree-select',
    },
  ];
}

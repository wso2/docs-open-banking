import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import ObVersionDropdown from './ObVersionDropdown';

/** Registers the custom navbar item types used in docusaurus.config.ts. */
export default {
  ...ComponentTypes,
  'custom-obVersionDropdown': ObVersionDropdown,
};

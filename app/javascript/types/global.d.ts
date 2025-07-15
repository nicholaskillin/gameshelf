declare global {
  interface Window {
    ReactRailsUJS: any;
    $: JQueryStatic;
    jQuery: JQueryStatic;
  }
}

export {};
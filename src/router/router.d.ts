type RouterOption = {
  url: string;
  path: string;
  query: any;
};
type RouterEvent = {
  to: RouterOption;
  from: RouterOption;
};
type RouterBeforeEach = ((e: RouterEvent) => RouterPage | boolean) | null;
type RouterAfterEach = ((e: RouterEvent) => void) | null;
type RouterPage = {
  router:"navigateTo"| "redirectTo" | "switchTab" | "reLaunch" ;
}&UniNamespace.NavigateToOptions
type RouterMixin = {
  beforeEachFunc: RouterBeforeEach;
  afterEachFunc: RouterAfterEach;
  beforeEach: (callback: RouterBeforeEach) => void;
  afterEach: (callback:RouterAfterEach) => void;
  onShow: () => void;
  onHide: () => void;
};
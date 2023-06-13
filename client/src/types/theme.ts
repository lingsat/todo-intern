export interface IContext {
  lightMode: boolean;
  setLightMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export enum ETheme {
  LIGHT = "light",
  DARK = "dark",
}

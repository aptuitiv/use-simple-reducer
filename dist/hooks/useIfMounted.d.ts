declare type IfMountedCallback = () => void;
declare const useIfMounted: () => (func: IfMountedCallback) => void;
export default useIfMounted;

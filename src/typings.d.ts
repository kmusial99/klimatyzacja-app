/* SystemJS module definition */

declare const nodeModule: NodeModule;
interface NodeModule {
  id: string;
}
interface Window {
  process: any;
  require: any;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  os_performance: {
    freemem: () => number;
    totalmem: () => number;
    freememPercentage: () => number;
    getCPUUsage: () => Promise<number>;
  };
}

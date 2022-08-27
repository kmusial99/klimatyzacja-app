import { contextBridge } from 'electron';
import * as performance from './performance';

contextBridge.exposeInMainWorld('os_performance', performance)

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DropContainer } from '../models/drop-container';

@Injectable()
export class DropContainerOpsatService {

  containers$ = new Subject<string[]>();
  activeContainer$ = new Subject<string>();
  private containers = new Map<string, DropContainer>();
  constructor() { }

  registryContainer(key: string, container: DropContainer): void {
    this.containers.set(key, container);
    this.publishContainers();
  }

  deRegistryContainer(key: string): void {
    this.containers.delete(key);
    this.publishContainers();
  }

  activeContainer(key?: string): void {
    this.activeContainer$.next(key);
  }

  private publishContainers() {
    this.containers$.next([...this.containers.keys()]);
  }
}

import { 
    reactive, 
    effectScope, 
    provide, 
    inject, 
    onScopeDispose, 
    type EffectScope, 
    type InjectionKey 
} from "vue"

type ServiceFactory<T> = (injector: ReturnType<typeof useDi>) => T
interface Container {
    services: Map<symbol | string, ServiceFactory<any>>
}

const DI_CONTAINER_KEY = Symbol('diContainer') as InjectionKey<Container>

export function createSharedComposable<Fn extends (...args: any[]) => any>(composable: Fn): Fn {
    let subscribers = 0
    let state: ReturnType<Fn> | undefined
    let scope: EffectScope | undefined
  
    const dispose = () => {
      subscribers -= 1
      if (scope && subscribers <= 0) {
        scope.stop()
        state = undefined
        scope = undefined
      }
    }
  
    return <Fn>((...args) => {
      subscribers += 1
      if (!scope) {
        scope = effectScope(true)
        state = scope.run(() => composable(...args))
      }
      onScopeDispose(dispose)
      return state
    })
}

export function createGlobalComposable<Fn extends (...args: any[]) => any>(composable: Fn): Fn {
    let state: ReturnType<Fn> | undefined
    let scope: EffectScope | undefined
  
    return <Fn>((...args) => {
      if (!scope) {
        scope = effectScope(true)
        state = scope.run(() => composable(...args))
      }
      return state
    })
}

export function useDiContainer() {
    const container: Container = {
        services: reactive(new Map())
    }
    
    provide(DI_CONTAINER_KEY, container)

    return {
        register: <T, K = InjectionKey<T> | string>(key: K, factory: ServiceFactory<T>, options: { shared: boolean } = { shared: true }) => {
            const service = options.shared ? createSharedComposable(factory) : createGlobalComposable(factory)
            container.services.set(key as symbol, service)
        },
    }
}

export function useDi() {
    const container = inject(DI_CONTAINER_KEY)
    if (!container) {
        throw new Error('Di container not found')
    }

    const injector = {
        inject: <T>(key: InjectionKey<ServiceFactory<T>>): T => {
            const factory = container.services.get(key as symbol) as ServiceFactory<T>
            if (!factory) {
                throw new Error(`Service with key ${String(key)} not found`)
            }
            return factory(injector)
        }
    }

    return injector
}

export type Injector = ReturnType<typeof useDi>

export function createServiceKey<T>(service: ServiceFactory<T>): InjectionKey<ServiceFactory<T>> {
    return Symbol.for(service.name) as InjectionKey<ServiceFactory<T>>
}

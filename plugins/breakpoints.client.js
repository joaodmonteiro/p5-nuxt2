import { debounce, isArray } from '@yesstudio/yes-utils'

export default ({
  app,
  store: {
    commit,
    state: {
      breakpoints: { BREAKPOINT: activeBreakpoint },
    },
  },
}) => {
  const computedStyles = window.getComputedStyle(document.documentElement)
  const mediaQueryList = window.matchMedia('(hover: hover) and (pointer: fine)')

  const mixin = {
    mounted() {
      setBreakpoint()
      window.addEventListener('resize', debounce(setBreakpoint, 99))
      setHasPointer(mediaQueryList)
      mediaQueryList.addEventListener('change', setHasPointer)
    },
  }

  function setBreakpoint() {
    const propertyValue = computedStyles.getPropertyValue('--breakpoint')
    const breakpoint = propertyValue.trim().replace(/^"|"$/g, '')
    if (breakpoint === activeBreakpoint) return
    commit('breakpoints/SET_BREAKPOINT', breakpoint)
  }

  function setHasPointer({ matches: hasPointer }) {
    commit('breakpoints/SET_HAS_POINTER', hasPointer)
  }

  if (isArray(app.mixins)) {
    app.mixins.push(mixin)
  } else {
    app.mixins = [mixin]
  }
}

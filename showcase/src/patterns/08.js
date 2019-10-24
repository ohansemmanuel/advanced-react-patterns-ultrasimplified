import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  forwardRef,
  useRef
} from 'react'

import mojs from 'mo-js'
import { generateRandomNumber } from '../utils/generateRandomNumber'
import styles from './index.css'
import userStyles from './usage.css'

/** ====================================
   *          🔰Hook
        Hook for Animation
  ==================================== **/

const useClapAnimation = ({
  duration: tlDuration,
  bounceEl,
  fadeEl,
  burstEl
}) => {
  const [animationTimeline, setAnimationTimeline] = useState(
    new mojs.Timeline()
  )

  useLayoutEffect(
    () => {
      if (!bounceEl || !fadeEl || !burstEl) {
        return
      }

      const triangleBurst = new mojs.Burst({
        parent: burstEl,
        radius: { 50: 95 },
        count: 5,
        angle: 30,
        children: {
          shape: 'polygon',
          radius: { 6: 0 },
          scale: 1,
          stroke: 'rgba(211,84,0 ,0.5)',
          strokeWidth: 2,
          angle: 210,
          delay: 30,
          speed: 0.2,
          easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
          duration: tlDuration
        }
      })

      const circleBurst = new mojs.Burst({
        parent: burstEl,
        radius: { 50: 75 },
        angle: 25,
        duration: tlDuration,
        children: {
          shape: 'circle',
          fill: 'rgba(149,165,166 ,0.5)',
          delay: 30,
          speed: 0.2,
          radius: { 3: 0 },
          easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
        }
      })

      const countAnimation = new mojs.Html({
        el: bounceEl,
        isShowStart: false,
        isShowEnd: true,
        y: { 0: -30 },
        opacity: { 0: 1 },
        duration: tlDuration
      }).then({
        opacity: { 1: 0 },
        y: -80,
        delay: tlDuration / 2
      })

      const countTotalAnimation = new mojs.Html({
        el: fadeEl,
        isShowStart: false,
        isShowEnd: true,
        opacity: { 0: 1 },
        delay: (3 * tlDuration) / 2,
        duration: tlDuration,
        y: { 0: -3 }
      })

      const scaleButton = new mojs.Html({
        el: burstEl,
        duration: tlDuration,
        scale: { 1.3: 1 },
        easing: mojs.easing.out
      })

      if (typeof burstEl === 'string') {
        const id = burstEl.slice(1, burstEl.length)
        const el = document.getElementById(id)
        el.style.transform = 'scale(1, 1)'
      } else {
        burstEl.style.transform = 'scale(1, 1)'
      }

      const updatedAnimationTimeline = animationTimeline.add([
        countAnimation,
        countTotalAnimation,
        scaleButton,
        circleBurst,
        triangleBurst
      ])

      setAnimationTimeline(updatedAnimationTimeline)
    },
    [tlDuration, animationTimeline, bounceEl, fadeEl, burstEl]
  )

  return animationTimeline
}

/** ====================================
   *          🔰Hook
        Hook for Clap State
  ==================================== **/
const MAX_CLAP = 50
const INIT_STATE = {
  count: 0,
  countTotal: generateRandomNumber(500, 10000),
  isClicked: false
}

const callFnsInSequence = (...fns) => (...args) =>
  fns.forEach(fn => fn && fn(...args))

const useClapState = ({ initialState = INIT_STATE } = {}) => {
  const [clapState, setClapState] = useState(initialState)
  const { count, countTotal } = clapState

  const handleClapClick = useCallback(
    () => {
      setClapState({
        count: Math.min(count + 1, MAX_CLAP),
        countTotal: count < MAX_CLAP ? countTotal + 1 : countTotal,
        isClicked: true
      })
    },
    [count, countTotal]
  )

  const getTogglerProps = ({ onClick, ...otherProps } = {}) => ({
    onClick: callFnsInSequence(handleClapClick, onClick),
    'aria-pressed': clapState.isClicked,
    ...otherProps
  })

  const getCounterProps = ({ ...otherProps }) => ({
    count,
    'aria-valuemax': MAX_CLAP,
    'aria-valuemin': 0,
    'aria-valuenow': count,
    ...otherProps
  })

  return {
    clapState,
    getTogglerProps,
    getCounterProps
  }
}

/** ====================================
   *          🔰Hook
        useEffectAfterMount
  ==================================== **/

function useEffectAfterMount (cb, deps) {
  const componentJustMounted = useRef(true)
  useEffect(() => {
    if (!componentJustMounted.current) {
      return cb()
    }
    componentJustMounted.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/** ====================================
   *          🔰Hook
            useDOMRef
  ==================================== **/
const useDOMRef = () => {
  const [DOMRef, setDOMRef] = useState({})
  const setRef = useCallback(node => {
    if (node !== null) {
      setDOMRef(prevDOMRefs => ({
        ...prevDOMRefs,
        [node.dataset.refkey]: node
      }))
    }
  }, [])

  return [DOMRef, setRef]
}

/** ====================================
   *      🔰SubComponents
  Smaller Component used by <MediumClap />
  ==================================== **/

const ClapContainer = forwardRef(
  (
    { children, handleClick, className, style: userStyles = {}, ...restProps },
    ref
  ) => {
    const classNames = [styles.clap, className].join(' ').trim()

    return (
      <button
        onClick={handleClick}
        className={classNames}
        style={userStyles}
        ref={ref}
        {...restProps}
      >
        {children}
      </button>
    )
  }
)

const ClapIcon = ({ className = '', style: userStyles = {}, isClicked }) => {
  const classNames = [styles.icon, isClicked ? styles.checked : '', className]
    .join(' ')
    .trim()

  return (
    <span>
      <svg
        id='clapIcon'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='-549 338 100.1 125'
        className={classNames}
        style={userStyles}
      >
        <path d='M-471.2 366.8c1.2 1.1 1.9 2.6 2.3 4.1.4-.3.8-.5 1.2-.7 1-1.9.7-4.3-1-5.9-2-1.9-5.2-1.9-7.2.1l-.2.2c1.8.1 3.6.9 4.9 2.2zm-28.8 14c.4.9.7 1.9.8 3.1l16.5-16.9c.6-.6 1.4-1.1 2.1-1.5 1-1.9.7-4.4-.9-6-2-1.9-5.2-1.9-7.2.1l-15.5 15.9c2.3 2.2 3.1 3 4.2 5.3zm-38.9 39.7c-.1-8.9 3.2-17.2 9.4-23.6l18.6-19c.7-2 .5-4.1-.1-5.3-.8-1.8-1.3-2.3-3.6-4.5l-20.9 21.4c-10.6 10.8-11.2 27.6-2.3 39.3-.6-2.6-1-5.4-1.1-8.3z' />
        <path d='M-527.2 399.1l20.9-21.4c2.2 2.2 2.7 2.6 3.5 4.5.8 1.8 1 5.4-1.6 8l-11.8 12.2c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l34-35c1.9-2 5.2-2.1 7.2-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l28.5-29.3c2-2 5.2-2 7.1-.1 2 1.9 2 5.1.1 7.1l-28.5 29.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.4 1.7 0l24.7-25.3c1.9-2 5.1-2.1 7.1-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l14.6-15c2-2 5.2-2 7.2-.1 2 2 2.1 5.2.1 7.2l-27.6 28.4c-11.6 11.9-30.6 12.2-42.5.6-12-11.7-12.2-30.8-.6-42.7m18.1-48.4l-.7 4.9-2.2-4.4m7.6.9l-3.7 3.4 1.2-4.8m5.5 4.7l-4.8 1.6 3.1-3.9' />
      </svg>
    </span>
  )
}

const ClapCount = forwardRef(
  ({ count, className = '', style: userStyles = {}, ...restProps }, ref) => {
    const classNames = [styles.count, className].join(' ').trim()

    return (
      <span ref={ref} className={classNames} style={userStyles} {...restProps}>
        +{count}
      </span>
    )
  }
)

const CountTotal = forwardRef(
  (
    { countTotal, className = '', style: userStyles = {}, ...restProps },
    ref
  ) => {
    const classNames = [styles.total, className].join(' ').trim()

    return (
      <span ref={ref} className={classNames} style={userStyles} {...restProps}>
        {countTotal}
      </span>
    )
  }
)

/** ====================================
      *        🔰USAGE
      Below's how a potential user
      may consume the component API
  ==================================== **/

const Usage = () => {
  const { clapState, getTogglerProps, getCounterProps } = useClapState()
  const { count, countTotal, isClicked } = clapState

  const [
    { clapContainerRef, clapCountRef, countTotalRef },
    setRef
  ] = useDOMRef()

  const animationTimeline = useClapAnimation({
    duration: 300,
    bounceEl: clapCountRef,
    fadeEl: countTotalRef,
    burstEl: clapContainerRef
  })

  const onClick = () => {
    animationTimeline.replay()
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <ClapContainer
        ref={setRef}
        data-refkey='clapContainerRef'
        {...getTogglerProps({
          'data-testId': '#grabThis',
          onClick
        })}
      >
        <ClapIcon isClicked={isClicked} />
        <ClapCount
          ref={setRef}
          data-refkey='clapCountRef'
          {...getCounterProps()}
        />
        <CountTotal
          ref={setRef}
          data-refkey='countTotalRef'
          countTotal={countTotal}
        />
      </ClapContainer>
      <section
        style={{
          borderBottom: '1px solid #bdc3c7',
          color: '#27ae60',
          marginTop: '30px',
          padding: '10px 20px',
          borderRadius: '20px'
        }}
      >
        {!isClicked ? 'No recommendations :(' : `Recommended ${count} times 🔥`}
      </section>
    </div>
  )
}

export default Usage

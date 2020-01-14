import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useContext,
  useMemo,
  useRef,
  createContext
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

  useLayoutEffect(() => {
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
      clap.style.transform = 'scale(1, 1)'
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
  }, [tlDuration, animationTimeline, bounceEl, fadeEl, burstEl])

  return animationTimeline
}
/** ====================================
 *      🔰 MediumClap
==================================== **/
const initialState = {
  count: 0,
  countTotal: generateRandomNumber(500, 10000),
  isClicked: false
}

const MediumClapContext = createContext()
const { Provider } = MediumClapContext

const MediumClap = ({
  children,
  onClap,
  className = '',
  style: userStyles = {}
}) => {
  const MAXIMUM_USER_CLAP = 50
  const [clapState, setClapState] = useState(initialState)
  const { count, countTotal, isClicked } = clapState

  const [{ clapRef, clapCountRef, clapTotalRef }, setRefState] = useState({})
  const setRef = useCallback(node => {
    if (node !== null) {
      setRefState(prevRefState => ({
        ...prevRefState,
        [node.dataset.refkey]: node
      }))
    }
  }, [])

  const animationTimeline = useClapAnimation({
    duration: 300,
    bounceEl: clapCountRef,
    fadeEl: clapTotalRef,
    burstEl: clapRef
  })

  const handleClapClick = () => {
    animationTimeline.replay()

    setClapState({
      count: Math.min(count + 1, MAXIMUM_USER_CLAP),
      countTotal: count < MAXIMUM_USER_CLAP ? countTotal + 1 : countTotal,
      isClicked: true
    })
  }

  const componentJustMounted = useRef(true)

  useEffect(() => {
    if (!componentJustMounted.current) {
      onClap(clapState)
    }
    componentJustMounted.current = false
  }, [count, onClap])

  const memoizedValue = useMemo(
    () => ({
      ...clapState,
      setRef
    }),
    [clapState, setRef]
  )

  const classNames = [styles.clap, className].join(' ').trim()

  return (
    <Provider value={memoizedValue}>
      <button
        ref={setRef}
        data-refkey='clapRef'
        className={styles.clap}
        onClick={handleClapClick}
        className={classNames}
        style={userStyles}
      >
        {children}
      </button>
    </Provider>
  )
}

/** ====================================
 *      🔰SubComponents
Smaller Component used by <MediumClap />
==================================== **/

const ClapIcon = ({ className = '', style: userStyles = {} }) => {
  const { isClicked } = useContext(MediumClapContext)
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
const ClapCount = ({ className = '', style: userStyles = {} }) => {
  const { count, setRef } = useContext(MediumClapContext)
  const classNames = [styles.count, className].join(' ').trim()

  return (
    <span
      ref={setRef}
      data-refkey='clapCountRef'
      className={classNames}
      style={userStyles}
    >
      +{count}
    </span>
  )
}
const CountTotal = ({ className = '', style: userStyles = {} }) => {
  const { countTotal, setRef } = useContext(MediumClapContext)
  const classNames = [styles.total, className].join(' ').trim()

  return (
    <span
      ref={setRef}
      data-refkey='clapTotalRef'
      className={classNames}
      style={userStyles}
    >
      {countTotal}
    </span>
  )
}

MediumClap.Icon = ClapIcon
MediumClap.Count = ClapCount
MediumClap.Total = CountTotal

/** ====================================
    *        🔰USAGE
    Below's how a potential user
    may consume the component API
==================================== **/
const Info = ({ info }) => {
  return <div className={styles.info}>{info}</div>
}

const Usage = () => {
  const [total, setTotal] = useState(0)

  const onClap = ({ countTotal }) => {
    setTotal(countTotal)
  }

  return (
    <div style={{ width: '100%' }}>
      <MediumClap onClap={onClap} className={userStyles.clap}>
        <MediumClap.Icon className={userStyles.icon} />
        <MediumClap.Total className={userStyles.total} />
        <MediumClap.Count className={userStyles.count} />
      </MediumClap>
      {!!total && (
        <Info info={`Your article has been clapped ${total} times`} />
      )}
    </div>
  )
}

export default Usage
